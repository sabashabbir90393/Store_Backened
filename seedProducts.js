import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./model/product.js";
import dns from "node:dns/promises";

dns.setServers(["1.1.1.1", "8.8.8.8"])

dotenv.config();

const products = [
  // CLOTHES
  {
    id: "sh016",
    name: "Elegant Casual Blouse",
    price: 3600,
    imageURL: "https://images.unsplash.com/photo-1564257577054-4d5f7b2c2f8f?auto=format&fit=crop&w=900&q=85",
    desc: "A stylish blouse with a comfortable fit for everyday fashion.",
    category: "Clothes",
  },
  {
    id: "sh017",
    name: "Classic Denim Jacket",
    price: 5200,
    imageURL: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=85",
    desc: "A timeless denim jacket designed for casual everyday looks.",
    category: "Clothes",
  },

  // GLASSES
  {
    id: "sh018",
    name: "Modern Clear Glasses",
    price: 2400,
    imageURL: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=85",
    desc: "Modern clear-frame glasses with a clean and elegant design.",
    category: "Glasses",
  },
  {
    id: "sh019",
    name: "Classic Black Shades",
    price: 3000,
    imageURL: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    desc: "Classic black sunglasses for a stylish everyday look.",
    category: "Glasses",
  },
  {
    id: "sh020",
    name: "Premium Round Sunglasses",
    price: 3400,
    imageURL: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
    desc: "Premium round sunglasses with a fashionable modern frame.",
    category: "Glasses",
  },

  // MAKEUP
  {
    id: "sh021",
    name: "Soft Glam Makeup Kit",
    price: 5600,
    imageURL: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
    desc: "A versatile makeup collection for creating soft and elegant looks.",
    category: "Makeup",
  },
  {
    id: "sh022",
    name: "Matte Lip Collection",
    price: 3900,
    imageURL: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85",
    desc: "A beautiful collection of rich matte shades for every occasion.",
    category: "Makeup",
  },

  // JEWELRY
  {
    id: "sh023",
    name: "Delicate Pearl Earrings",
    price: 2800,
    imageURL: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85",
    desc: "Elegant pearl earrings that add a refined touch to any outfit.",
    category: "Jewelry",
  },
  {
    id: "sh024",
    name: "Elegant Gold Earrings",
    price: 4200,
    imageURL: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85",
    desc: "Elegant gold earrings designed for everyday and special occasions.",
    category: "Jewelry",
  },

  // FOOTWEAR
  {
    id: "sh025",
    name: "Classic White Sneakers",
    price: 6200,
    imageURL: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=85",
    desc: "Clean white sneakers offering comfortable everyday style.",
    category: "Footwear",
  },
  {
    id: "sh026",
    name: "Elegant Block Heels",
    price: 7000,
    imageURL: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=900&q=85",
    desc: "Elegant block heels designed for comfort and sophisticated style.",
    category: "Footwear",
  },

  // BAGS
  {
    id: "sh027",
    name: "Elegant Shoulder Bag",
    price: 5600,
    imageURL: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
    desc: "A sophisticated shoulder bag with a practical everyday design.",
    category: "Bags",
  },
  {
    id: "sh028",
    name: "Classic Tote Bag",
    price: 4900,
    imageURL: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    desc: "Spacious tote bag perfect for work, shopping and everyday use.",
    category: "Bags",
  },

  // WATCHES
  {
    id: "sh029",
    name: "Classic Silver Watch",
    price: 8500,
    imageURL: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85",
    desc: "Classic silver watch with a timeless and sophisticated design.",
    category: "Watches",
  },
  {
    id: "sh030",
    name: "Luxury Leather Watch",
    price: 10500,
    imageURL: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
    desc: "Luxury watch with a refined leather strap and elegant dial.",
    category: "Watches",
  },
  {
    id: "sh031",
    name: "Minimal Black Watch",
    price: 7800,
    imageURL: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=85",
    desc: "Minimal black watch with a clean modern appearance.",
    category: "Watches",
  },

  // ELECTRONICS
  {
    id: "sh032",
    name: "Wireless Earbuds",
    price: 6500,
    imageURL: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85",
    desc: "Compact wireless earbuds with clear audio for everyday listening.",
    category: "Electronics",
  },

  // HOME DECOR
  {
    id: "sh033",
    name: "Decorative Ceramic Pot",
    price: 2900,
    imageURL: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85",
    desc: "Beautiful ceramic pot that adds character to your living space.",
    category: "Home Decor",
  },
  {
    id: "sh034",
    name: "Modern Wall Art",
    price: 3800,
    imageURL: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=900&q=85",
    desc: "Modern wall art designed to bring style and personality to your room.",
    category: "Home Decor",
  },

  // DECORATIONS
  {
    id: "sh035",
    name: "Decorative Flower Arrangement",
    price: 2700,
    imageURL: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85",
    desc: "Beautiful decorative arrangement for brightening your home.",
    category: "Decorations",
  },
  {
    id: "sh036",
    name: "Elegant Room Decor",
    price: 3100,
    imageURL: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85",
    desc: "Elegant decorative piece designed for modern interiors.",
    category: "Decorations",
  },
  {
    id: "sh037",
    name: "Decorative Tray",
    price: 2400,
    imageURL: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=900&q=85",
    desc: "Stylish decorative tray for organizing and displaying everyday items.",
    category: "Decorations",
  },

  // LIFESTYLE
  {
    id: "sh038",
    name: "Travel Coffee Mug",
    price: 2100,
    imageURL: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
    desc: "Reusable travel mug designed for coffee and drinks on the go.",
    category: "Lifestyle",
  },
  {
    id: "sh039",
    name: "Everyday Backpack",
    price: 4600,
    imageURL: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    desc: "Practical backpack for work, study, travel and everyday activities.",
    category: "Lifestyle",
  },
  {
    id: "sh040",
    name: "Fitness Water Bottle",
    price: 1900,
    imageURL: "https://images.unsplash.com/photo-1550505095-81378a674395?auto=format&fit=crop&w=900&q=85",
    desc: "Durable reusable bottle for workouts, travel and daily routines.",
    category: "Lifestyle",
  },

  // DAILY PRODUCTS
  {
    id: "sh041",
    name: "Daily Essentials Organizer",
    price: 2200,
    imageURL: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=85",
    desc: "Useful organizer for keeping everyday essentials neat and accessible.",
    category: "Daily Products",
  },
  {
    id: "sh042",
    name: "Multi Purpose Storage Box",
    price: 1800,
    imageURL: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=900&q=85",
    desc: "Practical storage box for organizing household and everyday items.",
    category: "Daily Products",
  },
  {
    id: "sh043",
    name: "Portable Desk Organizer",
    price: 1600,
    imageURL: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=85",
    desc: "Compact desk organizer for keeping your workspace clean and organized.",
    category: "Daily Products",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB connected");

    const existingIds = await Product.find({
      id: { $in: products.map((product) => product.id) },
    }).select("id");

    const existingIdSet = new Set(
      existingIds.map((product) => product.id)
    );

    const newProducts = products.filter(
      (product) => !existingIdSet.has(product.id)
    );

    if (newProducts.length === 0) {
      console.log("All seed products already exist.");
      return;
    }

    await Product.insertMany(newProducts);

    console.log(
      `${newProducts.length} new products added successfully.`
    );
  } catch (error) {
    console.error("Seed Products Error:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedProducts();