import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { FaShoppingCart, FaWhatsapp, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';
import { API_BASE_URL, ADMIN_EMAIL } from '../../config';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Fetch cart count
  useEffect(() => {
    if (user?.email) {
      fetch(`${API_BASE_URL}/cart/${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => setCart(Array.isArray(data) ? data : []))
        .catch(() => setCart([]));
    } else {
      setCart([]);
    }
  }, [user]);

  // Apply theme — sets BOTH data-theme (DaisyUI) AND class="dark" (Tailwind)
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleSignOut = () => {
    logOut().catch(() => {});
    setMenuOpen(false);
  };

  const isAdmin = user && user.email === ADMIN_EMAIL;

  const activeLink = 'text-[#D4AF37] font-bold';
  const normalLink = 'text-gray-700 dark:text-gray-200 hover:text-[#D4AF37] transition-colors duration-200 font-semibold';

  const publicLinks = (
    <>
      <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink>
      <NavLink to={`/brand/HERBA GOLD`} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeLink : normalLink}>Shop</NavLink>
      <NavLink to="/track-order" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeLink : normalLink}>Track Order 📦</NavLink>
      <NavLink to="/contactus" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeLink : normalLink}>Contact</NavLink>
      <a href="https://wa.me/923155757274" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold transition-colors">
        <FaWhatsapp className="text-lg" /><span>WhatsApp</span>
      </a>
    </>
  );

  const adminLinks = (
    <>
      <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink>
      <NavLink to="/manageproduct" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeLink : normalLink}>Products</NavLink>
      <NavLink to="/admin/orders" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeLink : normalLink}>Orders 📦</NavLink>
      <NavLink to="/adminsettings" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeLink : normalLink}>Settings</NavLink>
      <NavLink to="/contactus" onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? activeLink : normalLink}>Contact</NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">

        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="HERBA GOLD" className="h-9 w-auto" />
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            HERBA <span className="text-[#D4AF37]">GOLD</span>
          </span>
        </Link>

        {/* CENTER: Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {isAdmin ? adminLinks : publicLinks}
        </div>

        {/* RIGHT: Always-visible actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">

          {/* Cart icon — always visible */}
          <Link to="/myCart" className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FaShoppingCart className="text-xl text-gray-700 dark:text-gray-200" />
            {cart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D4AF37] text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-0.5">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Dark / Light mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark'
              ? <FaSun className="text-[#D4AF37] text-xl" />
              : <FaMoon className="text-gray-600 text-xl" />
            }
          </button>

          {/* User avatar + name (desktop) */}
          {user && (
            <div className="hidden md:flex items-center gap-2">
              {user.photoURL && (
                <img className="w-8 h-8 rounded-full border-2 border-[#D4AF37]" src={user.photoURL} alt={user.displayName} />
              )}
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[100px] truncate hidden xl:block">
                {user.displayName}
              </span>
            </div>
          )}

          {/* Login / Sign Out (desktop) */}
          {user ? (
            <button
              onClick={handleSignOut}
              className="hidden sm:block btn btn-sm bg-black dark:bg-white text-white dark:text-black hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] dark:hover:text-white border-none rounded-lg px-4 transition-all text-sm font-bold"
            >
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden sm:block btn btn-sm bg-[#D4AF37] text-white hover:bg-black border-none rounded-lg px-5 transition-all text-sm font-bold"
            >
              Login
            </Link>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-gray-800 shadow-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {isAdmin ? adminLinks : publicLinks}

            {/* Login/Sign Out in mobile menu */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    {user.photoURL && <img className="w-9 h-9 rounded-full border-2 border-[#D4AF37]" src={user.photoURL} alt={user.displayName} />}
                    <div>
                      <p className="font-semibold text-sm">{user.displayName}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-[#D4AF37] transition-all"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 bg-[#D4AF37] text-white font-bold rounded-xl text-center hover:bg-black transition-all"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;