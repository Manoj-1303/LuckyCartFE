import macbookpro from '../assets/macbookpro.jpg';
import redmagicrog from '../assets/redmagicrog.jpg';
import acernitro from '../assets/acernitro.jpg';
import samsunglaptop from '../assets/samsunglaptop.jpg';
import s26ultra from '../assets/s26ultra.jpg';
import vivox300 from '../assets/vivox300.jpg';
import nothing3a from '../assets/nothing3a.jpg';
import iphone18pro from '../assets/iphone18pro.jpg';
import boatbuds from '../assets/boatbuds.jpg';
import boultmustang from '../assets/boultmustang.jpg';
import appleheadphone from '../assets/appleheadphone.jpg';
import nothingbuds from '../assets/nothingbuds.jpg';
import portronicpb from '../assets/portronicpb.jpg';
import acwopb from '../assets/acwopb.jpg';
import casegearpb from '../assets/casegearpb.jpeg';
import boatpb from '../assets/boatpb.jpg';
import gshock from '../assets/gshockwatch.jpeg';
import fasttrack from '../assets/fasttrackwatch.jpeg';
import iwatch from '../assets/iwatch.jpeg';
import boultwatch from '../assets/boultwatch.jpeg';
import sonyspeaker from '../assets/sonyspeaker.jpeg';
import marshall from '../assets/marshallspeaker.jpeg';
import jbl from '../assets/jblspeaker.jpeg';
import zebronics from '../assets/zebronicspeaker.jpeg';

export const inventory = [
  { 
    id: 1, 
    category: "Laptops", 
    name: "ProBook 16-inch", 
    price: 239900, 
    description: "2019 model with an Intel Core i7 processor and large clear display.", 
    image: macbookpro,
    featured: true,
    trending: true
  },
  { 
    id: 2, 
    category: "Laptops", 
    name: "Red Magic ROG", 
    price: 336999, 
    description: "High performance machine with fast screen for smooth gaming.", 
    image: redmagicrog,
    featured: true,
    newArrival: true
  },
  { 
    id: 3, 
    category: "Laptops", 
    name: "Acer Nitro 5", 
    price: 89999, 
    description: "Great gaming laptop for daily play and heavy workloads.", 
    image: acernitro,
    newArrival: true
  },
  { 
    id: 4, 
    category: "Laptops", 
    name: "Samsung Galaxy Book", 
    price: 69990, 
    description: "Very thin and light laptop, perfect for travel and office work.", 
    image: samsunglaptop,
    trending: true
  },
  
  { 
    id: 5, 
    category: "Mobiles", 
    name: "Samsung Galaxy S26 Ultra", 
    price: 124999, 
    description: "Top tier phone with amazing cameras and a useful stylus pen.", 
    image: s26ultra,
    featured: true
  },
  { 
    id: 6, 
    category: "Mobiles", 
    name: "Vivo X300 Smartphone", 
    price: 89999, 
    description: "Runs fast on OriginOS and features a beautiful double rear camera setup.", 
    image: vivox300,
    trending: true
  },
  { 
    id: 7, 
    category: "Mobiles", 
    name: "Nothing Phone 3a", 
    price: 26999, 
    description: "Unique clear back design with fun light up alerts.", 
    image: nothing3a,
    featured: true
  },
  { 
    id: 8, 
    category: "Mobiles", 
    name: "Apple iPhone 18 Pro", 
    price: 139900, 
    description: "The newest phone from Apple with pro grade video recording.", 
    image: iphone18pro,
    newArrival: true
  },

  { 
    id: 9, 
    category: "Earphones", 
    name: "Boat Airdopes", 
    price: 1499, 
    description: "True wireless earbuds with deep bass and long battery life.", 
    image: boatbuds,
    featured: true,
    trending: true
  },
  { 
    id: 10, 
    category: "Earphones", 
    name: "Boult Audio Mustang", 
    price: 1799, 
    description: "Sporty design earphones with clear and loud sound.", 
    image: boultmustang 
  },
  { 
    id: 11, 
    category: "Earphones", 
    name: "Apple AirPods Max", 
    price: 1599, 
    description: "Premium over ear headphones that block out all outside noise.", 
    image: appleheadphone,
    trending: true
  },
  { 
    id: 12, 
    category: "Earphones", 
    name: "Nothing Earbuds", 
    price: 64999, 
    description: "Very light earbuds inside a cool clear charging case.", 
    image: nothingbuds,
    newArrival: true
  },

  { 
    id: 13, 
    category: "Powerbanks", 
    name: "Portronics Power Bank", 
    price: 3499, 
    description: "Small 10000mAh battery block to keep your phone alive.", 
    image: portronicpb 
  },
  { 
    id: 14, 
    category: "Powerbanks", 
    name: "Acwo Fast Charge Bank", 
    price: 1799, 
    description: "Quick charging power bank for busy days on the go.", 
    image: acwopb 
  },
  { 
    id: 15, 
    category: "Powerbanks", 
    name: "CaseGear Power Bank", 
    price: 25000, 
    description: "Tough and strong portable battery for outdoor trips.", 
    image: casegearpb 
  },
  { 
    id: 16, 
    category: "Powerbanks", 
    name: "Boat Energy Bank", 
    price: 999, 
    description: "High capacity 20000mAh battery for very long trips.", 
    image: boatpb,
    featured: true
  },

  { 
    id: 17, 
    category: "Smartwatches", 
    name: "Casio G-Shock Smart", 
    price: 7990, 
    description: "Very tough watch that can handle any drop or deep water.", 
    image: gshock,
    newArrival: true
  },
  { 
    id: 18, 
    category: "Smartwatches", 
    name: "Fastrack Reflex", 
    price: 2099, 
    description: "Nice fitness band to track your daily steps and health..", 
    image: fasttrack,
    trending: true
  },
  { 
    id: 19, 
    category: "Smartwatches", 
    name: "Apple Watch Series", 
    price: 25900, 
    description: "The best watch to track your workouts and heart rate.", 
    image: iwatch,
    featured: true
  },
  { 
    id: 20, 
    category: "Smartwatches", 
    name: "Boult Dive Smartwatch", 
    price: 1399, 
    description: "Great screen and long battery life for daily use.", 
    image: boultwatch 
  },
  { 
    id: 21, 
    category: "Bluetooth Speakers", 
    name: "Sony Extra Bass Speaker", 
    price: 27990, 
    description: "Small speaker but makes very loud and deep punchy sound.", 
    image: sonyspeaker,
    newArrival: true
  },
  { 
    id: 22, 
    category: "Bluetooth Speakers", 
    name: "Marshall Acton", 
    price: 51999, 
    description: "Classic rock design with very rich and clear audio quality.", 
    image: marshall,
    trending: true
  },
  { 
    id: 23, 
    category: "Bluetooth Speakers", 
    name: "JBL Flip 6", 
    price: 9999, 
    description: "Waterproof speaker that is easy to carry anywhere you go.", 
    image: jbl,
    featured: true
  },
  { 
    id: 24, 
    category: "Bluetooth Speakers", 
    name: "Zebronics Party Speaker", 
    price: 1990, 
    description: "Big sound and bright lights for your next house party.", 
    image: zebronics 
  }
];
