"""Read-only portfolio HTTP audit. Run only after production-ready notification."""
import argparse
import concurrent.futures
import datetime
import io
import json
import pathlib
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

from PIL import Image

parser = argparse.ArgumentParser()
parser.add_argument('--production-ready', action='store_true', required=True)
parser.parse_args()
BASE = 'http://127.0.0.1:3000'
REPORT = pathlib.Path('docs/portfolio/HTTP-VERIFICATION.json')
previous = json.loads(REPORT.read_text(encoding='utf-8'))
started = time.monotonic()
now = lambda: datetime.datetime.now(datetime.timezone.utc).isoformat()
norm = lambda value: re.sub(r'\s+', ' ', value).strip()
failures, scans, optional = [], [], []


def check(ok, path, name, detail=None):
    if not ok:
        failures.append({'path': path, 'check': name, 'detail': detail})


def request(path):
    begin = time.monotonic()
    req = urllib.request.Request(BASE + path, headers={'User-Agent': 'Bulachak-Local-HTTP-Audit/1.0'})
    try:
        response = urllib.request.urlopen(req, timeout=30)
    except urllib.error.HTTPError as error:
        response = error
    with response:
        return {'path': path, 'status': response.status,
                'headers': {k.lower(): v for k, v in response.headers.items()},
                'body': response.read(), 'milliseconds': round((time.monotonic() - begin) * 1000)}


patterns = {
    'formerApplicationTargets': re.compile(r'\b(?:quoreka|fambot|luxiomer|anthropic|pierre|yorkin|marina)\b', re.I),
    'emailAddress': re.compile(r'[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}', re.I),
    'emOrEnDash': re.compile('[\u2013\u2014]'),
}


def scan(path, text):
    for name, pattern in patterns.items():
        matches = sorted(set(pattern.findall(text)))
        if matches:
            scans.append({'path': path, 'pattern': name, 'matches': matches})


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.head = self.main_active = self.title_active = False
        self.hidden = []
        self.script = self.heading = None
        self.links, self.meta, self.images, self.jsonld, self.nonces = [], [], [], [], []
        self.main, self.visible, self.headings, self.title, self.ids, self.anchors = [], [], [], [], [], []
        self.mainlang = self.htmllang = None
        self.paragraphs = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'head': self.head = True
        if tag == 'html': self.htmllang = a.get('lang')
        if tag == 'main': self.main_active = True; self.mainlang = a.get('lang')
        if tag == 'title': self.title_active = True
        if tag == 'link' and self.head: self.links.append(a)
        if tag == 'meta': self.meta.append(a)
        if tag == 'img': self.images.append(a)
        if a.get('id'): self.ids.append(a['id'])
        if tag == 'a': self.anchors.append(a)
        if tag == 'script':
            self.script = {'attrs': a, 'text': []}
            if a.get('nonce'): self.nonces.append(a['nonce'])
        if tag in ['script', 'style', 'noscript']: self.hidden.append(tag)
        if tag in ['p', 'section', 'header', 'footer', 'nav', 'article', 'li', 'div', 'h1', 'h2', 'h3']:
            self.visible.append(' ')
            if self.main_active: self.main.append(' ')
        if tag == 'p' and self.main_active: self.paragraphs += 1
        if tag in ['h1', 'h2', 'h3'] and self.main_active: self.heading = {'level': tag, 'text': []}

    def handle_endtag(self, tag):
        if tag == 'script' and self.script:
            if self.script['attrs'].get('type') == 'application/ld+json': self.jsonld.append(''.join(self.script['text']))
            self.script = None
        if tag in ['script', 'style', 'noscript'] and self.hidden: self.hidden.pop()
        if tag in ['h1', 'h2', 'h3'] and self.heading:
            self.headings.append({'level': self.heading['level'], 'text': norm(''.join(self.heading['text']))})
            self.heading = None
        if tag == 'main': self.main_active = False
        if tag == 'head': self.head = False
        if tag == 'title': self.title_active = False
        if tag in ['p', 'section', 'header', 'footer', 'nav', 'article', 'li', 'div', 'h1', 'h2', 'h3']:
            self.visible.append(' ')
            if self.main_active: self.main.append(' ')

    def handle_data(self, data):
        if self.script: self.script['text'].append(data)
        if self.title_active: self.title.append(data)
        if self.hidden: return
        self.visible.append(data)
        if self.main_active: self.main.append(data)
        if self.heading: self.heading['text'].append(data)


def language(path):
    return path.split('/')[1] if path.startswith(('/ru/', '/tt/')) else 'en'


def localized(lang, suffix=''):
    return ('' if lang == 'en' else '/' + lang) + '/portfolio' + suffix


def case_strings(item):
    values = [item[k] for k in ['title', 'subtitle', 'summary', 'role', 'highlight', 'evidenceNote']]
    for section in item['sections']:
        values += [section['title']] + section['paragraphs'] + section.get('bullets', [])
    return values


def about_source(lang):
    path = 'src/lib/business/portfolio-about.' + lang + '.ts'
    source = pathlib.Path(path).read_text(encoding='utf-8')
    values = re.findall(r"(?:title|eyebrow|description):\s*'((?:\\.|[^'\\])*)'", source)
    for block in re.findall(r'paragraphs:\s*\[(.*?)\]', source, re.S):
        values += re.findall(r"'((?:\\.|[^'\\])*)'", block)
    ids = re.findall(r"id:\s*'([^']+)'", source)
    return path, [v.replace("\\'", "'") for v in values], ids


audit = {'startedAt': now(), 'server': BASE,
         'mode': 'Read-only HTTP GET against the final local production preview. JavaScript excluded from content checks. No browser or application edits.',
         'copyVersionNote': 'Compact About source in EN/RU/TT: nine section IDs and no four-Cs framework. Founder retains the original compact footer.',
         'priorAuditFinishedAt': previous.get('finishedAt'), 'failures': failures, 'warnings': [],
         'html': [], 'api': [], 'markdown': [], 'discovery': [], 'negativeCases': [], 'copyScan': scans}
result = request('/sitemap.xml')
check(result['status'] == 200, '/sitemap.xml', 'status', result['status'])
urls = [e.text for e in ET.fromstring(result['body']).findall('{*}url/{*}loc')]
urls = [u for u in urls if re.match(r'^/(?:ru/|tt/)?portfolio(?:/|$)', urllib.parse.urlsplit(u).path)]
parts = urllib.parse.urlsplit(urls[0]); origin = parts.scheme + '://' + parts.netloc
paths = [urllib.parse.urlsplit(u).path for u in urls]
check(len(paths) == 96, '/sitemap.xml', 'portfolioURLCount', len(paths))
audit['discovery'].append({'path': '/sitemap.xml', 'status': result['status'], 'portfolioURLs': len(paths), 'canonicalOrigin': origin})
api = {}
for lang in ['en', 'ru', 'tt']:
    r = request('/api/portfolio?lang=' + lang); obj = json.loads(r['body']); items = obj.get('items', [])
    api[lang] = {i['slug']: i for i in items}
    check(r['status'] == 200 and len(items) == 24, r['path'], 'catalogueResponse', {'status': r['status'], 'items': len(items)})
    check(r['headers'].get('content-language') == lang, r['path'], 'contentLanguage', r['headers'].get('content-language'))
    scan(r['path'], json.dumps(obj, ensure_ascii=False))
    audit['api'].append({'path': r['path'], 'status': r['status'], 'items': len(items), 'contentLanguage': r['headers'].get('content-language')})
check(set(api['en']) == set(api['ru']) == set(api['tt']), '/api/portfolio', 'identicalLanguageSlugs')
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    responses = list(pool.map(request, paths))
parsed, nonce_values = {}, []
for r in responses:
    path = r['path']; lang = language(path); p = Page(); p.feed(r['body'].decode('utf-8')); parsed[path] = p
    main = norm(''.join(p.main)); visible = norm(''.join(p.visible)); suffix = path.split('/portfolio', 1)[1]
    canonical = [a.get('href') for a in p.links if a.get('rel') == 'canonical']
    hrefs = {a['hreflang']: a.get('href') for a in p.links if a.get('rel') == 'alternate' and a.get('hreflang')}
    markdown = [a.get('href') for a in p.links if a.get('rel') == 'alternate' and a.get('type') == 'text/markdown']
    expected = {l: origin + localized(l, suffix) for l in ['en', 'ru', 'tt']}; expected['x-default'] = origin + localized('en', suffix)
    check(r['status'] == 200, path, 'status', r['status']); check(canonical == [origin + path], path, 'canonical', canonical)
    check(hrefs == expected, path, 'hreflang', hrefs); check(p.mainlang == lang, path, 'mainLanguage', p.mainlang)
    check(any('lang=' + lang in (h or '') for h in markdown), path, 'htmlMarkdownAlternate', markdown)
    h1 = [h['text'] for h in p.headings if h['level'] == 'h1']
    check(len(h1) == 1, path, 'singleH1', h1); check(len(main) > 250 and p.paragraphs >= 2, path, 'initialReadableContent')
    csp = r['headers'].get('content-security-policy', ''); match = re.search(r"'nonce-([^']+)'", csp); nonce = match.group(1) if match else None
    script = re.search(r'(?:^|;)\s*script-src\s+([^;]+)', csp); script = script.group(1) if script else ''
    strict = bool(nonce) and "'strict-dynamic'" in script and "'unsafe-inline'" not in script and "'unsafe-eval'" not in script
    check(strict, path, 'strictProductionCSP', csp); check("frame-ancestors 'none'" in csp, path, 'frameAncestors')
    check(nonce in p.nonces, path, 'nonceUsedInHTML'); nonce_values.append(nonce)
    security = {key: r['headers'].get(key) for key in ['strict-transport-security', 'x-content-type-options', 'x-frame-options', 'referrer-policy', 'permissions-policy', 'cross-origin-opener-policy', 'cross-origin-resource-policy']}
    check(all(security.values()), path, 'basicSecurityHeaders', security)
    robots = [m.get('content', '') for m in p.meta if m.get('name', '').lower() == 'robots']
    check(any('noindex' in v for v in robots), path, 'previewNoindex', robots)
    blocks = []
    try: blocks = [json.loads(s) for s in p.jsonld]
    except ValueError as error: check(False, path, 'jsonLdParse', str(error))
    nodes, types = [], []
    for b in blocks:
        check(b.get('@context') == 'https://schema.org', path, 'jsonLdContext'); nodes += b.get('@graph', [b])
    for node in nodes:
        typ = node.get('@type', []); types += typ if isinstance(typ, list) else [typ]
    check('Person' in types and 'WebSite' in types, path, 'jsonLdIdentityTypes', types)
    check(any(n.get('@id') == origin + path and n.get('inLanguage') == lang for n in nodes), path, 'jsonLdPageLanguage')
    item = api[lang].get(suffix.strip('/')); complete = None
    if item:
        missing = [s for s in case_strings(item) if norm(s) not in main]; complete = not missing
        check(complete, path, 'fullCaseInitialHTML', missing)
    rawlink = r['headers'].get('link', ''); discovery_present = 'text/markdown' in rawlink or 'describedby' in rawlink
    if not r['headers'].get('content-language'): optional.append({'path': path, 'check': 'contentLanguage', 'detail': None})
    if not discovery_present: optional.append({'path': path, 'check': 'discoveryLinkHeader', 'detail': 'Absent; any stylesheet preload Link is not discovery.'})
    scan(path, visible + ' ' + ''.join(p.title) + ' ' + ' '.join(m.get('content', '') for m in p.meta if 'description' in m.get('name', m.get('property', ''))) + ' ' + json.dumps(blocks, ensure_ascii=False))
    audit['html'].append({'path': path, 'status': r['status'], 'language': lang, 'htmlLang': p.htmllang, 'mainLang': p.mainlang,
                          'contentLanguage': r['headers'].get('content-language'), 'rawLinkHeader': rawlink, 'discoveryLinkHeaderPresent': discovery_present,
                          'h1': h1, 'mainTextCharacters': len(main), 'paragraphs': p.paragraphs, 'fullCaseTextPresent': complete,
                          'canonical': canonical, 'hreflang': hrefs, 'markdownAlternates': markdown, 'jsonLdTypes': types, 'jsonLdBlocks': len(blocks),
                          'strictProductionCSP': strict, 'cspNoncePresent': bool(nonce), 'nonceUsedByHTML': nonce in p.nonces,
                          'basicSecurityHeaders': security, 'previewRobotsMeta': robots, 'milliseconds': r['milliseconds']})
check(len(set(nonce_values)) == 96 and None not in nonce_values, 'HTML all pages', 'uniqueCspNonces', len(set(nonce_values)))
print('Verified 96 portfolio HTML responses.', flush=True)

about = []
for lang in ['en', 'ru', 'tt']:
    path = localized(lang, '/about'); p = parsed[path]; text = norm(''.join(p.main)); source, values, ids = about_source(lang)
    missing = [v for v in values if norm(v) not in text]; absent_ids = [i for i in ids if i not in p.ids]
    check(len(ids) == 9 and not missing and not absent_ids, path, 'compactAboutSource', {'sourceSectionCount': len(ids), 'missingText': missing, 'missingIds': absent_ids})
    old_terms = [v for v in ['Clarity', 'Coherence', 'Capacity', 'Continuity', 'Broken Wheel', 'Bulachak Mesh'] if re.search(r'\b' + re.escape(v) + r'\b', text)]
    check(not old_terms, path, 'removedAboutFrameworkCopy', old_terms)
    hrefs = [a.get('href') for a in p.anchors]
    destinations = [localized(lang, '/' + slug) for slug in ['a4a', 'p4p', 'i4i', 'founder']] + [localized(lang) + '#work']
    check(all(h in hrefs for h in destinations), path, 'aboutContextualLinks', destinations)
    about.append({'path': path, 'sourceFile': source, 'sourceSectionIds': ids, 'allSourceTextPresent': not missing,
                  'allSourceIdsPresent': not absent_ids, 'oldFrameworkTermsAbsent': not old_terms, 'contextualLinksPresent': all(h in hrefs for h in destinations)})
audit['compactAbout'] = about
badges = ['salesforce-administrator', 'salesforce-business-analyst', 'radical-product-thinking-vision-setting', 'google-ai-professional', 'google-ai-data-analysis', 'pmi-member', 'product-management-basics', 'ai-product-management']
credentials = {'en': 'Certified digital expertise', 'ru': 'Подтверждённая цифровая экспертиза', 'tt': 'Расланган цифрлы компетенцияләр'}
scale = {'en': 'The discipline to scale', 'ru': 'Дисциплина для роста', 'tt': 'Үсеш өчен дисциплина'}
footer = 'I bring an Olympic athletic background to fuel the relentless discipline required to execute, a deep research background focused on hyper-targeted strategy, and the grit of the immigrant experience. I rely on hard analytics and behavioral strategy to build resilient operational systems that help businesses actually run.'
founders, optimized = [], set()
for lang in ['en', 'ru', 'tt']:
    path = localized(lang, '/founder'); p = parsed[path]; text = norm(''.join(p.main)); images = []
    for a in p.images:
        src = a.get('src', ''); actual = urllib.parse.parse_qs(urllib.parse.urlsplit(src).query).get('url', [src])[0]
        if actual.startswith('/assets/portfolio/badges/'):
            images.append({'asset': actual, 'renderedSrc': src, 'alt': a.get('alt')}); optimized.add(src)
    expected_assets = {'/assets/portfolio/badges/' + b + '.webp' for b in badges}
    check(len(images) == 8 and {i['asset'] for i in images} == expected_assets and all(i['alt'] for i in images), path, 'founderBadgesAndAlt', images)
    headings = [h['text'] for h in p.headings]; valid = credentials[lang] in headings and scale[lang] in headings
    check(valid, path, 'founderFooterHeadings', headings)
    removed = [term for term in ['Credentials and learning', 'immigrant enterprise'] if term.lower() in text.lower()]
    check(not removed, path, 'removedFounderCopy', removed)
    if lang == 'en': check(footer in text, path, 'originalEnglishFounderFooter')
    founders.append({'path': path, 'badgeCount': len(images), 'images': images, 'expectedHeadingsPresent': valid,
                     'removedPhrasesAbsent': not removed, 'originalEnglishFooterMatches': footer in text if lang == 'en' else None})
audit['founderFooter'] = founders
audit['badgeAssets'] = []
for path in ['/assets/portfolio/badges/' + b + '.webp' for b in badges] + sorted(optimized):
    r = request(path); fmt = dimensions = None
    try:
        image = Image.open(io.BytesIO(r['body'])); fmt = image.format; dimensions = list(image.size); image.verify()
    except Exception as error: check(False, path, 'decodableBadgeImage', str(error))
    check(r['status'] == 200 and r['headers'].get('content-type', '').startswith('image/'), path, 'badgeImageResponse', r['status'])
    audit['badgeAssets'].append({'path': path, 'kind': 'renderedOptimizedImage' if path.startswith('/_next/') else 'originalAsset',
                                 'status': r['status'], 'contentType': r['headers'].get('content-type'), 'format': fmt, 'dimensions': dimensions, 'bytes': len(r['body'])})
for old in previous['markdown']:
    path = old['path']; query = urllib.parse.parse_qs(urllib.parse.urlsplit(path).query); lang = query.get('lang', ['en'])[0]; slug = query.get('slug', [None])[0]
    r = request(path); text = r['body'].decode('utf-8'); h = r['headers']; cases = list(api[lang].values()) if slug is None else ([api[lang][slug]] if slug in api[lang] else [])
    check(r['status'] == 200 and h.get('content-type', '').startswith('text/markdown'), path, 'markdownResponse')
    check(h.get('content-language') == lang, path, 'contentLanguage', h.get('content-language')); check('rel="canonical"' in h.get('link', ''), path, 'canonicalLinkHeader')
    for item in cases:
        check(all(norm(s) in norm(text) for s in case_strings(item)), path, 'fullMarkdownCaseText', item['slug'])
    if slug in [None, 'about']:
        check(all(norm(s) in norm(text) for s in about_source(lang)[1]), path, 'compactAboutMarkdownSource')
    scan(path, text)
    audit['markdown'].append({'path': path, 'status': r['status'], 'contentType': h.get('content-type'), 'contentLanguage': h.get('content-language'), 'link': h.get('link'), 'characters': len(text), 'fullCaseRecordsCompared': len(cases)})
for path in ['/robots.txt', '/llms.txt', '/health']:
    r = request(path); text = r['body'].decode('utf-8'); check(r['status'] == 200, path, 'status', r['status']); scan(path, text)
    row = {'path': path, 'status': r['status'], 'contentType': r['headers'].get('content-type'), 'characters': len(text)}
    if path == '/robots.txt': row['body'] = text; check('Disallow: /' in text, path, 'previewRobotsDisallow')
    if path == '/llms.txt':
        for value in ['/portfolio', '/ru/portfolio', '/tt/portfolio', '/portfolio/content.md?lang=en', '/portfolio/content.md?lang=ru', '/portfolio/content.md?lang=tt', '/sitemap.xml', '/robots.txt', 'Immigrant 4 Immigrant']:
            check(value in text, path, 'discoveryDestination', value)
    audit['discovery'].append(row)
for old in previous['negativeCases']:
    path = old['path']; r = request(path); check(r['status'] == old['expectedStatus'], path, 'expectedStatus', {'expected': old['expectedStatus'], 'actual': r['status']})
    row = {'path': path, 'expectedStatus': old['expectedStatus'], 'status': r['status'], 'contentType': r['headers'].get('content-type')}
    if 'note' in old:
        row['note'] = old['note']; row['contentLanguage'] = r['headers'].get('content-language'); check(row['contentLanguage'] == 'en', path, 'defaultEnglish')
    audit['negativeCases'].append(row)
check(not scans, 'Public response copy', 'excludedCopyPatterns', scans)
audit['optionalHeaderObservations'] = {'classification': 'HTML Content-Language and discovery Link response headers are optional. Their absence is recorded accurately. A Next stylesheet preload Link is not discovery. Required language/discovery checks use main lang, head hreflang and text/markdown alternates. API and Markdown header checks remain required.',
                                      'observedMissingContentLanguage': sum(x['check'] == 'contentLanguage' for x in optional), 'observedMissingDiscoveryLinkHeader': sum(x['check'] == 'discoveryLinkHeader' for x in optional), 'details': optional}
audit['proxyNote'] = 'The user-owned src/proxy.ts adapter delegates to the preserved root framework proxy. The security result here is based on actual production responses, not on manifest contents or source assumptions.'
audit['warnings'] = ['Local preview intentionally has Disallow: / and noindex. Production deployment origin/indexing settings, external destinations and search inclusion are outside this audit.', 'Original academic PDF is excluded from text-pattern scans. Badge artwork availability does not independently verify issuer standing.', 'This is an HTTP/content audit; it does not certify browser interactions, screen readers, all viewports, legal compliance, analytics runtime behavior or a public HTTPS deployment.']
audit['summary'] = {'htmlExpected': 96, 'htmlChecked': len(audit['html']), 'html200': sum(r['status'] == 200 for r in audit['html']),
                    'htmlLanguages': {l: sum(r['language'] == l for r in audit['html']) for l in ['en', 'ru', 'tt']},
                    'apiLanguagesChecked': 3, 'apiItems': {l: len(api[l]) for l in api}, 'markdownResponsesChecked': len(audit['markdown']),
                    'negativeAndDefaultResponsesChecked': len(audit['negativeCases']), 'uniqueCspNonces': len(set(nonce_values)),
                    'strictProductionCSPPages': sum(r['strictProductionCSP'] for r in audit['html']), 'jsonLdPages': sum(bool(r['jsonLdBlocks']) for r in audit['html']),
                    'caseInitialHTMLCompared': sum(r['fullCaseTextPresent'] is not None for r in audit['html']),
                    'failureCount': len(failures), 'copyScanMatchGroups': len(scans),
                    'htmlHeadMarkdownAlternates': sum(any('lang=' + r['language'] in (h or '') for h in r['markdownAlternates']) for r in audit['html']),
                    'htmlHeadHreflang': sum(all(l in r['hreflang'] for l in ['en', 'ru', 'tt', 'x-default']) for r in audit['html']),
                    'htmlMainLanguage': sum(r['mainLang'] == r['language'] for r in audit['html']),
                    'previewNoindexPages': sum(any('noindex' in v for v in r['previewRobotsMeta']) for r in audit['html']),
                    'compactAboutLanguagesVerified': sum(r['allSourceTextPresent'] and r['allSourceIdsPresent'] for r in about),
                    'founderFooterLanguagesVerified': sum(r['expectedHeadingsPresent'] and r['badgeCount'] == 8 for r in founders),
                    'originalBadgeAssets200': sum(r['status'] == 200 and r['kind'] == 'originalAsset' for r in audit['badgeAssets']),
                    'renderedBadgeImages200': sum(r['status'] == 200 and r['kind'] == 'renderedOptimizedImage' for r in audit['badgeAssets']),
                    'optionalHtmlHeaderMissingObservations': len(optional)}
audit['finishedAt'] = now(); audit['durationSeconds'] = round(time.monotonic() - started, 2)
REPORT.write_text(json.dumps(audit, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(audit['summary'], ensure_ascii=False, indent=2), flush=True)
print('FAILURES ' + json.dumps(failures, ensure_ascii=False)[:12000], flush=True)
