export interface Store {
  id: string;
  name: string;
  logo: string;
  theme: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  brand: string;
}

export const stores: Store[] = [
  {
    id: '1',
    name: 'Walmart',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz1Y86WWaVlA-qPIKjhDrxpIf_gPnP4Btw1A&s',
    theme: '#2D3142',
  },
  {
    id: '2',
    name: 'Target',
    logo: 'https://i.pinimg.com/736x/59/68/ad/5968ad704ae1fcf86f6434009592ed41.jpg',
    theme: '#2D3142',
  },
  {
    id: '3',
    name: 'Costco',
    logo: 'https://cdn-icons-png.flaticon.com/512/5977/5977579.png',
    theme: '#2D3142',
  },
];

export const products: Product[] = [
  {
    id: '1',
    storeId: '1',
    name: 'Macbook Pro',
    price: 1299,
    image: 'https://picsum.photos/200',
    description: 'Latest MacBook Pro with M2 chip',
    category: 'Electronics',
    brand: 'Apple',
  },
  {
    id: '2',
    storeId: '2',
    name: 'Nike Air Max',
    price: 129.99,
    image: 'https://picsum.photos/200',
    description: 'Comfortable running shoes',
    category: 'Footwear',
    brand: 'Nike',
  },
  {
    id: '3',
    storeId: '3',
    name: 'Organic Bananas',
    price: 3.99,
    image: 'https://picsum.photos/200',
    description: 'Fresh organic bananas',
    category: 'Groceries',
    brand: 'Organic Farms',
  },
  {
    id: '4',
    storeId: '1',
    name: 'Samsung 4K TV',
    price: 799.99,
    image: 'https://picsum.photos/200',
    description: '55-inch 4K Smart TV',
    category: 'Electronics',
    brand: 'Samsung',
  },
  {
    id: '5',
    storeId: '2',
    name: "Levi's Jeans",
    price: 59.99,
    image: 'https://picsum.photos/200',
    description: 'Classic fit denim jeans',
    category: 'Clothing',
    brand: "Levi's",
  },
  {
    id: '6',
    storeId: '3',
    name: 'Coffee Maker',
    price: 79.99,
    image: 'https://picsum.photos/200',
    description: 'Programmable coffee maker',
    category: 'Appliances',
    brand: 'Cuisinart',
  },
  {
    id: '7',
    storeId: '1',
    name: 'Xbox Series X',
    price: 499.99,
    image: 'https://picsum.photos/200',
    description: 'Next-gen gaming console',
    category: 'Gaming',
    brand: 'Microsoft',
  },
  {
    id: '8',
    storeId: '2',
    name: 'Yoga Mat',
    price: 24.99,
    image: 'https://picsum.photos/200',
    description: 'Non-slip exercise mat',
    category: 'Fitness',
    brand: 'Gaiam',
  },
  {
    id: '9',
    storeId: '3',
    name: 'Kitchen Mixer',
    price: 299.99,
    image: 'https://picsum.photos/200',
    description: 'Professional stand mixer',
    category: 'Appliances',
    brand: 'KitchenAid',
  },
  {
    id: '10',
    storeId: '1',
    name: 'Bluetooth Speaker',
    price: 89.99,
    image: 'https://picsum.photos/200',
    description: 'Portable wireless speaker',
    category: 'Electronics',
    brand: 'JBL',
  },
  {
    id: '11',
    storeId: '2',
    name: 'Backpack',
    price: 45.99,
    image: 'https://picsum.photos/200',
    description: 'Durable school backpack',
    category: 'Accessories',
    brand: 'The North Face',
  },
  {
    id: '12',
    storeId: '3',
    name: 'Protein Powder',
    price: 29.99,
    image: 'https://picsum.photos/200',
    description: 'Whey protein supplement',
    category: 'Health',
    brand: 'Optimum Nutrition',
  },
  {
    id: '13',
    storeId: '1',
    name: 'Digital Camera',
    price: 699.99,
    image: 'https://picsum.photos/200',
    description: 'Mirrorless digital camera',
    category: 'Electronics',
    brand: 'Sony',
  },
  {
    id: '14',
    storeId: '2',
    name: 'Running Shorts',
    price: 19.99,
    image: 'https://picsum.photos/200',
    description: 'Breathable athletic shorts',
    category: 'Clothing',
    brand: 'Under Armour',
  },
  {
    id: '15',
    storeId: '3',
    name: 'Blender',
    price: 149.99,
    image: 'https://picsum.photos/200',
    description: 'High-performance blender',
    category: 'Appliances',
    brand: 'Ninja',
  },
  {
    id: '16',
    storeId: '1',
    name: 'Gaming Mouse',
    price: 69.99,
    image: 'https://picsum.photos/200',
    description: 'RGB gaming mouse',
    category: 'Gaming',
    brand: 'Logitech',
  },
  {
    id: '17',
    storeId: '2',
    name: 'Sunglasses',
    price: 159.99,
    image: 'https://picsum.photos/200',
    description: 'Polarized sunglasses',
    category: 'Accessories',
    brand: 'Ray-Ban',
  },
  {
    id: '18',
    storeId: '3',
    name: 'Air Fryer',
    price: 119.99,
    image: 'https://picsum.photos/200',
    description: 'Digital air fryer',
    category: 'Appliances',
    brand: 'Instant Pot',
  },
  {
    id: '19',
    storeId: '1',
    name: 'Smart Watch',
    price: 249.99,
    image: 'https://picsum.photos/200',
    description: 'Fitness tracking watch',
    category: 'Electronics',
    brand: 'Fitbit',
  },
  {
    id: '20',
    storeId: '2',
    name: 'Water Bottle',
    price: 34.99,
    image: 'https://picsum.photos/200',
    description: 'Insulated steel bottle',
    category: 'Accessories',
    brand: 'Hydro Flask',
  },
];

export const categories: string[] = Array.from(
  new Set(products.map((product) => product.category))
).sort();
