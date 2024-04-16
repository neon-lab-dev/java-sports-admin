import axios from "axios";
import { API } from ".";

export const getUserDetails = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(API.userDetails, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res?.data?.users);
      })
      .catch((err) => {
        reject(
          err?.response?.data?.message ||
            "Something went wrong, please try again"
        );
      });
  });
};
