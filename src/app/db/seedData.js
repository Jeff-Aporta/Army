/**
 * Seed data for the Army store
 * Populates localStorage with test products
 */

import { COLLECTIONS, getAll } from './localStorage';
import { createProduct } from './services/productService';
import { CATEGORIES, COLORS, MATERIALS, SIZES } from './models/Product';

/**
 * Generate a realistic picsum image URL with military dimensions
 * @param {number} id - The image ID (1-1000)
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {Object} ImgBB-like response structure
 */
const generateProductImage = (id, width = 800, height = 600) => {
  // Create a seed ID between 1-1000 for picsum
  const imageId = ((id * 13) % 1000) + 1;
  const filename = `product_${id}.jpg`;
  
  const baseUrl = `https://picsum.photos/id/${imageId}`;
  const mainUrl = `${baseUrl}/${width}/${height}`;
  const thumbUrl = `${baseUrl}/200/200`;
  const mediumUrl = `${baseUrl}/400/300`;
  
  return {
    data: {
      id: `pic${imageId}`,
      title: filename,
      url_viewer: mainUrl,
      url: mainUrl,
      display_url: mainUrl,
      width: width,
      height: height,
      size: width * height / 10,
      time: Math.floor(Date.now() / 1000),
      expiration: "0",
      image: {
        filename: filename,
        name: `product_${id}`,
        mime: "image/jpeg",
        extension: "jpg",
        url: mainUrl,
      },
      thumb: {
        filename: filename,
        name: `product_${id}`,
        mime: "image/jpeg",
        extension: "jpg",
        url: thumbUrl,
      },
      medium: {
        filename: filename,
        name: `product_${id}`,
        mime: "image/jpeg",
        extension: "jpg",
        url: mediumUrl,
      },
      delete_url: '#'
    },
    success: true,
    status: 200
  };
};

/**
 * Get a random element from an array
 * @param {Array} array - The array to pick from
 * @returns {*} A random element
 */
const randomPick = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Get multiple random elements from an array
 * @param {Array} array - The array to pick from
 * @param {number} count - Maximum number of items to pick
 * @returns {Array} Array of random elements
 */
const randomMultiplePick = (array, count) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * count) + 1);
};

/**
 * Generate a random price between min and max
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {number} Random price
 */
const randomPrice = (min, max) => {
  const price = Math.floor(Math.random() * (max - min + 1) + min);
  // Round to nearest 900 or 990 for realistic pricing
  return Math.ceil(price / 1000) * 1000 - (Math.random() > 0.5 ? 100 : 10);
};

// Sample product data
const sampleProducts = [
  {
    name: "Chaleco Táctico Multifuncional",
    description: "Chaleco táctico fabricado con materiales de alta resistencia, perfecto para operaciones militares y actividades al aire libre. Múltiples bolsillos y configuraciones.",
    price: randomPrice(150000, 450000),
    category: "tactical",
    stock: Math.floor(Math.random() * 30) + 5,
    variations: {
      colors: randomMultiplePick(COLORS.map(c => c.name), 3),
      sizes: randomMultiplePick(SIZES.filter(s => !s.match(/^[0-9]+$/)), 4),
      materials: randomMultiplePick(["Cordura", "Nylon", "Poliéster"], 2)
    }
  },
  {
    name: "Botas de Combate Impermeables",
    description: "Botas militares de alto rendimiento con suela antideslizante y material impermeable. Diseñadas para terrenos difíciles y condiciones extremas.",
    price: randomPrice(280000, 520000),
    category: "tactical",
    stock: Math.floor(Math.random() * 40) + 10,
    variations: {
      colors: randomMultiplePick(["Negro", "Marrón Táctico", "Tan"], 3),
      sizes: randomMultiplePick(["38", "40", "42", "44", "46"], 5),
      materials: randomMultiplePick(["Cuero", "Gore-Tex", "Cordura"], 2)
    }
  },
  {
    name: "Mochila Táctica 50L",
    description: "Mochila de alta capacidad con sistema MOLLE para accesorios adicionales. Ideal para operaciones tácticas de larga duración y expediciones.",
    price: randomPrice(200000, 380000),
    category: "tactical",
    stock: Math.floor(Math.random() * 25) + 5,
    variations: {
      colors: randomMultiplePick(["Negro", "Verde Militar", "Tan", "Camo"], 4),
      sizes: ["50L"],
      materials: randomMultiplePick(["Cordura", "Nylon Ripstop", "Poliéster"], 2)
    },
    featured: true
  },
  {
    name: "Casco Balístico Nivel IIIA",
    description: "Casco de protección balística certificado para detener proyectiles de hasta nivel IIIA. Incluye sistema de ajuste rápido y rieles para accesorios.",
    price: randomPrice(800000, 1200000),
    category: "protection",
    stock: Math.floor(Math.random() * 15) + 3,
    variations: {
      colors: randomMultiplePick(["Negro", "Verde Militar", "Tan"], 3),
      sizes: randomMultiplePick(["M", "L", "XL"], 3),
      materials: ["Kevlar", "Polietileno"]
    }
  },
  {
    name: "Uniforme Camuflaje Bosque",
    description: "Uniforme militar con patrón de camuflaje para entornos boscosos. Confeccionado con telas resistentes a la abrasión y de secado rápido.",
    price: randomPrice(120000, 250000),
    category: "uniform",
    stock: Math.floor(Math.random() * 50) + 20,
    variations: {
      colors: ["Verde Militar", "Camo"],
      sizes: randomMultiplePick(SIZES.filter(s => !s.match(/^[0-9]+$/)), 5),
      materials: ["Algodón", "Poliéster", "Ripstop"]
    }
  },
  {
    name: "Gafas Tácticas Balísticas",
    description: "Gafas de protección con resistencia al impacto balístico. Lentes intercambiables para diferentes condiciones de luz y protección UV.",
    price: randomPrice(90000, 180000),
    category: "accessories",
    stock: Math.floor(Math.random() * 35) + 15,
    variations: {
      colors: randomMultiplePick(["Negro", "Tan"], 2),
      sizes: ["Única"],
      materials: ["Policarbonato", "Nylon"]
    },
    featured: true
  },
  {
    name: "Radio Táctica de 2 Vías",
    description: "Radio de comunicación táctica con encriptación y largo alcance. Resistente al agua y con batería de larga duración.",
    price: randomPrice(350000, 650000),
    category: "accessories",
    stock: Math.floor(Math.random() * 20) + 8,
    variations: {
      colors: ["Negro"],
      sizes: ["Única"],
      materials: ["Plástico Reforzado", "Metal"]
    }
  },
  {
    name: "Sleeping Bag Militar -20°C",
    description: "Saco de dormir para condiciones extremas, diseñado para temperaturas de hasta -20°C. Material impermeable y aislamiento térmico avanzado.",
    price: randomPrice(180000, 350000),
    category: "camping",
    stock: Math.floor(Math.random() * 25) + 10,
    variations: {
      colors: randomMultiplePick(["Verde Militar", "Negro", "Tan"], 3),
      sizes: ["Única"],
      materials: ["Nylon", "Poliéster", "Gore-Tex"]
    }
  },
  {
    name: "Guantes Tácticos Reforzados",
    description: "Guantes con protección para nudillos y palma reforzada. Permiten el uso de pantallas táctiles mientras ofrecen protección y agarre.",
    price: randomPrice(70000, 135000),
    category: "accessories",
    stock: Math.floor(Math.random() * 40) + 20,
    variations: {
      colors: randomMultiplePick(["Negro", "Verde Militar", "Tan"], 3),
      sizes: randomMultiplePick(["S", "M", "L", "XL"], 4),
      materials: ["Cuero", "Kevlar", "Nylon"]
    },
    featured: true
  },
  {
    name: "Tienda de Campaña 4 Personas",
    description: "Tienda militar para 4 personas, impermeable y con camuflaje. Ideal para campamentos de base y operaciones prolongadas.",
    price: randomPrice(320000, 580000),
    category: "camping",
    stock: Math.floor(Math.random() * 15) + 5,
    variations: {
      colors: randomMultiplePick(["Verde Militar", "Camo"], 2),
      sizes: ["4 Personas"],
      materials: ["Nylon Ripstop", "Poliéster", "Aluminio"]
    }
  },
  {
    name: "Kit de Primeros Auxilios Táctico",
    description: "Kit completo de primeros auxilios en bolsa MOLLE compatible. Incluye suministros para tratamiento de emergencia en campo.",
    price: randomPrice(120000, 220000),
    category: "accessories",
    stock: Math.floor(Math.random() * 30) + 15,
    variations: {
      colors: randomMultiplePick(["Verde Militar", "Negro", "Tan"], 3),
      sizes: ["Única"],
      materials: ["Cordura", "Nylon"]
    }
  },
  {
    name: "Cuchillo Táctico Multifunción",
    description: "Cuchillo de supervivencia con hoja de acero inoxidable y empuñadura ergonómica. Incluye funda MOLLE y afilador.",
    price: randomPrice(90000, 180000),
    category: "accessories",
    stock: Math.floor(Math.random() * 25) + 10,
    variations: {
      colors: randomMultiplePick(["Negro", "Verde Militar"], 2),
      sizes: ["Única"],
      materials: ["Acero Inoxidable", "Goma", "Nylon"]
    }
  }
];

/**
 * Seed the database with sample products
 */
const seedDatabase = () => {
  try {
    // Check if products already exist
    const existingProducts = getAll(COLLECTIONS.PRODUCTS);
    if (existingProducts.length > 0) {
      console.log('Database already seeded with products');
      return existingProducts;
    }
    
    // Add products with images
    const products = sampleProducts.map((product, index) => {
      // Generate image data
      const image = generateProductImage(index + 1);
      
      // Ensure price is a valid number
      const price = typeof product.price === 'number' && !isNaN(product.price) 
        ? product.price 
        : randomPrice(100000, 350000);
      
      // Create a complete product
      return {
        ...product,
        price,
        image: {
          data: image.data
        },
        active: true,
        featured: product.featured || Math.random() > 0.7 // About 30% of products are featured
      };
    });
    
    // Save each product
    const savedProducts = products.map(product => createProduct(product));
    console.log(`Seeded database with ${savedProducts.length} products`);
    
    return savedProducts;
  } catch (error) {
    console.error('Error seeding database:', error);
    return [];
  }
};

export { seedDatabase };
