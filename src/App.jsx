import { useEffect, useMemo, useState } from 'react'
import { products } from './data/products.js'
import { WA } from './config.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Shop from './components/Shop.jsx'
import VisitStore from './components/VisitStore.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Checkout from './components/Checkout.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'

function loadCart() {
  try { return JSON.parse(localStorage.getItem('elc')) || {} } catch { return {} }
}

export default function App() {
  const [cart, setCart] = useState(loadCart)       // { productId: quantity }
  const [term, setTerm] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem('elc', JSON.stringify(cart)) } catch {}
  }, [cart])

  const lines = useMemo(
    () => Object.entries(cart).map(([id, qty]) => ({ ...products[id], qty })),
    [cart]
  )
  const total = lines.reduce((sum, l) => sum + l.now * l.qty, 0)
  const count = lines.reduce((sum, l) => sum + l.qty, 0)

  const add = (id) => { setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 })); setCartOpen(true) }
  const inc = (id) => setCart((c) => ({ ...c, [id]: c[id] + 1 }))
  const dec = (id) =>
    setCart((c) => {
      const next = { ...c, [id]: c[id] - 1 }
      if (next[id] <= 0) delete next[id]
      return next
    })

  return (
    <>
      <Header count={count} term={term} setTerm={setTerm} onOpenCart={() => setCartOpen(true)} />
      <main id="top">
        <Hero />
        <Shop products={products} term={term} onAdd={add} />
        <VisitStore />
      </main>
      <Footer />

      <CartDrawer
        open={cartOpen}
        lines={lines}
        total={total}
        onClose={() => setCartOpen(false)}
        onInc={inc}
        onDec={dec}
        onCheckout={() => { setCartOpen(false); setCheckoutOpen(true) }}
      />
      <Checkout
        open={checkoutOpen}
        lines={lines}
        total={total}
        onClose={() => setCheckoutOpen(false)}
        onOrderSent={() => setCart({})}
      />
      <WhatsAppButton number={WA} />
    </>
  )
}
