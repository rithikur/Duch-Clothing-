import { Link } from 'react-router-dom';

export default function Wishlist() {
  return (
    <div className="pt-[15vh] pb-24 px-6 md:px-12 max-w-[1440px] mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-8 opacity-20 text-duch-black">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">YOUR WISHLIST IS EMPTY</h1>
      <p className="font-body text-sm text-black/50 mb-10 max-w-md leading-relaxed">
        Looks like you haven't added anything to your wishlist yet. Explore our latest collections to find your perfect fit.
      </p>
      <Link to="/shop" className="bg-duch-black text-white font-body text-[11px] tracking-widest px-8 py-3.5 hover:bg-black/80 transition-colors shadow-lg">
        DISCOVER NEW ARRIVALS
      </Link>
    </div>
  );
}
