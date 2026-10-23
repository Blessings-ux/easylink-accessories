export default function Hero() {
  return (
    <>
      <div className="wrap hero">
        <div>
          <h1>Accessories that keep you linked.</h1>
          <p>
            Chargers, earbuds, power banks and smart watches from brands you trust.
            Same-day delivery in Nairobi, countrywide shipping.
          </p>
          <a className="btn gold" href="#shop">Shop now</a>
        </div>
        <img src="/logo.jpg" alt="" />
      </div>
      <div className="trust">
        <div className="wrap">
          <ul>
            <li>⚡ Same-day delivery</li>
            <li>🛡️ 6-month warranty</li>
            <li>💸 Pay on delivery (Nairobi)</li>
            <li>📦 Countrywide shipping</li>
            <li>🔄 Easy returns</li>
          </ul>
        </div>
      </div>
    </>
  )
}
