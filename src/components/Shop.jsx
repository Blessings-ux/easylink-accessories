import { useState } from 'react'
import ProductCard from './ProductCard.jsx'

export default function Shop({ products, term, onAdd }) {
  const [cat, setCat] = useState('All')
  const cats = ['All', ...new Set(products.map((p) => p.cat))]
  const list = products.filter(
    (p) => (cat === 'All' || p.cat === cat) && p.name.toLowerCase().includes(term.toLowerCase())
  )

  return (
    <section id="shop">
      <div className="wrap">
        <h2>Shop all</h2>
        <div className="chips">
          {cats.map((c) => (
            <button key={c} className="chip" aria-pressed={c === cat} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid">
          {list.length ? (
            list.map((p) => <ProductCard key={p.id} p={p} onAdd={onAdd} />)
          ) : (
            <p className="empty">No products match. Try another word or category.</p>
          )}
        </div>
      </div>
    </section>
  )
}
