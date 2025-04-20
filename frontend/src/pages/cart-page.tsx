import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart-context";
import { ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { orderApi } from "../api/order";

const CartPage = () => {
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    totalPrice,
    clearCart,
    store,
  } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRemove = (name: string) => {
    removeFromCart(name);
  };

  const handleIncrement = (name: string) => {
    incrementQuantity(name);
  };

  const handleDecrement = (name: string) => {
    decrementQuantity(name);
  };

  const handleOrder = async () => {
    if (!username) {
      setError("Please provide your username before proceeding.");
      return;
    }
    setLoading(true);
    try {
      const result = await orderApi.createOrder(
        store,
        username,
        cart,
        totalPrice
      );
      if (result.success) {
        toast.success("Order placed successfully!");
        navigate("/order-confirmation");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to place the order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col space-y-3 p-5">
      <Link to="/" className="border border-neutral-200 p-1 rounded-md w-fit">
        <ChevronLeft className="text-red-500" />
      </Link>
      <div className="w-full flex flex-col sm:w-[70%] mx-auto flex-1">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-4xl font-semibold w-full lg:max-w-[70%] text-red-600">
            Your Shopping Cart
          </h1>
          <p className="sm:max-w-[70%] w-full text-sm sm:text-base text-neutral-500">
            Review the items you've added to your cart. Adjust quantities or
            remove items before proceeding to checkout. Enjoy a smooth shopping
            experience with secure payment options.
          </p>
        </div>

        <div className="flex-1 mt-3">
          {cart.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Total</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <tr key={product.name} className="border-b">
                      <td className="px-4 py-2">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <button
                            className="text-red-500"
                            onClick={() => handleDecrement(product.name)}
                          >
                            -
                          </button>
                          <span>{product.quantity}</span>
                          <button
                            className="text-red-500"
                            onClick={() => handleIncrement(product.name)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">₹ {product.price}</td>
                      <td className="px-4 py-2">
                        ₹ {product.price * product.quantity}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleRemove(product.name)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-red-600">
                  Total Price: ₹ {totalPrice}
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className="p-2 border border-neutral-200 rounded-md w-full sm:w-[50%] outline-none"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-md cursor-pointer"
                  onClick={clearCart}
                >
                  Clear cart
                </button>
                <button
                  className="px-6 py-2 bg-red-500 text-white rounded-md cursor-pointer"
                  onClick={handleOrder}
                >
                  {loading ? "Checking Out..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
