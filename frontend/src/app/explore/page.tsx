"use client";
import { useState, useEffect } from "react";
import { useSearch } from "../../../context/searchContext";
import { useRouter } from "next/navigation";

interface Hotel {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
}



export default function Explore() {
  const { keyword, location, checkIn, checkOut, capacity, setSearch } = useSearch();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const router = useRouter();

  const [placeholders, setPlaceholders] = useState({
    location: "Where are you going?",
    checkIn: "Check-in",
    checkOut: "Check-out",
    capacity: "2 adult, 0 children - 1 room",
  });

  // โหลดข้อมูลโรงแรมจาก API
  useEffect(() => {
    const fetchHotels = async () => {
        try {
        const res = await fetch("http://localhost:3000/hotels/api/getAllHotels");
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data = await res.json();

        // 🔹 map ให้ตรงกับ interface Hotel
        const mappedHotels: Hotel[] = data.map((h: any) => ({
            id: h.hotel_id,
            name: h.hotel_name,
            rating: 4.5, // mock data
            reviews: 100, // mock data
            price: "$120/night", // mock data
            image: "https://dq5r178u4t83b.cloudfront.net/wp-content/uploads/sites/125/2020/06/15182916/Sofitel-Dubai-Wafi-Luxury-Room-Bedroom-Skyline-View-Image1_WEB.jpg" // mock image
        }));

        setHotels(mappedHotels);
        } catch (error) {
        console.error("Error fetching hotels:", error);
        }
    };
    fetchHotels();
    }, []);

  const handleSearch = () => {
    const result = {
      keyword,
      location: location || placeholders.location,
      checkIn: checkIn || placeholders.checkIn,
      checkOut: checkOut || placeholders.checkOut,
      capacity: capacity || placeholders.capacity,
    };

    console.log("Search result:", result);

    setSearch(result);

    // update placeholders
    setPlaceholders({
      location: result.location,
      checkIn: result.checkIn,
      checkOut: result.checkOut,
      capacity: result.capacity,
    });

    router.push("/hotel");
  };

  return (
    <div className="pl-6 min-h-screen min-w-screen bg-white">
      <div className="md:ml-24">
        <div className="flex gap-x-8 h-screen">
          {/* Left Panel */}
          <div className="w-1/2 bg-white text-black mt-6 overflow-y-auto">
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
            <div className="grid grid-cols-1 gap-y-2 md:flex-row md:items-center ">
                <h2 className="text-2xl mt-12 font-semibold mb-6 text-blue-600">What Are You Looking For?</h2> 
                <div className="flex space-x-4 mb-6"> 
                    <button className="flex-1 py-2 bg-blue-100 rounded">Hotel</button> 
                    <button className="flex-1 py-2 rounded">Flight</button> 
                    <button className="flex-1 py-2 rounded">Car</button> 
                </div>

                {/* Location */}
                <input
                type="text"
                value={location}
                onChange={(e) => setSearch((prev) => ({ ...prev, location: e.target.value }))}
                placeholder={placeholders.location}
                className="flex-1 border border-gray-300 px-4 py-2 bg-white text-black"
                />

                {/* Check-in */}
                <div className="w-full">
                    <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setSearch((prev) => ({ ...prev, checkIn: e.target.value }))}
                    placeholder={placeholders.checkIn}
                    className="border border-gray-300 px-4 py-2 w-1/2 bg-white text-gray-600"
                    />

                    {/* Check-out */}
                    <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setSearch((prev) => ({ ...prev, checkOut: e.target.value }))}
                    placeholder={placeholders.checkOut}
                    className="border border-gray-300 px-4 py-2 w-1/2 bg-white text-gray-600"
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
                className="bg-blue-600 w-32 mx-auto mt-2 text-white px-6 py-2  hover:bg-blue-700"
                >
                Search
                </button>
            </div>

            {/* Recent Hotels (ดึงจาก API) */}
            <h3 className="font-semibold mb-4 mt-8">Recent Searches</h3>
            <div className="space-y-4">
              {hotels.length > 0 ? (
                hotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="flex border  border-gray-200"
                  >
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-20 h-20 object-cover  mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{hotel.name}</h4>
                      <p className="text-sm">
                        ⭐ {hotel.rating} ({hotel.reviews} reviews)
                      </p>
                      <p className="text-sm mt-1 text-blue-600 font-semibold">{hotel.price}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-2 py-1 ">
                      Book Now
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Loading hotels...</p>
              )}
            </div>
          </div>

          {/* Right panel */}
          <div
            className="w-1/2 relative bg-cover bg-center rounded-l-2xl"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1564507592333-c60657eea523?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqfGVufDB8fDB8fHww")',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex flex-col justify-center p-16">
              <h1 className="text-4xl font-bold text-white mb-4">
                Incredible India
              </h1>
              <p className="text-white mb-6">
                “For where thy treasure is, here also will thy heart be.”
              </p>
              <button className="bg-white text-black px-4 py-2 rounded">
                Take Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
