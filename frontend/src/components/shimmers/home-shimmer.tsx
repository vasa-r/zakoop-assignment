const HomeShimmer = () => {
  return (
    <div className="h-screen w-screen flex flex-col space-y-3 p-5">
      <div className="w-full sm:w-[70%] mx-auto flex-1">
        <div className="flex flex-col gap-3">
          <div className="lg:max-w-[70%] h-10 bg-black/10 rounded-md animate-pulse" />
          <div className="sm:max-w-[70%] w-full h-20 bg-black/10 rounded-md animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-5">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-black/10 rounded-md animate-pulse h-40 w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeShimmer;
