import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store/index.js";
import { Provider as ReduxProvider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <App />
        {import.meta.env.DEV && <ReactQueryDevtools  />}
      </ReduxProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
