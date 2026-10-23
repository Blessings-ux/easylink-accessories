// Easy Link backend: receives orders from the website and saves them.
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { products } from '../src/data/products.js'   // same product list as the website

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json')
const PORT = process.env.PORT || 4000
const ADMIN_KEY = process.env.ADMIN_KEY || ''

fs.mkdirSync(DATA_DIR, { recursive: true })
if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, '[]')

const readOrders = () => JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'))
const saveOrders = (list) => fs.writeFileSync(ORDERS_FILE, JSON.stringify(list, null, 2))

const app = express()
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || true }))
app.use(express.json({ limit: '50kb' }))

// 1. Is the kitchen open?
app.get('/api/health', (req, res) => res.json({ ok: true, shop: 'Easy Link Accessories' }))

// 2. A customer sends an order
app.post('/api/orders', (req, res) => {
  const { name, phone, address, method, mpesaCode, items } = req.body || {}
  const clean = (v, max) => String(v ?? '').trim().slice(0, max)

  const customer = { name: clean(name, 80), phone: clean(phone, 20), address: clean(address, 200) }
  if (!customer.name || !customer.phone || !customer.address) {
    return res.status(400).json({ error: 'Name, phone and delivery area are required.' })
  }
  if (!['mpesa', 'cod'].includes(method)) {
    return res.status(400).json({ error: 'Choose M-Pesa or cash on delivery.' })
  }
  const code = clean(mpesaCode, 12).toUpperCase()
  if (method === 'mpesa' && !/^[A-Z0-9]{8,12}$/.test(code)) {
    return res.status(400).json({ error: 'Enter the M-Pesa confirmation code from your SMS.' })
  }
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    return res.status(400).json({ error: 'Your cart is empty.' })
  }

  // The server looks up prices itself. It never trusts prices sent by the browser.
  let total = 0
  const lines = []
  for (const it of items) {
    const p = products.find((x) => x.key === it.key)
    const qty = Number(it.qty)
    if (!p || !Number.isInteger(qty) || qty < 1 || qty > 20) {
      return res.status(400).json({ error: 'One of the items in your cart is not valid.' })
    }
    total += p.now * qty
    lines.push({ key: p.key, name: p.name, price: p.now, qty })
  }

  const order = {
    id: 'EL-' + Date.now().toString(36).toUpperCase(),
    createdAt: new Date().toISOString(),
    status: 'new',
    customer,
    payment: { method, mpesaCode: method === 'mpesa' ? code : null, verified: false },
    items: lines,
    total,
  }
  const all = readOrders()
  all.push(order)
  saveOrders(all)
  console.log(`New order ${order.id}: KSh ${total} from ${customer.name}`)
  res.status(201).json({ ok: true, orderId: order.id, total })
})

// 3. The owner reads the orders (needs the secret key)
app.get('/api/orders', (req, res) => {
  if (!ADMIN_KEY || req.get('x-admin-key') !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Not allowed.' })
  }
  res.json(readOrders().reverse())
})

app.listen(PORT, () => console.log(`Easy Link backend running on http://localhost:${PORT}`))
