export default function Header({ count, term, setTerm, onOpenCart }) {
  return (
    <header>
      <div className="wrap bar">
        <a className="brand" href="#top">
          <img src="/logo-mark.png" alt="Easy Link Accessories" />
        </a>
        <div className="search">
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search chargers, earbuds, watches…"
            aria-label="Search products"
          />
        </div>
        <button className="cartbtn" onClick={onOpenCart} aria-label="Open cart">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
               strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 3h3l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h8.8a1.5 1.5 0 0 0 1.5-1.1L21 8H6" />
            <circle cx="9.5" cy="20" r="1.4" />
            <circle cx="17.5" cy="20" r="1.4" />
          </svg>
          <b>{count}</b>
        </button>
      </div>
    </header>
  )
}
