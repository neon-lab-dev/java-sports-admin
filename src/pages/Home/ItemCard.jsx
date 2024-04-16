import React from "react";

const ItemCard = (props) => {
  return (
    <div className="w-[240px] lg:w-[262px] h-[127px] bg-white rounded-[14px] shadow flex justify-between px-5 py-4">
      <div className="flex flex-col flex-grow gap-3.5">
        <div className="opacity-70 text-neutral-800 text-base font-semibold font-lato">
          {props.title}
        </div>
        <div className="text-neutral-800 text-[28px] font-bold font-lato tracking-wide">
          {props.queryKey === "totalOrdersAmount" ||
          props.queryKey === "totalOrdersAmountCancelled"
            ? "₹"
            : ""}
          {props.data}
        </div>
      </div>
      <img
        className="w-[60px] h-[60px]  mix-blend-multiply rounded-[20px]"
        src={props.image}
      />
    </div>
  );
};

export default ItemCard;
