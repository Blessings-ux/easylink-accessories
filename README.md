# Easy Link Accessories: online store

React + Vite storefront. Cart, checkout (M-Pesa, Visa/Mastercard, cash on delivery) and WhatsApp ordering.

## Run it on your computer
1. Install Node.js (the LTS version) from https://nodejs.org
2. Open a terminal in this folder and run:
   ```
   npm install
   npm run dev
   ```
3. Open the address it prints (usually http://localhost:5173)

## Put it online
```
npm run build
```
This creates a `dist` folder. Upload it to Netlify, Vercel or GitHub Pages.

## What to edit
- `src/config.js`: WhatsApp number, M-Pesa Till number, card payment link, Instagram link
- `src/data/products.js`: your products and prices
- `public/logo.jpg`: your logo
- `src/styles.css`: colours and layout (colours are at the top, in `:root`)

## Folder map
```
index.html              page shell
src/main.jsx            starts the app
src/App.jsx             cart logic + puts the pieces together
src/components/         Header, Hero, Shop, ProductCard, CartDrawer, Checkout, ...
src/data/products.js    product list
src/config.js           your business settings
src/styles.css          all styling
```

## Next: backend (Node.js)
Coming later: a server to save orders, confirm M-Pesa payments automatically (Daraja STK push), and handle card payments.
