import { MapPin, Star } from "lucide-react";
import { Store } from "../types/types";
import { Link } from "react-router-dom";

const StoreCard = ({ name, image, location, rating, _id }: Store) => {
  return (
    <Link
      to={`/store/${_id}`}
      className="border border-neutral-200 p-2 sm:p-3 rounded-md flex flex-col space-y-2"
    >
      <img
        src={image}
        alt="name"
        className="h-[195px] sm:h-[250px] rounded-md"
      />
      <div className="flex flex-col">
        <h2 className="text-lg sm:text-xl text-neutral-600 font-medium">
          {name}
        </h2>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center">
            <h2 className="text-base font-normal">Rating: {rating}</h2>
            <Star className="size-4 text-yellow-400" />
          </div>
          <h2 className="text-base font-normal flex items-center">
            <MapPin className="text-red-500 size-4" />
            {location}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
