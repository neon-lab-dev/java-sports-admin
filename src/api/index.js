const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL + "/api/v1";

export const API = {
  //auth
  login: BACKEND_BASE_URL + "/login", //to login user
  user: BACKEND_BASE_URL + "/me", //to get user details
  logout: BACKEND_BASE_URL + "/logout", //to logout user

  // order
  getOrders: BACKEND_BASE_URL + "/admin/orders",  // to get all orders
  getSingleOrder: BACKEND_BASE_URL + "/order",  // to get single orders
  updateOrder: BACKEND_BASE_URL + "/admin/order",  // to update orders status

  // product
  getAdminProducts: BACKEND_BASE_URL + "/admin/product",  //to get Admin Product
  createProduct: BACKEND_BASE_URL + "/createproduct",  //to create Product
  deleteProduct: BACKEND_BASE_URL + "/product",  //to delete Product
  getProductDetail: BACKEND_BASE_URL + "/product",  //to get details of  Product
  updateProduct: BACKEND_BASE_URL + "/product",  //to update  Product 

  //dashboard
  dashboard: BACKEND_BASE_URL + "/admin/dashboard", //to get dashboard details

  //coupon
  allCoupon: BACKEND_BASE_URL + "/coupon/all", //to get all coupon details

  coupon: BACKEND_BASE_URL + "/coupon", // coupon details
  newCoupon: BACKEND_BASE_URL + "/coupon/new", // coupon details

  //users
  userDetails: BACKEND_BASE_URL + "/admin/users", //to get all users details
};
