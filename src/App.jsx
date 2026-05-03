import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import PageTransition from './components/PageTransition';
import InfoPage from './pages/InfoPage';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import CustomCursor from './components/CustomCursor';

export const ALL_PRODUCTS = [
  { id: 1,  title: 'Breezy Linen Half Sleeve Shirt', category: 'Casual',      price: 1374, originalPrice: 2499, discount: 45, inventory: 18, image: 'https://images.unsplash.com/photo-1603252109303-2751441dd15e?q=80&w=1000', description: 'Crafted from premium breathable linen, this half-sleeve shirt is perfect for the modern casual wardrobe. Light-weight and easy to style.' },
  { id: 2,  title: 'Classic Formal Blazer Set',       category: 'Formal',      price: 2820, originalPrice: 5499, discount: 48, inventory: 5,  image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000', description: 'A tailored blazer that commands attention. Structured shoulders, clean lapels, and a slim-fit silhouette made for every boardroom.' },
  { id: 3,  title: 'Heritage Poplin Casual Shirt',    category: 'Casual',      price: 1594, originalPrice: 2899, discount: 45, inventory: 22, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000', description: 'Timeless poplin weave with a relaxed fit. This versatile shirt goes from weekend brunches to laid-back office days with ease.' },
  { id: 4,  title: 'Signature Striped Polo',          category: 'Polo',        price: 824,  originalPrice: 1499, discount: 45, inventory: 30, image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000', description: 'Clean, refined, and effortlessly cool. Our signature polo features moisture-wicking fabric and a classic tipped collar.' },
  { id: 5,  title: 'Urban Slim Chinos — Olive',       category: 'Bottom Wear', price: 1299, originalPrice: 2499, discount: 48, inventory: 14, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000', description: 'Slim-fit chinos with a touch of stretch for all-day comfort. The olive tone pairs with almost any top in your wardrobe.' },
  { id: 6,  title: 'Essential Crew Neck Tee',         category: 'T-Shirts',    price: 549,  originalPrice: 999,  discount: 45, inventory: 50, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000', description: '100% ring-spun cotton for a supremely soft feel. A wardrobe staple that never goes out of style.' },
  { id: 7,  title: 'Vintage Denim Jacket',            category: 'Jackets',     price: 2199, originalPrice: 3999, discount: 45, inventory: 8,  image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000', description: 'Washed denim with vintage character. Wear it over a tee or layer it under a coat — it works both ways.' },
  { id: 8,  title: 'Premium Linen Overshirt',         category: 'Casual',      price: 1799, originalPrice: 3299, discount: 45, inventory: 12, image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=1000', description: 'An overshirt to layer or wear open as a jacket. Lightweight linen that breathes through summer and shoulder seasons.' },
  { id: 9,  title: 'Tailored Formal Trousers',        category: 'Formal',      price: 1499, originalPrice: 2799, discount: 46, inventory: 9,  image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000', description: 'Sharp, slim-cut formal trousers with a mid-rise fit and a clean pleat. Pairs seamlessly with our blazer sets.' },
  { id: 10, title: 'Graphic Print Hoodie',            category: 'T-Shirts',    price: 1299, originalPrice: 2299, discount: 43, inventory: 25, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000', description: 'A statement hoodie in heavy-weight fleece. Dropped shoulders, ribbed cuffs, and an iconic DUCH print on the chest.' },
  { id: 11, title: 'Resort Floral Shirt',             category: 'Casual',      price: 1199, originalPrice: 2199, discount: 45, inventory: 17, image: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000', description: 'Vacation-ready with an all-over floral print. Lightweight, breezy, and designed for the man who travels in style.' },
  { id: 12, title: 'Structured Wool Blazer',          category: 'Formal',      price: 3499, originalPrice: 6499, discount: 46, inventory: 4,  image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000', description: 'Premium wool blend blazer with half-canvas construction. A serious investment piece that ages beautifully.' },
  { id: 13, title: 'Cargo Joggers — Charcoal',        category: 'Bottom Wear', price: 999,  originalPrice: 1799, discount: 44, inventory: 28, image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=1000', description: 'Technical cargo joggers with multiple pockets, tapered leg, and an elasticated waistband for all-day wear.' },
  { id: 14, title: 'Classic Pique Polo — White',      category: 'Polo',        price: 749,  originalPrice: 1399, discount: 46, inventory: 35, image: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?q=80&w=1000', description: 'The polo that defines the category. Pique texture, contrast tipping, and a fit that works dressed up or down.' },
  { id: 15, title: 'Relaxed Fit Denim — Indigo',      category: 'Bottom Wear', price: 1699, originalPrice: 2999, discount: 43, inventory: 0,  image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000', description: 'A relaxed silhouette in deep indigo wash. Straight-leg from hip to hem with subtle distressing at the knees.' },
  { id: 16, title: 'Bomber Jacket — Olive Green',     category: 'Jackets',     price: 2499, originalPrice: 4499, discount: 44, inventory: 6,  image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000', description: 'A classic MA-1 silhouette in premium nylon. Ribbed collar, cuffs, and hem with a reversible orange lining.' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [loading, setLoading]     = useState(true);
  const [cartOpen, setCartOpen]   = useState(false);
  const [cart, setCart]           = useState([]);
  const [user, setUser]           = useState(() => {
    const saved = localStorage.getItem('duch-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('duch-products-v6');
    return saved ? JSON.parse(saved) : ALL_PRODUCTS;
  });

  const [promotionalBanners, setPromotionalBanners] = useState(() => {
    const saved = localStorage.getItem('duch-banners-v1');
    return saved ? JSON.parse(saved) : [
      { id: 1, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000', title: 'SEASON SALE' },
      { id: 2, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000', title: 'NEW ARRIVALS' },
      { id: 3, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000', title: 'EXCLUSIVE OFFERS' },
      { id: 4, image: 'https://images.unsplash.com/photo-1534452203294-49c8913721b2?q=80&w=1000', title: 'LIMITED EDITION' },
      { id: 5, image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000', title: 'STYLE ESSENTIALS' },
      { id: 6, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000', title: 'CURATED LOOKS' }
    ];
  });

  const [imagesReady, setImagesReady] = useState(false);

  React.useEffect(() => {
    const criticalImages = [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2000', // Hero desktop/mobile
      ...products.map(p => p.image) // Preload ALL product images for smooth scrolling
    ].filter(Boolean);

    let loadedCount = 0;
    let hasFailed = false;

    // Safety fallback: force ready after 4.5 seconds regardless of image loading
    const fallbackTimer = setTimeout(() => {
      setImagesReady(true);
    }, 4500);

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === criticalImages.length && !hasFailed) {
          clearTimeout(fallbackTimer);
          setImagesReady(true);
        }
      };
    });

    return () => clearTimeout(fallbackTimer);
  }, [products]);

  /* ── Cart actions ── */
  const addToCart = useCallback((product, size = 'M', qty = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      const next = existing
        ? prev.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + qty } : i)
        : [...prev, { ...product, size, qty }];
      return next;
    });
    // setCartOpen(true); removed per user request
  }, []);

  const removeFromCart = useCallback((id, size) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)));
  }, []);

  const updateQty = useCallback((id, size, qty) => {
    if (qty <= 0) { removeFromCart(id, size); return; }
    setCart(prev => prev.map(i => i.id === id && i.size === size ? { ...i, qty } : i));
  }, [removeFromCart]);

  /* ── Auth actions ── */
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('duch-user', JSON.stringify(userData));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('duch-user');
  };
  const handleUpdateUser = (updates) => {
    setUser(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem('duch-user', JSON.stringify(updated));
      return updated;
    });
  };

  /* ── Admin actions ── */
  const updateInventory = (id, qty) => setProducts(prev => { const u = prev.map(p => p.id === id ? { ...p, inventory: qty } : p); localStorage.setItem('duch-products-v6', JSON.stringify(u)); return u; });
  const updatePrice     = (id, price) => setProducts(prev => { const u = prev.map(p => p.id === id ? { ...p, price } : p); localStorage.setItem('duch-products-v6', JSON.stringify(u)); return u; });
  const updateBanner    = (id, image) => setPromotionalBanners(prev => { const u = prev.map(b => b.id === id ? { ...b, image } : b); localStorage.setItem('duch-banners-v1', JSON.stringify(u)); return u; });

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <>
      <div className="noise-overlay" />
      {loading && <Loader onDone={() => setLoading(false)} ready={imagesReady} />}
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-duch-bg relative z-0">
          <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} user={user} onLogin={handleLogin} onLogout={handleLogout} />
          <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} removeFromCart={removeFromCart} updateQty={updateQty} />
          <main className="flex-1">
            <PageTransition>
              <Routes>
                <Route path="/"              element={<Home     products={products} banners={promotionalBanners} addToCart={addToCart} />} />
                <Route path="/shop"          element={<Shop     products={products} addToCart={addToCart} />} />
                <Route path="/shop/:cat"     element={<Shop     products={products} addToCart={addToCart} />} />
                <Route path="/product/:id"  element={<ProductDetail products={products} addToCart={addToCart} />} />
                <Route path="/profile"       element={<Profile  user={user} updateUser={handleUpdateUser} />} />
                <Route path="/wishlist"      element={<Wishlist />} />
                <Route path="/admin"         element={<Admin    products={products} banners={promotionalBanners} updateInventory={updateInventory} updatePrice={updatePrice} updateBanner={updateBanner} user={user} onLogin={handleLogin} />} />
                <Route path="/info/:slug"     element={<InfoPage />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
