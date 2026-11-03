/* Asisten Pesan — pemandu pemesanan otomatis (berbasis aturan, tanpa server/API; cocok untuk GitHub Pages).
   Menjawab jam buka, menu, alamat, pembayaran, dan mengirim pesanan lengkap ke WhatsApp. */
(() => {
const W = window.WK; if (!W) return;
const { SITE, MENU, rp, store, waLink, status } = W;
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const cats = [...new Set(MENU.map(m => m.cat))];
const o = { name: store.get('wk_name', ''), type: '', addr: '', pay: '', note: '' };
let step = null, started = false, queue = Promise.resolve(), isOpen = false;

const cartRows = () => W.getCart().map(c => ({ ...MENU.find(m => m.id === c.id), q: c.q })).filter(r => r.name);
const total = () => cartRows().reduce((a, r) => a + r.price * r.q, 0);
const count = () => cartRows().reduce((a, r) => a + r.q, 0);
const cap = s => s.replace(/\b\w/g, c => c.toUpperCase());
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------- UI ---------- */
const wa = '<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M20.5 3.5A11 11 0 0 0 3 17l-1.5 5.5L7.1 21A11 11 0 0 0 20.5 3.5zM12 20a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3A9 9 0 1 1 12 20zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.5-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1a7.3 7.3 0 0 1-3.6-3.1c-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5l-.9-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4.1c1.7.7 2.4.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z"/></svg>';
const root = document.createElement('div');
root.innerHTML = `
<button class="bot-fab" id="botFab" aria-label="Buka Asisten Pesan"><span class="ic">${wa}</span><span class="lbl">Asisten Pesan</span><i class="pulse"></i></button>
<div class="bot-tip" id="botTip">Butuh bantuan memesan? 👋<button aria-label="Tutup">✕</button></div>
<section class="bot" id="bot" role="dialog" aria-label="Asisten Pesan" aria-hidden="true">
  <header><img src="assets/images/logo.png" alt=""><div><b>Asisten Warkop</b><small><i></i> Online · tanya jam buka, menu, atau pesan</small></div>
  <a class="bot-ic" id="botWa" href="${waLink(W.HELLO)}" target="_blank" rel="noopener" title="Chat langsung di WhatsApp" aria-label="Chat langsung di WhatsApp">${wa}</a>
  <button class="bot-ic" id="botClose" aria-label="Tutup">✕</button></header>
  <div class="bot-body" id="botBody" aria-live="polite"></div>
  <div class="bot-chips" id="botChips"></div>
  <form class="bot-form" id="botForm"><input id="botInput" placeholder="Ketik pesan atau pilih di atas…" autocomplete="off" maxlength="300"><button aria-label="Kirim">➤</button></form>
  <p class="bot-foot">Asisten otomatis · pesanan dikirim ke WhatsApp ${esc(SITE.phone)}</p>
</section>`;
document.body.append(...root.children);
const body = $('#botBody'), chipsEl = $('#botChips'), input = $('#botInput');
const scroll = () => { body.scrollTop = body.scrollHeight };
const time = () => new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');

function bubble(html, who) {
  const d = document.createElement('div'); d.className = 'msg-b ' + (who === 'me' ? 'me' : 'them');
  d.innerHTML = `<div class="b">${html}<small>${time()}</small></div>`; body.append(d); scroll(); return d;
}
const user = t => { chipsEl.innerHTML = ''; bubble(esc(t), 'me') };
const bot = html => (queue = queue.then(async () => {
  const t = bubble('<span class="typing"><i></i><i></i><i></i></span>', 'bot');
  await sleep(Math.min(350 + html.length * 3, 1000)); t.remove(); bubble(html, 'bot');
}));
const chips = list => (queue = queue.then(() => {
  chipsEl.innerHTML = '';
  list.forEach(c => { const b = document.createElement('button'); b.type = 'button'; b.className = 'bchip ' + (c.c || ''); b.innerHTML = c.t; b.onclick = c.f; chipsEl.append(b) });
  chipsEl.scrollTop = 0; scroll();
}));
const lines = () => cartRows().map((r, i) => `${i + 1}. ${esc(r.name)} × ${r.q} — ${rp(r.price * r.q)}`).join('<br>');

/* ---------- alur ---------- */
const mainChips = () => chips([
  { t: '🛒 Pesan sekarang', c: 'pri', f: () => { user('Pesan sekarang'); startOrder() } },
  { t: '📋 Lihat menu', f: () => { user('Lihat menu'); askItems(true) } },
  { t: '🕘 Jam buka', f: () => { user('Jam buka'); info('jam') } },
  { t: '📍 Alamat', f: () => { user('Alamat'); info('lokasi') } },
  { t: '💳 Cara bayar', f: () => { user('Cara bayar'); info('bayar') } },
  { t: '💬 Chat WhatsApp', f: () => window.open(waLink(W.HELLO), '_blank', 'noopener') }
]);
const statusLine = () => { const s = status(); return `${s.open ? '🟢' : '🔴'} <b>${s.label}</b> · ${esc(s.text)}` };
function greet() {
  bot(`Halo${o.name ? ', <b>' + esc(o.name) + '</b>' : ''}! 👋 Saya <b>Asisten Warkop Munigaka</b>. Saya bantu memilih menu, mencatat pesanan, dan menjawab pertanyaan Anda.<br>${statusLine()}<br>Mau apa hari ini?`);
  mainChips();
}
function startOrder() {
  step = null;
  if (!status().open) bot(`🔴 Warkop sedang <b>tutup</b>. Pesanan tetap bisa dicatat, dan diproses saat kami buka pukul <b>10.00 WIT</b>.`);
  if (o.name) {
    bot(`Pesanan atas nama <b>${esc(o.name)}</b>, ya?`);
    chips([{ t: 'Ya, lanjut', c: 'pri', f: () => { user('Ya, lanjut'); askItems() } }, { t: 'Ganti nama', f: () => { user('Ganti nama'); askName() } }]);
  } else askName();
}
function askName() { step = 'name'; chips([]); bot('Boleh tahu <b>nama Anda</b>?'); setTimeout(() => input.focus(), 400) }
function askItems(browse) {
  step = null; const n = count();
  bot(n ? `Keranjang Anda berisi <b>${n} item</b> (${rp(total())}). Tambah lagi atau lanjut?`
        : `Silakan pilih kategori menu${browse ? '' : ', atau ketik langsung, mis. <i>“kopi susu gula aren 2”</i>'}.`);
  const l = cats.map(c => ({ t: c, f: () => showCat(c) }));
  if (n) l.push({ t: '🧺 Lihat keranjang', f: showCart }, { t: 'Lanjut ➜', c: 'pri', f: () => { user('Lanjut'); askType() } });
  chips(l);
}
function showCat(c) {
  user(c); bot(`Menu <b>${c}</b> — ketuk untuk menambahkan:`);
  const l = MENU.filter(m => m.cat === c).map(m => ({ t: `${esc(m.name)} · ${rp(m.price)}`, f: () => addItem(m, 1, c) }));
  l.push({ t: '← Kategori lain', f: () => { user('Kategori lain'); askItems() } });
  if (count()) l.push({ t: 'Lanjut ➜', c: 'pri', f: () => { user('Lanjut'); askType() } });
  chips(l);
}
function addItem(m, q, cat) {
  user(`+ ${q}× ${m.name}`); W.addCart(m.id, q, true);
  bot(`✓ <b>${q}× ${esc(m.name)}</b> ditambahkan. Total sementara <b>${rp(total())}</b>.`);
  const l = [];
  if (cat) l.push({ t: `Tambah lagi (${cat})`, f: () => showCat(cat) });
  l.push({ t: 'Kategori lain', f: () => { user('Kategori lain'); askItems() } }, { t: '🧺 Lihat keranjang', f: showCart }, { t: 'Lanjut ➜', c: 'pri', f: () => { user('Lanjut'); askType() } });
  chips(l);
}
function showCart() {
  user('Lihat keranjang');
  if (!count()) { bot('Keranjang masih kosong ☕'); return askItems() }
  bot(`<b>Keranjang Anda</b><br>${lines()}<br><b>Total: ${rp(total())}</b>`);
  chips([{ t: '＋ Tambah menu', f: () => { user('Tambah menu'); askItems() } }, { t: '🗑 Kosongkan', f: () => { user('Kosongkan'); W.setCart([]); bot('Keranjang dikosongkan.'); askItems() } }, { t: 'Lanjut ➜', c: 'pri', f: () => { user('Lanjut'); askType() } }]);
}
function askType() {
  if (!count()) { bot('Keranjang masih kosong, pilih menu dulu ya.'); return askItems() }
  bot('Pesanan <b>diambil sendiri</b> di warkop atau <b>diantar</b>?');
  chips([{ t: '🏪 Ambil di warkop', f: () => { user('Ambil di warkop'); o.type = 'Ambil di warkop'; o.addr = ''; askPay() } },
         { t: '🛵 Antar ke alamat', f: () => { user('Antar ke alamat'); o.type = 'Antar ke alamat'; step = 'addr'; chips([]); bot('Tuliskan <b>alamat lengkap</b> pengantaran (jalan, nomor rumah, patokan).'); setTimeout(() => input.focus(), 400) } }]);
}
function askPay() {
  step = null; bot('Pilih <b>cara pembayaran</b>:');
  chips([
    { t: '📱 Barcode QRIS', f: () => { user('Barcode QRIS'); o.pay = 'Barcode QRIS'; bot('Barcode QRIS akan dikirim admin lewat WhatsApp setelah pesanan diterima.'); askNote() } },
    { t: '🏦 Transfer BRI', f: () => { user('Transfer BRI'); o.pay = `Transfer BRI ${SITE.rek} a.n. ${SITE.an}`; bot(`Transfer ke <b>BRI ${SITE.rek}</b> a.n. <b>${esc(SITE.an)}</b>. Kirim bukti transfer lewat WhatsApp.`); askNote() } },
    { t: '💵 Bayar di tempat (COD)', f: () => { user('Bayar di tempat (COD)'); o.pay = 'Bayar di tempat (COD)'; askNote() } }
  ]);
}
function askNote() { step = 'note'; bot('Ada <b>catatan</b>? (mis. kurang manis, tanpa gula, jam ambil). Ketik catatan atau pilih Lewati.'); chips([{ t: 'Lewati', f: () => { user('Lewati'); o.note = ''; summary() } }]) }
function orderText() {
  const r = cartRows(), L = [`Halo ${SITE.name}, saya ${o.name || 'pelanggan'}.`, 'Saya ingin memesan:'];
  r.forEach((x, i) => L.push(`${i + 1}. ${x.name} x${x.q} = ${rp(x.price * x.q)}`));
  L.push(`Total: ${rp(total())}`, `Pengambilan: ${o.type || '-'}`);
  if (o.addr) L.push(`Alamat: ${o.addr}`);
  L.push(`Pembayaran: ${o.pay || '-'}`);
  if (o.note) L.push(`Catatan: ${o.note}`);
  L.push('', '(Dikirim lewat Asisten Pesan website)');
  return L.join('\n');
}
function summary() {
  step = null;
  bot(`Pesanan sudah lengkap! Periksa ringkasannya 👇<div class="sum"><b>Atas nama ${esc(o.name)}</b><div class="ln">${lines()}</div>
    <div class="tot"><span>Total</span><b>${rp(total())}</b></div>
    <p>🚚 ${esc(o.type)}${o.addr ? '<br>📍 ' + esc(o.addr) : ''}<br>💳 ${esc(o.pay)}${o.note ? '<br>📝 ' + esc(o.note) : ''}</p></div>`);
  chips([
    { t: '📲 Kirim ke WhatsApp', c: 'wa', f: sendWA },
    { t: '✉️ Kirim via Email', f: sendMail },
    { t: '✏️ Ubah menu', f: () => { user('Ubah menu'); askItems() } },
    { t: '🔄 Mulai ulang', f: () => { user('Mulai ulang'); W.setCart([]); o.type = o.addr = o.pay = o.note = ''; startOrder() } }
  ]);
}
function sendWA() {
  const url = waLink(orderText()); window.open(url, '_blank', 'noopener'); user('Kirim ke WhatsApp');
  bot(`Terima kasih, <b>${esc(o.name)}</b>! 🙏 WhatsApp sudah terbuka dengan pesanan lengkap Anda. Tekan <b>Kirim</b> di WhatsApp, admin kami akan segera membalas. Tidak terbuka? <a href="${url}" target="_blank" rel="noopener">Klik di sini</a>.`);
  W.setCart([]); o.type = o.addr = o.pay = o.note = ''; mainChips();
}
function sendMail() {
  user('Kirim via Email');
  location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Pesanan dari ' + o.name)}&body=${encodeURIComponent(orderText())}`;
  bot(`Aplikasi email dibuka dengan pesanan Anda untuk <b>${esc(SITE.email)}</b>. Untuk respon tercepat, kirim juga lewat WhatsApp.`);
}

/* ---------- tanya jawab ---------- */
function info(k) {
  const t = {
    jam: `🕘 <b>${esc(SITE.hours)}</b><br>${statusLine()}<br>📍 ${esc(SITE.addr)}<br><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Jln. Home-Home Wamena')}" target="_blank" rel="noopener">Buka di Google Maps</a>`,
    lokasi: `📍 <b>${esc(SITE.addr)}</b><br>🕘 ${esc(SITE.hours)}<br><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Jln. Home-Home Wamena')}" target="_blank" rel="noopener">Buka di Google Maps</a>`,
    bayar: `Kami menerima:<br>📱 <b>Barcode QRIS</b> (BRImo, DANA, e-wallet lain)<br>🏦 <b>Transfer BRI</b> ${SITE.rek} a.n. ${esc(SITE.an)}<br>💵 <b>Bayar di tempat (COD)</b>`,
    kontak: `📞 <a href="tel:+${SITE.wa}">${esc(SITE.phone)}</a> (WhatsApp)<br>✉️ <a href="mailto:${SITE.email}">${esc(SITE.email)}</a>`
  }[k];
  bot(t); mainChips();
}
const NUM = { satu: 1, dua: 2, tiga: 3, empat: 4, lima: 5, enam: 6, tujuh: 7, delapan: 8, sembilan: 9, sepuluh: 10 };
const GEN = ['kopi', 'goreng', 'susu'];
function qtyOf(t) { const m = t.match(/\b(\d{1,2})\b/); if (m) return Math.min(+m[1] || 1, 20); for (const k in NUM) if (new RegExp('\\b' + k + '\\b').test(t)) return NUM[k]; return 1 }
function matchItems(t) {
  return MENU.map(m => { const ws = m.name.toLowerCase().split(/\s+/).filter(w => w.length > 2), hit = ws.filter(w => t.includes(w)), spec = hit.filter(w => !GEN.includes(w));
    return { m, ok: spec.length >= 1 || hit.length >= 2, score: hit.length * 10 - (ws.length - hit.length) } })
    .filter(x => x.ok).sort((a, b) => b.score - a.score).slice(0, 3).map(x => x.m);
}
function fwd(text) { window.open(waLink(`Halo ${SITE.name}, saya ${o.name || 'pelanggan'}.\n${text}`), '_blank', 'noopener') }
function reply(text) {
  const t = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const words = t.trim().split(/\s+/).length, found = matchItems(t);
  if (found.length) {
    const q = qtyOf(t);
    bot(`Menu yang cocok:<br>${found.map(m => `• <b>${esc(m.name)}</b> — ${rp(m.price)}<br><small>${esc(m.desc)}</small>`).join('<br>')}`);
    const l = found.map(m => ({ t: `＋ ${q}× ${esc(m.name)}`, c: 'pri', f: () => addItem(m, q) }));
    if (count()) l.push({ t: 'Lanjut ➜', f: () => { user('Lanjut'); askType() } });
    return chips(l);
  }
  if (/terima kasih|makasih|thanks|trims/.test(t)) { bot('Sama-sama! 😊 Kami tunggu di warkop.'); return mainChips() }
  if (/^(halo|hai|hi|hello|selamat|assalam|permisi|p)\b/.test(t)) return greet();
  if (/jam|buka|tutup|sampai|malam/.test(t)) return info('jam');
  if (/alamat|lokasi|dimana|di mana|maps|tempat/.test(t)) return info('lokasi');
  if (/bayar|pembayaran|qris|transfer|cod|rekening|rek\b/.test(t)) return info('bayar');
  if (/kontak|email|telepon|telpon|hubungi|nomor|\bwa\b|whatsapp/.test(t)) return info('kontak');
  if (/rekomendasi|favorit|terlaris|enak|saran/.test(t)) {
    const f = MENU.filter(m => m.fav); bot('Favorit pelanggan kami:<br>' + f.map(m => `• <b>${esc(m.name)}</b> — ${rp(m.price)}`).join('<br>'));
    return chips(f.map(m => ({ t: `＋ ${esc(m.name)}`, c: 'pri', f: () => addItem(m, 1) })));
  }
  if (/menu|daftar|harga|apa saja|ada apa|list/.test(t)) return askItems(true);
  if (/keranjang|pesanan saya/.test(t)) return showCart();
  if (/pesan|order|beli|mau|minta/.test(t) && words <= 4) return startOrder();
  bot('Maaf, saya belum paham maksudnya 😅. Saya bisa bantu <b>pesan</b>, cek <b>menu</b>, <b>jam buka</b> (10.00–22.00 WIT), <b>alamat</b>, dan <b>pembayaran</b>. Atau teruskan pesan Anda langsung ke admin lewat WhatsApp.');
  chips([{ t: '📲 Teruskan pesan ke WhatsApp', c: 'wa', f: () => { fwd(text); bot('Pesan Anda diteruskan ke WhatsApp admin ✅') } }, { t: '🛒 Pesan sekarang', c: 'pri', f: () => { user('Pesan sekarang'); startOrder() } }, { t: '📋 Lihat menu', f: () => { user('Lihat menu'); askItems(true) } }]);
}

function onText(text) {
  text = text.trim(); if (!text) return; user(text);
  if (step === 'name') { o.name = cap(text.slice(0, 40)); store.set('wk_name', o.name); step = null; bot(`Senang berkenalan, <b>${esc(o.name)}</b>! 😊`); return askItems() }
  if (step === 'addr') { o.addr = text.slice(0, 200); step = null; return askPay() }
  if (step === 'note') { o.note = text.slice(0, 200); return summary() }
  reply(text);
}

/* ---------- buka / tutup ---------- */
function open(mode) {
  isOpen = true; $('#bot').classList.add('on'); $('#bot').setAttribute('aria-hidden', 'false'); document.body.classList.add('bot-open'); $('#botTip').classList.remove('on');
  if (!started) { started = true; if (mode === 'order') { bot(`Halo! 👋 Saya <b>Asisten Warkop</b>. Saya bantu selesaikan pesanan Anda.`); startOrder() } else greet() }
  else if (mode === 'order') { user('Lanjutkan pesanan'); startOrder() }
  setTimeout(scroll, 50);
}
function close() { isOpen = false; $('#bot').classList.remove('on'); $('#bot').setAttribute('aria-hidden', 'true'); document.body.classList.remove('bot-open') }
$('#botFab').onclick = () => open(); $('#botClose').onclick = close;
$('#botForm').onsubmit = e => { e.preventDefault(); const v = input.value; input.value = ''; onText(v) };
document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen) close() });
$('#botTip button').onclick = () => { $('#botTip').classList.remove('on'); try { sessionStorage.setItem('wk_tip', '1') } catch {} };
try { if (!sessionStorage.getItem('wk_tip')) setTimeout(() => { if (!isOpen && !document.body.classList.contains('hm-open')) $('#botTip').classList.add('on') }, 6000) } catch {}
window.Bot = { open, close };
})();
