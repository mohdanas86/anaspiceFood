import React from "react";

const FeaturedItem = () => {
  const dish = JSON.parse(localStorage.getItem("dish") || "[]");
  console.log(dish[0]);

  return (
    <div className="container mx-auto">
    <h2 className="text-2xl font-bold mb-2">Featured Items</h2>
  <div className="w-[100%] mx-auto grid grid-cols-2 gap-4 py-8">
    <div className="w-full">
      <div className="card card-side bg-base-100 shadow h-[25vh]">
        <figure>
          <img src={dish[1].image} alt={dish[1].name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{dish[1].name}</h2>
          <p>{dish[1].description}</p>
          <div className="card-actions justify-end">
            <button  className="btn btn-primary flex justify-center items-center gap-4 hover:translate-x-[-5px] duration-300 px-12 rounded-full capitalize">more</button>
          </div>
        </div>
      </div>
    </div>

    <div className="w-full">
      <div className="card card-side bg-base-100 shadow h-[25vh]">
        <figure>
          <img src={dish[3].image} alt={dish[3].name} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{dish[3].name}</h2>
          <p>{dish[3].description}</p>
          <div className="card-actions justify-end">
          <button  className="btn btn-primary flex justify-center items-center gap-4 hover:translate-x-[-5px] duration-300 px-12 rounded-full capitalize">more</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default FeaturedItem;
