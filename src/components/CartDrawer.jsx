import { K } from '../utils.js'

export default function CartDrawer({ open, lines, total, onClose, onInc, onDec, onCheckout }) {
  return (
    <>
      <div id="scrim" className={open ? 'open' : ''} onClick={onClose} />
      <aside id="drawer" className={open ? 'open' : ''} aria-label="Cart">
        <div className="dh">
          <h2>Your cart</h2>
          <button className="x" onClick={onClose} aria-label="Close cart">×</button>
        </div>
        <div id="items">
          {lines.length ? (
            lines.map((l) => (
              <div className="row" key={l.id}>
                <div>{l.name}<br /><small>{K(l.now)}</small></div>
                <b>{K(l.now * l.qty)}</b>
                <div className="q">
                  <button onClick={() => onDec(l.id)} aria-label="Remove one">−</button>
                  {l.qty}
                  <button onClick={() => onInc(l.id)} aria-label="Add one">+</button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty">Your cart is empty. Add something from the shop.</p>
          )}
        </div>
        <div className="df">
          <div className="tot"><span>Total</span><span>{K(total)}</span></div>
          <button className="btn gold" onClick={onCheckout} disabled={!lines.length}>Checkout</button>
        </div>
      </aside>
    </>
  )
}
