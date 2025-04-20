import { ChevronLeft, CheckCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  return (
    <div className="h-screen w-screen flex flex-col space-y-3 p-5">
      <Link to="/" className="border border-neutral-200 p-1 rounded-md w-fit">
        <ChevronLeft className="text-red-500" />
      </Link>

      <div className="w-full flex flex-col sm:w-[70%] mx-auto flex-1 items-center justify-center text-center space-y-6">
        <CheckCircle className="w-16 h-16 text-green-500" />

        <h1 className="text-3xl font-semibold text-gray-800">
          Thank you for your order!
        </h1>

        <p className="text-gray-600 text-lg">
          We've received your order and it's being prepared. You'll get an
          update as soon as it's on the way!
        </p>

        <Link
          to="/"
          className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
