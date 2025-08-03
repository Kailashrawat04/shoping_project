export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    required: true,
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    required: true,
  },
];

export const registerFormControls = [
  {
    id: "userName",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    required: true,
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    required: true,
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    required: true,
  },
];

export const addProductFormElements = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter product name",
    label: "Name",
    required: true,
  },
  {
    id: "description",
    type: "textarea",
    placeholder: "Enter product description",
    label: "Description",
    required: true,
  },
  {
    id: "category",
    type: "select",
    placeholder: "Select category",
    label: "Category",
    required: true,
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    id: "brand",
    type: "text",
    placeholder: "Enter brand",
    label: "Brand",
    required: true,
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    required: true,
  },
  {
    id: "totalStock",
    type: "number",
    placeholder: "Enter total stock",
    label: "Total Stock",
    required: true,
  },
];

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
];

export const shoppingViewHeaderMenuItems = [
  { id: "home", label: "Home", path: "/shop/home" },
  { id: "products", label: "Products", path: "/shop/listing" },
  { id: "men", label: "Men", path: "/shop/listing" },
  { id: "women", label: "Women", path: "/shop/listing" },
  { id: "kids", label: "Kids", path: "/shop/listing" },
  { id: "accessories", label: "Accessories", path: "/shop/listing" },
  { id: "footwear", label: "Footwear", path: "/shop/listing" },
];
