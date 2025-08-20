"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "../../../component/searchBar";

interface Hotel {
  id: number;
  name: string;
  image: string;
  price: number | string;
}

const HotelsPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
  const fetchHotels = async () => {
    try {
      const res = await fetch("http://localhost:3000/hotels/api/getAllHotels");
      const data = await res.json();

      // map ให้ field ตรงกับ interface Hotel
      const mappedHotels: Hotel[] = data.map((h: any) => ({
        id: h.hotel_id,
        name: h.hotel_name,
        image: "https://via.placeholder.com/400x300", // backend ยังไม่มี image → ใช้ placeholder
        price: 1000, // mock ราคาเริ่มต้น
      }));

      setHotels(mappedHotels);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchHotels();
}, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading hotels...</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen min-w-screen bg-white">
      <div className="md:ml-24">
        <div className='mt-2 '>
            <SearchBar value={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
            } }/>
        </div>

        <div className="flex gap-2 justify-between">
            <div className="text-black">
                Best places
            </div>
            <div className="flex gap-x-2">
                <button className="border rounded-lg px-4 py-2 bg-white text-blue-600 hover:bg-gray-100">
                    Sort By
                </button>
                <button className="border rounded-lg px-4 py-2 bg-white text-blue-600 hover:bg-gray-100">
                    Filter
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
            <div
                key={hotel.id}  // ตอนนี้จะ unique แล้ว
                className="border rounded-2xl shadow hover:shadow-lg transition"
            >
                <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4 flex">
                    <div className="w-1/2">
                        <h3 className="font-semibold text-lg">{hotel.name}</h3>
                        <p className="text-sm text-gray-600">
                        Price starts from {Number(hotel.price).toLocaleString()}
                        </p>
                    </div>
                    <div className="w-1/2">
                        <button
                        onClick={() => router.push(`/review/${hotel.id}`)}
                        className="w-full border border-gray-200 text-blue-600 py-2 rounded-lg hover:bg-gray-200 transition"
                        >
                        View Details
                        </button>
                    </div>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
