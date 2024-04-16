import warning from "../../assets/images/warning.png";
import Error404 from "./404";
const NotSupported = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen p-2 w-full">
      <img src={warning} />
      <div className="text-3xl tracking-wide text-center">
        Device not supported!
      </div>
      <div className=" text-xl opacity-75 mt-5 text-center">
        Please use a desktop or laptop to access this website.
      </div>
    </div>
  );
};
export default NotSupported;
