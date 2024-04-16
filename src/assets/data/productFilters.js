export const subcategoriesMap = {
  Gear: [
    "Bat",
    "Batting Gear",
    "WicketKeeping",
    "Protection",
    "Bags",
    "Clothing",
    "Cricket Sets",
    "Accessories",
  ],
  Shoes: ["Bowling", "Spikes", "Rubber Studs", "Accessories"],
  Helmets: ["Titanium", "Steel", "Limited Edition", "Accessories"],
};

export const subSubcategoriesMap = {
  Bat: ["English Willow", "Kashmir Willow", "Tennis", "Player Edition"],
  "Batting Gear": ["Gloves", "Leg Guard", "Inner Gloves"],
  WicketKeeping: ["WGloves", "WLeg Guard", "WInner Gloves"],
  Protection: [
    "Thigh Pad",
    "Chest Guard",
    "Arm Guard",
    "Abdominal Guard",
    "Inner ThighPad",
  ],
  Bags: ["Kitbags", "Wheelie", "Duffle", "Backpack", "Bat Cover"],
  Clothing: [
    "On-Field",
    "Base Layer",
    "Athletic Supporter",
    "Socks",
    "Caps & Hats",
    "WristBand",
  ],
  "Cricket Sets": ["English Willow Kit", "Kashmir Willow Kit", "Plastic Kit"],
  Accessories: ["Ball", "SunGlass", "Bat Grips", "Bat Care", "Stumps", "Other"],
};

export const allFilters = [
  {
    category: "Shoes",
    filters: ["6", "7", "8", "9", "10", "11", "12"],
  },
  {
    category: "Helmets",
    filters: ["XS", "Small", "Medium", "Large", "XL", "XXL"],
  },
  // bat
  {
    category: "Gear",
    subcategory: "Bat",
    subSubcategory: "English Willow",
    filters: ["1", "2", "3", "4", "5", "6", "Harrow", "Mens", "Compact"],
  },
  {
    category: "Gear",
    subcategory: "Bat",
    subSubcategory: "Kashmir Willow",
    filters: ["1", "2", "3", "4", "5", "6", "Harrow", "Mens", "Compact"],
  },
  {
    category: "Gear",
    subcategory: "Bat",
    subSubcategory: "Tennis",
    filters: ["1", "2", "3", "4", "5", "6", "Harrow", "Mens", "Compact"],
  },
  {
    category: "Gear",
    subcategory: "Bat",
    subSubcategory: "Player Edition",
    filters: ["1", "2", "3", "4", "5", "6", "Harrow", "Mens", "Compact"],
  },

  // batting gear
  {
    category: "Gear",
    subcategory: "Batting Gear",
    subSubcategory: "Gloves",
    filters: ["Boys", "Youth", "Mens", "Compact", "Junior"],
  },
  {
    category: "Gear",
    subcategory: "Batting Gear",
    subSubcategory: "Leg Guard",
    filters: ["Boys", "Youth", "Mens", "Compact", "Junior"],
  },
  {
    category: "Gear",
    subcategory: "Batting Gear",
    subSubcategory: "LInner Gloves",
    filters: ["Boys", "Youth", "Mens", "Compact", "Junior"],
  },

  // wicket keeping

  {
    category: "Gear",
    subcategory: "WicketKeeping",
    subSubcategory: "WGloves",
    filters: ["Boys", "Youth", "Mens", "Compact", "Junior"],
  },
  {
    category: "Gear",
    subcategory: "WicketKeeping",
    subSubcategory: "WLeg Guard",
    filters: ["Boys", "Youth", "Mens", "Compact", "Junior"],
  },
  {
    category: "Gear",
    subcategory: "WicketKeeping",
    subSubcategory: "WInner Gloves",
    filters: ["Boys", "Youth", "Mens", "Compact", "Junior"],
  },

  // protection

  {
    category: "Gear",
    subcategory: "Protection",
    subSubcategory: "Thigh Pad",
    filters: ["Boys", "Youth", "Mens", "XL", "Standard"],
  },
  {
    category: "Gear",
    subcategory: "Protection",
    subSubcategory: "Chest Guard",
    filters: ["Boys", "Youth", "Mens", "XL", "Standard"],
  },
  {
    category: "Gear",
    subcategory: "Protection",
    subSubcategory: "Inner ThighPad",
    filters: ["Boys", "Youth", "Mens", "XL", "Standard"],
  },
  {
    category: "Gear",
    subcategory: "Protection",
    subSubcategory: "Abdominal Guard",
    filters: ["Boys", "Youth", "Mens", "XL", "Standard"],
  },
  {
    category: "Gear",
    subcategory: "Protection",
    subSubcategory: "Arm Guard",
    filters: ["Boys", "Youth", "Mens", "XL", "Standard"],
  },

  // bags
  {
    category: "Gear",
    subcategory: "Bags",
    subSubcategory: "Kitbags",
    filters: ["Children", "Mens"],
  },
  {
    category: "Gear",
    subcategory: "Bags",
    subSubcategory: "Wheelie",
    filters: ["Children", "Mens"],
  },
  {
    category: "Gear",
    subcategory: "Bags",
    subSubcategory: "Backpack",
    filters: ["Children", "Mens"],
  },
  {
    category: "Gear",
    subcategory: "Bags",
    subSubcategory: "Bat Cover",
    filters: ["Children", "Mens"],
  },

  // clothing
  {
    category: "Gear",
    subcategory: "Clothing",
    subSubcategory: "On-Field",
    filters: [
      "26",
      "28",
      "30",
      "32",
      "Small",
      "Medium",
      "Large",
      "XL",
      "XXL",
      "XXXL",
      "XXXXL",
    ],
  },
  {
    category: "Gear",
    subcategory: "Clothing",
    subSubcategory: "Base Layer",
    filters: ["XS", "Small", "Medium", "Large", "XL", "XXL", "XXXL", "XXXXL"],
  },
  {
    category: "Gear",
    subcategory: "Clothing",
    subSubcategory: "Athletic Supporter",
    filters: ["XS", "Small", "Medium", "Large", "XL", "XXL", "XXXL", "XXXXL"],
  },
  {
    category: "Gear",
    subcategory: "Clothing",
    subSubcategory: "Socks",
    filters: [],
  },
  {
    category: "Gear",
    subcategory: "Clothing",
    subSubcategory: "Caps & Hats",
    filters: ["Small", "Medium", "Large", "XL", "XXL", "XXXL", "XXXXL"],
  },
  {
    category: "Gear",
    subcategory: "Clothing",
    subSubcategory: "WristBand",
    filters: ["2.5 in (6.5 cm)", "5 in (12.7 cm)"],
  },
  // Cricket Sets 👇👇👇
  // {
  //     category: "Gear",
  //     subcategory: "Cricket Sets",
  //     subSubcategory: "English Willow Kit",
  //     filters: [],
  // },

  {
    category: "Gear",
    subcategory: "Accessories",
    subSubcategory: "Ball",
    filters: ["Leather", "Tennis", "Training"],
  },
  {
    category: "Gear",
    subcategory: "Accessories",
    subSubcategory: "SunGlass",
    filters: ["2.5 in (6.5 cm)", "5 in (12.7 cm)"],
  },
  {
    category: "Gear",
    subcategory: "Accessories",
    subSubcategory: "Bat Grips",
    filters: ["2.5 in (6.5 cm)", "5 in (12.7 cm)"],
  },
  {
    category: "Gear",
    subcategory: "Accessories",
    subSubcategory: "Other",
    filters: ["2.5 in (6.5 cm)", "5 in (12.7 cm)"],
  },
  {
    category: "Gear",
    subcategory: "Accessories",
    subSubcategory: "Stumps",
    filters: ["2.5 in (6.5 cm)", "5 in (12.7 cm)"],
  },
  {
    category: "Gear",
    subcategory: "Accessories",
    subSubcategory: "Bat Care",
    filters: ["2.5 in (6.5 cm)", "5 in (12.7 cm)"],
  },
];
