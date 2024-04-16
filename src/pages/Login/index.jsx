import React, { useState } from "react";
import logo from "../../assets/icons/logo.svg";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX } from "../../assets/data/regex";
import AppFormErrorLine from "../../components/AppFormErrorLine";
import { login } from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setIsAuthenticating } from "../../store/slices/userSlice";
import eye from "../../assets/icons/eye-svgrepo-com.svg";
import eyeSlash from "../../assets/icons/eye-slash-svgrepo-com.svg";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationKey: ["user"],
    mutationFn: ({ email, password }) => login({ email, password }),
    onError: (error) => {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    },
    onSuccess: () => {
      dispatch(setIsAuthenticating(true));
      queryClient.invalidateQueries({ queryKey: ["user"] }).then(() => {
        dispatch(setIsAuthenticating(false));
        navigate("/admin/");
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  if (isAuthenticated && user?.role?.toLowerCase() === "admin") {
    return <Navigate to="/admin/" />;
  }
  return (
    <div className="flex justify-center items-center h-screen w-screen p-24 bg-white">
      <div className="rounded-[20px] border border-stone-300 py-6 xl:py-10 px-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-full flex flex-col items-center justify-center w-[500px]"
        >
          {/* {image and Dashboard} */}
          <div className="flex flex-col w-full justify-center items-center place-content-center place-items-center">
            <div className=" flex w-full justify-center">
              <img
                className="lg:w-[130px] lg:h-[167px] w-[80px] h-[120px]"
                src={logo}
              />
            </div>
            <p className="flex w-full justify-center text-zinc-800 lg:text-[32px] text-[18px] font-medium font-Lato leading-loose mt-[18px]">
              Dashboard Login
            </p>
          </div>
          {/* Email */}
          <div className="w-full flex flex-col gap-2">
            <p className="text-zinc-800  text-start text-base font-bold font-Lato leading-tight w-full">
              Email
            </p>
            <input
              className="w-full h-[50px] lg:h-[54px] bg-white rounded-[10px] border border-stone-300 placeholder:opacity-40 leading-9 pl-[16px] text-base font-light font-Lato"
              type="email"
              placeholder="Enter Your Email"
              {...register("email", {
                validate: (value) => EMAIL_REGEX.test(value) || "Invalid email",
              })}
            />
            {errors.email && (
              <AppFormErrorLine
                message={errors.email.message}
                className="self-start"
              />
            )}
            {/* password */}
            <p className=" mt-4 text-zinc-800 text-base font-bold font-Lato leading-tight">
              Password
            </p>
            <div className="relative w-full">
              <input
                className="w-full h-[50px] lg:h-[54px] bg-white rounded-[10px] border border-stone-300 placeholder:opacity-40 leading-9 pl-[16px] text-base font-light font-Lato"
                type={passwordType}
                placeholder="Enter Your Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              <button
                role="button"
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => {
                  if (passwordType === "password") {
                    setPasswordType("text");
                  } else {
                    setPasswordType("password");
                  }
                }}
              >
                <img
                  src={passwordType === "password" ? eye : eyeSlash}
                  alt="eye"
                  className="w-5 h-5"
                />
              </button>
            </div>
            {errors.password && (
              <AppFormErrorLine
                message={errors.password.message}
                className="self-start"
              />
            )}
          </div>
          <button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            className="w-full mt-6 lg:h-16 h-14 bg-rose-500 rounded-xl disabled:opacity-60 disabled:cursor-default"
          >
            {isPending ? (
              <span className="loading loading-spinner loading-md text-white" />
            ) : (
              <p className="text-white text-xl font-bold font-Lato">Login</p>
            )}
          </button>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
