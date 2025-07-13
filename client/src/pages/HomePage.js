import React from "react";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";


const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
          Find Your Perfect Student Rental
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Search, compare, and connect with landlords — all in one place.
        </p>

        <div className="flex justify-center gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl shadow-md">
            Browse Listings
          </Button>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-100 text-lg px-6 py-3 rounded-xl">
            Post a Property
          </Button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {[
          {
            title: "Verified Listings",
            desc: "All properties are verified to keep you safe.",
          },
          {
            title: "Student-Friendly",
            desc: "Affordable options tailored for students.",
          },
          {
            title: "Easy Contact",
            desc: "Chat directly with property owners.",
          },
        ].map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-md border">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
