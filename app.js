// State Management
let currentState = {
    page: 'home',
    selectedCategory: 'All',
    selectedProduct: null
};

let cart = [];

// DOM References
const appContent = document.getElementById('app-content');
const navItems = document.querySelectorAll('.nav-item');
const btnBack = document.getElementById('btn-back');
const brandArea = document.getElementById('brand-area');
const cartCount = document.getElementById('cart-count');
const btnCartTop = document.getElementById('btn-cart-top');

// Init Router & App
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAppLogo(); // Memasang logo dinamis di header kiri atas
    navigate('home');
});

function initNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = item.getAttribute('data-target');
            navigate(target);
        });
    });

    btnBack.addEventListener('click', () => {
        if (currentState.page === 'detail') {
            navigate('products');
        } else {
            navigate('home');
        }
    });

    btnCartTop.addEventListener('click', () => navigate('cart'));
}

function initAppLogo() {
    const logoImg = document.getElementById('main-app-logo');
    const fallbackIcon = document.getElementById('fallback-icon');
    
    if (logoImg) {
        // Tentukan path ke logo (Gunakan data dari SHOP_DATA, jika tidak ada langsung tembak ke assets/logo.png)
        const logoPath = (typeof SHOP_DATA !== 'undefined' && SHOP_DATA.about && SHOP_DATA.about.logo) 
            ? SHOP_DATA.about.logo 
            : 'assets/logo.png';
            
        logoImg.src = logoPath;
        
        // Paksa hapus class 'hidden' agar gambar tampil
        logoImg.classList.remove('hidden');
        logoImg.style.display = 'block'; 
        
        // Sembunyikan icon cadangan kue kering jika element-nya ada
        if (fallbackIcon) {
            fallbackIcon.classList.add('hidden');
            fallbackIcon.style.display = 'none';
        }
    }
}

function navigate(pageName, params = null) {
    currentState.page = pageName;
    updateNavBarUI(pageName);
    
    // Toggle Back Button and Header Styling
    if (pageName === 'detail' || pageName === 'cart') {
        btnBack.classList.remove('hidden');
        brandArea.classList.add('opacity-0', 'pointer-events-none');
    } else {
        btnBack.classList.add('hidden');
        brandArea.classList.remove('opacity-0', 'pointer-events-none');
    }

    // Render content dynamically
    switch(pageName) {
        case 'home': renderHome(); break;
        case 'products': renderProducts(); break;
        case 'detail': renderProductDetail(params); break;
        case 'cart': renderCart(); break;
        case 'testimonials': renderTestimonials(); break;
        case 'about': renderAbout(); break;
    }
    appContent.scrollTop = 0;
}

function updateNavBarUI(pageName) {
    navItems.forEach(item => {
        if (item.getAttribute('data-target') === pageName) {
            item.classList.remove('text-gray-400');
            item.classList.add('text-green-400', 'scale-110');
        } else {
            item.classList.remove('text-green-400', 'scale-110');
            item.classList.add('text-gray-400');
        }
    });
}

// FORMAT RUPIAH UTILITY
function formatIDR(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
}

/* ================= COMPONENT RENDERING ================= */

// 1. HALAMAN UTAMA (HOME)
function renderHome() {
    const featured = SHOP_DATA.products.slice(0, 3);
    let html = `
        <div class="px-6 pb-24 space-y-6 animate-fade-in">
            <div class="mt-4">
                <p class="text-xs text-gray-400 font-bold uppercase tracking-wider">${SHOP_DATA.tagline}</p>
                <h2 class="text-xl font-black text-gray-950 mt-1 leading-snug">Temukan Cita Rasa Dessert Impianmu ✨</h2>
            </div>

            <div class="bg-gradient-to-br from-green-500 to-emerald-700 rounded-3xl p-5 text-white relative overflow-hidden shadow-lg shadow-green-100/50">
                <div class="w-2/3 relative z-10">
                    <span class="bg-white/20 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">Promo Minggu Ini</span>
                    <h3 class="text-lg font-bold mt-2.5 leading-tight">Diskon Spesial Matcha Box!</h3>
                    <p class="text-[11px] text-white/80 mt-1">Rasakan kelembutan krim matcha autentik jepang hemat hingga 15%.</p>
                    <button onclick="navigate('products')" class="mt-3.5 bg-white text-green-700 text-[11px] font-bold px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-all active:scale-95">Pesan Sekarang</button>
                </div>
                <i class="fa-solid fa-ice-cream absolute -bottom-4 -right-4 text-8xl text-white/10 rotate-12"></i>
            </div>

            <div>
                <div class="flex justify-between items-center mb-3.5">
                    <h3 class="text-sm font-black text-gray-950 uppercase tracking-wider">Rekomendasi Populer</h3>
                    <button onclick="navigate('products')" class="text-xs font-bold text-green-600 hover:underline">Lihat Semua</button>
                </div>
                
                <div class="grid grid-cols-2 gap-3.5">
                    ${featured.map(prod => `
                        <div onclick="navigate('detail', '${prod.id}')" class="bg-white rounded-2xl p-3.5 shadow-xs border border-gray-100 hover:shadow-md transition-all cursor-pointer relative group flex flex-col justify-between">
                            <div class="relative flex justify-center mb-2.5">
                                <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-50 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                                    <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300'">
                                </div>
                            </div>
                            <div>
                                <div class="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                                    <i class="fa-solid fa-star"></i> <span>${prod.rating}</span>
                                </div>
                                <h4 class="font-bold text-xs text-gray-900 mt-0.5 line-clamp-1">${prod.name}</h4>
                                <p class="text-xs font-black text-gray-950 mt-1.5">${formatIDR(prod.price)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    appContent.innerHTML = html;
}

// 2. HALAMAN PRODUK (FIXED OVERFLOW & TYPO)
function renderProducts() {
    const filteredProducts = currentState.selectedCategory === 'All' 
        ? SHOP_DATA.products 
        : SHOP_DATA.products.filter(p => p.category === currentState.selectedCategory);

    let html = `
        <div class="px-6 pb-24 animate-fade-in w-full min-w-0">
            
            <div class="-mx-6 px-6 sticky top-0 bg-white/90 backdrop-blur-md z-10">
                <div class="flex gap-2 overflow-x-auto py-3 no-scrollbar w-full" 
                     style="overflow-x: auto !important; -webkit-overflow-scrolling: touch; display: flex !important; flex-wrap: nowrap !important;">
                    ${SHOP_DATA.categories.map(cat => `
                        <button onclick="filterCategory('${cat}')" class="whitespace-nowrap flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${currentState.selectedCategory === cat ? 'bg-green-600 text-white shadow-md shadow-green-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
            </div>

            <div class="mt-4 grid grid-cols-1 gap-3.5">
                ${filteredProducts.length === 0 ? `
                    <p class="text-center text-xs text-gray-400 py-10">Produk tidak ditemukan.</p>
                ` : filteredProducts.map(prod => `
                    <div onclick="navigate('detail', '${prod.id}')" class="bg-white rounded-2xl p-3.5 flex items-center justify-between shadow-xs border border-gray-100 hover:shadow-md transition-all cursor-pointer">
                        <div class="flex items-center gap-3.5 flex-1 pr-2">
                            <div class="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 shadow-inner">
                                <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300'">
                            </div>
                            <div class="flex flex-col">
                                <span class="text-[9px] font-bold text-green-600 tracking-wider uppercase">${prod.category}</span>
                                <h4 class="font-bold text-gray-950 text-xs mt-0.5">${prod.name}</h4>
                                <p class="text-[10px] text-gray-400 line-clamp-1 mt-0.5">${prod.description}</p>
                                <span class="text-xs font-black text-gray-950 mt-1">${formatIDR(prod.price)}</span>
                            </div>
                        </div>
                        <button onclick="window.event.stopPropagation(); addToCart('${prod.id}', false, window.event)" class="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center transition-transform active:scale-90 shadow-md flex-shrink-0">
                            <i class="fa-solid fa-plus text-[10px]"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    appContent.innerHTML = html;
}

function filterCategory(cat) {
    currentState.selectedCategory = cat;
    renderProducts();
}

// DETAIL PRODUK
function renderProductDetail(productId) {
    const prod = SHOP_DATA.products.find(p => p.id === productId);
    if(!prod) return navigate('products');

    let html = `
        <div class="px-6 pb-24 animate-fade-in flex flex-col items-center pt-4">
            <div class="relative w-64 h-64 md:w-72 md:h-72 rounded-full shadow-2xl overflow-hidden border-4 border-white bg-gray-100 transition-transform duration-500 hover:rotate-6">
                <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500'">
            </div>

            <div class="w-full mt-8 bg-white rounded-[32px] p-6 shadow-xs border border-gray-100">
                <div class="flex justify-between items-start">
                    <div>
                        <span class="text-xs font-bold text-green-600 uppercase tracking-widest">${prod.category}</span>
                        <h2 class="text-xl font-extrabold text-gray-950 mt-1">${prod.name}</h2>
                    </div>
                    <div class="bg-amber-50 text-amber-600 text-xs font-bold px-2.5 py-1.5 rounded-xl flex items-center gap-1">
                        <i class="fa-solid fa-star"></i> ${prod.rating}
                    </div>
                </div>

                <div class="flex items-center gap-4 mt-4 text-xs text-gray-500 font-medium border-y border-gray-100 py-3">
                    <div><i class="fa-solid fa-clock text-green-500 mr-1"></i> Ready in ${prod.time}</div>
                    <div><i class="fa-solid fa-bowl-food text-green-500 mr-1"></i> Freshly Made</div>
                </div>

                <p class="text-xs text-gray-500 leading-relaxed mt-4">${prod.description}</p>
                
                <div class="mt-8 flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Price</span>
                        <span class="text-lg font-black text-gray-950">${formatIDR(prod.price)}</span>
                    </div>
                    <button onclick="addToCart('${prod.id}', true)" class="bg-black text-white text-xs font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 shadow-lg transition-transform active:scale-95">
                        <span>Add to Cart</span> <i class="fa-solid fa-plus text-[10px]"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    appContent.innerHTML = html;
}

// 3. HALAMAN KERANJANG (CART)
function renderCart() {
    if (cart.length === 0) {
        appContent.innerHTML = `
            <div class="px-6 flex flex-col items-center justify-center pt-20 text-center animate-fade-in">
                <div class="w-24 h-24 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-3xl mb-4 shadow-inner">
                    <i class="fa-solid fa-basket-shopping"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-950">Keranjang Belanja Kosong</h3>
                <p class="text-xs text-gray-400 mt-2 max-w-xs">Yuk, jelajahi produk Nibble_Craft.id dan temukan camilan manis kesukaanmu!</p>
                <button onclick="navigate('products')" class="mt-6 bg-green-600 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition-transform active:scale-95">Lihat Produk</button>
            </div>
        `;
        return;
    }

    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const ongkir = 10000;
    const total = subtotal + ongkir;

    let html = `
        <div class="px-6 pb-24 animate-fade-in">
            <h2 class="text-xl font-extrabold text-gray-950 mt-4 mb-4">Keranjang Saya</h2>
            <div class="space-y-4">
                ${cart.map(item => `
                    <div class="bg-white rounded-2xl p-4 flex items-center justify-between shadow-xs border border-gray-100">
                        <div class="flex items-center gap-3">
                            <div class="w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                                <img src="${item.product.image}" alt="${item.product.name}" class="w-full h-full object-cover">
                            </div>
                            <div>
                                <h4 class="font-bold text-sm text-gray-950 line-clamp-1">${item.product.name}</h4>
                                <p class="text-xs text-gray-400 mt-0.5">${formatIDR(item.product.price)}</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                            <button onclick="updateQty('${item.product.id}', -1)" class="w-6 h-6 rounded-lg bg-white shadow-xs flex items-center justify-center text-xs font-bold text-gray-600 active:scale-90">-</button>
                            <span class="text-xs font-bold text-gray-950 min-w-[16px] text-center">${item.quantity}</span>
                            <button onclick="updateQty('${item.product.id}', 1)" class="w-6 h-6 rounded-lg bg-white shadow-xs flex items-center justify-center text-xs font-bold text-gray-600 active:scale-90">+</button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="mt-6 bg-white rounded-2xl p-4 border border-gray-100 space-y-2.5 text-xs text-gray-600 shadow-xs">
                <div class="flex justify-between"><span>Subtotal</span><span class="font-bold text-gray-950">${formatIDR(subtotal)}</span></div>
                <div class="flex justify-between"><span>Ongkos Kirim</span><span class="font-bold text-gray-950">${formatIDR(ongkir)}</span></div>
                <hr class="border-gray-100 my-1">
                <div class="flex justify-between text-sm font-black text-gray-950"><span>Total Tagihan</span><span class="text-green-600">${formatIDR(total)}</span></div>
            </div>

            <button onclick="checkoutWhatsApp()" class="w-full mt-5 bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-100 flex items-center justify-center gap-2 transition-transform active:scale-95 text-xs">
                <i class="fa-brands fa-whatsapp text-sm"></i> Kirim Pesanan ke WhatsApp
            </button>
        </div>
    `;
    appContent.innerHTML = html;
}

// ==========================================
// ISI EDITAN UNTUK HALAMAN TESTIMONI & ADMIN
// ==========================================

function renderTestimonials() {
    let html = `
        <div class="px-6 pb-24 animate-fade-in">
            <h2 class="text-xl font-extrabold text-gray-950 mt-4 mb-1">Ulasan Pelanggan</h2>
            
            <!-- Link Rahasia Menuju Halaman Admin jika teks ini diklik -->
            <p onclick="bukaHalamanAdmin()" class="text-xs text-gray-400 mb-6 cursor-pointer hover:text-gray-600 select-none">
                Apa pendapat mereka tentang rasa Nibble_Craft.id? 🔒
            </p>
            
            <!-- KOTAK FORM INPUT UNTUK KIRIM KOMENTAR BARU -->
            <div class="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-6 space-y-3 shadow-inner">
                <h3 class="text-xs font-black text-gray-950 uppercase tracking-wider">Tulis Ulasan Anda</h3>
                
                <div>
                    <input type="text" id="testi-name" placeholder="Nama Anda" 
                        class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-green-500 font-medium">
                </div>
                
                <div class="flex items-center gap-2">
                    <span class="text-xs text-gray-500 font-medium">Rating:</span>
                    <select id="testi-rating" class="bg-white border border-gray-200 rounded-xl px-2 py-1 text-xs focus:outline-none focus:border-green-500 font-bold text-amber-500">
                        <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                        <option value="4">⭐⭐⭐⭐ (4)</option>
                        <option value="3">⭐⭐⭐ (3)</option>
                        <option value="2">⭐⭐ (2)</option>
                        <option value="1">⭐ (1)</option>
                    </select>
                </div>
                
                <div>
                    <textarea id="testi-review" rows="3" placeholder="Tulis komentar atau pengalaman Anda di sini..." 
                        class="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-green-500 font-medium resize-none"></textarea>
                </div>
                
                <button onclick="submitTestimonial()" class="w-full bg-green-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-transform active:scale-95 hover:bg-green-700">
                    Kirim Ulasan ✨
                </button>
            </div>
            
            <!-- TEMPAT DAFTAR KOMENTAR YANG AKAN DIKIRIM OLEH FIREBASE -->
            <div class="space-y-4" id="testimonial-list">
                <p class="text-center text-xs text-gray-400 py-6">Memuat ulasan dari database...</p>
            </div>
        </div>
    `;
    appContent.innerHTML = html;

    // Menarik data komentar secara live dari Firebase cloud
    listenToFirebaseTestimonials();
}

// FUNGSI TARIK DATA SECARA REALTIME DARI FIREBASE
function listenToFirebaseTestimonials() {
    const listContainer = document.getElementById('testimonial-list');
    if (!listContainer) return;

    database.ref('testimonials').on('value', (snapshot) => {
        const data = snapshot.val();
        
        if (!data) {
            listContainer.innerHTML = `<p class="text-center text-xs text-gray-400 py-6">Belum ada ulasan. Jadilah yang pertama!</p>`;
            return;
        }

        // Urutkan data terbaru agar berada di posisi atas halaman
        const testimonialsArray = Object.keys(data).map(key => data[key]).reverse();

        listContainer.innerHTML = testimonialsArray.map(testi => `
            <div class="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 animate-fade-in">
                <div class="flex items-center gap-3 mb-3">
                    <img src="${testi.avatar}" alt="${testi.name}" class="w-10 h-10 rounded-full object-cover shadow-inner">
                    <div>
                        <h4 class="text-xs font-bold text-gray-950">${testi.name}</h4>
                        <div class="flex gap-0.5 text-[10px] text-amber-400 mt-0.5">
                            ${Array(Number(testi.rating)).fill('⭐').join('')}
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-500 italic leading-relaxed">"${testi.review}"</p>
            </div>
        `).join('');
    });
}

// FUNGSI UNTUK MENGIRIM ULASAN USER BARU KE DATABASE CLOUD
function submitTestimonial() {
    const nameInput = document.getElementById('testi-name');
    const ratingInput = document.getElementById('testi-rating');
    const reviewInput = document.getElementById('testi-review');

    if (!nameInput.value.trim() || !reviewInput.value.trim()) {
        alert('Silakan isi nama dan komentar Anda terlebih dadaulu!');
        return;
    }

    const newTestimonial = {
        name: nameInput.value.trim(),
        rating: parseInt(ratingInput.value),
        review: reviewInput.value.trim(),
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100", // Avatar default estetik
        timestamp: Date.now()
    };

    // Kirim objek ke Firebase node bernama 'testimonials'
    database.ref('testimonials').push(newTestimonial)
        .then(() => {
            nameInput.value = '';
            reviewInput.value = '';
        })
        .catch((error) => {
            console.error("Kesalahan Firebase:", error);
            alert("Gagal mengirim ulasan, periksa kembali setelan Rules Firebase Anda.");
        });
}

// FUNGSI REDIRECT KE HALAMAN ADMIN BARU
function bukaHalamanAdmin() {
    const inputPin = prompt("Masukkan PIN Keamanan Admin:");
    if (inputPin === "190701") { // PIN Default, bisa kamu ubah sesukamu
        window.location.href = "admin.html";
    } else if (inputPin !== null) {
        alert("PIN Salah! Akses ditolak.");
    }
}

// 5. HALAMAN TENTANG KAMI (ABOUT)
function renderAbout() {
    let html = `
        <div class="px-6 pb-24 flex flex-col items-center text-center pt-4 animate-fade-in">
            <div class="w-20 h-20 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100 overflow-hidden mb-4">
                <img src="${SHOP_DATA.about.logo}" alt="Logo ${SHOP_DATA.storeName}" class="w-full h-full object-cover" onerror="this.src='https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=150'">
            </div>
            <h2 class="text-lg font-black text-gray-950">${SHOP_DATA.storeName}</h2>
            <p class="text-xs text-green-600 font-bold tracking-widest uppercase mt-0.5">Homemade Delight</p>

            <div class="bg-white rounded-2xl p-5 border border-gray-100 text-left mt-6 w-full space-y-4">
                <div>
                    <h4 class="text-xs font-bold text-gray-950 uppercase tracking-wider mb-1">Deskripsi Toko</h4>
                    <p class="text-xs text-gray-500 leading-relaxed">${SHOP_DATA.about.description}</p>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-gray-950 uppercase tracking-wider mb-1">Lokasi Dapur</h4>
                    <p class="text-xs text-gray-500 leading-relaxed flex items-start gap-1.5"><i class="fa-solid fa-location-dot text-green-600 mt-0.5"></i> ${SHOP_DATA.about.address}</p>
                </div>
                <div>
                    <h4 class="text-xs font-bold text-gray-950 uppercase tracking-wider mb-1">Kontak Sosial</h4>
                    <div class="flex gap-3 mt-2">
                        <a href="https://instagram.com" target="_blank" class="flex items-center gap-1.5 text-xs text-gray-600 font-semibold bg-gray-50 px-3 py-2 rounded-xl border border-gray-100"><i class="fa-brands fa-instagram text-pink-600"></i> ${SHOP_DATA.about.instagram}</a>
                        <a href="https://wa.me/${SHOP_DATA.about.whatsapp}" target="_blank" class="flex items-center gap-1.5 text-xs text-gray-600 font-semibold bg-gray-50 px-3 py-2 rounded-xl border border-gray-100"><i class="fa-solid fa-phone text-green-600"></i> Hubungi</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    appContent.innerHTML = html;
}

/* ================= LOGIC & ACTIONS FUNCTIONALITIES ================= */

function addToCart(productId, redirect = false, event = null) {
    const prod = SHOP_DATA.products.find(p => p.id === productId);
    if (!prod) return;

    if (event && !redirect) {
        triggerFlyAnimation(event.currentTarget);
    }

    const existing = cart.find(item => item.product.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ product: prod, quantity: 1 });
    }

    setTimeout(() => {
        updateCartCounter();
        const topCart = document.getElementById('btn-cart-top');
        if (topCart) {
            topCart.classList.add('scale-110', 'bg-green-600');
            setTimeout(() => topCart.classList.remove('scale-110', 'bg-green-600'), 300);
        }
    }, event && !redirect ? 600 : 0);

    if (redirect) {
        navigate('cart');
    }
}

function triggerFlyAnimation(clickedElement) {
    const cartBtn = document.getElementById('btn-cart-top');
    if (!cartBtn || !clickedElement) return;
    
    const startRect = clickedElement.getBoundingClientRect();
    const endRect = cartBtn.getBoundingClientRect();

    const flyer = document.createElement('div');
    flyer.className = 'fixed z-50 bg-green-500 rounded-full flex items-center justify-center pointer-events-none text-white text-[10px] shadow-md';
    flyer.style.width = '24px';
    flyer.style.height = '24px';
    flyer.style.left = `${startRect.left + (startRect.width / 2) - 12}px`;
    flyer.style.top = `${startRect.top + (startRect.height / 2) - 12}px`;
    flyer.innerHTML = '<i class="fa-solid fa-plus text-[8px]"></i>';

    document.body.appendChild(flyer);

    const diffX = endRect.left + (endRect.width / 2) - (startRect.left + (startRect.width / 2));
    const diffY = endRect.top + (endRect.height / 2) - (startRect.top + (startRect.height / 2));

    flyer.style.setProperty('--target-x', `${diffX}px`);
    flyer.style.setProperty('--target-y', `${diffY}px`);
    
    flyer.classList.add('animate-fly-to-cart');

    flyer.addEventListener('animationend', () => {
        flyer.remove();
    });
}

function updateQty(productId, amount) {
    const existingIndex = cart.findIndex(item => item.product.id === productId);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += amount;
        if (cart[existingIndex].quantity <= 0) {
            cart.splice(existingIndex, 1);
        }
    }
    updateCartCounter();
    renderCart();
}

function updateCartCounter() {
    if (!cartCount) return;
    const totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
    if (totalQty > 0) {
        cartCount.innerText = totalQty;
        cartCount.classList.remove('scale-0');
        cartCount.classList.add('scale-100');
    } else {
        cartCount.classList.remove('scale-100');
        cartCount.classList.add('scale-0');
    }
}

function checkoutWhatsApp() {
    let subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    let orderText = `*Halo Nibble_Craft.id, saya mau pesan:* \n\n`;
    
    cart.forEach((item, index) => {
        orderText += `${index + 1}. ${item.product.name} (x${item.quantity}) - ${formatIDR(item.product.price * item.quantity)}\n`;
    });
    
    orderText += `\n*Subtotal:* ${formatIDR(subtotal)}`;
    orderText += `\n*Ongkir:* ${formatIDR(0)}`;
    orderText += `\n*Total Akhir:* ${formatIDR(subtotal + 0)}`;
    orderText += `\n\n_Mohon info instruksi pembayaran selanjutnya, terima kasih._`;

    const encodedText = encodeURIComponent(orderText);
    window.open(`https://wa.me/${SHOP_DATA.about.whatsapp}?text=${encodedText}`, '_blank');
}
