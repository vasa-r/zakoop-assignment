import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/home-page"));
const StorePage = lazy(() => import("./pages/store-page"));
const CartPage = lazy(() => import("./pages/cart-page"));
const OrderConfirmationPage = lazy(
  () => import("./pages/order-confirmation-page")
);

const Loading = () => {
  return <div>loading</div>;
};

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/store/:storeId" element={<StorePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
