import axios from "axios";
import { API } from ".";

export const getAllCoupon = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.allCoupon, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res.data?.coupons || []);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  });
};

export const createCoupon = ({ code, amount }) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        API.newCoupon,
        { code, amount },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message || "Login failed, please try again"
        );
      });
  });
};

export const deleteCoupon = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${API.coupon}/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Error deleting coupon, please try again"
        );
      });
  });
};
