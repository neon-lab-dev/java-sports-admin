import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-[calc(100vh-90px)] flex-col justify-center items-center p-2 w-full bg-[#F5F6FA]">
      <div className="text-9xl ">404</div>
      <div className="mt-7 text-2xl text-center">
        The page you are looking for was not found
      </div>
      <button
        className="text-blue-500 mt-3 text-center"
        onClick={() => {
          navigate("/admin/");
        }}
      >
        {" "}
        Back to Home
      </button>
    </div>
  );
};

export default Error404;
