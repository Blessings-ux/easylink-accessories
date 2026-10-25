// [photo file name (without .jpg), category, name, price in KSh, emoji]
// Photo for each product: public/products/<file name>.jpg
// If a photo is not .jpg, include the extension in the file name, e.g. 'car-emblems.png'.
// If a photo is missing, the emoji shows instead.
// Lines marked "estimate" are market-price guesses. Replace them with your real prices.
// Lines marked "researched" use Kenyan online prices found in Oct 2026. Update them with your real prices.
const rows = [
  ['soundcore-liberty-4-pro', 'Earbuds & headphones', 'Soundcore Liberty 4 Pro ANC Earbuds', 10000, '🎧'],
  ['soundcore-r50i', 'Earbuds & headphones', 'Soundcore R50i True Wireless Earbuds', 3800, '🎧'],  // estimate, confirm your price
  ['wireless-earbuds-case', 'Earbuds & headphones', 'Wireless Earbuds with Charging Case', 2500, '🎧'],  // estimate, confirm your price
  ['wired-earphones', 'Earbuds & headphones', 'Wired Earphones', 1000, '🎧'],  // researched: basic wired ~KSh 1,000; branded USB-C ones (Apple EarPods, JBL Tune 310C) ~KSh 4,000-4,500
  ['jbl-headphones', 'Earbuds & headphones', 'JBL Wireless Headphones', 6500, '🎧'],  // estimate, confirm your price
  ['anker-20000-225w', 'Power banks', 'Anker 20,000mAh 22.5W Power Bank, Built-in Cable', 8100, '🔋'],
  ['anker-20000-30w-led', 'Power banks', 'Anker 20,000mAh 30W Power Bank with LED', 7000, '🔋'],
  ['anker-zolo-10000', 'Power banks', 'Anker Zolo 10,000mAh Power Bank, Built-in Cable', 4100, '🔋'],
  ['magnetic-power-bank-10000', 'Power banks', 'Magnetic Wireless Power Bank 10,000mAh', 5500, '🔋'],  // estimate, confirm your price
  ['anker-nano-20w', 'Chargers & cables', 'Anker Nano 20W USB-C Charger', 2999, '🔌'],
  ['apple-20w-adapter', 'Chargers & cables', 'Apple 20W USB-C Power Adapter', 2800, '🔌'],  // estimate, confirm your price
  ['gan-65w-charger', 'Chargers & cables', '65W GaN Fast Charger', 3500, '🔌'],  // estimate, confirm your price
  ['cable-usbc-60w', 'Chargers & cables', 'Braided USB-C to USB-C 60W Cable', 1000, '🔌'],  // estimate, confirm your price
  ['cable-lightning', 'Chargers & cables', 'USB-C to Lightning Cable', 1200, '🔌'],  // estimate, confirm your price
  ['wireless-stand-3in1', 'Wireless charging', '3-in-1 Wireless Charging Stand', 4500, '⚡'],  // estimate, confirm your price
  ['wireless-foldable-3in1', 'Wireless charging', 'Foldable Multi-Device Wireless Charger', 3800, '⚡'],  // researched: Jiji Kenya listing, 15W 3-in-1 foldable
  ['magnetic-charger-15w', 'Wireless charging', '15W Magnetic Wireless Charger', 2500, '⚡'],  // estimate, confirm your price
  ['car-charger-retractable', 'Car accessories', 'Retractable Super Fast Car Charger', 3000, '🚗'],  // estimate, confirm your price
  ['car-holder-wireless', 'Car accessories', 'Car Phone Holder with Wireless Charging', 3500, '🚗'],  // estimate, confirm your price
  ['car-cover', 'Car accessories', 'Car Body Cover', 4500, '🚗'],  // estimate, confirm your price
  ['car-emblems.png', 'Car accessories', 'Car Brand Emblems', 1000, '🚗'],  // researched: Jiji Kenya car emblem badge listing ~KSh 1,000 each
  ['samsung-870-evo', 'Storage', 'Samsung 870 EVO SSD 1TB', 13500, '💾'],  // estimate, confirm your price
  ['sandisk-portable-ssd', 'Storage', 'SanDisk Portable SSD 1TB', 13000, '💾'],  // estimate, confirm your price
  ['rugged-drive-2tb', 'Storage', 'Rugged Portable Drive 2TB', 16000, '💾'],  // estimate, confirm your price
  ['sandisk-flash-128', 'Storage', 'SanDisk 128GB Flash Drive', 2000, '💾'],  // estimate, confirm your price
  ['dji-mic-mini', 'Creator gear', 'DJI Mic Mini (1 Transmitter + 1 Receiver)', 15000, '🎙️'],
  ['lavalier-mic-2tx', 'Creator gear', 'Wireless Lavalier Microphone, 2 Transmitters', 4500, '🎙️'],  // estimate, confirm your price
  ['usbc-hub-7in1', 'Hubs & docks', '7-in-1 USB-C Hub', 4500, '🧩'],  // estimate, confirm your price
  ['wireless-mouse', 'Computer accessories', 'Wireless Mouse', 1500, '🖱️'],  // researched: basic wireless mice KSh 700-3,000; Logitech M170 ~KSh 1,400-1,600
  ['laptop-stand-with-cooling-fan', 'Computer accessories', 'Laptop Stand with Cooling Fan', 3000, '💻'],  // researched: Jiji Kenya stands KSh 1,000-3,000; branded Green Lion ~KSh 4,300-4,800
  ['googlechrome-cast-tv-and-remote', 'TV & streaming', 'Google Chromecast with Google TV and Remote', 9500, '📺'],  // researched: Phoneplace Kenya listing (HD model)
  ['samsungs', 'Phones & cases', 'Samsung Galaxy Smartphones', 32000, '📱'],  // researched: "from" price, e.g. Galaxy A26 ~KSh 32,000-35,000; S25 starts ~KSh 108,000. Set per model
  ['iphones', 'Phones & cases', 'iPhones', 105000, '📱'],  // researched: "from" price, iPhone 16 128GB starts ~KSh 105,000. Set per model
  ['iphone-case', 'Phones & cases', 'Premium iPhone Case', 1500, '📱'],  // estimate, confirm your price
  ['case-with-car-logos', 'Phones & cases', 'Phone Case with Car Logos', 1500, '📱'],  // researched: Kenyan phone cases usually KSh 500-2,500
  ['bebe-tab-kids-tablet', 'Tablets & watches', 'Bebe Tab Kids Tablet', 8500, '📱'],  // researched: Phoneplace Kenya, Bebe Tab Space-X 7-inch ~KSh 8,500; other Bebe models cost more. Set per model
  ['apple-watch', 'Tablets & watches', 'Apple Watch', 50000, '⌚'],  // researched: "from" price, Series 10 ~KSh 50,000 in Nairobi; Series 11 starts ~KSh 68,000. Set per model
]

export const products = rows.map(([key, cat, name, price, ico], id) => ({
  id, key, cat, name, brand: 'Easy Link', was: price, now: price, sale: false, ico,
  image: key.includes('.') ? `/products/${key}` : `/products/${key}.jpg`,
}))