import avatar from "../../assets/icons/avatar.svg";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <header className="h-[70px] bg-white w-full">
      <div className="flex h-[70px] items-center md:ps-11  md:pe-7 justify-between">
        <div></div>

        {/* user Name and avatar */}
        <div className="flex items-center gap-3">
          <img
            className="h-[44px] w-[44px] rounded-full bg-gray-100 object-cover object-center"
            src={user?.avatar?.url || avatar}
            alt=""
          />

          <div className="flex flex-col justify-center">
            <h1 className="font-bold font-lato text-[14px] ">
              {user && user.full_name}
            </h1>
            <p className="text-[12px] font-lato font-semibold text-brown ">
              {user.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
