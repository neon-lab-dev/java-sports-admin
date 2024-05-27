import React, { useEffect, useRef, useState } from "react";
import backIcon from "../../assets/icons/back.svg";
import crossIcon from "../../assets/icons/crossSvg.svg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/product";
import AppFormErrorLine from "../../components/AppFormErrorLine";
import Swal from "sweetalert2";
import {
  subSubcategoriesMap,
  subcategoriesMap,
} from "../../assets/data/productFilters";
import getFilters from "../../utils/getFilters";
import SizeModal from "./SizeModal";

const CreateProduct = () => {
  const [availableColors, setAvailableColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories] = useState(["Gear", "Shoes", "Helmets"]);
  const [selectedImages, setSelectedImages] = useState([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      Swal.fire({
        title: "Product Add Success",
        text: `${watchedValues.name} added to your store `,
        icon: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      reset();
      setAvailableColors([]);
      setSelectedImages([]);
      navigate("/admin/products");
    },
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text: err,
        icon: "error",
      });
    },
  });

  // react hook form 👇
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const watchedValues = watch();

  const inputRef = useRef();

  const handleChooseImage = () => {
    inputRef.current.click();
  };

  // form submit
  const handleFormSubmit = (data) => {
    try {
      if (!sizes.length > 0) {
        return Swal.fire({
          title: "Error",
          text: "Please add size",
          icon: "error",
        });
      }
      if (selectedImages.length === 0) {
        return Swal.fire({
          title: "Error",
          text: "Please select at least one image",
          icon: "error",
        });
      } else {
        data.sizes = sizes;
        const fd = new FormData();
        for (const item of selectedImages) {
          fd.append("images", item);
        }
        for (const item of Object.keys(data)) {
          if (item === "sizes" && Array.isArray(data[item])) {
            for (let i = 0; i < data[item].length; i++) {
              for (const key in data[item][i]) {
                fd.append(`${item}[${i}][${key}]`, data[item][i][key]);
              }
            }
          } else {
            fd.append(item, data[item]);
          }
        }
        const allColors = [data.color, ...availableColors];
        fd.append("Availablecolor", allColors.join(","));
        mutate(fd);
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err,
        icon: "error",
      });
    }
  };

  // handle image change
  const handleImageChange = (event) => {
    const { files } = event.target;
    if (files.length + selectedImages.length > 4) {
      return Swal.fire({
        title: "Error",
        text: "You can select only 4 images for a product",
        icon: "error",
      });
    } else {
      setSelectedImages((prev) => [...prev, ...files]);
    }
  };
  const handleRemoveImage = (index) => {
    setSelectedImages(selectedImages.filter((item, i) => i !== index));
  };

  return (
    <div>
      <SizeModal
        options={getFilters(
          watchedValues.category,
          watchedValues.sub_category,
          watchedValues.sub_category2
        )}
        setData={(data) => {
          setSizes((prev) => [...prev, data]);
        }}
        subCategory2={watchedValues.sub_category2}
      />
      <div className="bg-lightgray h-full w-full p-6 py-8">
        <div className="bg-white overflow-x-auto rounded-[16px] p-4  ps-10 ">
          <div className="flex items-center  justify-between">
            <Link to="/products" className="">
              <img src={backIcon} alt="" />
            </Link>
            <h1 className="text-[32px] text-black font-bold flex-1 me-6 text-center">
              Create Product
            </h1>
          </div>

          {/* form and side image */}
          <div className="flex  gap-3 my-5 mt-10 flex-wrap md:flex-nowrap  w-full">
            <div className="w-full">
              {/* form */}
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="max-w-[700px] w-full md:min-w-[460px] min-w-[300px]"
              >
                {/* name  */}
                <div className="">
                  <input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    className={` h-[45px] w-full rounded-xl border-darkstone outline-none border ps-3 text-[16px] text-gray2 ${
                      errors.name && "border-red"
                    }`}
                    type="text"
                    placeholder="Product Name"
                  />
                  {errors.name && (
                    <AppFormErrorLine message={errors.name.message} />
                  )}
                </div>

                {/* desc */}
                <div className="my-5">
                  <textarea
                    {...register("description", {
                      required: {
                        value: true,
                        message: "Please enter description",
                      },
                    })}
                    className={`w-full resize-none pt-3 h-[112px] rounded-xl border-darkstone outline-none border ${
                      errors.description && "border-red"
                    } ps-3 text-[16px] text-gray2 `}
                    type="text"
                    placeholder="Product Description"
                  />
                  {errors.description && (
                    <AppFormErrorLine message={errors.description.message} />
                  )}
                </div>

                {/* features */}
                <div className="my-5">
                  <textarea
                    {...register("keyFeatures", {
                      required: {
                        value: true,
                        message: "Please enter key features",
                      },
                    })}
                    className={`w-full resize-none pt-3 h-[112px] rounded-xl border-darkstone outline-none ${
                      errors.keyFeatures && "border-red"
                    } border ps-3 text-[16px] text-gray2 `}
                    type="text"
                    placeholder="Product key featured"
                  />
                  {errors.keyFeatures && (
                    <AppFormErrorLine message={errors.keyFeatures.message} />
                  )}
                </div>

                {/* specification */}
                <div className="my-5">
                  <textarea
                    {...register("specification", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    className={`w-full resize-none pt-3 h-[112px] rounded-xl border-darkstone outline-none border ${
                      errors.specification && "border-red"
                    } ps-3 text-[16px] text-gray2 `}
                    type="text"
                    placeholder="Product Specification"
                  />
                  {errors.specification && (
                    <AppFormErrorLine message={errors.specification.message} />
                  )}
                </div>

                {/* category */}
                <div className="my-5 w-full ">
                  <div
                    className={`${
                      errors.category && "border-red"
                    } w-full  px-3 rounded-xl border-darkstone   border`}
                  >
                    <select
                      {...register("category", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      className={` text-[16px] outline-none text-gray2 h-[45px] w-full ${
                        errors.category && " border-red"
                      }`}
                    >
                      <option disabled selected value="">
                        Select a category
                      </option>
                      {categories.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.category && (
                    <AppFormErrorLine message={errors.category.message} />
                  )}
                </div>

                {/* sub category */}
                {subcategoriesMap[watchedValues.category] && (
                  <div className="my-5 w-full ">
                    <div
                      className={`w-full  px-3 rounded-xl border-darkstone  border ${
                        errors.sub_category && " border-red"
                      }`}
                    >
                      <select
                        {...register("sub_category", {
                          required: {
                            value: true,
                            message: "This field is required",
                          },
                          validate: (value) =>
                            subcategoriesMap[watchedValues.category]?.includes(
                              value
                            ) || "Choose valid subcategory",
                        })}
                        className={` text-[16px] outline-none text-gray2 h-[45px] w-full`}
                      >
                        <option value="" selected disabled>
                          Select a sub category
                        </option>
                        {subcategoriesMap[watchedValues.category].map(
                          (item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    {errors.sub_category && (
                      <AppFormErrorLine message={errors.sub_category.message} />
                    )}
                  </div>
                )}
                {/* sub sub category */}
                {watchedValues.sub_category &&
                  subSubcategoriesMap[watchedValues.sub_category] && (
                    <div className="my-5 ">
                      <div
                        className={`w-full  px-3 rounded-xl border-darkstone  border ${
                          errors.sub_category && " border-red"
                        }`}
                      >
                        <select
                          {...register("sub_category2", {
                            required: {
                              value:
                                watchedValues.sub_category &&
                                subSubcategoriesMap[watchedValues.sub_category],
                              message: "This field is required",
                            },
                            validate: (value) =>
                              subSubcategoriesMap[
                                watchedValues.sub_category
                              ]?.includes(value) ||
                              "Choose valid sub category 2",
                          })}
                          className={` text-[16px] outline-none text-gray2 h-[45px] w-full ${
                            errors.sub_category2 && " border-red"
                          }`}
                        >
                          <option value="" selected disabled>
                            Select a sub category2
                          </option>
                          {subSubcategoriesMap[watchedValues.sub_category].map(
                            (item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      {errors.sub_category2 && (
                        <span className="text-red ms-2">
                          {errors.sub_category2.message}
                        </span>
                      )}
                    </div>
                  )}

                {/* Size */}
                {getFilters(
                  watchedValues.category,
                  watchedValues.sub_category,
                  watchedValues.sub_category2
                )?.length > 0 && (
                  <button
                    type="button"
                    role="button"
                    onClick={() => window.sizeModal.showModal()}
                    className="btn btn-outline btn-md btn-primary w-full"
                  >
                    Add Size
                  </button>
                )}

                {sizes.length > 0 && (
                  <div className="flex flex-col gap-2 mt-6">
                    <span>Added Sizes:</span>
                    <div className="flex flex-col gap-2">
                      {sizes.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 border border-borderColor rounded-xl p-2 relative"
                        >
                          <span>Size: {item.size}</span>
                          <span>Base Price: ₹{item.basePrice}</span>
                          <span>Stock: {item.stock}</span>
                          {[
                            "Gloves",
                            "Leg Guard",
                            "Thigh Pad",
                            "Inner ThighPad",
                            "Arm Guard",
                          ].includes(watchedValues.sub_category2) && (
                            <span>Side: {item.side}</span>
                          )}
                          <span>Discount: {item.discountedPercent}%</span>
                          <button
                            onClick={() =>
                              setSizes(sizes.filter((size) => size !== item))
                            }
                            type="button"
                            role="button"
                            className="p-1 bg-red rounded-full opacity-80 absolute top-1/2 -translate-y-1/2 right-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* choose color */}
                <div className="my-5 px-3">
                  <div className="">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        Choose color:{" "}
                        {watchedValues.color && (
                          <div
                            style={{ backgroundColor: watchedValues.color }}
                            className="h-6 w-6 rounded-full border border-gray-400"
                          />
                        )}
                      </div>
                      <label
                        className={`bg-gray-50  border cursor-pointer border-borderColor flex  rounded-full justify-center items-center h-6 w-6`}
                        type="button"
                        htmlFor="color"
                      >
                        +
                        <input
                          className=" opacity-0 w-0 h-0"
                          type="color"
                          id="color"
                          {...register("color", {
                            required: {
                              value: true,
                              message: "Please select color",
                            },
                          })}
                        />
                      </label>
                    </div>
                    {errors.color && (
                      <AppFormErrorLine message={errors.color.message} />
                    )}
                  </div>
                </div>

                {/* Available color s*/}
                <div className="px-3">
                  <div className="flex justify-between">
                    Available color:
                    <div className="ps-4 flex-1 flex items-center gap-5 flex-wrap">
                      {watchedValues.color && (
                        <div
                          style={{ backgroundColor: watchedValues.color }}
                          className="h-6 w-6 rounded-full border border-gray-400"
                        />
                      )}
                      {availableColors?.map((item, i) => (
                        <div
                          style={{ backgroundColor: item }}
                          className="relative h-6 w-6 border border-gray-400 rounded-full"
                        >
                          <button
                            onClick={() =>
                              setAvailableColors(
                                availableColors.filter(
                                  (color) => color !== item
                                )
                              )
                            }
                            type="button"
                            className="-top-3 text-red -right-2 absolute"
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                    <label
                      className={`bg-gray-50  border ${
                        watchedValues.color ? "cursor-pointer" : ""
                      }  border-borderColor flex  rounded-full justify-center items-center h-6 w-6`}
                      type="button"
                      htmlFor="availableColorInput"
                    >
                      +
                      <input
                        disabled={!watchedValues.color}
                        onBlur={(e) =>
                          setAvailableColors((prev) => [
                            ...prev,
                            e.target.value,
                          ])
                        }
                        className=" opacity-0 w-0 h-0"
                        type="color"
                        id="availableColorInput"
                      />
                    </label>
                  </div>
                </div>

                {/* buttons */}
                <div className="my-5">
                  <button
                    type="submit"
                    className="h-[54px] rounded-xl text-white bg-darkgreen w-full"
                  >
                    {isPending ? (
                      <>
                        <div className="loading loading-spinner loading-md"></div>
                      </>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
                <div className="my-5">
                  <button
                    type="button"
                    onClick={(e) => window.verificationModal.showModal()}
                    className="h-[54px] rounded-xl btn btn-neutral btn-outline w-full"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>

            {/* choose image */}
            <div className="border-dashed border-l-2  ps-5 pe-3 flex flex-col  items-center  border-l-stone1">
              {/* product image */}
              <div className="h-[420px] md:min-w-[400px] min-w-[300px] rounded-xl mt-7  text-center flex flex-col justify-center items-center max-w-[453px] border border-stone2">
                <input
                  type="file"
                  onChange={handleImageChange}
                  ref={inputRef}
                  className="hidden"
                  multiple
                  max={4}
                  accept="image/*"
                />
                <button
                  disabled={selectedImages.length >= 4}
                  onClick={handleChooseImage}
                  type="button"
                  className=" bg-gradient-to-t from-blackwhite text-white h-[55px] rounded-xl w-[253px] to-whiteblack disabled:opacity-50"
                >
                  Choose image
                </button>

                {selectedImages.length === 4 && (
                  <span className="text-red font-medium ">
                    You can select only 4 image
                  </span>
                )}
              </div>
              {/* selected image */}
              <div className="flex flex-wrap mt-10 gap-4">
                {selectedImages &&
                  selectedImages.map((item, index) => (
                    <div className="relative min-h-52 max-h-52 max-w-44 min-w-44 rounded-lg border-neutral-300 border">
                      <button
                        onClick={() => {
                          handleRemoveImage(index);
                        }}
                        className="absolute right-1 top-1 text-xl rounded-full text-red "
                      >
                        <img className="h-5 w-5" src={crossIcon} alt="" />
                      </button>
                      <img
                        className="w-full h-full object-contain object-center"
                        src={URL.createObjectURL(item)}
                        alt=""
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* verification modal */}

      <dialog id="verificationModal" className="modal ">
        <form method="dialog" className="modal-box  max-h-[777px] w-[656px]">
          <h3 className="font-bold text-lg text-[24px] text-center pb-4 border-b gap-16 border-dashed border-b-black  ">
            Verification Details
          </h3>
          <div className="mt-5 font-semibold px-2">
            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
              Product Name:
              {watchedValues.name ? (
                <span className="text-base font-semibold">
                  {watchedValues.name}
                </span>
              ) : (
                <span className="text-red text-base">Please enter Name!</span>
              )}
            </div>

            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
              Description:
              {watchedValues.description ? (
                <span className="text-base font-semibold">
                  {watchedValues.description}
                </span>
              ) : (
                <span className="text-red text-base">
                  Please enter Description!
                </span>
              )}
            </div>
            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
              Category:
              {watchedValues.category ? (
                <span className="text-base font-semibold">
                  {watchedValues.category}
                </span>
              ) : (
                <span className="text-red text-base">
                  Please enter Category!
                </span>
              )}
            </div>

            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
              Sub Category:
              {watchedValues.sub_category ? (
                <span className="text-base font-semibold">
                  {watchedValues.sub_category}
                </span>
              ) : (
                <span className="text-red text-base">
                  Please enter Subcategory!
                </span>
              )}
            </div>

            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
              Color:
              {watchedValues.color ? (
                <div
                  style={{ backgroundColor: watchedValues.color }}
                  className="text-base font-semibold h-5 w-5 rounded-full"
                ></div>
              ) : (
                <span className="text-red text-base">Please enter color!</span>
              )}
            </div>

            <div className="my-[15px] flex items-center gap-2 flex-wrap lg:text-[16px] max-xl:text-[18px]">
              Available Color:{" "}
              {availableColors || watchedValues.color ? (
                <>
                  {watchedValues.color && (
                    <div
                      style={{ backgroundColor: watchedValues.color }}
                      className="text-base font-semibold h-5 w-5 rounded-full"
                    ></div>
                  )}
                  {availableColors.map((item) => (
                    <div
                      style={{ backgroundColor: item }}
                      className="text-base font-semibold h-5 w-5 rounded-full"
                    ></div>
                  ))}
                </>
              ) : (
                <span className="text-red text-base">
                  Please enter Available Color!
                </span>
              )}
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="mt-3 bg-gray3 w-[285px] h-[54px] rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default CreateProduct;
