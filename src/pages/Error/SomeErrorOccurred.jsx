import warning from "../../assets/images/warning.png";

const SomeErrorOccurred = () => {
  return (
    <div className="flex h-[calc(100vh-90px)] flex-col justify-center items-center text-center p-2 bg-[#F5F6FA]">
      <img src={warning}
      className="mix-blend-multiply"
      />
      <div className="text-4xl font-semibold text-red tracking-wider">
        Error occurred
      </div>
      <div className="text-xl mt-3 tracking-wide">
        Something went wrong, Please try refreshing the page.
      </div>
    </div>
  );
};
export default SomeErrorOccurred;
