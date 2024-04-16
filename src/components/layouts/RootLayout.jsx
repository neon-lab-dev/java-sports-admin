import Sidebar from "../navbar/Sidebar";
import Header from "../navbar/Header";
import { useInnerSize } from "../../hooks/useInnerSize";
import { Navigate, useLocation } from "react-router-dom";
import NotSupported from "../../pages/Error/NotSupported";
import { useSelector } from "react-redux";
import AppLoading from "../loaders/AppLoading";
import Swal from "sweetalert2";

const RootLayout = ({ children }) => {
  const { isAuthenticating, isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const { pathname } = useLocation();
  const size = useInnerSize();
  if (size.width < 768 || size.height < 500) {
    return <NotSupported />;
  }
  if (isAuthenticating) return <AppLoading />;
  if (pathname === "/admin/login") return children;
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }
  if (isAuthenticated && user?.role?.toLowerCase() !== "admin") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You are not authorized to view this page. Please login with an admin account.",
    });
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex h-screen">
      {/* 👉  w-dvw */}
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-hidden h-full">
        <Header />
        <main className="bg-[#F5F6FA] min-h-[calc(100vh-70px)] h-full overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  );
};
export default RootLayout;
