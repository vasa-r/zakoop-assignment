/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { productApi } from "../api/products";
import toast from "react-hot-toast";
import { Link, redirect, useParams } from "react-router-dom";
import { StoreNProducts } from "../types/types";
import ProductCard from "../components/product-card";
import { ChevronLeft } from "lucide-react";

const StorePage = () => {
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<StoreNProducts | null>(null);

  const params = useParams();
  const { storeId } = params;

  if (!storeId) {
    redirect("/");
  }

  useEffect(() => {
    fetchProducts();
  }, [curPage]);

  const fetchProducts = async () => {
    try {
      const result = await productApi.getProducts(storeId!, curPage);

      if (result.success) {
        setProducts(result.data);
        setTotalPages(result.data.meta.totalPages);
      }
    } catch (error) {
      console.log(error);
      toast.error("Please try again later.");
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurPage(page);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col space-y-3 p-5">
      <Link to="/" className="border border-neutral-200 p-1 rounded-md w-fit">
        <ChevronLeft className="text-red-500" />
      </Link>
      <div className="w-full sm:w-[70%] mx-auto flex-1">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-4xl font-semibold w-full lg:max-w-[70%] text-red-600">
            Welcome to {products?.store.name}
          </h1>
          <p className="sm:max-w-[70%] w-full text-sm sm:text-base text-neutral-500">
            Your trusted neighborhood store on{" "}
            <span className="text-red-500">{products?.store.location}</span>.
            Discover fresh produce, quality groceries, and great prices — all in
            one place.
          </p>
        </div>
        <h2 className="text-2xl font-medium mt-3">Explore Products</h2>
        <div className="flex flex-col gap-2 mt-3">
          {products?.products.map((product) => (
            <ProductCard key={product._id} {...product} storeId={storeId!} />
          ))}
        </div>

        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(curPage - 1)}
            disabled={curPage === 1}
            className="px-4 py-2 bg-red-500 rounded-md disabled:bg-red-200"
          >
            Prev
          </button>
          <span className="flex items-center justify-center">
            Page {curPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(curPage + 1)}
            disabled={curPage === totalPages}
            className="px-4 py-2 bg-red-500 rounded-md disabled:bg-red-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
