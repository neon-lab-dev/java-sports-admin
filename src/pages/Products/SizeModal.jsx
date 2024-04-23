import { useForm } from "react-hook-form";
import AppFormErrorLine from "../../components/AppFormErrorLine";
import { useEffect } from "react";

const SizeModal = ({
  setData,
  options,
  defaultValue = undefined,
  subCategory2,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!watch("size") || watch("size") === "Choose Size/Type") {
      setError("size", {
        type: "manual",
        message: "Please select a size",
      });
      return;
    }
    if (defaultValue) {
      setData({ id: defaultValue.id, ...data });
    } else {
      setData(data);
    }
    reset();
    document.getElementById("sizeModal").close();
  };

  useEffect(() => {
    if (defaultValue) {
      reset(defaultValue);
    }
  }, [defaultValue]);
  return (
    <dialog id="sizeModal" className="modal">
      <div className="modal-box">
        <div className="modal-action">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="dialog"
            className="flex flex-col gap-4 justify-center w-full h-full"
          >
            {/* if there is a button in form, it will close the modal */}
            <div className="flex flex-col gap-1">
              <div
                className={`w-full px-3 rounded-xl h-8 border-darkstone border ${
                  errors.size && " border-red"
                }`}
              >
                <div className="flex flex-col w-full h-full">
                  {/* Placeholder option */}

                  {/* Render options based on filters */}
                  {!defaultValue ? (
                    <select
                      {...register("size")}
                      className="form-select h-full outline:none w-full text-gray-600"
                    >
                      <option
                        disabled
                        selected
                        value={""}
                        className="text-[16px] text-gray2 mb-1"
                      >
                        Choose Size/Type
                      </option>
                      {options.map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center justify-between cursor-not-allowed">
                      <span className="text-gray2 text-[16px]">
                        {defaultValue.size}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {errors.size && (
                <AppFormErrorLine message={errors.size.message} />
              )}
            </div>
            {/* side */}
            {[
              "Gloves",
              "Leg Guard",
              "Thigh Pad",
              "Inner ThighPad",
              "Arm Guard",
            ].includes(subCategory2) && (
              <div className="flex flex-col gap-1">
                <div
                  className={`w-full px-3 rounded-xl h-8 border-darkstone border ${
                    errors.side && " border-red"
                  }`}
                >
                  <div className="flex flex-col w-full h-full">
                    {/* Placeholder option */}

                    <select
                      {...register("side", {
                        required: {
                          value: true,
                          message: "This field is required",
                        },
                      })}
                      className="form-select h-full outline:none w-full text-gray-600"
                    >
                      <option
                        disabled
                        selected
                        value={""}
                        className="text-[16px] text-gray2 mb-1"
                      >
                        Choose Side
                      </option>
                      {["Left", "Right"].map((item, i) => (
                        <option key={i} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {errors.side && (
                  <AppFormErrorLine message={errors.side.message} />
                )}
              </div>
            )}
            {/* base price */}
            <div className="">
              <input
                {...register("basePrice", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  min: {
                    value: 1,
                    message: "Minimum price is 1",
                  },
                })}
                className={`w-full h-[45px] rounded-xl border-darkstone outline-none border ps-3 text-[16px] text-gray2 ${
                  errors.basePrice && "border-red"
                }`}
                type="number"
                placeholder="Base Price"
                min={1}
              />
              {errors.basePrice && (
                <AppFormErrorLine message={errors.basePrice.message} />
              )}
            </div>

            {/* discount percentage */}
            <div className="">
              <input
                {...register("discountedPercent", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  min: {
                    value: 0,
                    message: "Minimum discount percentage is 0",
                  },
                  max: {
                    value: 100,
                    message: "Discounted percentage should be 1 to 100",
                  },
                })}
                className={`w-full h-[45px] rounded-xl border-darkstone outline-none border ps-3 text-[16px] text-gray2 ${
                  errors.discountedPercent && "border-red"
                }`}
                type="number"
                placeholder="Discounted Percentage"
                min={0}
                max={100} // Discounted price should be less than base price
              />
              {errors.discountedPercent && (
                <AppFormErrorLine message={errors.discountedPercent.message} />
              )}
            </div>

            {/* stock */}
            <div className="">
              <input
                {...register("stock", {
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                  validate: (value) =>
                    value >= 0 || "Stock should be positive number",
                })}
                className={`w-full h-[45px] rounded-xl border-darkstone outline-none border ps-3 text-[16px] text-gray2 ${
                  errors.stock && "border-red"
                }`}
                type="number"
                placeholder="Stock"
                min={0}
              />
              {errors.stock && (
                <AppFormErrorLine message={errors.stock.message} />
              )}
            </div>
            <div className="flex gap-4 justify-center items-center">
              <button
                disabled={Object.keys(errors).length > 0}
                className="btn btn-success btn-md px-12"
              >
                {
                  // If there is a default value, change the button text to "Update"
                  defaultValue ? "Update" : "Add"
                }
              </button>
              <button
                onClick={() => {
                  reset();
                  document.getElementById("sizeModal").close();
                }}
                type="button"
                className="btn btn-error btn-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};
export default SizeModal;
