// Limit per product = (N mod 4) + 2 = (45 mod 4) + 2 = 3
const LIMIT = 3;
let cart = [];                       // each item: { name, price }

// load the saved cart so both pages share it
try { cart = JSON.parse(localStorage.getItem('cart')) || []; } catch (e) { cart = []; }
function save() {
  try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {}
}

const cartBtn   = document.getElementById('cartBtn');
const miniCart  = document.getElementById('miniCart');
const cartList  = document.getElementById('cartList');
const cartTotal = document.getElementById('cartTotal');
const cartBadge = document.getElementById('cartBadge');
const addButtons = document.querySelectorAll('.add-btn');       // listing page
const detailBtn  = document.querySelector('.detail-add-btn');   // product page

function clean(text) { return text.replace(/\s+/g, ' ').trim(); }
function toNumber(text) { return Number(text.replace(/[^0-9]/g, '')); }

function getName(card)  { return clean(card.querySelector('h5').textContent); }
function getPrice(card) { return toNumber(card.querySelector('.product-info p').textContent); }
function countOf(name)  { return cart.filter(item => item.name === name).length; }

function detailName() { return clean(document.querySelector('.detail-title').textContent); }

// redraw badge, list, total and button states
function render() {
  cartBadge.textContent = cart.length;

  if (cart.length === 0) {
    cartList.innerHTML = '<li>Your cart is empty</li>';
  } else {
    cartList.innerHTML = cart.map((item, i) =>
      `<li>
         <span>${item.name} - Rs. ${item.price}</span>
         <button type="button" class="remove-btn" data-index="${i}">Remove</button>
       </li>`
    ).join('');
  }

  cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0);

  addButtons.forEach(btn => {
    const full = countOf(getName(btn.closest('.product-card'))) >= LIMIT;
    btn.disabled = full;
    btn.classList.toggle('limit', full);
    btn.textContent = full ? 'Limit reached' : '+';
  });

  if (detailBtn) {
    const full = countOf(detailName()) >= LIMIT;
    detailBtn.disabled = full;
    detailBtn.textContent = full ? 'Limit reached' : 'Add to Cart';
  }
}

// Listing page: round + buttons
addButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.product-card');
    const name = getName(card);
    if (countOf(name) >= LIMIT) return;
    cart.push({ name: name, price: getPrice(card) });
    save();
    render();
  });
});

// Product page: Add to Cart with quantity
if (detailBtn) {
  detailBtn.addEventListener('click', () => {
    const name  = detailName();
    const price = toNumber(document.querySelector('.detail-price').textContent);
    let qty = Number(document.getElementById('quantity').value) || 1;
    while (qty > 0 && countOf(name) < LIMIT) {   // stop at the limit
      cart.push({ name: name, price: price });
      qty--;
    }
    save();
    render();
  });
}

// Remove (one listener for the whole list)
cartList.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    cart.splice(Number(e.target.dataset.index), 1);
    save();
    render();
  }
});

// Cart icon opens / closes the panel
cartBtn.addEventListener('click', e => {
  e.preventDefault();                // stay on the page
  miniCart.hidden = !miniCart.hidden;
});

render();