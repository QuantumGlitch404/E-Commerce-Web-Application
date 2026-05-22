import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const categories = [
  { name: 'Electronics', slug: 'electronics', description: 'Latest gadgets, devices, and tech essentials for the modern lifestyle.', image: { url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600' } },
  { name: 'Fashion', slug: 'fashion', description: 'Curated premium fashion and designer apparel for every occasion.', image: { url: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600' } },
  { name: 'Home & Living', slug: 'home-living', description: 'Transform your space with premium decor and smart home essentials.', image: { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600' } },
  { name: 'Beauty', slug: 'beauty', description: 'Luxury skincare, makeup, and grooming from world-class brands.', image: { url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600' } },
  { name: 'Sports & Fitness', slug: 'sports-fitness', description: 'Professional-grade equipment for athletes and fitness enthusiasts.', image: { url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600' } },
  { name: 'Watches', slug: 'watches', description: 'Luxury timepieces and smartwatches that define precision and style.', image: { url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600' } },
  { name: 'Audio', slug: 'audio', description: 'Immersive audio experiences from studio headphones to portable speakers.', image: { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600' } },
  { name: 'Gaming', slug: 'gaming', description: 'Next-gen gaming consoles, peripherals, and accessories.', image: { url: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600' } },
  { name: 'Footwear', slug: 'footwear', description: 'Premium sneakers, boots, and designer shoes for every style.', image: { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600' } },
  { name: 'Accessories', slug: 'accessories', description: 'Bags, wallets, sunglasses, and jewelry to complete your look.', image: { url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600' } },
];

const productData = [
  // Electronics (0)
  { name: 'Apple MacBook Pro 16" M3 Max', description: 'The most powerful MacBook ever. M3 Max chip with 40-core GPU delivers extraordinary performance for pro workflows. Stunning Liquid Retina XDR display.', price: 249999, originalPrice: 279999, brand: 'Apple', catIdx: 0, isFeatured: true, isBestSeller: true, countInStock: 15, averageRating: 4.9, numOfReviews: 342, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500' },
  { name: 'Samsung Galaxy S24 Ultra', description: 'Galaxy AI is here. The most powerful Galaxy smartphone with built-in AI, 200MP camera, and S Pen. Titanium frame with Gorilla Armor glass.', price: 129999, originalPrice: 139999, brand: 'Samsung', catIdx: 0, isFeatured: true, countInStock: 45, averageRating: 4.7, numOfReviews: 891, image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500' },
  { name: 'Sony Alpha A7R V Mirrorless Camera', description: 'Revolutionary 61MP full-frame mirrorless camera with AI-based autofocus and 8K video capability. Perfect for professional photographers.', price: 319999, originalPrice: 349999, brand: 'Sony', catIdx: 0, isFeatured: true, countInStock: 8, averageRating: 4.8, numOfReviews: 156, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500' },
  { name: 'iPad Pro 12.9" M2 Chip', description: 'Supercharged by the M2 chip. The ultimate iPad experience with Liquid Retina XDR display and Apple Pencil hover.', price: 112999, originalPrice: 124999, brand: 'Apple', catIdx: 0, countInStock: 32, averageRating: 4.6, numOfReviews: 445, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500' },
  { name: 'DJI Mavic 3 Pro Drone', description: 'Triple-camera drone system with Hasselblad main camera. 43-min max flight time, omnidirectional obstacle sensing.', price: 189999, originalPrice: 209999, brand: 'DJI', catIdx: 0, isFeatured: true, countInStock: 12, averageRating: 4.8, numOfReviews: 203, image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500' },

  // Fashion (1)
  { name: 'Hugo Boss Slim-Fit Italian Suit', description: 'Exquisitely tailored slim-fit suit in pure virgin wool from the BOSS mainline collection. Made in Italy with meticulous attention to detail.', price: 84999, originalPrice: 99999, brand: 'Hugo Boss', catIdx: 1, isFeatured: true, countInStock: 18, averageRating: 4.7, numOfReviews: 89, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500' },
  { name: 'Levi\'s Premium 501 Original Jeans', description: 'The iconic straight-fit jean that started it all. Premium selvedge denim with authentic riveted construction.', price: 7999, originalPrice: 9999, brand: 'Levi\'s', catIdx: 1, isBestSeller: true, countInStock: 78, averageRating: 4.5, numOfReviews: 1203, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500' },
  { name: 'Ralph Lauren Oxford Button-Down', description: 'Classic-fit oxford shirt crafted from washed cotton. The definitive American style essential for every wardrobe.', price: 8999, originalPrice: 11999, brand: 'Ralph Lauren', catIdx: 1, countInStock: 54, averageRating: 4.4, numOfReviews: 567, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500' },
  { name: 'Canada Goose Expedition Parka', description: 'Arctic-rated down parka designed for extreme cold. Coyote fur-trimmed hood, TEI 5 rating. The gold standard in cold-weather protection.', price: 119999, originalPrice: 139999, brand: 'Canada Goose', catIdx: 1, isNewArrival: true, countInStock: 6, averageRating: 4.9, numOfReviews: 312, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500' },
  { name: 'Zara Premium Leather Jacket', description: 'Buttery-soft nappa leather biker jacket with asymmetric zip closure. Hand-finished detailing and satin lining.', price: 24999, originalPrice: 29999, brand: 'Zara', catIdx: 1, countInStock: 22, averageRating: 4.3, numOfReviews: 178, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500' },

  // Home & Living (2)
  { name: 'Dyson V15 Detect Vacuum', description: 'Intelligently detects and reports dust with a built-in laser. The most powerful Dyson cordless vacuum with HEPA filtration.', price: 62999, originalPrice: 69999, brand: 'Dyson', catIdx: 2, isFeatured: true, isBestSeller: true, countInStock: 25, averageRating: 4.7, numOfReviews: 678, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500' },
  { name: 'Philips Hue Smart Lighting Kit', description: 'Complete smart home lighting system. 16 million colors, voice control, and automated scenes. Includes bridge and 4 bulbs.', price: 14999, originalPrice: 18999, brand: 'Philips', catIdx: 2, isNewArrival: true, countInStock: 40, averageRating: 4.5, numOfReviews: 892, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab3fe?w=500' },
  { name: 'Nespresso Vertuo Plus Coffee Machine', description: 'Centrifusion technology reads each capsule to deliver barista-quality coffee. Five cup sizes from espresso to alto.', price: 17999, originalPrice: 22999, brand: 'Nespresso', catIdx: 2, countInStock: 35, averageRating: 4.6, numOfReviews: 445, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500' },
  { name: 'Herman Miller Aeron Chair', description: 'The iconic ergonomic office chair remastered. 8Z Pellicle suspension, PostureFit SL spinal support. 12-year warranty.', price: 134999, originalPrice: 149999, brand: 'Herman Miller', catIdx: 2, isFeatured: true, countInStock: 10, averageRating: 4.9, numOfReviews: 234, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500' },
  { name: 'Le Creuset Dutch Oven 5.5 Qt', description: 'Handcrafted in France from premium enameled cast iron. Superior heat retention for slow cooking masterpieces.', price: 34999, originalPrice: 39999, brand: 'Le Creuset', catIdx: 2, countInStock: 28, averageRating: 4.8, numOfReviews: 567, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500' },

  // Beauty (3)
  { name: 'La Mer Crème de la Mer Moisturizer', description: 'The legendary Miracle Broth™ moisturizer. Ultra-rich formula that transforms skin, delivering renewed radiance and youthful vitality.', price: 34999, originalPrice: 39999, brand: 'La Mer', catIdx: 3, isFeatured: true, countInStock: 20, averageRating: 4.8, numOfReviews: 890, image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500' },
  { name: 'Dyson Airwrap Multi-Styler', description: 'Engineered for multiple hair types. Coanda airflow technology curls, waves, smooths, and dries with no extreme heat damage.', price: 45999, originalPrice: 49999, brand: 'Dyson', catIdx: 3, isBestSeller: true, countInStock: 15, averageRating: 4.6, numOfReviews: 1456, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500' },
  { name: 'Tom Ford Noir de Noir Eau de Parfum', description: 'Dark, sensual, and luxurious. A rich blend of black rose, black truffle, vanilla, and patchouli. 100ml bottle.', price: 28999, originalPrice: 32999, brand: 'Tom Ford', catIdx: 3, countInStock: 30, averageRating: 4.7, numOfReviews: 345, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500' },
  { name: 'SK-II Facial Treatment Essence', description: 'The miracle water with over 90% Pitera™. Transforms skin texture, firmness, wrinkle resilience, radiance, and spot control.', price: 16999, originalPrice: 19999, brand: 'SK-II', catIdx: 3, isNewArrival: true, countInStock: 25, averageRating: 4.5, numOfReviews: 678, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=500' },
  { name: 'Charlotte Tilbury Magic Foundation', description: 'Award-winning flawless-finish foundation with a buildable, medium coverage. Infused with anti-aging peptides.', price: 4299, originalPrice: 4999, brand: 'Charlotte Tilbury', catIdx: 3, countInStock: 60, averageRating: 4.4, numOfReviews: 923, image: 'https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=500' },

  // Sports & Fitness (4)
  { name: 'Peloton Bike+ Indoor Cycling', description: 'The ultimate connected fitness experience. 24" rotating HD touchscreen, auto-resistance, Apple GymKit integration.', price: 219999, originalPrice: 249999, brand: 'Peloton', catIdx: 4, isFeatured: true, countInStock: 8, averageRating: 4.7, numOfReviews: 567, image: 'https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=500' },
  { name: 'Theragun PRO Plus Massage Gun', description: 'Professional-grade percussive therapy device with app-guided routines. QuietForce Technology and ergonomic multi-grip design.', price: 44999, originalPrice: 54999, brand: 'Therabody', catIdx: 4, isBestSeller: true, countInStock: 20, averageRating: 4.6, numOfReviews: 789, image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500' },
  { name: 'Lululemon Align High-Rise Pant', description: 'Weightless Nulu™ fabric feels buttery soft against your skin. Designed for yoga with a barely-there sensation.', price: 9999, originalPrice: 12999, brand: 'Lululemon', catIdx: 4, countInStock: 65, averageRating: 4.8, numOfReviews: 2345, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500' },
  { name: 'Garmin Fenix 7X Solar GPS Watch', description: 'The ultimate multisport GPS watch. Solar charging, 37 days battery life, topo maps, and multi-band GPS.', price: 79999, originalPrice: 89999, brand: 'Garmin', catIdx: 4, isNewArrival: true, countInStock: 14, averageRating: 4.8, numOfReviews: 456, image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500' },
  { name: 'TRX PRO4 Suspension Training System', description: 'Military-grade suspension trainer used by elite athletes. Full-body workout anywhere. Steel carabiners, rubber handles.', price: 21999, originalPrice: 24999, brand: 'TRX', catIdx: 4, countInStock: 35, averageRating: 4.5, numOfReviews: 234, image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500' },

  // Watches (5)
  { name: 'Rolex Submariner Date', description: 'The reference among divers\' watches. Oystersteel, Cerachrom bezel, 300m water resistance. The icon of horology.', price: 1099999, originalPrice: 1099999, brand: 'Rolex', catIdx: 5, isFeatured: true, countInStock: 3, averageRating: 5.0, numOfReviews: 89, image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500' },
  { name: 'Apple Watch Ultra 2', description: 'The most rugged and capable Apple Watch. Titanium case, 3000 nits display, precision dual-frequency GPS.', price: 89999, originalPrice: 99999, brand: 'Apple', catIdx: 5, isBestSeller: true, countInStock: 22, averageRating: 4.7, numOfReviews: 1234, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500' },
  { name: 'Omega Speedmaster Moonwatch', description: 'The first watch worn on the Moon. Manual-winding chronograph with Hesalite crystal and legendary calibre 3861.', price: 649999, originalPrice: 649999, brand: 'Omega', catIdx: 5, isFeatured: true, countInStock: 5, averageRating: 4.9, numOfReviews: 178, image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500' },
  { name: 'TAG Heuer Carrera Chronograph', description: 'Race-inspired chronograph with the new TH20-00 movement. 44mm steel case, ceramic bezel, and exhibition caseback.', price: 449999, originalPrice: 499999, brand: 'TAG Heuer', catIdx: 5, countInStock: 7, averageRating: 4.6, numOfReviews: 123, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=500' },
  { name: 'Casio G-Shock MR-G Titanium', description: 'The pinnacle of G-Shock. Full titanium construction, GPS solar, Bluetooth connectivity. Made in Japan.', price: 219999, originalPrice: 249999, brand: 'Casio', catIdx: 5, isNewArrival: true, countInStock: 9, averageRating: 4.7, numOfReviews: 67, image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=500' },

  // Audio (6)
  { name: 'Sony WH-1000XM5 Headphones', description: 'Industry-leading noise cancellation with Auto NC Optimizer. 30-hour battery, multipoint connection, and crystal-clear calls.', price: 29999, originalPrice: 34999, brand: 'Sony', catIdx: 6, isFeatured: true, isBestSeller: true, countInStock: 45, averageRating: 4.7, numOfReviews: 3456, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500' },
  { name: 'AirPods Max', description: 'High-fidelity audio with Active Noise Cancellation. Custom-built driver, H1 chip, and computational audio for immersive sound.', price: 59999, originalPrice: 69999, brand: 'Apple', catIdx: 6, countInStock: 18, averageRating: 4.5, numOfReviews: 1890, image: 'https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=500' },
  { name: 'Bose QuietComfort Ultra Earbuds', description: 'World-class noise cancellation in a wireless earbud. Immersive Audio with Bose spatial sound technology.', price: 24999, originalPrice: 29999, brand: 'Bose', catIdx: 6, isNewArrival: true, countInStock: 30, averageRating: 4.6, numOfReviews: 789, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500' },
  { name: 'Marshall Stanmore III Bluetooth Speaker', description: 'Iconic rock \'n\' roll design meets cutting-edge sound technology. Thunderous bass, detailed highs, and wide soundstage.', price: 39999, originalPrice: 44999, brand: 'Marshall', catIdx: 6, countInStock: 22, averageRating: 4.8, numOfReviews: 567, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500' },
  { name: 'Sennheiser HD 660S2 Audiophile Headphones', description: 'Open-back reference headphones for purists. Hand-selected transducers, velour ear cushions, and neutral sound signature.', price: 54999, originalPrice: 59999, brand: 'Sennheiser', catIdx: 6, countInStock: 12, averageRating: 4.9, numOfReviews: 234, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500' },

  // Gaming (7)
  { name: 'PlayStation 5 Pro Console', description: 'The most powerful PlayStation ever. Enhanced GPU, AI upscaling, 8K support, and ultra-high-speed SSD for next-gen gaming.', price: 59999, originalPrice: 64999, brand: 'Sony', catIdx: 7, isFeatured: true, isBestSeller: true, countInStock: 10, averageRating: 4.8, numOfReviews: 2345, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500' },
  { name: 'Razer BlackWidow V4 Pro Keyboard', description: 'Premium mechanical gaming keyboard with Razer Green switches. Magnetic wrist rest, command dial, and Chroma RGB.', price: 22999, originalPrice: 27999, brand: 'Razer', catIdx: 7, countInStock: 28, averageRating: 4.5, numOfReviews: 678, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500' },
  { name: 'LG 27GR95QE 27" OLED Gaming Monitor', description: '27" QHD OLED with 240Hz refresh rate, 0.03ms response time, and anti-glare low reflection coating. True blacks for gaming.', price: 89999, originalPrice: 99999, brand: 'LG', catIdx: 7, isNewArrival: true, countInStock: 14, averageRating: 4.7, numOfReviews: 345, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500' },
  { name: 'SteelSeries Arctis Nova Pro Wireless', description: 'Premium wireless gaming headset with Active Noise Cancellation. Infinity battery system, hi-res certified.', price: 34999, originalPrice: 39999, brand: 'SteelSeries', catIdx: 7, countInStock: 20, averageRating: 4.6, numOfReviews: 456, image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=500' },
  { name: 'NVIDIA GeForce RTX 4090 Founders Edition', description: 'The ultimate GPU for gamers and creators. 24GB GDDR6X, DLSS 3.5, ray tracing, and AI-powered performance.', price: 159999, originalPrice: 179999, brand: 'NVIDIA', catIdx: 7, isFeatured: true, countInStock: 5, averageRating: 4.9, numOfReviews: 567, image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500' },

  // Footwear (8)
  { name: 'Nike Air Jordan 1 Retro High OG', description: 'The shoe that started it all. Premium leather upper, Air-Sole unit, and iconic Wings logo. A timeless sneaker legend.', price: 16999, originalPrice: 18999, brand: 'Nike', catIdx: 8, isFeatured: true, isBestSeller: true, countInStock: 25, averageRating: 4.8, numOfReviews: 4567, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500' },
  { name: 'Adidas Ultraboost Light', description: 'Our lightest Ultraboost ever. Energy-returning BOOST midsole, Primeknit+ upper, and Continental rubber outsole.', price: 14999, originalPrice: 17999, brand: 'Adidas', catIdx: 8, isNewArrival: true, countInStock: 40, averageRating: 4.6, numOfReviews: 1234, image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500' },
  { name: 'New Balance 990v6 Made in USA', description: 'The pinnacle of comfort and quality. ENCAP midsole with FuelCell cushioning. Pigskin suede and mesh upper.', price: 21999, originalPrice: 24999, brand: 'New Balance', catIdx: 8, countInStock: 18, averageRating: 4.7, numOfReviews: 890, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500' },
  { name: 'Dr. Martens 1460 Pascal Boots', description: 'The classic 8-eye boot in ultra-soft Virginia Nappa leather. Air-cushion sole, Goodyear welted for lifetime durability.', price: 17999, originalPrice: 19999, brand: 'Dr. Martens', catIdx: 8, countInStock: 30, averageRating: 4.5, numOfReviews: 678, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500' },
  { name: 'Salomon XT-6 Advanced Trail Runners', description: 'Technical trail running shoe with Quicklace system. Contagrip MA outsole, Advanced Chassis, and ortholite sockliner.', price: 18999, originalPrice: 21999, brand: 'Salomon', catIdx: 8, countInStock: 22, averageRating: 4.6, numOfReviews: 345, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500' },

  // Accessories (9)
  { name: 'Ray-Ban Aviator Classic', description: 'The original icon. Gold frame with green G-15 lenses. 100% UV protection. Timeless style since 1937.', price: 15999, originalPrice: 17999, brand: 'Ray-Ban', catIdx: 9, isBestSeller: true, countInStock: 50, averageRating: 4.6, numOfReviews: 3456, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500' },
  { name: 'Louis Vuitton Keepall Bandoulière 55', description: 'The legendary travel companion in Monogram canvas. Natural cowhide leather trimmings, padlock, and removable strap.', price: 179999, originalPrice: 179999, brand: 'Louis Vuitton', catIdx: 9, isFeatured: true, countInStock: 4, averageRating: 4.9, numOfReviews: 234, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500' },
  { name: 'Montblanc Meisterstück Wallet', description: 'Iconic 6cc wallet in European full-grain cowhide with unique Montblanc deep shine. Palladium-coated emblem.', price: 34999, originalPrice: 39999, brand: 'Montblanc', catIdx: 9, countInStock: 15, averageRating: 4.7, numOfReviews: 178, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500' },
  { name: 'Cartier Love Bracelet', description: 'The ultimate symbol of love. 18K rose gold bracelet with screw motifs. Comes with special screwdriver.', price: 699999, originalPrice: 699999, brand: 'Cartier', catIdx: 9, isFeatured: true, countInStock: 2, averageRating: 5.0, numOfReviews: 456, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500' },
  { name: 'Tumi Alpha 3 Brief Pack', description: 'Convertible 3-way business backpack in ballistic nylon. Multiple organizational pockets, USB charging port.', price: 54999, originalPrice: 64999, brand: 'Tumi', catIdx: 9, countInStock: 16, averageRating: 4.5, numOfReviews: 234, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500' },
];

export const seedDB = async () => {
  try {
    // Check if we need to connect, or if Mongoose is already connected (like from MongoMemoryServer)
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('✅ MongoDB Connected for seeding');
    } else {
      console.log('✅ Using existing MongoDB connection for seeding');
    }

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user if not exists
    let admin = await User.create({
      name: 'Admin User',
      email: 'admin@luxeshop.com',
      password: 'Admin@123',
      role: 'admin',
      emailVerified: true,
    });
    console.log('👤 Admin user created: admin@luxeshop.com / Admin@123');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log(`📁 ${createdCategories.length} categories created`);

    // Create products
    const products = productData.map((p) => ({
      name: p.name,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice,
      brand: p.brand,
      category: createdCategories[p.catIdx]._id,
      isFeatured: p.isFeatured || false,
      isBestSeller: p.isBestSeller || false,
      isNewArrival: p.isNewArrival || false,
      countInStock: p.countInStock,
      averageRating: p.averageRating,
      numOfReviews: p.numOfReviews,
      images: [{ public_id: `seed_${Date.now()}_${Math.random()}`, url: p.image }],
      user: admin._id,
    }));

    // Create products one by one to trigger pre-save hooks (like slug generation)
    for (const p of products) {
      await Product.create(p);
    }
    console.log(`📦 ${products.length} products created`);

    console.log('\n🎉 Seed data loaded successfully!\n');
    return true;
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    return false;
  }
};

// Only run standalone if called directly from CLI (hack for ES modules)
if (process.argv[1] && process.argv[1].includes('seedData.js')) {
  seedDB().then(() => process.exit(0)).catch(() => process.exit(1));
}
