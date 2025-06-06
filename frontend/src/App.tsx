import { Loader, ShoppingBasket } from "lucide-react";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Link, Route, Routes } from "react-router-dom";
import Logo from "../src/assets/logo.png";

const HomePage = lazy(() => import("./pages/home-page"));
const StorePage = lazy(() => import("./pages/store-page"));
const CartPage = lazy(() => import("./pages/cart-page"));
const OrderConfirmationPage = lazy(
  () => import("./pages/order-confirmation-page")
);

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-emerald-50/50">
      <div>
        <Loader className="text-red-500 size-8 animate-spin" />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="h-svh w-svw">
      <Suspense fallback={<Loading />}>
        <header className="flex items-center justify-between sm:gap-2 px-5 py-3 sm:px-10 sm:py-2">
          <Link to={"/"} className="flex items-center gap-1">
            <img src={Logo} alt="app logo" className="size-6 sm:size-10" />
            <h1 className="text-xl sm:text-2xl font-semibold">Zakoop</h1>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-0.5 bg-red-500 p-1 text-white rounded-md shadow"
          >
            <ShoppingBasket className="size-5" /> Your Cart
          </Link>
        </header>
        <div className="w-full border-b border-neutral-200" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store/:storeId" element={<StorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
        </Routes>
      </Suspense>
      <Toaster />
    </div>
  );
};

export default App;
