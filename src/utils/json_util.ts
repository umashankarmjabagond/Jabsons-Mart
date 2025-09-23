import { Product } from "@/types/authTypes";
import { FooterData } from "@/types/footerType";

export const footer_data: FooterData = {
  footerHeaderText: "We are here to help you!",
  goMobile: "Go Mobile:",
  followUsOn: "Follow us on:",
  aboutUs: [
    "About Us",
    "IndiaMART Export",
    "join Sales",
    "Success Stories",
    "Press Section",
    "Advertise with us",
  ],
  jobCareers: [
    "Job & Careers",
    "Help",
    "Feedback",
    "Complaints",
    "Customer Care",
    "Contact us",
  ],
  buyToolkit: [
    "Supplier Tool Kit",
    "Sell on IndiaMART",
    "Latest BuyLead",
    "Learning Centre",
  ],
  accountingSolutions: [
    "Buyer Tool Kit",
    "Post Your Requirement",
    "join Sales",
    "Products You Buy",
    "Search Products & Supplier",
  ],
  supplierToolkit: ["Accounting Software", "Tally On Mobile", "GST e-Invoice"],
  copyRight:
    "Copyright © 1996-2025 IndiaMART InterMESH Ltd. All rights reserved.",
  termsUse: "Terms of Use-Privacy Policy Link to Us",
};

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Grain",
    image: "/src/assets/card_images/wheat.jpg",
    price: "$18.00 / 10kg",
  },
  {
    id: 2,
    name: "Paddy ",
    image: "/src/assets/card_images/paddy.jpg",
    price: "$6.50",
  },
  {
    id: 3,
    name: "Fresh Cow Milk ",
    image: "/src/assets/card_images/milk.jpg",
    price: "$3.25",
  },
  {
    id: 4,
    name: "Honey ",
    image: "/src/assets/card_images/honey.jpg",
    price: "$12.00 / 500g",
  },
  {
    id: 5,
    name: "Seasonal veggies",
    image: "/src/assets/card_images/veggies.jpg",
    price: "$25.00 / box",
  },
  {
    id: 6,
    name: "Farm-Raised ",
    image: "/src/assets/card_images/sunflower.jpg",
    price: "$15.00 / kg",
  },
  {
    id: 7,
    name: "Organic Fertilizer",
    image: "/src/assets/card_images/tractor.jpg",
    price: "$10.00 / bag",
  },
  {
    id: 8,
    name: "Fertilizer",
    image: "/src/assets/card_images/fertilizer.jpg",
    price: "$7.00 / bale",
  },
];
