import "./index.css";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import Header from "./components/Header";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/sonner";
import { CartProvider } from "./context/CartContext";
import { ProductDetail } from "./pages/ProductDetail";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

const PrivateRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("user"));
  return auth?.auth ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <PrivateRoute>
              <ProductDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
      <Toaster />
    </CartProvider>
  </BrowserRouter>
);
