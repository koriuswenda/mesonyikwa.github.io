(() => {
const SITE = {
  name: 'SI-WARKOP-MUNIGAKA-SHOP', addr: 'Jln. Home-Home Wamena, Papua Pegunungan',
  phone: '+62 822-9260-5436', wa: '6282292605436', email: 'yikwamaesonalianus@gmail.com', hours: 'Setiap hari, 10.00 - 22.00 WIT',
  social:{facebook:'https://www.facebook.com/',instagram:'https://www.instagram.com/munigakawarkop26/',linkedin:'https://www.linkedin.com/',youtube:'https://www.youtube.com/'},
  bank: 'BRI', rek: '788501004229536', an: 'Meson'
};
const IMG = 'assets/images/';
const waLink = t => 'https://wa.me/'+SITE.wa+(t?'?text='+encodeURIComponent(t):'');
const HELLO = 'Halo SI-WARKOP-MUNIGAKA-SHOP, saya ingin bertanya / memesan.';
const MENU = [
  ['kopi-hitam-tubruk','Kopi Hitam Tubruk','Kopi','Kopi bubuk diseduh langsung, pekat dan harum.',8000,1],
  ['kopi-susu-gula-aren','Kopi Susu Gula Aren','Kopi','Perpaduan espresso, susu segar, dan gula aren.',18000,1],
  ['es-kopi-susu','Es Kopi Susu','Kopi','Segar dan manis, favorit anak muda.',16000,1],
  ['kopi-papua-pegunungan','Kopi Papua Pegunungan','Kopi','Biji kopi dataran tinggi Papua, aroma kuat dan rasa bersih.',22000,1],
  ['cappuccino','Cappuccino','Kopi','Espresso dengan busa susu lembut.',20000,0],
  ['teh-tarik','Teh Tarik','Non-Kopi','Teh susu ditarik hingga berbusa.',12000,0],
  ['cokelat-panas','Cokelat Panas','Non-Kopi','Cokelat pekat hangat, cocok saat dingin pegunungan.',15000,0],
  ['jus-jeruk-wamena','Jus Jeruk Wamena','Non-Kopi','Jeruk segar diperas langsung.',14000,0],
  ['pisang-goreng-keju','Pisang Goreng Keju','Makanan Ringan','Pisang goreng renyah dengan keju dan susu kental.',14000,1],
  ['roti-bakar-cokelat','Roti Bakar Cokelat','Makanan Ringan','Roti bakar tebal dengan selai cokelat.',13000,0],
  ['singkong-goreng','Singkong Goreng','Makanan Ringan','Singkong goreng gurih dengan sambal.',10000,0],
  ['nasi-goreng-kampung','Nasi Goreng Kampung','Makanan Berat','Nasi goreng bumbu kampung dengan telur.',25000,0],
  ['mie-rebus-telur','Mie Rebus Telur','Makanan Berat','Mie rebus kuah hangat dengan telur.',18000,0]
].map(([id,name,cat,desc,price,fav]) => ({id,name,cat,desc,price,fav:!!fav,img:`${IMG}produk/menu-kopi/${id}.jpg`}));
const GAL = [
  ...[['warkop-tampak-depan','Warkop Munigaka tampak depan'],['interior-warkop','Interior Warkop Munigaka'],['spanduk-warkop','Spanduk Warkop Munigaka'],['meja-malam-warkop','Meja warkop di malam hari']]
    .map(([f,title]) => ({title,img:`${IMG}foto/warkop/${f}.jpg`,grp:'Warkop Kami'})),
  ...['kedai-kopi-minimalis','ruang-warkop','sudut-kopi-warkop','bar-kayu-warkop','rak-dan-mesin-kopi','pengolahan-kopi-papua','petani-kopi-papua','latte-art','tuang-susu','barista-warkop','seni-latte','espresso-pilihan']
    .map(f => ({title:f.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase()),img:`${IMG}foto/galeri/${f}.jpg`,grp:'Kopi & Suasana'}))
];

const ICON = {
  facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>',
  instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>',
  linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4V21H3zM10 9.75h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.75 2.63 4.75 6.05V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.95 1.32-1.95 2.69V21h-4z"/></svg>',
  youtube:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.8 15.4V8.6L15.7 12z"/></svg>',
  whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M20.5 3.5A11 11 0 0 0 3 17l-1.5 5.5L7.1 21A11 11 0 0 0 20.5 3.5zM12 20a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3A9 9 0 1 1 12 20zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.5-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1a7.3 7.3 0 0 1-3.6-3.1c-.3-.5.3-.5.8-1.5.1-.2 0-.3 0-.5l-.9-2c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4.1c1.7.7 2.4.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3z"/></svg>'
};
const socials = () => [['facebook','Facebook',SITE.social.facebook],['instagram','Instagram',SITE.social.instagram],['linkedin','LinkedIn',SITE.social.linkedin],['youtube','YouTube',SITE.social.youtube],['whatsapp','WhatsApp',waLink(HELLO)]]
  .map(([k,n,u])=>`<a href="${u}" target="_blank" rel="noopener" data-net="${k}" aria-label="${n}" title="${n}">${ICON[k]}</a>`).join('');
const $ = (s,r=document) => r.querySelector(s), $$ = (s,r=document) => [...r.querySelectorAll(s)];
const rp = n => 'Rp ' + n.toLocaleString('id-ID');
const store = {
  get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},
  set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))
};
const page = document.body.dataset.page;
const YT = [
  ['NnraDtibL1I','Exploring Wamena Coffee in Papua','Wamena • Kopi Papua','Menjelajahi kebun dan cerita kopi dari Wamena, Papua Pegunungan.'],
  ['TawL48faqXc','Sangrai Biji Kopi Arabika Papua Wamena Honey','Sangrai • Arabika Wamena','Proses menyangrai biji arabika Papua Wamena honey secara rumahan.'],
  ['KRPaNF6p2No','Explore Papua: Kebun Kopi','Kebun Kopi • Wamena','Menyusuri kebun kopi di tanah Papua.'],
  ['jETQ5PvVf_g','Festival Kopi Papua','Festival • Kopi Khas Cenderawasih','Beragam kopi khas Bumi Cenderawasih dipamerkan di festival kopi.'],
  ['OYvaDxgKwYA','Melihat Potensi Bisnis Kopi Papua','Bisnis • Kopi Papua','Peluang bisnis kopi Papua langsung dari pelakunya.'],
  ['L86HxMJDY54','Okmin TV: Kopi Okmemin dari Oksibil','Oksibil • Pegunungan Bintang','Kopi Okmemin, selera internasional dari tanah Papua.'],
  ['IAFlBAxDG-w','Papua Coffee: Buah Kopi Terbaik dari Pegunungan Papua','Dogiyai • Pegunungan Papua','Buah kopi terbaik dari pegunungan Papua, Kabupaten Dogiyai.']
];
const ytId = u => { const m = String(u).trim().match(/(?:youtu\.be\/|v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/) || String(u).trim().match(/^([\w-]{11})$/); return m ? m[1] : null };
const FILMS = [...store.get('wk_yt',[]), ...YT.map(([id,title,meta,desc])=>({id,title,meta,desc}))]
  .map(f => ({...f, img:`https://i.ytimg.com/vi/${f.id}/hqdefault.jpg`, url:`https://www.youtube.com/watch?v=${f.id}`}));
const embed = (id,mute) => `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1${mute?'&mute=1':''}" title="Video YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;

let cart = store.get('wk_cart',[]);

function toast(t){let e=$('.toast');if(!e){e=document.createElement('div');e.className='toast';document.body.append(e)}
  e.textContent=t;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),2200)}

/* ---------- jam buka (WIT = UTC+9, tidak bergantung zona waktu pengunjung) ---------- */
const HOURS = {open:10, close:22, days:['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']};
const f2 = n => String(n).padStart(2,'0');
const hh = h => f2(h)+'.00';
const witNow = () => { const n=new Date(); return new Date(n.getTime()+n.getTimezoneOffset()*60000+9*3600000) };
const dur = min => { const h=Math.floor(min/60), m=min%60; return h ? h+' jam'+(m?' '+m+' menit':'') : m+' menit' };
const greeting = h => h<11?'Selamat pagi':h<15?'Selamat siang':h<18?'Selamat sore':'Selamat malam';
function status(){
  const w=witNow(), m=w.getHours()*60+w.getMinutes(), o=HOURS.open*60, c=HOURS.close*60;
  const base={pct:(m+w.getSeconds()/60)/1440*100, day:w.getDay(), hour:w.getHours()};
  if(m>=o && m<c){ const left=c-m, soon=left<=60;
    return {...base, open:true, soon, label:soon?'Segera tutup':'Buka sekarang', text:`Tutup pukul ${hh(HOURS.close)} · ${dur(left)} lagi`, short:`Buka · tutup ${hh(HOURS.close)}`} }
  const until = m<o ? o-m : 1440-m+o;
  return {...base, open:false, soon:false, label:'Sedang tutup', text:`Buka ${m<o?'hari ini':'besok'} pukul ${hh(HOURS.open)} · ${dur(until)} lagi`, short:`Tutup · buka ${hh(HOURS.open)}`};
}
function hoursHTML(){
  const s=status(), pos=h=>(h/24*100).toFixed(2);
  const rows=[1,2,3,4,5,6,0].map(d=>`<li class="${d===s.day?'today':''}"><span>${HOURS.days[d]}${d===s.day?'<em>Hari ini</em>':''}</span><b>${hh(HOURS.open)} – ${hh(HOURS.close)}</b></li>`).join('');
  return `<div class="hc-top js-state"><div class="hc-time"><b>${hh(HOURS.open)} – ${hh(HOURS.close)}</b><span>WIT · setiap hari</span></div>
    <div class="hc-state"><span class="js-pill"></span><p class="js-text"></p></div></div>
  <div class="tl" role="img" aria-label="Warkop buka pukul ${hh(HOURS.open)} sampai ${hh(HOURS.close)}"><div class="tl-open" style="left:${pos(HOURS.open)}%;width:${pos(HOURS.close-HOURS.open)}%"></div><div class="tl-now js-now"></div>
    <span class="tl-l a" style="left:0">00.00</span><span class="tl-l" style="left:${pos(HOURS.open)}%">${hh(HOURS.open)}</span><span class="tl-l" style="left:${pos(HOURS.close)}%">${hh(HOURS.close)}</span></div>
  <p class="tl-key"><i class="k1"></i>Jam buka <i class="k2"></i>Sekarang</p>
  <ul class="wk">${rows}</ul>`;
}
const hoursModalHTML = () => `
<div class="hm" id="hoursModal" role="dialog" aria-modal="true" aria-labelledby="hmTitle" aria-hidden="true">
  <div class="hm-bg" data-hm-close></div>
  <div class="hm-card">
    <button class="hm-x" data-hm-close aria-label="Tutup">✕</button>
    <div class="hm-photo"><img src="${IMG}foto/warkop/warkop-tampak-depan.jpg" alt="Warkop Munigaka tampak depan"><div class="hm-cap on-dark"><span class="js-pill"></span><h2 id="hmTitle">Jam buka Warkop Munigaka</h2></div></div>
    <div class="hm-body">
      <p class="hm-greet"><span id="hmGreet"></span>! Kami buka setiap hari, ini jadwal lengkapnya.</p>
      <div id="hmHours">${hoursHTML()}</div>
      <p class="hm-addr">📍 ${SITE.addr}</p>
      <div class="hm-cta"><a class="btn btn-primary" href="menu.html">Lihat menu</a><a class="btn btn-ghost" href="${waLink(HELLO)}" target="_blank" rel="noopener">Pesan via WhatsApp</a><a class="btn btn-ghost" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Jln. Home-Home Wamena')}" target="_blank" rel="noopener">Petunjuk arah</a></div>
      <button class="hm-go" data-hm-close>Lanjut ke website</button>
    </div>
  </div>
</div>`;
function live(){
  const s=status(), k=s.open?(s.soon?'soon':'on'):'off';
  $$('.js-pill').forEach(e=>{ e.innerHTML=`<span class="st ${k}"><i></i>${s.short}</span>` });
  $$('.js-text').forEach(e=>{ e.textContent=s.text });
  $$('.js-now').forEach(e=>{ e.style.left=s.pct.toFixed(2)+'%' });
  $$('.js-state').forEach(e=>{ e.dataset.state=k });
}
let hmFrom=null;
function openHours(){
  const m=$('#hoursModal'); if(!m) return; hmFrom=document.activeElement;
  $('#hmGreet').textContent=greeting(status().hour); live();
  m.classList.add('on'); m.setAttribute('aria-hidden','false'); document.body.classList.add('hm-open');
  try{ sessionStorage.setItem('wk_hours','1') }catch{}
  setTimeout(()=>{ $('.hm-card',m).scrollTop=0; $('.hm-x',m).focus({preventScroll:true}) },60);
}
function closeHours(){
  const m=$('#hoursModal'); if(!m) return;
  m.classList.remove('on'); m.setAttribute('aria-hidden','true'); document.body.classList.remove('hm-open'); hmFrom?.focus?.();
}
function trapHours(e){
  if(e.key!=='Tab') return;
  const f=$$('a[href],button',$('#hoursModal .hm-card')).filter(x=>x.offsetParent!==null); if(!f.length) return;
  const a=f[0], z=f[f.length-1];
  if(e.shiftKey && document.activeElement===a){ e.preventDefault(); z.focus() }
  else if(!e.shiftKey && document.activeElement===z){ e.preventDefault(); a.focus() }
}

/* ---------- layout ---------- */
function layout(){
  const nav = [['index.html','Beranda','index'],['#','Tentang','tentang'],['menu.html','Menu Kopi','menu'],['galeri.html','Galeri','galeri'],['film.html','Film','film'],['kontak.html','Kontak','kontak']];
  const tentang = ['profile','visi'].includes(page);
  const li = nav.map(([h,t,k]) => k==='tentang'
    ? `<li class="has-dd"><button class="dd-btn ${tentang?'active':''}" aria-haspopup="true">Tentang ▾</button><div class="dd"><a href="profile.html">Profile</a><a href="visi-misi.html">Visi &amp; Misi</a></div></li>`
    : `<li><a href="${h}" class="${page===k?'active':''}">${t}</a></li>`).join('');
  $('#site-header').innerHTML = `
  <div class="topbar"><div class="wrap"><div><span>📅 <b id="d"></b></span><span>🕘 <b id="clock"></b> WIT</span><button class="top-hours" data-hours aria-label="Lihat jam buka lengkap"><span class="js-pill"></span><u>Jam buka</u></button></div>
  <div class="right"><span>📞 <a href="tel:+${SITE.wa}">${SITE.phone}</a></span><div class="social-links sm">${socials()}</div></div></div></div>
  <nav class="nav"><div class="wrap"><a class="brand" href="index.html"><img src="${IMG}logo.png" alt="Logo"><span>${SITE.name}</span></a>
  <ul class="menu" id="menu">${li}</ul>
  <div class="actions"><button class="icon-btn" id="themeBtn" aria-label="Tema">🌓</button><button class="icon-btn" id="cartBtn" aria-label="Keranjang">🛒<span class="badge" id="cartCount">0</span></button><a class="btn btn-primary btn-sm hide-sm" href="${waLink(HELLO)}" target="_blank" rel="noopener">Pesan via WhatsApp</a><button class="icon-btn burger" id="burger" aria-label="Menu">☰</button></div></div></nav>`;
  $('#site-footer').innerHTML = `
  <footer><div class="wrap"><div class="fgrid"><div><a class="brand" href="index.html"><img src="${IMG}logo.png" alt="Logo">${SITE.name}</a>
  <p class="tagline">Seduhan hangat, obrolan akrab, kopi yang jujur.</p><p style="font-size:13.5px;max-width:420px">Warkop Munigaka-Shop adalah warung kopi bernuansa budaya Papua yang menjadi tempat berkumpul, berbagi cerita, dan menikmati secangkir kopi yang diseduh dengan sepenuh hati.</p>
  <div class="social-links">${socials()}</div></div>
  <div><h4>MENU</h4><ul>${[['index','Beranda'],['profile','Profile'],['visi-misi','Visi & Misi'],['menu','Menu Kopi'],['galeri','Galeri'],['film','Film'],['kontak','Kontak']].map(([h,t])=>`<li><a href="${h}.html">${t}</a></li>`).join('')}</ul></div>
  <div><h4>Hubungi Kami</h4><ul><li>📍 ${SITE.addr}</li><li>📞 <a href="tel:+${SITE.wa}">${SITE.phone}</a></li><li>✉️ <a href="mailto:${SITE.email}">${SITE.email}</a></li><li>🕘 ${SITE.hours}</li></ul></div></div>
  <div class="fbot"><span>© ${new Date().getFullYear()} ${SITE.name}. Semua hak dilindungi.</span><a class="powered" href="#" aria-label="AgamuaCode"><img src="${IMG}logo-agamuacode.png" alt="Logo AgamuaCode"><span>Powered by : <b>AgamuaCode</b></span></a></div></div></footer>
  ${hoursModalHTML()}<div class="overlay" id="ov"></div>
  <aside class="drawer" id="drawer"><header><h3>Keranjang</h3><button class="icon-btn" id="closeCart">✕</button></header><div class="items" id="cartItems"></div>
  <footer><div class="total"><span>Total</span><span id="cartTotal">Rp 0</span></div>
  <button class="btn btn-primary" id="checkout" style="width:100%;justify-content:center">Lanjut Pesan via Asisten &amp; WhatsApp</button></footer></aside>
  <div class="modal" id="modal"><div class="overlay on" style="z-index:0" data-close></div><div class="box" style="z-index:1"><button class="x" data-close>✕</button><div id="modalBody"></div></div></div>`;
  const tick = () => { const n=witNow(); $('#d').textContent=n.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
    $('#clock').textContent=n.toLocaleTimeString('id-ID',{hour12:false}).replace(/\./g,':') };
  tick(); setInterval(tick,1000);
  $('#burger').onclick = () => $('#menu').classList.toggle('on');
  $('.dd-btn')?.addEventListener('click', e => e.currentTarget.parentElement.classList.toggle('open'));
  $('#themeBtn').onclick = () => { const t=document.documentElement.dataset.theme==='dark'?'light':'dark'; document.documentElement.dataset.theme=t; store.set('wk_theme',t) };
  $('#cartBtn').onclick = openCart; $('#closeCart').onclick = closeCart; $('#ov').onclick = closeCart;
  $$('[data-close]').forEach(e => e.onclick = closeModal);
  $$('[data-hm-close]').forEach(e => e.onclick = closeHours);
  $('#hoursModal').addEventListener('keydown',trapHours);
  $('#checkout').onclick = checkout;
}
document.documentElement.dataset.theme = store.get('wk_theme','light');

/* ---------- cart ---------- */
const openCart = () => { $('#drawer').classList.add('on'); $('#ov').classList.add('on') };
const closeCart = () => { $('#drawer').classList.remove('on'); $('#ov').classList.remove('on') };
function addCart(id,q=1,silent){ const it=cart.find(c=>c.id===id); it?it.q+=q:cart.push({id,q}); saveCart(); if(!silent) toast('✓ Ditambahkan ke keranjang') }
function saveCart(){ store.set('wk_cart',cart); renderCart() }
function renderCart(){
  const rows = cart.map(c => ({...MENU.find(m=>m.id===c.id),q:c.q}));
  $('#cartCount').textContent = cart.reduce((a,c)=>a+c.q,0);
  $('#cartItems').innerHTML = rows.length ? rows.map(r=>`<div class="ci"><img src="${r.img}" alt=""><div><b>${r.name}</b><br><small>${rp(r.price)}</small></div>
    <div class="qty"><button data-a="-" data-id="${r.id}">−</button><b>${r.q}</b><button data-a="+" data-id="${r.id}">+</button></div></div>`).join('') : '<p class="empty">Keranjang masih kosong ☕</p>';
  $('#cartTotal').textContent = rp(rows.reduce((a,r)=>a+r.price*r.q,0));
  $$('.qty button').forEach(b => b.onclick = () => { const it=cart.find(c=>c.id===b.dataset.id); it.q += b.dataset.a==='+'?1:-1; cart=cart.filter(c=>c.q>0); saveCart() });
}
function checkout(){
  if(!cart.length) return toast('Keranjang masih kosong');
  closeCart();
  if(window.Bot) return window.Bot.open('order');
  const rows = cart.map(c=>({...MENU.find(m=>m.id===c.id),q:c.q})), total=rows.reduce((a,r)=>a+r.price*r.q,0);
  window.open(waLink(`Halo ${SITE.name}, saya ingin memesan:\n${rows.map(r=>`- ${r.name} x${r.q} = ${rp(r.price*r.q)}`).join('\n')}\nTotal: ${rp(total)}`),'_blank');
}

/* ---------- renderers ---------- */
const menuCard = m => `<article class="card reveal"><div class="img"><img src="${m.img}" alt="${m.name}" loading="lazy"></div><div class="body"><div class="cat">${m.cat}</div><h3>${m.name}</h3><p>${m.desc}</p>
  <div class="price-row"><b>${rp(m.price)}</b><button class="btn btn-primary btn-sm" data-add="${m.id}">+ Keranjang</button></div></div></article>`;
function bindAdd(){ $$('[data-add]').forEach(b => b.onclick = () => addCart(b.dataset.add)) }
const cats = () => [...new Set(MENU.map(m=>m.cat))];
function chips(el, onPick){
  let cur = null;
  el.innerHTML = cats().map(c=>`<button class="chip" data-c="${c}">${c} (${MENU.filter(m=>m.cat===c).length})</button>`).join('');
  $$('.chip',el).forEach(ch => ch.onclick = () => { cur = cur===ch.dataset.c ? null : ch.dataset.c; $$('.chip',el).forEach(x=>x.classList.toggle('on',x.dataset.c===cur)); onPick(cur) });
}
function filmCard(f){ return `<article class="card film reveal" data-yt="${f.id}"><div class="img"><img src="${f.img}" alt="${f.title}" loading="lazy" onerror="this.onerror=null;this.src='${IMG}foto/video/film-pilihan-1.jpg'"></div><div class="body"><h3>${f.title}</h3><small>${f.meta}</small></div></article>` }
function bindFilm(onPlay){ $$('[data-yt]').forEach(c => c.onclick = () => { const f=FILMS.find(x=>x.id===c.dataset.yt); if(onPlay) return onPlay(f);
  $('#modalBody').innerHTML=`<div class="video">${embed(f.id)}</div><div class="in"><h3>${f.title}</h3><small>${f.meta}</small><p style="margin:8px 0;color:var(--muted)">${f.desc||''}</p><a class="btn btn-ghost btn-sm" href="${f.url}" target="_blank" rel="noopener">Buka di YouTube ↗</a></div>`; $('#modal').classList.add('on') }) }
let galList = GAL, gi = 0;
function galItem(g){ return `<figure class="reveal" data-gal="${g.img}"><img src="${g.img}" alt="${g.title}" loading="lazy"><figcaption>${g.title}</figcaption></figure>` }
function closeModal(){ $('#modal').classList.remove('on'); $('#modalBody').innerHTML='' }
function showGal(i){
  gi=(i+galList.length)%galList.length; const g=galList[gi];
  $('#modalBody').innerHTML=`<div class="lb"><img src="${g.img}" alt="${g.title}"><button class="lb-n prev" aria-label="Foto sebelumnya">‹</button><button class="lb-n next" aria-label="Foto berikutnya">›</button></div><div class="in"><h3>${g.title}</h3><small>${gi+1} dari ${galList.length} foto</small></div>`;
  $('#modal').classList.add('on'); $('.lb-n.prev').onclick=()=>showGal(gi-1); $('.lb-n.next').onclick=()=>showGal(gi+1);
}
function bindGal(list){ if(list) galList=list; $$('[data-gal]').forEach(c => c.onclick = () => showGal(Math.max(0,galList.findIndex(x=>x.img===c.dataset.gal)))) }
document.addEventListener('keydown', e => { if(!$('#modal.on .lb')) return; if(e.key==='ArrowLeft') showGal(gi-1); else if(e.key==='ArrowRight') showGal(gi+1); else if(e.key==='Escape') closeModal() });
let tx=0;
document.addEventListener('touchstart', e => { if(e.target.closest('.lb')) tx=e.touches[0].clientX }, {passive:true});
document.addEventListener('touchend', e => { if(!e.target.closest('.lb')) return; const dx=e.changedTouches[0].clientX-tx; if(Math.abs(dx)>50) showGal(gi+(dx<0?1:-1)) }, {passive:true});
function miniGal(list,alt){
  const el=$('#miniGal'); if(!el) return; el.classList.toggle('alt',!!alt);
  el.innerHTML=(list||GAL.slice(0,4)).map(g=>`<figure data-gal="${g.img}"><img src="${g.img}" alt="${g.title}" loading="lazy"><figcaption>${g.title}</figcaption></figure>`).join(''); bindGal(GAL);
}

const R = {
  index(){
    const slides=[1,2,3]; $('#slides').innerHTML = slides.map((n,i)=>`<div class="slide ${i?'':'on'}" style="background-image:url(${IMG}foto/hero/hero-${n}.jpg)"></div>`).join('');
    $('#dots').innerHTML = slides.map((_,i)=>`<i class="${i?'':'on'}"></i>`).join('');
    let i=0; const go=n=>{ i=n; $$('.slide').forEach((s,k)=>s.classList.toggle('on',k===i)); $$('#dots i').forEach((d,k)=>d.classList.toggle('on',k===i)) };
    $$('#dots i').forEach((d,k)=>d.onclick=()=>go(k)); setInterval(()=>go((i+1)%slides.length),5000);
    const draw = c => { const list = c ? MENU.filter(m=>m.cat===c) : MENU.filter(m=>m.fav); $('#favGrid').innerHTML = list.map(menuCard).join(''); bindAdd(); reveal() };
    chips($('#chips'),draw); draw(null);
    $('#filmGrid').innerHTML = FILMS.slice(0,3).map(filmCard).join(''); bindFilm();
    $('#menuCount').textContent = MENU.length+'+';
    $('#payCopy').onclick = () => { navigator.clipboard?.writeText(SITE.rek); toast('Nomor rekening disalin') };
    miniGal();
  },
  menu(){
    let cur=null,q='';
    const draw=()=>{ const l=MENU.filter(m=>(!cur||m.cat===cur)&&(m.name+m.desc).toLowerCase().includes(q)); $('#menuGrid').innerHTML=l.length?l.map(menuCard).join(''):'<p class="empty">Menu tidak ditemukan.</p>'; bindAdd(); reveal() };
    chips($('#chips'),c=>{cur=c;draw()}); $('#search').oninput=e=>{q=e.target.value.toLowerCase();draw()}; draw();
  },
  galeri(){
    const groups=['Semua',...new Set(GAL.map(g=>g.grp))]; let cur='Semua';
    const draw=()=>{ const l=cur==='Semua'?GAL:GAL.filter(g=>g.grp===cur); $('#galGrid').innerHTML=l.map(galItem).join(''); bindGal(l); reveal() };
    const ch=$('#galChips'); ch.innerHTML=groups.map(g=>`<button class="chip ${g===cur?'on':''}" data-g="${g}">${g} (${g==='Semua'?GAL.length:GAL.filter(x=>x.grp===g).length})</button>`).join('');
    $$('.chip',ch).forEach(b=>b.onclick=()=>{ cur=b.dataset.g; $$('.chip',ch).forEach(x=>x.classList.toggle('on',x===b)); draw() }); draw();
  },
  profile(){ miniGal([GAL[2],GAL[1],GAL[3]],true) },
  film(){
    const play = (f,mute) => { $('#player').innerHTML = embed(f.id,mute); $('#pTitle').textContent=f.title; $('#pMeta').textContent=(f.meta?f.meta+' — ':'')+(f.desc||''); $('#pLink').href=f.url;
      $$('[data-yt]').forEach(c=>c.classList.toggle('now',c.dataset.yt===f.id)); history.replaceState(null,'','?v='+f.id) };
    const draw = () => { $('#filmGrid').innerHTML = FILMS.map(filmCard).join(''); bindFilm(f => { play(f,false); $('#player').scrollIntoView({behavior:'smooth',block:'center'}) }); reveal() };
    draw();
    const start = FILMS.find(f=>f.id===new URLSearchParams(location.search).get('v')) || FILMS[0];
    play(start,true); $$('[data-yt]').forEach(c=>c.classList.toggle('now',c.dataset.yt===start.id));
    $('#ytForm').onsubmit = e => { e.preventDefault(); const id=ytId($('#ytUrl').value), m=$('#ytMsg');
      if(!id){ m.className='msg err'; m.textContent='Link YouTube tidak valid. Contoh: https://www.youtube.com/watch?v=...'; return }
      let f = FILMS.find(x=>x.id===id);
      if(!f){ f={id,title:'Video dari link Anda',meta:'YouTube',desc:'Video yang Anda tambahkan.',img:`https://i.ytimg.com/vi/${id}/hqdefault.jpg`,url:`https://www.youtube.com/watch?v=${id}`};
        store.set('wk_yt',[{id,title:f.title,meta:f.meta,desc:f.desc},...store.get('wk_yt',[])]); FILMS.unshift(f); draw() }
      play(f,false); m.className='msg ok'; m.textContent='Video diputar.'; $('#ytUrl').value='' };
  },
  kontak(){
    const form=$('#contactForm'), get=()=>Object.fromEntries(new FormData(form));
    const text=d=>`Halo ${SITE.name}, saya ${d.nama} (${d.email}).\n\n${d.pesan}`;
    form.onsubmit = e => { e.preventDefault(); const d=get(); window.open(waLink(text(d)),'_blank','noopener'); form.reset(); toast('Pesan diteruskan ke WhatsApp') };
    $('#mailBtn').onclick = () => { if(!form.reportValidity()) return; const d=get();
      location.href=`mailto:${SITE.email}?subject=${encodeURIComponent('Pesan dari website - '+d.nama)}&body=${encodeURIComponent(text(d))}`; toast('Membuka aplikasi email…') };
  }
};
function reveal(){ const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
  $$('.reveal:not(.in)').forEach(e=>io.observe(e)) }

layout(); renderCart();
$$('[data-hours-card]').forEach(e => e.innerHTML = hoursHTML());
R[page]?.(); reveal(); live(); setInterval(live,15000);
$$('[data-hours]').forEach(b => b.onclick = openHours);
document.addEventListener('keydown', e => { if(e.key==='Escape' && $('#hoursModal.on')) closeHours() });

$$('[data-wa]').forEach(a => a.href = waLink(a.dataset.wa || HELLO));
window.WK = {SITE,MENU,status,HOURS,openHours,rp,store,waLink,HELLO,toast,addCart,getCart:()=>cart,setCart:c=>{cart=c;saveCart()},openCart};
})();
