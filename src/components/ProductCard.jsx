import { useState } from 'react'
import { K } from '../utils.js'

export default function ProductCard({ p, onAdd }) {
  const [broken, setBroken] = useState(false)   // true if the photo file is missing

  return (
    <article className="card">
      <div className="thumb">
        {p.sale && <span className="off">-{Math.round(100 - (p.now / p.was) * 100)}%</span>}
        {p.image && !broken ? (
          <img src={p.image} alt={p.name} loading="lazy" onError={() => setBroken(true)} />
        ) : (
          p.ico
        )}
      </div>
      <div className="info">
        <small>{p.cat}</small>
        <h3>{p.name}</h3>
        <div className="price">
          {K(p.now)}
          {p.sale && <s>{K(p.was)}</s>}
        </div>
        <button className="add" onClick={() => onAdd(p.id)}>Add to cart</button>
      </div>
    </article>
  )
}
