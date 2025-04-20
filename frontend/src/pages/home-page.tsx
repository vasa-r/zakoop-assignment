import { useEffect, useState } from "react";
import { storeApi } from "../api/store";
import toast from "react-hot-toast";
import StoreCard from "../components/store-card";
import { Stores } from "../types/types";

const HomePage = () => {
  const [stores, setStores] = useState<Stores | []>([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      const result = await storeApi.getStores();

      if (result.success) {
        setStores(result.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Please try again later.");
    }
  };
  return (
    <div className="h-screen w-screen flex flex-col space-y-3 p-5">
      <div className="w-full sm:w-[70%] mx-auto flex-1">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl sm:text-4xl font-semibold w-full lg:max-w-[70%] text-red-600">
            Where Freshness Meets Convenience
          </h1>
          <p className="sm:max-w-[70%] w-full text-sm sm:text-base text-neutral-500">
            Discover organic and locally sourced groceries from top-rated stores
            near you. Healthier choices, just a click away.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-5">
          {stores.map((store) => (
            <StoreCard key={store._id} {...store} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
