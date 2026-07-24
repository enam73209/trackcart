export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  specs: { [key: string]: string };
  badge?: string;
  color: string;
}

export const products: Product[] = [
  {
    id: "aerosound-max",
    name: "AeroSound Max",
    price: 149.00,
    description: "True wireless earpods with adaptive active noise cancellation, high-fidelity spatial audio, and up to 40 hours of battery life.",
    image: "/images/earpods-max.png",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
    color: "from-cyan-500/20 to-blue-500/20",
    features: [
      "Adaptive Active Noise Cancellation",
      "Spatial Audio with Dynamic Head Tracking",
      "IPX4 Sweat and Water Resistance",
      "MagSafe Compatible Wireless Charging"
    ],
    specs: {
      "Driver Size": "11mm Dynamic Driver",
      "Frequency Range": "20Hz - 20kHz",
      "Battery Life": "Up to 8 hours (40 hours with charging case)",
      "Connectivity": "Bluetooth 5.3",
      "Weight (Each)": "5.4g"
    }
  },
  {
    id: "sonicwave-pro",
    name: "SonicWave Pro",
    price: 299.00,
    description: "Professional studio-grade over-ear headphones with custom acoustic platforms, ultra-plush cushions, and lossless audio support.",
    image: "/images/sonicwave-pro.png",
    rating: 4.9,
    reviews: 86,
    badge: "Premium Choice",
    color: "from-purple-500/20 to-pink-500/20",
    features: [
      "Lossless Audio playback via USB-C or 3.5mm",
      "Ultra-Plush Memory Foam Ear Cushions",
      "Integrated Custom DAC & Amplifier",
      "Up to 50 hours of wireless listening"
    ],
    specs: {
      "Driver Size": "40mm Custom Acoustical Driver",
      "Frequency Range": "10Hz - 40kHz (Hi-Res Certified)",
      "Battery Life": "Up to 50 hours with Fast Fuel (10 min = 5 hours)",
      "Connectivity": "Bluetooth 5.2 / USB-C Lossless / 3.5mm Aux",
      "Weight": "260g"
    }
  },
  {
    id: "basspulse-go",
    name: "BassPulse Go",
    price: 79.00,
    description: "Waterproof neckband-style sport earphones with heavy bass tuning, secure-fit earhooks, and magnetic auto-pause earplugs.",
    image: "/images/basspulse-go.png",
    rating: 4.6,
    reviews: 215,
    badge: "Sport Edition",
    color: "from-emerald-500/20 to-teal-500/20",
    features: [
      "Extra Bass Deep Resonance Chamber",
      "IPX7 Fully Waterproof Construction",
      "Secure-Fit Comfort Earhooks",
      "Magnetic Earbuds for Auto-Pause/Resume"
    ],
    specs: {
      "Driver Size": "10mm Neodymium Driver",
      "Frequency Range": "20Hz - 20kHz",
      "Battery Life": "Up to 18 hours",
      "Connectivity": "Bluetooth 5.1 with Multipoint Support",
      "Weight": "28g"
    }
  }
];
