// biome-ignore-all lint/style/noNonNullAssertion: canvas, layout and parser code indexes arrays it has just sized; strict index checks need the assertions.
'use client';
// Copied from the parafencing-project dictionary (canonical source); sync with scripts/sync-p4p-dictionary.mjs.
// created_by: Claude Code (Fable 5.2); date_created: 2026-11-14
// The term field, drawn on a canvas the way the reference dictionary draws it: the camera sits
// close to a deep field of discs, so a few are large and dark, most are small and pale, and
// there is wide empty paper between them. Drag turns the field, the wheel moves the camera in
// and out, a click opens a term. Choosing a term glides the camera to it and draws a line with
// travelling dots to every connected term.
import { useEffect, useRef } from 'react';
import type { CloudPoint } from './dictionary-layout';
import type { Dictionary } from './dictionary-model';

interface Props {
  dictionary: Dictionary;
  points: Map<string, CloudPoint>;
  selectedId: string;
  onTerm: (id: string) => void;
}
/** One term as it appears on screen this frame. */
interface Seen {
  id: string;
  point: CloudPoint;
  sx: number;
  sy: number;
  scale: number;
  r: number;
  far: number;
  near: number;
  depth: number;
}
interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';
const HOME_DISTANCE = 1.6,
  TERM_DISTANCE = 1.35,
  NEAR_PLANE = 0.3;
const NARROW = 0.86;
// With a term open, the chosen term is the largest mark (owner review, 16 Nov 2026: neighbours used to outweigh it).
const CHOSEN_R = 12,
  CHOSEN_INNER = 7.5,
  CHOSEN_RING = 18,
  NEAR_MIN = 7,
  NEAR_MAX = 11,
  REST_MAX = 10;
const touches = (a: Box, b: Box) =>
  a.x < b.x + b.w + 6 && b.x < a.x + a.w + 6 && a.y < b.y + b.h + 3 && b.y < a.y + a.h + 3;
const clamp = (value: number, low = 0, high = 1) => Math.max(low, Math.min(high, value));

export default function DictionaryCloud({ dictionary, points, selectedId, onTerm }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const live = useRef({ selectedId, onTerm });
  live.current = { selectedId, onTerm };
  const view = useRef({
    yaw: 0.6,
    pitch: -0.12,
    distance: HOME_DISTANCE,
    tx: 0,
    ty: 0,
    tz: 0,
    toYaw: 0.6,
    toPitch: -0.12,
    toDistance: HOME_DISTANCE,
    toX: 0,
    toY: 0,
    toZ: 0,
    hover: '',
    seen: [] as Seen[],
    redraw: () => {},
  });

  // Glide the camera to the chosen term, or back out to the whole field.
  useEffect(() => {
    const camera = view.current,
      point = points.get(selectedId);
    if (point) {
      camera.toX = point.x;
      camera.toY = point.y;
      camera.toZ = point.z;
      camera.toDistance = TERM_DISTANCE;
    } else {
      camera.toX = 0;
      camera.toY = 0;
      camera.toZ = 0;
      camera.toDistance = HOME_DISTANCE;
    }
    camera.redraw();
  }, [selectedId, points]);

  useEffect(() => {
    const element = canvas.current!,
      holder = wrap.current!,
      context = element.getContext('2d')!;
    const camera = view.current;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // The field holds more terms as the library grows, so each disc shrinks to keep open space between them.
    const crowd = clamp(Math.sqrt(110 / points.size), 0.55, 1);
    let width = 0,
      height = 0,
      frame = 0,
      inkAge = 99,
      ink = [26, 26, 25],
      paper = [234, 234, 232];
    let drag: { x: number; y: number; moved: boolean } | null = null,
      lastTouch = performance.now() - 5000,
      lastStep = performance.now();
    // Motion state. `focus` runs from 0 to 1 each time a term is chosen: lines grow out of it and its
    // neighbours darken as it rises. `born` times the opening, when discs pop in one after another.
    let focus = 0,
      focusFor = '';
    const born = performance.now(),
      turn = new Map([...points.keys()].map((id, at) => [id, at]));
    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
    const settle = (t: number) => 1 - (1 - clamp(t)) ** 3;
    const pop = (t: number) => 1 - (1 - clamp(t)) ** 3;

    const triple = (value: string, fallback: number[]) => {
      const parts = value.trim().split(/\s+/).map(Number);
      return parts.length === 3 && parts.every(Number.isFinite) ? parts : fallback;
    };
    /** A solid grey between ink (0) and paper (1). Discs are opaque, so overlapping ones never turn muddy. */
    const tone = (mix: number, alpha = 1) => {
      const t = clamp(mix),
        c = ink.map((value, at) => Math.round(value + (paper[at]! - value) * t));
      return `rgb(${c[0]} ${c[1]} ${c[2]} / ${clamp(alpha).toFixed(3)})`;
    };

    const measure = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = holder.clientWidth;
      height = holder.clientHeight;
      element.width = Math.round(width * ratio);
      element.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(performance.now());
    };

    function project(now: number): Seen[] {
      const focal = Math.max(Math.min(width, height) * 2, Math.max(width, height) * 1.25);
      const cosY = Math.cos(camera.yaw),
        sinY = Math.sin(camera.yaw),
        cosP = Math.cos(camera.pitch),
        sinP = Math.sin(camera.pitch);
      const seen: Seen[] = [];
      for (const point of points.values()) {
        const px = point.x - camera.tx,
          py = point.y - camera.ty,
          pz = point.z - camera.tz;
        const x = px * cosY + pz * sinY,
          z1 = -px * sinY + pz * cosY;
        const y = py * cosP - z1 * sinP,
          z = py * sinP + z1 * cosP;
        const depth = camera.distance - z;
        if (depth < NEAR_PLANE) continue;
        const scale = focal / depth;
        // Every disc floats on its own slow loop, so the field is never quite still.
        const floatX = still ? 0 : Math.sin(now / 5200 + point.x * 17) * 0.004 * scale,
          floatY = still ? 0 : Math.cos(now / 4600 + point.y * 13) * 0.004 * scale;
        seen.push({
          id: point.id,
          point,
          depth,
          scale,
          sx: width / 2 + x * scale + floatX,
          sy: height / 2 - y * scale + floatY,
          // Discs are small against the space between them, and well-connected terms stand out.
          r: Math.max(2.5, (0.012 + point.importance ** 2 * 0.034) * scale * crowd),
          // `near` also carries a distance haze: the farthest discs dissolve into the paper.
          far: clamp((depth - 0.8) / 1.6),
          near: clamp((depth - NEAR_PLANE) / 0.4) * (1 - clamp((depth - 2.25) / 0.5) * 0.9),
        });
      }
      return seen.sort((a, b) => b.depth - a.depth);
    }

    function draw(now: number) {
      if (!width || !height) return;
      if (++inkAge > 30) {
        const style = getComputedStyle(holder);
        ink = triple(style.getPropertyValue('--pfd-ink-rgb'), ink);
        paper = triple(style.getPropertyValue('--pfd-paper-rgb'), paper);
        inkAge = 0;
      }
      const selected = live.current.selectedId;
      const seen = project(now),
        byId = new Map(seen.map((item) => [item.id, item]));
      camera.seen = seen;
      const chosen = byId.get(selected),
        near = new Set(chosen ? dictionary.byId.get(selected)!.connects : []);
      context.clearRect(0, 0, width, height);
      context.globalAlpha = 1;

      // Lines. The whole web shows as faint long strokes; a chosen term adds its own connections on top.
      // The reference barely shows its web, so these strokes stay at the edge of visibility.
      context.lineWidth = 0.75;
      context.strokeStyle = tone(0, 0.011);
      context.beginPath();
      for (const [from, to] of dictionary.edges) {
        const a = byId.get(from),
          b = byId.get(to);
        if (a && b) {
          context.moveTo(a.sx, a.sy);
          context.lineTo(b.sx, b.sy);
        }
      }
      context.stroke();
      const grown = settle(focus);
      if (chosen)
        for (const id of near) {
          const target = byId.get(id);
          if (!target) continue;
          // The line shoots out from the chosen term to its neighbour, then dots travel along it.
          const ex = chosen.sx + (target.sx - chosen.sx) * grown,
            ey = chosen.sy + (target.sy - chosen.sy) * grown;
          context.lineWidth = 0.6;
          context.strokeStyle = tone(0, 0.28);
          context.beginPath();
          context.moveTo(chosen.sx, chosen.sy);
          context.lineTo(ex, ey);
          context.stroke();
          // One small, faint dot per line, drifting slowly (owner direction, 16 Nov 2026: more subtle).
          {
            const along = still ? 0.5 : (((now / 9000 + target.point.x) % 1) + 1) % 1;
            if (along <= grown) {
              context.fillStyle = tone(0, 0.32 * Math.min(1, along * 6, (1 - along) * 6));
              context.beginPath();
              context.arc(
                chosen.sx + (target.sx - chosen.sx) * along,
                chosen.sy + (target.sy - chosen.sy) * along,
                1,
                0,
                Math.PI * 2,
              );
              context.fill();
            }
          }
        }

      // Discs, far to near. Distance and importance set the grey: near and well connected is dark.
      const arrive = (item: Seen) =>
        still ? 1 : clamp((now - born - 250 - turn.get(item.id)! * 9) / 620);
      const radius = (item: Seen) => {
        const lit = !chosen
          ? item.r
          : lerp(
              item.r,
              item.id === selected
                ? CHOSEN_R
                : near.has(item.id)
                  ? clamp(item.r, NEAR_MIN, NEAR_MAX)
                  : Math.min(item.r * 0.7, REST_MAX),
              grown,
            );
        return Math.max(
          0,
          lit * pop(arrive(item)) * (item.id === camera.hover && item.id !== selected ? 1.06 : 1),
        );
      };
      // With a term chosen, the pale background discs are drawn first so they never cover a lit one.
      const paint = chosen
        ? [
            ...seen.filter((item) => item.id !== selected && !near.has(item.id)),
            ...seen.filter((item) => near.has(item.id)),
            chosen,
          ]
        : seen;
      for (const item of paint) {
        const isChosen = item.id === selected,
          isNear = near.has(item.id),
          isHover = item.id === camera.hover;
        const resting = 0.05 + (1 - item.point.importance) * 0.5 + item.far * 0.3;
        const shade = chosen
          ? lerp(resting, isChosen ? 0 : isNear ? 0.16 : 0.84 + item.far * 0.08, grown)
          : resting;
        context.globalAlpha = item.near * clamp(arrive(item) * 2);
        context.fillStyle = tone(isHover && !isChosen ? Math.min(shade, 0.12) : shade);
        context.beginPath();
        context.arc(item.sx, item.sy, radius(item), 0, Math.PI * 2);
        context.fill();
        if (isChosen) {
          context.globalAlpha = 1;
          context.strokeStyle = tone(1);
          context.lineWidth = 2;
          context.beginPath();
          context.arc(item.sx, item.sy, CHOSEN_INNER, 0, Math.PI * 2);
          context.stroke();
          // The ring around the chosen term breathes.
          context.strokeStyle = tone(0, 0.5 * grown);
          context.lineWidth = 0.75;
          context.beginPath();
          context.arc(
            item.sx,
            item.sy,
            CHOSEN_RING + (still ? 0 : Math.sin(now / 2400) * 0.3),
            0,
            Math.PI * 2,
          );
          context.stroke();
        }
      }
      context.globalAlpha = 1;

      // Labels sit centred above their own disc and grow with nearness. Nearest terms claim space first;
      // a label that would cover another label or a nearer disc is left out.
      const placed: Box[] = [];
      const order = [...seen]
        .reverse()
        .filter(
          (item) =>
            item.id === camera.hover ||
            (chosen
              ? item.id === selected || near.has(item.id)
              : item.far < 0.9 && item.near > 0.3),
        )
        .sort(
          (a, b) =>
            Number(b.id === selected) - Number(a.id === selected) ||
            Number(b.id === camera.hover) - Number(a.id === camera.hover) ||
            a.depth - b.depth,
        );
      // Labels keep clear of every visible disc, pale background ones included, so no word sits on a disc.
      const solid = seen
        .filter(
          (item) => item.far < 0.75 || (chosen && (item.id === selected || near.has(item.id))),
        )
        .map((item) => {
          const r = item.id === selected ? CHOSEN_RING + 1 : radius(item);
          return {
            id: item.id,
            depth: item.depth,
            x: item.sx - r,
            y: item.sy - r,
            w: r * 2,
            h: r * 2,
          };
        });
      context.textAlign = 'center';
      context.textBaseline = 'alphabetic';
      for (const item of order) {
        const isChosen = item.id === selected,
          forced = isChosen || item.id === camera.hover;
        const size = chosen
          ? isChosen
            ? 13
            : 11.5
          : clamp((0.0105 + item.point.importance ** 2 * 0.012) * item.scale, 8.5, 19);
        const text = dictionary.byId.get(item.id)!.term.toUpperCase();
        context.font = `${isChosen ? 700 : 400} ${size}px ${MONO}`;
        (context as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = '0.04em';
        // The label face is drawn slightly narrowed, like the condensed mono of the reference.
        const w = context.measureText(text).width * NARROW + 4,
          h = size * 1.15,
          r = isChosen ? CHOSEN_RING + 1 : radius(item),
          gap = Math.max(6, size * 0.5);
        // Above, below, right, left. With a term open each spot is pulled inside the canvas before the
        // overlap check, so a label is never cut at the edge and never pushed onto a disc afterwards.
        const inside = (box: Box) =>
          chosen || forced
            ? {
                ...box,
                x: clamp(box.x, 6, Math.max(6, width - w - 6)),
                y: clamp(box.y, 6, Math.max(6, height - h - 6)),
              }
            : box;
        const spots: Box[] = [
          { x: item.sx - w / 2, y: item.sy - r - gap - h, w, h },
          { x: item.sx - w / 2, y: item.sy + r + gap, w, h },
          { x: item.sx + r + gap, y: item.sy - h / 2, w, h },
          { x: item.sx - r - gap - w, y: item.sy - h / 2, w, h },
        ].map(inside);
        const free = (box: Box) =>
          !placed.some((other) => touches(box, other)) &&
          !solid.some(
            (disc) =>
              (chosen || (disc.id !== item.id && disc.depth <= item.depth + 0.4)) &&
              touches(box, disc),
          );
        let spot = (chosen ? spots : spots.slice(0, 1)).find(free);
        if (!spot && forced) spot = spots[0];
        if (
          !spot ||
          spot.y + spot.h < 0 ||
          spot.y > height ||
          spot.x + spot.w < 0 ||
          spot.x > width
        )
          continue;
        placed.push(spot);
        context.globalAlpha =
          item.near *
          clamp(arrive(item) * 1.5 - 0.5) *
          (chosen && !isChosen ? clamp(grown * 1.6 - 0.4) : 1);
        context.fillStyle = tone(chosen || forced ? (isChosen ? 0 : 0.3) : 0.42 + item.far * 0.38);
        context.save();
        context.translate(spot.x + w / 2, spot.y + h - size * 0.18);
        context.scale(NARROW, 1);
        context.fillText(text, 0, 0);
        context.restore();
      }
      context.globalAlpha = 1;
    }

    function step(now: number) {
      // Timed easing, so a glide takes the same time whatever the frame rate.
      const elapsed = clamp(now - lastStep, 0, 250);
      lastStep = now;
      const ease = still ? 1 : 1 - Math.exp(-elapsed / 320);
      if (live.current.selectedId !== focusFor) {
        focusFor = live.current.selectedId;
        focus = 0;
      }
      focus = still ? 1 : Math.min(1, focus + elapsed / 1100);
      if (!drag && !still && now - lastTouch > 2500)
        camera.toYaw += elapsed * (live.current.selectedId ? 0.000004 : 0.000016);
      camera.yaw += (camera.toYaw - camera.yaw) * ease;
      camera.pitch += (camera.toPitch - camera.pitch) * ease;
      camera.distance += (camera.toDistance - camera.distance) * ease;
      camera.tx += (camera.toX - camera.tx) * ease;
      camera.ty += (camera.toY - camera.ty) * ease;
      camera.tz += (camera.toZ - camera.tz) * ease;
    }
    const loop = (now: number) => {
      step(now);
      draw(now);
      frame = requestAnimationFrame(loop);
    };
    camera.redraw = () => {
      if (still) {
        step(performance.now());
        draw(performance.now());
      }
    };

    const under = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect(),
        x = event.clientX - bounds.left,
        y = event.clientY - bounds.top;
      const chosen = live.current.selectedId,
        near = chosen ? new Set(dictionary.byId.get(chosen)?.connects) : null;
      for (let at = camera.seen.length - 1; at >= 0; at--) {
        const item = camera.seen[at]!;
        const r = !chosen
          ? item.r
          : item.id === chosen
            ? CHOSEN_RING
            : near!.has(item.id)
              ? clamp(item.r, NEAR_MIN, NEAR_MAX)
              : Math.min(item.r * 0.7, REST_MAX);
        if (item.near > 0.3 && Math.hypot(item.sx - x, item.sy - y) <= Math.max(r, 14))
          return item.id;
      }
      return '';
    };
    // Two fingers on a touch screen pinch to zoom, like the wheel on a mouse. A pinch never counts as a tap.
    const fingers = new Map<number, { x: number; y: number }>();
    let pinch = 0;
    const spread = () => {
      const [a, b] = [...fingers.values()] as [{ x: number; y: number }, { x: number; y: number }];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    const down = (event: PointerEvent) => {
      fingers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      element.setPointerCapture(event.pointerId);
      lastTouch = performance.now();
      if (fingers.size === 2) {
        pinch = spread();
        if (drag) drag.moved = true;
      } else drag = { x: event.clientX, y: event.clientY, moved: false };
    };
    const move = (event: PointerEvent) => {
      lastTouch = performance.now();
      if (fingers.has(event.pointerId))
        fingers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (fingers.size === 2 && pinch > 0) {
        const now = spread();
        if (now > 0) camera.toDistance = clamp((camera.toDistance * pinch) / now, 0.45, 3.4);
        pinch = now;
      } else if (drag) {
        const dx = event.clientX - drag.x,
          dy = event.clientY - drag.y;
        if (drag.moved || Math.hypot(dx, dy) > 4) {
          drag.moved = true;
          drag.x = event.clientX;
          drag.y = event.clientY;
          camera.toYaw -= dx * 0.005;
          camera.toPitch = clamp(camera.toPitch - dy * 0.005, -1.35, 1.35);
        }
      } else {
        const id = under(event);
        if (id !== camera.hover) {
          camera.hover = id;
          element.style.cursor = id ? 'pointer' : 'grab';
        }
      }
      camera.redraw();
    };
    const up = (event: PointerEvent) => {
      fingers.delete(event.pointerId);
      if (fingers.size === 1) {
        const rest = [...fingers.values()][0]!;
        pinch = 0;
        drag = { x: rest.x, y: rest.y, moved: true };
        return;
      }
      const wasDrag = drag?.moved;
      drag = null;
      if (!wasDrag) {
        const id = under(event);
        if (id && id !== live.current.selectedId) live.current.onTerm(id);
      }
    };
    const leave = () => {
      camera.hover = '';
      camera.redraw();
    };
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      lastTouch = performance.now();
      camera.toDistance = clamp(camera.toDistance * Math.exp(event.deltaY * 0.0012), 0.45, 3.4);
      camera.redraw();
    };

    const observer = new ResizeObserver(measure);
    observer.observe(holder);
    window.addEventListener('resize', measure);
    element.addEventListener('pointerdown', down);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerup', up);
    element.addEventListener('pointerleave', leave);
    element.addEventListener('pointercancel', up);
    element.addEventListener('wheel', wheel, { passive: false });
    measure();
    if (still) {
      step(performance.now());
      draw(performance.now());
    } else frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerup', up);
      element.removeEventListener('pointerleave', leave);
      element.removeEventListener('pointercancel', up);
      element.removeEventListener('wheel', wheel);
    };
  }, [dictionary, points]);

  return (
    <div className="pfd-cloud" ref={wrap}>
      <canvas
        ref={canvas}
        role="img"
        aria-label={`A slowly turning field of ${dictionary.entries.length} terms and ${dictionary.edges.length} connections. The search button lists every term.`}
      />
    </div>
  );
}
