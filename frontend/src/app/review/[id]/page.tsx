"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReviewList from "../../../../component/reviewList";
import RoomList from "../../../../component/roomList";
import SearchBar from "../../../../component/searchBar";

interface Room {
  id: number;
  name: string;
  price: number | string;
  image: string;
}

interface Review {
  review_id: number;
  booking_id: number;
  roomtype_id: number;
  user_id: number;
  house_keeping_rating: number;
  food_rating: number;
  service_rating: number;
  staff_rating: number;
}

interface Hotel {
  hotel_id: number;
  hotel_name: string;
  location: string;
  rooms?: Room[];
  reviews?: Review[];
}

const ReviewPage: React.FC = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(`http://localhost:3000/hotels/api/getHotelById/${id}`);
        const data = await res.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchHotel();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading hotel details...</p>
      </div>
    );
  }

  if (!hotel) {
    return <p className="text-center mt-10">Hotel not found</p>;
  }

  // 👉 คำนวณค่าเฉลี่ย rating
  const avgRating =
    hotel.reviews && hotel.reviews.length > 0
      ? (
          hotel.reviews.reduce(
            (sum, r) =>
              sum +
              r.house_keeping_rating +
              r.food_rating +
              r.service_rating +
              r.staff_rating,
            0
          ) /
          (hotel.reviews.length * 4)
        ).toFixed(1)
      : "N/A";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className='ml-24'>
            <SearchBar value={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
            } }/>
        </div>
      <div className="md:ml-24 flex gap-x-2">
        <div className="w-2/3">
          <div className="">
            <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No Image</span>
              </div>
            <h2 className="text-2xl font-semibold text-black mt-2">{hotel.hotel_name}</h2>
            <p className="text-gray-400">{hotel.location}</p>
          </div>

          <RoomList hotelId={id} />
        </div>
        <div className="w-1/3">
          <ReviewList hotelId={id} />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
