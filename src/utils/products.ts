import { Product } from "@/types/dashboardType";

export const products: Product[] = [
  {
    id: 1,
    product: "Brick-Magic-Machines",
    img: "src/assets/ProductcategoryImages/clay.jpeg",
    subProducts: [
      { id: 101, name: "Fly Ash Brick Machines" },
      { id: 102, name: "Clay Brick Making Machines" },
      { id: 103, name: "Cement Brick Machine"},
    ],
  },
  {
    id: 2,
    product: "Passenger Lifts",
    img: "src/assets/ProductcategoryImages/lift.jpeg",
    subProducts: [
      { id: 201, name: "Residential Elevators" },
      { id: 202, name: "Kone Automatic Elevators" },
      { id: 203, name: "Stair Lift" },
    ],
  },
  {
    id: 3,
    product: "TMT Bars",
    img: "src/assets/ProductcategoryImages/tmt.jpeg",
    subProducts: [
      { id: 301, name: "TMT Steel Bars" },
      { id: 302, name: "Tata TMT Bars" },
      { id: 303, name: "Kamdhenu TMT Bars" },
    ],
  },
  {
    id: 4,
    product: "Plywoods",
    img: "src/assets/ProductcategoryImages/plywoods.jpeg",
    subProducts: [
      { id: 401, name: "Shuttering Plywoods"},
      { id: 402, name: "Laminated Plywoods"},
      { id: 403, name: "Waterproof Plywoods"},
    ],
  },
  {
    id: 5,
    product: "Excavators",
    img: "src/assets/ProductcategoryImages/excavator.jpeg",
    subProducts: [
      { id: 501, name: "Hitachi Excavators"},
      { id: 502, name: "Hyundai Excavators"},
      { id: 503, name: "Komatsu Excavators"},
    ],
  },
  {
    id: 6,
    product: "Emulsion Paints",
    img: "src/assets/ProductcategoryImages/paints.jpeg",
    subProducts: [
      { id: 601, name: "Asian Emulsion"},
      { id: 602, name: "Berger Emulsion"},
      { id: 603, name: "Nerolac Emulsion"},
    ],
  },
  {
    id: 7,
    product: "Wooden Doors",
    img: "src/assets/ProductcategoryImages/doors.jpeg",
    subProducts: [
      { id: 701, name: "Designer Wooden Door"},
      { id: 702, name: "Plywood Door"},
      { id: 703, name: "Flush Door"},
    ],
  },
  {
    id: 8,
    product: "PVC Pipes",
    img: "src/assets/ProductcategoryImages/pipes.jpeg",
    subProducts: [
      { id: 801, name: "Finolex Pipes"},
      { id: 802, name: "Rigid PVC Pipes"},
      { id: 803, name: "Flexible PVC Pipes"},
    ],
  },
  {
    id: 9,
    product: "Building Bricks",
    img: "src/assets/ProductcategoryImages/bricks.jpeg",
    subProducts: [
      { id: 901, name: "Red Brick"},
      { id: 902, name: "Fly Ash Bricks"},
      { id: 903, name: "Cement Brick"},
    ],
  },
];