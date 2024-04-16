import { useDispatch } from "react-redux";
import RoutesContainer from "./routes";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUser } from "./api/auth";
import { setIsAuthenticating, setUser } from "./store/slices/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: Infinity,
    retry: 0,
  });

  useEffect(() => {
    if (!isLoading) {
      dispatch(setIsAuthenticating(false));
    }
    if (!isLoading && !isError) {
      dispatch(setUser(data.user));
    }
  }, [isLoading, data, isError]);
  return <RoutesContainer />;
};
export default App;
