/* ===================== CONFIG REMOTA (Google Apps Script) ===================== */
const GAS_ENDPOINT_URL = 'https://script.google.com/macros/s/AKfycbyB0z3lxyONeAp-9GsiDlfyAW92M67NsLEgjm8HQJeCk3CR17cGmvSCVlWjoCtMtnSp/exec';
const GAS_TOKEN = 's4ndc4t_7vWUpBQJQ3kRr2pF8m9Z';
window.GAS_ENDPOINT_URL = GAS_ENDPOINT_URL;
window.GAS_TOKEN = GAS_TOKEN;

/* ============ Page Loader config ============ */
const LOADER_LOGO_SRC = 'assets/sandcatloading.png';

/* ===================== PASSWORD GATES (SHA-256) ===================== */
const SITE_PASS_HASH  = '84a731da94efc561be5523eea8ab865b6c9a665c86df1f36f98f3d4d8df2559a'; // sandcat
const ADMIN_PASS_HASH = '99caf7f51eb6f8c7c61fd3ed386283de564ff0ab4e7cce943094a8b1b6fa9664'; // sandcat-admin
const AUTH_SITE_KEY  = 'site_auth';
const AUTH_ADMIN_KEY = 'admin_auth';

/* ====== Toast ====== */
function showToast(msg, ok=true) {
  let el = document.getElementById('sandcat-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sandcat-toast';
    el.style.cssText = `
      position: fixed; left: 50%; bottom: 20px; transform: translateX(-50%);
      background: ${ok ? '#00ff66' : '#ff6b6b'}; color: ${ok ? '#001a0c' : '#1a0000'};
      padding: 10px 14px; border-radius: 8px; z-index: 100000;
      font-family: 'Courier New', monospace; box-shadow: 0 10px 24px rgba(0,0,0,.35);
    `;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.background = ok ? '#00ff66' : '#ff6b6b';
  el.style.display = 'block';
  clearTimeout(el._t);
  el._t = setTimeout(()=> { el.style.display = 'none'; }, 2400);
}

/* ===================== Loader entre páginas ===================== */
function ensurePageLoaderMounted() {
  if (document.getElementById('page-loader')) return;
  const el = document.createElement('div');
  el.id = 'page-loader';
  el.innerHTML = `<img src="${LOADER_LOGO_SRC}" alt="Loading...">`;
  document.body.appendChild(el);
}
function showPageLoader() { ensurePageLoaderMounted(); document.getElementById('page-loader').style.display = 'flex'; }
function hidePageLoader() { const el = document.getElementById('page-loader'); if (el) el.style.display = 'none'; }

/* ===================== Intro (solo primera visita) ===================== */
function startHackAnimation() {
  const hackScreen = document.getElementById("hack-screen");
  const hackText = document.getElementById("hack-text");
  if (!hackScreen || !hackText) return;
  const already = sessionStorage.getItem('introShown') === '1';
  if (already) { hackScreen.style.display = 'none'; return; }
  hackScreen.style.display = 'flex';
  hackText.innerHTML = '<span class="glitch-text">ACCESS GRANTED</span>';
  setTimeout(() => {
    hackScreen.style.opacity = "0";
    setTimeout(() => { hackScreen.style.display = "none"; sessionStorage.setItem('introShown', '1'); }, 300);
  }, 700);
}

/* ===================== CÓDIGO SECRETO (desktop + móvil) ===================== */
const SECRET_WORD = 'sorpresa';
let secretBuf = '';

function revealSecret() {
  localStorage.setItem('secret_unlocked', '1');
  document.querySelectorAll(".secret-tag.hidden").forEach(el => el.classList.remove("hidden"));
  showToast('Secret drop unlocked ✨', true);
}

function ensureSecretInput(){
  let el = document.getElementById('secret-input');
  if (!el) {
    el = document.createElement('input');
    el.id = 'secret-input';
    el.autocapitalize = 'off';
    el.autocomplete = 'off';
    el.spellcheck = false;
    document.body.appendChild(el);
    el.addEventListener('input', (e) => {
      const v = e.target.value || '';
      for (const ch of v) {
        if (ch && ch.length === 1) {
          secretBuf = (secretBuf + ch.toLowerCase()).slice(-SECRET_WORD.length);
          if (secretBuf === SECRET_WORD) { revealSecret(); secretBuf = ''; }
        }
      }
      e.target.value = '';
    });
  }
  return el;
}

function secretUnlockInit() {
  // Query ?unlock=sorpresa
  try {
    const params = new URLSearchParams(location.search);
    if ((params.get('unlock') || '').toLowerCase() === SECRET_WORD) revealSecret();
  } catch(_) {}

  // Si ya estaba desbloqueado
  if (localStorage.getItem('secret_unlocked') === '1') {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll(".secret-tag.hidden").forEach(el => el.classList.remove("hidden"));
    });
  }

  // Desktop: teclado global (si no estás escribiendo en otros inputs)
  document.addEventListener('keydown', (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    const editable = document.activeElement && (document.activeElement.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT');
    if (editable) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : '';
    if (!key) return;
    secretBuf = (secretBuf + key).slice(-SECRET_WORD.length);
    if (secretBuf === SECRET_WORD) { revealSecret(); secretBuf = ''; }
  });

  // Móvil: al tocar consola, enfocamos input oculto para abrir teclado
  const focusTargets = ['console-menu'];
  function focusHidden() {
    const el = ensureSecretInput();
    try { el.focus(); } catch(_) {}
  }
  focusTargets.forEach(id => {
    const t = document.getElementById(id);
    if (t) {
      t.addEventListener('click', focusHidden);
      t.addEventListener('touchstart', focusHidden, { passive: true });
    }
  });
}

/* ===================== Navegación / menú ============== */
function navigateTo(page) { window.location.href = `${page}.html`; }
function toggleMenu() { document.getElementById("console-menu")?.classList.toggle("hidden"); }
function toggleSubmenu() { document.querySelector(".submenu")?.classList.toggle("hidden"); }
window.addEventListener('keydown', (e) => {
  if (e.altKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
    e.preventDefault(); window.location.href = 'admin.html';
  }
});

/* ===================== Password gates ===================== */
async function sha256Hex(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('');
}
function isSiteAuthed()  { return localStorage.getItem(AUTH_SITE_KEY)  === '1' || !SITE_PASS_HASH; }
function isAdminAuthed() { return localStorage.getItem(AUTH_ADMIN_KEY) === '1' || !ADMIN_PASS_HASH; }
function logoutSite()  { localStorage.removeItem(AUTH_SITE_KEY);  location.reload(); }
function logoutAdmin() { localStorage.removeItem(AUTH_ADMIN_KEY); location.reload(); }

function mountAuthOverlay({ title, onSubmit }) {
  const overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.style.cssText = `
    position:fixed; inset:0; background:rgba(0,0,0,.92); z-index:999999;
    display:flex; align-items:center; justify-content:center; font-family:'Courier New',monospace; color:#00ff66;
  `;
  overlay.innerHTML = `
    <div style="border:1px solid #0f4; padding:20px; width:min(92vw,420px); background:#000; box-shadow:0 12px 36px rgba(0,255,102,.12); border-radius:12px;">
      <div style="font-size:1.2rem; margin-bottom:10px;">${title}</div>
      <input id="auth-pass" type="password" placeholder="Password" style="width:100%; background:#000; color:#00ff66; border:1px solid #0f4; padding:10px; border-radius:8px;">
      <label style="display:flex; align-items:center; gap:8px; margin:8px 0;">
        <input id="auth-show" type="checkbox" />
        <span>Show password</span>
      </label>
      <div style="display:flex; gap:10px; margin-top:8px;">
        <button id="auth-submit" style="background:#00ff66; color:#001a0c; border:none; padding:10px 14px; border-radius:8px; cursor:pointer;">Unlock</button>
        <button id="auth-cancel" style="background:transparent; border:1px solid #0f4; color:#6aff9e; padding:10px 14px; border-radius:8px; cursor:pointer;">Cancel</button>
      </div>
      <div id="auth-msg" style="margin-top:10px; min-height:20px; color:#ff6b6b;"></div>
    </div>
  `;
  document.body.appendChild(overlay);
  const passInput = overlay.querySelector('#auth-pass');
  overlay.querySelector('#auth-show').onchange = (e)=> { passInput.type = e.target.checked ? 'text':'password'; };
  overlay.querySelector('#auth-cancel').onclick = () => { history.back(); };
  overlay.querySelector('#auth-submit').onclick = async () => {
    const pass = passInput.value || '';
    try { await onSubmit(pass, overlay); } catch(err){ console.warn(err); }
  };
}
async function ensureSiteAccess() {
  if (isSiteAuthed()) return;
  mountAuthOverlay({
    title: 'SANDCAT – Access required',
    onSubmit: async (pass, overlay) => {
      const hex = await sha256Hex(pass);
      if (hex === SITE_PASS_HASH) { localStorage.setItem(AUTH_SITE_KEY, '1'); overlay.remove(); }
      else overlay.querySelector('#auth-msg').textContent = 'Invalid password';
    }
  });
}
async function ensureAdminAccess() {
  await ensureSiteAccess();
  if (isAdminAuthed()) return;
  mountAuthOverlay({
    title: 'SANDCAT – Admin login',
    onSubmit: async (pass, overlay) => {
      const hex = await sha256Hex(pass);
      if (hex === ADMIN_PASS_HASH) { localStorage.setItem(AUTH_ADMIN_KEY, '1'); overlay.remove(); loadAdminOrders(); }
      else overlay.querySelector('#auth-msg').textContent = 'Invalid admin password';
    }
  });
}

/* ===================== Carrito (lógica) ===================== */
function getCart() { return JSON.parse(localStorage.getItem('cart')) || []; }
function setCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); }
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((n, it) => n + (it.qty || 1), 0);
  document.querySelectorAll('#cart-count, .cart-count').forEach(el => el && (el.textContent = count));
}
function openCart() {
  const drawer  = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer || !overlay) return;
  if (!drawer.classList.contains('open')) {
    drawer.classList.add('open');
    overlay.style.display = 'block';
  }
  renderCartModal();
}
function toggleCart() {
  const drawer  = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer || !overlay) return;
  const isOpen = drawer.classList.toggle("open");
  overlay.style.display = isOpen ? "block" : "none";
  if (isOpen) renderCartModal();
}
function addToCart(product, price, size) {
  const finalSize = size || 'N/A';
  let cart = getCart();
  const idx = cart.findIndex(it => it.product === product && it.size === finalSize);
  if (idx >= 0) cart[idx].qty = (cart[idx].qty || 1) + 1;
  else cart.push({ product, price: Number(price), size: finalSize, qty: 1 });
  setCart(cart);
  openCart(); // mostrar al añadir
}
function changeQty(index, delta) {
  let cart = getCart();
  if (index < 0 || index >= cart.length) return;
  cart[index].qty = Math.max(1, (cart[index].qty || 1) + delta);
  setCart(cart); renderCartModal(); renderCartPage();
}
function removeFromCart(index) {
  let cart = getCart();
  if (index < 0 || index >= cart.length) return;
  cart.splice(index, 1);
  setCart(cart); renderCartModal(); renderCartPage();
}
function calcCartTotal(cart) { return cart.reduce((s, it) => s + (Number(it.price)||0)*(it.qty||1), 0); }
function renderCartModal() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!container || !totalEl) return;

  container.innerHTML = "";
  cart.forEach((item, i) => {
    const row = document.createElement("div");
    row.className = "cart-row";
    const info = document.createElement("div");
    info.className = "info";
    info.textContent = `${item.product} (${item.size}) – €${Number(item.price).toFixed(2)}`;
    const controls = document.createElement("div");
    controls.className = "controls";
    controls.innerHTML = `
      <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
      <span>${item.qty || 1}</span>
      <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
      <button class="remove-btn" onclick="removeFromCart(${i})">✖</button>`;
    row.appendChild(info); row.appendChild(controls); container.appendChild(row);
  });
  const total = calcCartTotal(cart);
  totalEl.textContent = total.toFixed(2);
}
function renderCartPage() {
  const cartList = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!cartList || !totalEl) return;
  const cart = getCart();
  cartList.innerHTML = '';
  cart.forEach((item, i) => {
    const line = document.createElement('div');
    line.className = 'console-line';
    line.innerHTML =
      `- ${item.product} [Size: ${item.size}] – €${Number(item.price).toFixed(2)} × ${item.qty || 1}
       <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
       <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
       <button class="remove-btn" onclick="removeFromCart(${i})">✖</button>`;
    cartList.appendChild(line);
  });
  totalEl.textContent = calcCartTotal(cart).toFixed(2);
}

/* ===================== Validación + pedido ===================== */
function validateCheckoutData({name, email, address, zip, method}) {
  const errors = [];
  if (!name || name.trim().length < 3) errors.push('Name must have at least 3 characters.');
  if (method === 'paypal') { if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push('Valid email is required for PayPal.'); }
  if (!address || address.trim().length < 10) errors.push('Address looks too short.');
  if (!/^\d{5}$/.test(zip || '')) errors.push('Postal code must be 5 digits.');
  if (!['paypal', 'cod'].includes(method)) errors.push('Payment method not supported.');
  return errors;
}
function generateOrderId() {
  const d = new Date();
  const y = d.getFullYear(), m = String(d.getMonth()+1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SC-${y}${m}${day}-${rand}`;
}
function appendOrderHistory(order) {
  const key = 'orders';
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  list.push(order);
  localStorage.setItem(key, JSON.stringify(list));
}
function buildOrder({name, email, address, zip, method}) {
  const cart = getCart();
  if (!cart.length) return null;
  const order = {
    orderId: generateOrderId(),
    createdAt: new Date().toISOString(),
    currency: 'EUR',
    method,
    status: method === 'paypal' ? 'PAID' : 'COD_PENDING',
    items: cart.map(it => ({ name: it.product || it.name || 'Product', size: it.size || 'N/A', price: Number(it.price) || 0, qty: it.qty || 1 })),
    total: cart.reduce((s, it) => s + (Number(it.price)||0)*(it.qty||1), 0).toFixed(2),
    customer: { name: name.trim(), email: (email||'').trim(), address: address.trim(), zip: zip.trim(), vatid: '' }
  };
  localStorage.setItem('last_order', JSON.stringify(order));
  appendOrderHistory(order);
  return order;
}

/* ===================== CORS fallback ===================== */
async function fetchJSONWithCORSFallback(url, options) {
  try {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok && data?.ok !== false, status: res.status, data };
  } catch (e) {
    try {
      const res2 = await fetch(url, { ...options, mode: 'no-cors' });
      return { ok: true, opaque: true, status: 0, data: null };
    } catch (e2) {
      return { ok: false, error: String(e2) };
    }
  }
}

/* ===================== Envío a Google Sheets ===================== */
async function sendOrderToSheet(order) {
  if (!GAS_ENDPOINT_URL || !GAS_TOKEN) return { ok:false, error:'No GAS config' };
  const body = JSON.stringify({ token: GAS_TOKEN, order });
  const r = await fetchJSONWithCORSFallback(GAS_ENDPOINT_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  if (r.opaque) return { ok:true, note:'opaque' };
  return r.ok ? (r.data || { ok:true }) : { ok:false, error: (r.data && r.data.error) || r.error || 'Failed' };
}

/* ===== Cerrojo anti doble click ===== */
let isPlacingOrder = false;
function setConfirmButtonEnabled(enabled) {
  const btns = Array.from(document.querySelectorAll('#confirm-order-btn'));
  btns.forEach(btn => { btn.disabled = !enabled; btn.style.opacity = enabled ? '1' : '.6'; btn.style.pointerEvents = enabled ? 'auto' : 'none'; });
}
function $val(id) { const el = document.getElementById(id); return el ? el.value.trim() : ''; }

async function placeOrder(){
  if (isPlacingOrder) return;
  isPlacingOrder = true;
  setConfirmButtonEnabled(false);

  try {
    const hasFields =
      document.getElementById('chk-name') &&
      document.getElementById('chk-email') &&
      document.getElementById('chk-address') &&
      document.getElementById('chk-zip') &&
      document.getElementById('chk-method');

    if (!hasFields) { openCart(); showToast('Completa tus datos para finalizar el pedido', false); return; }

    const name = $val('chk-name');
    const email = $val('chk-email');
    const address = $val('chk-address');
    const zip = $val('chk-zip');
    const method = $val('chk-method') || 'paypal';

    const errs = validateCheckoutData({name, email, address, zip, method});
    if (errs.length){ showToast('Revisa datos: ' + errs.join(' · '), false); return; }

    showPageLoader();

    const order = buildOrder({name, email, address, zip, method});
    if (!order){ showToast('Tu carrito está vacío', false); return; }

    const remote = await sendOrderToSheet(order);
    if (!remote?.ok) { showToast('No se pudo guardar el pedido: ' + (remote?.error || 'CORS/Conexión'), false); return; }

    localStorage.removeItem('cart');
    updateCartCount(); renderCartModal(); renderCartPage();

    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartDrawer && cartDrawer.classList.contains('open')) {
      cartDrawer.classList.remove('open');
      if (cartOverlay) cartOverlay.style.display = 'none';
    }

    showToast('Pedido confirmado: ' + order.orderId, true);
    setTimeout(()=> { window.location.href = 'thanks.html'; }, 600);

  } finally {
    isPlacingOrder = false;
    setConfirmButtonEnabled(true);
    hidePageLoader();
  }
}

/* ===================== Admin – lectura ===================== */
async function fetchOrdersFromSheet({ limit = 200, since = '' } = {}) {
  if (!GAS_ENDPOINT_URL || !GAS_TOKEN) {
    const raw = JSON.parse(localStorage.getItem('orders') || '[]');
    let rows = raw.map(o => ({
      timestamp: o.createdAt || o.timestamp || new Date().toISOString(),
      orderId: o.orderId, method: o.method, status: o.status,
      name: o.customer?.name, email: o.customer?.email, address: o.customer?.address, zip: o.customer?.zip,
      total: o.total, currency: o.currency || 'EUR', items: o.items || []
    }));
    if (since) { const dt = new Date(since); if (!isNaN(dt)) rows = rows.filter(r => new Date(r.timestamp) >= dt); }
    rows.sort((a,b)=> new Date(b.timestamp) - new Date(a.timestamp));
    return rows.slice(0, limit);
  }
  const url = new URL(GAS_ENDPOINT_URL);
  url.searchParams.set('action','list');
  url.searchParams.set('token', GAS_TOKEN);
  url.searchParams.set('limit', String(limit));
  if (since) url.searchParams.set('since', since);

  const res = await fetch(url.toString(), { method: 'GET' });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || 'Unknown error');
  return (data.items || []).map(r => ({
    timestamp: r.timestamp, orderId: r.orderId, method: r.method, status: r.status,
    name: r.name, email: r.email, address: r.address, zip: r.zip,
    total: r.total, currency: r.currency || 'EUR',
    items: Array.isArray(r.items) ? r.items : []
  }));
}
async function loadAdminOrders() {
  const table = document.getElementById('admin-table-body');
  const info  = document.getElementById('admin-info');
  const filterMethod = document.getElementById('filter-method')?.value || '';
  const filterStatus = document.getElementById('filter-status')?.value || '';
  const since = document.getElementById('filter-since')?.value || '';
  if (!table) return;
  table.innerHTML = '<tr><td colspan="7">Loading…</td></tr>';
  try {
    const rows = await fetchOrdersFromSheet({ since });
    const filtered = rows.filter(r => {
      const byMethod = filterMethod ? (String(r.method || '').toLowerCase() === filterMethod.toLowerCase()) : true;
      const byStatus = filterStatus ? (String(r.status || '') === filterStatus) : true;
      return byMethod && byStatus;
    });
    table.innerHTML = '';
    if (!filtered.length) { table.innerHTML = '<tr><td colspan="7">No data</td></tr>'; }
    else {
      for (const r of filtered) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${escapeHtml(r.orderId || '')}</td>
          <td>${escapeHtml(new Date(r.timestamp).toLocaleString())}</td>
          <td>${escapeHtml((r.method || '').toUpperCase())}<br><small>${escapeHtml(r.status || '')}</small></td>
          <td>${escapeHtml(r.name || '')}<br><small>${escapeHtml(r.email || '')}</small></td>
          <td>${escapeHtml(r.address || '')}<br><small>${escapeHtml(r.zip || '')}</small></td>
          <td>€${Number(r.total || 0).toFixed(2)} ${escapeHtml(r.currency || 'EUR')}</td>
          <td>${Array.isArray(r.items) ? r.items.map(it => `${escapeHtml(it.name||'')} (${escapeHtml(it.size||'')}) × ${Number(it.qty||1)} – €${Number(it.price||0).toFixed(2)}`).join('<br>') : ''}</td>
        `;
        table.appendChild(tr);
      }
    }
    if (info) info.textContent = `Rows: ${filtered.length}  |  Source: Google Sheet`;
  } catch (err) {
    table.innerHTML = `<tr><td colspan="7">Error: ${escapeHtml(String(err.message||err))}</td></tr>`;
    if (info) info.textContent = 'Error loading data';
  }
}
function escapeHtml(s){ return String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

/* ===================== Newsletter ===================== */
async function sendNewsletterEmail(email) {
  if (!GAS_ENDPOINT_URL || !GAS_TOKEN) return { ok:false, error:'No GAS config' };
  const body = JSON.stringify({ token: GAS_TOKEN, newsletter: { email, source:'site' } });
  const r = await fetchJSONWithCORSFallback(GAS_ENDPOINT_URL, { method:'POST', headers:{'Content-Type':'application/json'}, body });
  if (r.opaque) return { ok:true, note:'opaque' };
  return r.ok ? (r.data || { ok:true }) : { ok:false, error: (r.data && r.data.error) || r.error || 'Failed' };
}
function wireNewsletter() {
  const btn = document.getElementById('newsletter-btn');
  const inp = document.getElementById('newsletter-email');
  if (!btn || !inp) return;
  let sending = false;
  async function submitNewsletter() {
    if (sending) return;
    const email = (inp.value||'').trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) { showToast('Email inválido', false); return; }
    sending = true; btn.disabled = true; btn.style.opacity = '.6';
    const resp = await sendNewsletterEmail(email);
    if (resp?.ok) { showToast('Suscripción realizada ✅', true); inp.value = ''; }
    else { console.warn('Newsletter failed:', resp); showToast('Error newsletter: ' + (resp?.error || 'CORS/Conexión'), false); }
    sending = false; btn.disabled = false; btn.style.opacity = '1';
  }
  btn.onclick = submitNewsletter;
  inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') submitNewsletter(); });
}

/* ===================== INIT ===================== */
window.onload = async () => {
  updateCartCount();
  startHackAnimation();
  ensurePageLoaderMounted();
  hidePageLoader();

  // Secret code (desktop + móvil)
  secretUnlockInit();

  // Navegación suave
  window.addEventListener('beforeunload', () => {
    document.body.classList.add('fade-out');
    showPageLoader();
  });
  const oldNavigateTo = window.navigateTo;
  window.navigateTo = function(page) {
    document.body.classList.add('fade-out');
    showPageLoader();
    setTimeout(() => { oldNavigateTo ? oldNavigateTo(page) : (window.location.href = `${page}.html`); }, 350);
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const url = a.getAttribute('href') || '';
    const isInternal = url && !/^https?:\/\//i.test(url) && !url.startsWith('#') && (url.endsWith('.html') || !url.includes('.'));
    if (isInternal) {
      e.preventDefault();
      document.body.classList.add('fade-out');
      showPageLoader();
      setTimeout(() => { window.location.href = url; }, 350);
    }
  });

  // Password gate
  const isAdminPage = location.pathname.endsWith('/admin.html') || location.pathname.endsWith('admin.html');
  if (isAdminPage) { await ensureAdminAccess(); } else { await ensureSiteAccess(); }

  // Carrito / newsletter
  renderCartPage();
  wireNewsletter();
};

