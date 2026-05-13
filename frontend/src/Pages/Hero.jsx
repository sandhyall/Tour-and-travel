import React from "react";
import { Search, Users, Star, DollarSign, Leaf } from "lucide-react";
import video from "../assets/video.mp4";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h2 className="mb-2 text-2xl font-semibold md:text-4xl drop-shadow-lg">
          Experience the Difference!
        </h2>

        <h1 className="mb-8 text-5xl font-bold md:text-8xl drop-shadow-2xl">
          Discover
        </h1>

        <div className="relative w-full max-w-3xl">
          <input
            type="text"
            placeholder="Search Trips"
            className="w-full rounded-md py-4 pl-6 pr-14 text-lg text-black outline-none shadow-2xl"
          />
          <Search
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            size={24}
          />
        </div>
      </div>

      <div className="absolute bottom-10 z-10 w-full px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 text-white">
          <div className="flex items-center gap-3">
            <Users size={30} />
            <div>
              <p className="font-bold">19 Years+</p>
              <p className="text-xs uppercase opacity-80">Experience</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Star size={30} />
            <div>
              <p className="font-bold">3350+</p>
              <p className="text-xs uppercase opacity-80">Reviews</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DollarSign size={30} />
            <div>
              <p className="font-bold">Best Price</p>
              <p className="text-xs uppercase opacity-80">Guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Leaf size={30} />
            <div>
              <p className="font-bold">Eco Friendly</p>
              <p className="text-xs uppercase opacity-80">Travel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
