// biome-ignore-all lint/style/noNonNullAssertion: canvas, layout and parser code indexes arrays it has just sized; strict index checks need the assertions.
// Copied from the parafencing-project dictionary (canonical source); sync with scripts/sync-p4p-dictionary.mjs.
// created_by: Claude Code (Fable 5.2); date_created: 2026-11-13
// updated_by: Claude Code (Fable 5.2); last_updated_on: 2026-11-14
// Positions the dictionary terms in a deep three-dimensional field of radius 1.
// The camera sits close to this field, so depth, not crowding, separates the terms.
// The starting points and the forces contain no randomness, so the same entries
// always produce the same field.
import type { Dictionary } from './dictionary-model';

// Repulsion dominates, so terms scatter evenly through the field instead of bunching into clusters.
const CENTER = 0.3,
  PUSH = 0.12,
  REST = 0.7,
  PULL = 0.35,
  STEPS = 360;

export interface CloudPoint {
  id: string;
  x: number;
  y: number;
  z: number;
  degree: number;
  importance: number;
}

export function layoutDictionary(dictionary: Dictionary): Map<string, CloudPoint> {
  const count = dictionary.entries.length;
  const golden = Math.PI * (3 - Math.sqrt(5));
  // Start on an even spiral around a sphere. Entries arrive group by group, so groups begin as neighbours.
  const nodes = dictionary.entries.map((entry, index) => {
    const y = 1 - (2 * (index + 0.5)) / count,
      ring = Math.sqrt(1 - y * y),
      angle = index * golden;
    return {
      id: entry.id,
      x: Math.cos(angle) * ring,
      y,
      z: Math.sin(angle) * ring,
      fx: 0,
      fy: 0,
      fz: 0,
    };
  });
  const index = new Map(nodes.map((node, at) => [node.id, at]));
  const links = dictionary.edges.map(([from, to]) => [index.get(from)!, index.get(to)!] as const);
  // Well-connected terms are drawn larger, so they push harder and keep clear space around them.
  const busiest = Math.max(...dictionary.entries.map((entry) => entry.connects.length), 1);
  const weight = dictionary.entries.map((entry) => 1 + (entry.connects.length / busiest) * 2.2);
  for (let step = 0; step < STEPS; step++) {
    const heat = 0.06 * (1 - step / STEPS) + 0.004;
    for (const node of nodes) {
      node.fx = -node.x * CENTER;
      node.fy = -node.y * CENTER;
      node.fz = -node.z * CENTER;
    }
    for (let a = 0; a < count; a++)
      for (let b = a + 1; b < count; b++) {
        const dx = nodes[a]!.x - nodes[b]!.x,
          dy = nodes[a]!.y - nodes[b]!.y,
          dz = nodes[a]!.z - nodes[b]!.z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001,
          push = (PUSH * weight[a]! * weight[b]!) / (distance * distance);
        nodes[a]!.fx += (dx / distance) * push;
        nodes[a]!.fy += (dy / distance) * push;
        nodes[a]!.fz += (dz / distance) * push;
        nodes[b]!.fx -= (dx / distance) * push;
        nodes[b]!.fy -= (dy / distance) * push;
        nodes[b]!.fz -= (dz / distance) * push;
      }
    for (const [a, b] of links) {
      const dx = nodes[b]!.x - nodes[a]!.x,
        dy = nodes[b]!.y - nodes[a]!.y,
        dz = nodes[b]!.z - nodes[a]!.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001,
        pull = (distance - REST) * PULL;
      nodes[a]!.fx += (dx / distance) * pull;
      nodes[a]!.fy += (dy / distance) * pull;
      nodes[a]!.fz += (dz / distance) * pull;
      nodes[b]!.fx -= (dx / distance) * pull;
      nodes[b]!.fy -= (dy / distance) * pull;
      nodes[b]!.fz -= (dz / distance) * pull;
    }
    for (const node of nodes) {
      const force = Math.sqrt(node.fx * node.fx + node.fy * node.fy + node.fz * node.fz) || 1,
        move = Math.min(force, 1) * heat;
      node.x += (node.fx / force) * move;
      node.y += (node.fy / force) * move;
      node.z += (node.fz / force) * move;
    }
  }
  const reach =
    Math.max(
      ...nodes.map((node) => Math.sqrt(node.x * node.x + node.y * node.y + node.z * node.z)),
    ) || 1;
  const degrees = dictionary.entries.map((entry) => entry.connects.length);
  const round = (value: number) => Math.round((value / reach) * 1e6) / 1e6;
  // Importance is a term's rank by connections (0 to 1), so sizes and greys spread evenly from pale to dark
  // instead of one busy term making all the others look alike.
  const sorted = [...degrees].sort((a, b) => a - b);
  const rank = (degree: number) =>
    count > 1 ? sorted.filter((value) => value < degree).length / (count - 1) : 1;
  return new Map(
    nodes.map((node, at) => [
      node.id,
      {
        id: node.id,
        x: round(node.x),
        y: round(node.y),
        z: round(node.z),
        degree: degrees[at]!,
        importance: rank(degrees[at]!),
      },
    ]),
  );
}
