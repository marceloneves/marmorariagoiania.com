/*
 * Otimização de Core Web Vitals — marmorariagoiania.com
 *
 * Para cada página:
 *   1. remove scripts mortos (LiteSpeed/WordPress/Cloudflare/AdSense/Firebase Push)
 *   2. junta os blocos de CSS da página num só, remove o CSS não usado (PurgeCSS),
 *      minifica (clean-css) e injeta inline — sem requisição bloqueante de renderização
 *   3. troca as fontes de ícone pelos subsets (só os glifos realmente usados)
 *   4. limpa preconnects inúteis, arruma canonical/hreflang, título do iframe
 *   5. pré-carrega a imagem LCP
 */
const fs = require('fs'), path = require('path'), cp = require('child_process');
const { PurgeCSS } = require('C:/Users/Gustavo/AppData/Local/Temp/node_modules/purgecss');
const CleanCSS = require('C:/Users/Gustavo/AppData/Local/Temp/node_modules/clean-css');
const subsetFont = require('C:/Users/Gustavo/AppData/Local/Temp/node_modules/subset-font');

const R = 'C:/Users/Gustavo/marmorariagoiania.com-main/marmorariagoiania.com-main';
const FONTS = R + '/wp-content/themes/leadv/assets/fonts/';
const JS = [R + '/wp-content/themes/leadv/assets/js/jquery.min.js', R + '/wp-content/litespeed/js/17feb22c9fa36e52edcb2567a2026052.js']
  .map(f => ({ raw: fs.readFileSync(f, 'utf8'), extension: 'js' }));

const SAFELIST = {
  standard: [/^owl-/, /^lg-/, /^swiper/, /^animate/, /^wow$/, /^show$/, /^showing$/, /^hiding$/, /^collaps/, /^fade$/, /^active$/, /^disabled$/, /^modal/, /^offcanvas/, /^dropdown/, /^tooltip/, /^popover/, /^carousel/, /^nav-/, /^tab-/, /^loaded$/, /^entered$/, /^lazyload/, /^is-/, /^has-/, /^menu-/, /^sticky/, /^scroll/, /^open$/, /^closed$/, /^toggl/, /^backdrop/, /^bs-/, /^was-validated/, /^invalid/, /^valid/, /^spinner/, /^visually-hidden/, /^d-none$/, /^body$/, /^html$/],
  deep: [/^owl-/, /^lg-/, /^modal/, /^offcanvas/, /^dropdown/, /^collaps/, /^carousel/],
  greedy: [/^owl-/, /^lg-/],
};

function cutTag(h, marker, label, st) {
  const open = /<script\b/g; let m;
  while ((m = open.exec(h))) {
    const end = h.indexOf('</script>', m.index);
    if (end < 0) break;
    if (h.slice(m.index, end + 9).includes(marker)) { st[label] = (st[label] || 0) + 1; return h.slice(0, m.index) + h.slice(end + 9); }
  }
  return h;
}
const cutAll = (h, marker, label, st) => { let p; do { p = h; h = cutTag(h, marker, label, st); } while (h !== p); return h; };

(async () => {
  const files = cp.execSync('find "' + R + '" -name "*.html"', { encoding: 'utf8' }).trim().split('\n');
  const pass1 = [];      // { file, html, css }
  const codepoints = new Set();

  for (const f of files) {
    let h = fs.readFileSync(f, 'utf8');
    const before = h.length, st = {};
    const rel = path.relative(R, f).split(path.sep).join('/');
    const depth = rel.split('/').length - 1;
    const P = '../'.repeat(depth);

    // 1 — scripts mortos
    h = cutAll(h, 'litespeed_docref=sessionStorage', 'docref', st);
    h = cutAll(h, 'class SuperLazyLoads', 'superlazy', st);
    h = cutAll(h, 'guest.vary.php', 'guestvary', st);
    h = cutAll(h, 'static.cloudflareinsights.com', 'cfbeacon', st);
    h = cutAll(h, 'pagead2.googlesyndication.com', 'adsense', st);
    h = cutAll(h, 'firebase-app-compat.js', 'firebase', st);
    h = cutAll(h, 'firebase-messaging-compat.js', 'firebase', st);
    h = cutAll(h, 'AI_WEB_PUSH_PID', 'webpushcfg', st);

    // 2 — speculation rules com o type correto
    h = h.replace(/<script\s+type="litespeed\/javascript">(\{"prefetch")/, (m, a) => { st.speculation = 1; return '<script type="speculationrules">' + a; });

    // 3 — carregador de JS adiado: fallback em load + 4s (papel do SuperLazyLoads)
    const uiEv = 'litespeed_ui_events.forEach(e=>{window.addEventListener(e,litespeed_load_delayed_js_force,{passive:!0})});';
    if (h.includes(uiEv)) { h = h.replace(uiEv, uiEv + 'window.addEventListener("load",function(){setTimeout(litespeed_load_delayed_js_force,4e3)});'); st.jsfallback = 1; }

    // 4 — preconnect/dns-prefetch não utilizados
    h = h.replace(/<link rel="preconnect" href="(?:(?:\.\.\/)*index\.html|https:\/\/(?:stats\.g\.doubleclick\.net|www\.google\.com|www\.google\.com\.br|www\.google-analytics\.com))">/g, () => { st.preconnect = (st.preconnect || 0) + 1; return ''; });
    h = h.replace(/<link rel='dns-prefetch' href='https:\/\/www\.gstatic\.com' >/, '');
    h = h.replace(/<link rel="preload" href="[^"]*(?:fontawesome-webfont|Flaticon|boxicons)\.woff2" as="font">/g, () => { st.fontpreload = (st.fontpreload || 0) + 1; return ''; });

    // 5 — junta todo o CSS da página
    let css = '';
    for (const id of ['wp-img-auto-sizes-contain-inline-css', 'classic-theme-styles-inline-css', 'global-styles-inline-css', 'ads_box_estilo-personalizado-inline-css']) {
      const re = new RegExp('<style id="' + id + '"[^>]*>([\\s\\S]*?)</style>');
      const m = h.match(re);
      if (m) { if (id !== 'ads_box_estilo-personalizado-inline-css') css += m[1] + '\n'; h = h.replace(re, ''); st.cssblock = (st.cssblock || 0) + 1; }
    }
    // folha externa do LiteSpeed: 100% CSS morto do plugin de anúncios
    h = h.replace(/<link data-optimized="2" rel="stylesheet" href="[^"]*litespeed\/css\/[^"]*">/, () => { st.cssfile = 1; return ''; });

    const bigRe = /<style>([\s\S]{100000,}?)<\/style>/;
    const big = h.match(bigRe);
    if (!big) throw new Error('bloco <style> principal não encontrado em ' + rel);
    css += big[1];
    css = css.split('https://marmorariagoiania.com/').join(P);

    // 6 — purga o CSS com o HTML desta página (mais o JS do tema)
    const content = [{ raw: h.replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[^>]*type="application\/ld\+json"[\s\S]*?<\/script>/g, ''), extension: 'html' }, ...JS];
    const res = await new PurgeCSS().purge({ content, css: [{ raw: css }], fontFace: false, keyframes: true, variables: false, safelist: SAFELIST });
    let out = res[0].css;
    (out.match(/content:\s*"\\([0-9a-fA-F]{2,6})"/g) || []).forEach(c => codepoints.add(c.match(/\\([0-9a-fA-F]+)/)[1].toLowerCase()));

    // 7 — LCP: torna a imagem de fundo do banner detectável no HTML
    const bg = h.match(/class="main-banner-area\s+bg-(\w+)"/);
    if (bg) {
      const u = out.match(new RegExp('\\.bg-' + bg[1] + '\\s*\\{[^}]*url\\(([^)]+)\\)'));
      if (u) {
        const img = u[1].replace(/^['"]|['"]$/g, '');
        h = h.replace('<meta charset="UTF-8">', '<meta charset="UTF-8"><link rel="preload" as="image" href="' + img + '" fetchpriority="high">');
        st.lcppreload = 1;
      }
    }

    // 8 — SEO: canonical e hreflang absolutos
    const og = h.match(/<meta property="og:url" content="([^"]+)"/);
    const canon = og ? og[1] : 'https://marmorariagoiania.com/' + (depth ? rel.replace(/index\.html$/, '') : '');
    h = h.replace(/<link rel="canonical" href="[^"]*"\s*>/, '<link rel="canonical" href="' + canon + '">');
    h = h.replace(/<link rel="alternate" href="[^"]*" hreflang="([^"]+)">/g, '<link rel="alternate" href="' + canon + '" hreflang="$1">');

    // 9 — acessibilidade: iframe precisa de title
    h = h.replace(/<iframe(?![^>]*\stitle=)/g, () => { st.iframetitle = (st.iframetitle || 0) + 1; return '<iframe title="Mapa de localização da Marmoraria Goiânia no Google Maps"'; });

    pass1.push({ f, rel, h, css: out, before, P, st });
  }

  // ---- subset das fontes de ícone, com a união dos glifos usados no site ----
  const used = [...codepoints].sort();
  const chars = used.map(c => String.fromCodePoint(parseInt(c, 16))).join('');
  const subsets = {};
  for (const name of ['fontawesome-webfont', 'Flaticon']) {
    const buf = fs.readFileSync(FONTS + name + '.woff2');
    const out = await subsetFont(buf, chars, { targetFormat: 'woff2' });
    fs.writeFileSync(FONTS + name + '-subset.woff2', out);
    subsets[name] = { from: buf.length, to: out.length };
  }
  console.log('glifos usados:', used.join(' '));
  console.log('subsets:', JSON.stringify(subsets));

  // ---- grava as páginas ----
  let totalBefore = 0, totalAfter = 0, problems = [];
  for (const p of pass1) {
    let css = p.css;
    const face = (family, file) => "@font-face{font-family:'" + family + "';src:url(" + p.P + "wp-content/themes/leadv/assets/fonts/" + file + "-subset.woff2) format('woff2');font-weight:normal;font-style:normal;font-display:swap}";
    let n = 0, m = 0;
    css = css.replace(/@font-face\s*\{[^}]*fontawesome-webfont[^}]*\}/g, () => (++n === 1 ? face('FontAwesome', 'fontawesome-webfont') : ''));
    css = css.replace(/@font-face\s*\{[^}]*Flaticon[^}]*\}/g, () => (++m === 1 ? face('Flaticon', 'Flaticon') : ''));
    css = css.replace(/@font-face\s*\{[^}]*boxicons[^}]*\}/g, '');   // boxicons não é usado em nenhuma página
    const min = new CleanCSS({ level: 2 }).minify(css);
    if (min.errors.length) problems.push(p.rel + ': ' + min.errors[0]);
    let h = p.h.replace(/<style>[\s\S]{100000,}?<\/style>/, '<style>' + min.styles + '</style>');
    fs.writeFileSync(p.f, h);
    totalBefore += p.before; totalAfter += h.length;
    if (!n) problems.push(p.rel + ': @font-face FontAwesome não encontrado');
  }
  console.log('páginas:', pass1.length, '| HTML total', (totalBefore / 1048576).toFixed(2) + ' MB ->', (totalAfter / 1048576).toFixed(2) + ' MB');
  if (problems.length) { console.log('PROBLEMAS:'); problems.forEach(x => console.log(' -', x)); }
})();
