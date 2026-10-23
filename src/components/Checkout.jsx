import { useState } from 'react'
import { K } from '../utils.js'
import { WA, TILL, CARD_LINK } from '../config.js'

// While testing, '' works because Vite forwards /api to the backend.
// When the backend is online, set VITE_API_URL to its address.
const API = import.meta.env.VITE_API_URL || ''

export default function Checkout({ open, lines, total, onClose, onOrderSent }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '', code: '' })
  const [method, setMethod] = useState('mpesa')   // 'mpesa' | 'card' | 'cod'
  const [error, setError] = useState('')
  const [sent, setSent] = useState(null)   // after a successful order: { id, waUrl }
  const [busy, setBusy] = useState(false)

  if (!open) return null

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const cardNotReady = method === 'card' && !CARD_LINK

  const label =
    method === 'mpesa' ? 'Confirm M-Pesa payment'
    : method === 'card' ? (CARD_LINK ? 'Pay by card' : 'Card payments coming soon')
    : 'Place order'

  async function place() {
    if (!lines.length || busy) return
    const code = form.code.trim().toUpperCase()
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      return setError('Enter your name, phone number and delivery area.')
    }
    if (method === 'mpesa' && !/^[A-Z0-9]{8,12}$/.test(code)) {
      return setError('Enter the M-Pesa confirmation code from your SMS.')
    }
    setError('')

    if (method === 'card') {
      window.open(CARD_LINK, '_blank')
      return
    }

    setBusy(true)
    try {
      // 1. Save the order on our backend
      const res = await fetch(`${API}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, phone: form.phone, address: form.address,
          method, mpesaCode: code,
          items: lines.map((l) => ({ key: l.key, qty: l.qty })),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not save your order.')

      // 2. Prepare the WhatsApp message (the customer taps a button to send it)
      const items = lines.map((l) => `• ${l.qty} x ${l.name} (${K(l.now * l.qty)})`).join('\n')
      const how = method === 'mpesa' ? `M-Pesa, code ${code}` : 'Cash on delivery'
      const msg =
        `Hello Easy Link Accessories, my order number is ${data.orderId}.\n${items}\n\n` +
        `Total: ${K(data.total)}\nName: ${form.name}\nPhone: ${form.phone}\n` +
        `Delivery: ${form.address}\nPayment: ${how}`
      setSent({ id: data.orderId, waUrl: `https://wa.me/${WA}?text=${encodeURIComponent(msg)}` })
      onOrderSent()
    } catch (e) {
      setError(e.message === 'Failed to fetch'
        ? 'Could not reach the shop server. Please try again, or order on WhatsApp.'
        : e.message)
    } finally {
      setBusy(false)
    }
  }

  function close() { setSent(null); onClose() }

  return (
    <div id="co" className="open" role="dialog" aria-label="Checkout">
      <div className="wrap cow">
        <button className="x back" onClick={close} aria-label="Back to shop">‹ Back</button>

        {sent ? (
          <div>
            <h2>Order received</h2>
            <p>Thank you! Your order number is <b>{sent.id}</b>.</p>
            <p>Tap the button to send your order details to us on WhatsApp. We will confirm your delivery time there.</p>
            <a className="btn gold" href={sent.waUrl} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
            <p><button className="btn" onClick={close}>Back to shop</button></p>
          </div>
        ) : (
          <div>
            <h2>Checkout</h2>
            <div className="box">
              {lines.map((l) => (
                <div className="row" key={l.id}>
                  <div>{l.qty} × {l.name}</div><b>{K(l.now * l.qty)}</b>
                </div>
              ))}
              <div className="tot" style={{ paddingTop: 12 }}><span>Total</span><span>{K(total)}</span></div>
            </div>

            <h3>Delivery details</h3>
            <div className="fld">
              <input value={form.name} onChange={set('name')} placeholder="Full name" autoComplete="name" />
              <input value={form.phone} onChange={set('phone')} type="tel" placeholder="Phone number, e.g. 0712 345 678" autoComplete="tel" />
              <input value={form.address} onChange={set('address')} placeholder="Delivery area and address" autoComplete="street-address" />
            </div>

            <h3>Payment method</h3>
            <div className="pms">
              {[
                ['mpesa', 'M-Pesa', 'Pay with your phone'],
                ['card', 'Visa / Mastercard', 'Global cards accepted'],
                ['cod', 'Cash on delivery', 'Nairobi only'],
              ].map(([val, title, sub]) => (
                <label className="pm" key={val}>
                  <input type="radio" name="pm" value={val} checked={method === val}
                         onChange={() => { setMethod(val); setError('') }} />
                  <span><b>{title}</b><small>{sub}</small></span>
                </label>
              ))}
            </div>

            {method === 'mpesa' && (
              <div className="box">
                <p>
                  1. Open M-Pesa and choose <b>Send Money </b>.<br />
                  2. M-Pesa Number: <b> +254 727 093932</b><br />
                  3. Amount: <b>{K(total)}</b><br />
                  4. Enter the confirmation code from the SMS below.
                </p>
                <input id="code" value={form.code} onChange={set('code')}
                       placeholder="M-Pesa code, e.g. SGH7K2L9QX" maxLength={12} autoCapitalize="characters" />
              </div>
            )}
            {method === 'card' && (
              <div className="box"><p>You will be taken to a secure payment page to enter your card details. We never see or store your card number.</p></div>
            )}
            {method === 'cod' && (
              <div className="box"><p>Pay the rider in cash when your order arrives. Available for Nairobi deliveries only.</p></div>
            )}

            <p className="err" role="alert">{error}</p>
            <button className="btn gold full" onClick={place} disabled={cardNotReady || busy}>{busy ? 'Sending…' : label}</button>
          </div>
        )}
      </div>
    </div>
  )
}