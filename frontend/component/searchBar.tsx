"use client";
import React, { useState } from "react";
import { useSearch } from "../context/searchContext";

const SearchBar: React.FC = () => {
  const { keyword, location, checkIn, checkOut, capacity, setSearch } = useSearch();

  // เก็บค่า placeholder ล่าสุดที่กด search
  const [placeholders, setPlaceholders] = useState({
    location: "Where are you going?",
    checkIn: "Check-in",
    checkOut: "Check-out",
    capacity: "2 adult, 0 children - 1 room",
  });

  const handleSearch = () => {
    const result = {
      keyword,
      location: location || placeholders.location,
      checkIn: checkIn || placeholders.checkIn,
      checkOut: checkOut || placeholders.checkOut,
      capacity: capacity || placeholders.capacity,
    };

    console.log("Search result:", result);

    // update placeholders
    setPlaceholders(result);

    // update context ด้วยค่าที่ search แล้ว
    setSearch(result);
  };

  return (
    <div className="w-full space-y-4 mb-4 text-sm">
      {/* Search Input (top) */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setSearch((prev) => ({ ...prev, keyword: e.target.value }))}
          placeholder="Search city, country, place for travel advisory"
          className="w-full rounded-lg px-4 py-2 bg-gray-200 text-gray-700"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-col md:flex-row md:items-center ">
        {/* Location */}
        <input
          type="text"
          value={location}
          onChange={(e) => setSearch((prev) => ({ ...prev, location: e.target.value }))}
          placeholder={placeholders.location}
          className="flex-1 border border-gray-300 px-4 py-2 bg-white text-black"
        />

        {/* Check-in */}
        <div className="mx-6 flex">
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setSearch((prev) => ({ ...prev, checkIn: e.target.value }))}
            placeholder={placeholders.checkIn}
            className="border border-gray-300 px-4 py-2 bg-white text-gray-600"
          />

          {/* Check-out */}
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setSearch((prev) => ({ ...prev, checkOut: e.target.value }))}
            placeholder={placeholders.checkOut}
            className="border border-gray-300 px-4 py-2 bg-white text-gray-600"
          />
        </div>

        {/* Capacity */}
        <input
          type="text"
          value={capacity}
          onChange={(e) => setSearch((prev) => ({ ...prev, capacity: e.target.value }))}
          placeholder={placeholders.capacity}
          className="border border-gray-300 px-4 py-2 bg-white text-gray-600"
        />

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="bg-blue-600 ml-6 text-white px-6 py-2 hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
