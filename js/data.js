/**
 * Static records mirror future Supabase tables. Prices are numeric INR values.
 * Replace these arrays with `data` from select('*') without changing renderers.
 * All records use snake_case fields; is_veg: null means not a food classification.
 * Venue details and prices are illustrative, not live listings.
 */
export const menuItems = [
  { id: 1, name: 'Truffle Parmesan Fries', category: 'Bar Bites', price: 325, description: 'Golden fries, white truffle oil, aged parmesan, and a little parsley magic.', is_veg: true, is_featured: true, label: 'CROWD FAVOURITE' },
  { id: 2, name: 'Guntur Chilli Chicken', category: 'Bar Bites', price: 425, description: 'Crispy chicken tossed in fiery Guntur chillies, curry leaves, and garlic.', is_veg: false, is_featured: false, label: null },
  { id: 3, name: 'Smoked Paneer Tikka', category: 'Bar Bites', price: 395, description: 'Char-kissed paneer, a smoky yoghurt marinade, and fresh mint chutney.', is_veg: true, is_featured: false, label: null },
  { id: 4, name: 'Butter Garlic Prawns', category: 'Bar Bites', price: 545, description: 'Juicy prawns in browned garlic butter, finished with lemon and herbs.', is_veg: false, is_featured: false, label: null },
  { id: 5, name: 'Wild Mushroom Risotto', category: 'Mains', price: 575, description: 'Creamy arborio rice, woodland mushrooms, parmesan, and truffle essence.', is_veg: true, is_featured: false, label: null },
  { id: 6, name: 'The TITOS Chicken Steak', category: 'Mains', price: 625, description: 'Flame-grilled chicken, silky mash, seasonal greens, and peppercorn jus.', is_veg: false, is_featured: true, label: "CHEF'S PICK" },
  { id: 7, name: 'Basil Pesto Primavera', category: 'Mains', price: 495, description: 'Penne, house-made basil pesto, roasted vegetables, and toasted pine nuts.', is_veg: true, is_featured: false, label: null },
  { id: 8, name: 'Golden Hour', category: 'Signature Cocktails', price: 595, description: 'Bourbon, passion fruit, honey, and citrus. A sunset, served over ice.', is_veg: null, is_featured: true, label: 'HOUSE SIGNATURE' },
  { id: 9, name: 'Bangalore After Dark', category: 'Signature Cocktails', price: 625, description: 'Dark rum meets cold-brew coffee, cacao bitters, and a whisper of orange.', is_veg: null, is_featured: false, label: null },
  { id: 10, name: 'The Botanical Garden', category: 'Signature Cocktails', price: 575, description: 'Gin, fresh cucumber, elderflower, and fragrant rosemary. Bright and easy.', is_veg: null, is_featured: false, label: null },
  { id: 11, name: 'Pink Guava Spritz', category: 'Mocktails', price: 295, description: 'Pink guava, lime, a chilli-salt rim, and sparkling soda. All the spirit, zero spirits.', is_veg: null, is_featured: false, label: null },
  { id: 12, name: 'Sunset in the Tropics', category: 'Mocktails', price: 325, description: 'Pineapple, passion fruit, coconut water, and mint. An island state of mind.', is_veg: null, is_featured: false, label: null },
  { id: 13, name: 'Kingfisher Ultra', category: 'Beers & Spirits', price: 295, description: 'A crisp, easy-drinking premium lager. 330 ml of laid-back refreshment.', is_veg: null, is_featured: false, label: null },
  { id: 14, name: 'Bira 91 White', category: 'Beers & Spirits', price: 345, description: 'A cloudy wheat beer with soft citrus notes and a refreshingly smooth finish. 330 ml.', is_veg: null, is_featured: false, label: null },
  { id: 15, name: 'Jameson Irish Whiskey', category: 'Beers & Spirits', price: 395, description: 'Triple-distilled, beautifully balanced. Vanilla, toasted oak, and gentle spice. 30 ml.', is_veg: null, is_featured: false, label: null },
];

// Only one local photo is currently available. Reuse it until more are supplied.
// Image paths are relative to index.html, including when used by the lightbox.
export const galleryImages = [
  { id: 1, image_url: 'img/unnamed.webp', alt_text: 'Bar interior with warm pendant lights and lounge seating', caption: 'A seat for every kind of evening.', category: 'The space' },
  { id: 2, image_url: 'img/unnamed.webp', alt_text: 'Bottle-lined shelves behind the illuminated bar counter', caption: 'Your next evening starts here.', category: 'The bar' },
  { id: 3, image_url: 'img/unnamed.webp', alt_text: 'Tables and upholstered seating in the bar lounge', caption: 'Settle in. Stay a little longer.', category: 'The lounge' },
  { id: 4, image_url: 'img/unnamed.webp', alt_text: 'Atmospheric bar with amber lighting and a stone-fronted counter', caption: 'The city outside. Your world inside.', category: 'The mood' },
  { id: 5, image_url: 'img/unnamed.webp', alt_text: 'Glowing pendant lights above the bar and seating area', caption: 'Here’s to one more story.', category: 'The moments' },
  { id: 6, image_url: 'img/unnamed.webp', alt_text: 'Comfortable lounge seating facing the warmly lit bar', caption: 'Make yourself at home.', category: 'The welcome' },
];