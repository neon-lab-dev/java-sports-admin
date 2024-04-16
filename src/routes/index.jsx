import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ROUTES from "./routes";
import AppLayout from "../components/layouts/RootLayout";
import AppLoading from "../components/loaders/AppLoading";
import SomeErrorOccurred from "../pages/Error/SomeErrorOccurred";

const RoutesContainer = () => {
  return (
    <Router>
      <Routes>
        <Route path="admin">
          {ROUTES.map(({ component: Component, path }, index) => {
            return (
              <Route
                key={index}
                path={"/admin" + path}
                errorElement={<SomeErrorOccurred />}
                element={
                  <AppLayout>
                    <Suspense fallback={<AppLoading />}>
                      <Component />
                    </Suspense>
                  </AppLayout>
                }
              />
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
};
export default RoutesContainer;
