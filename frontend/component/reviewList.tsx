"use client";
import React, { useEffect, useState } from "react";

interface Room {
  room_id: number;
  room_name: string;
  room_type_id: number;
  capacity: number;
  price: number;
  hotel_id: number;
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

interface Props {
  hotelId: string | number;
}

const ReviewList: React.FC<Props> = ({ hotelId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // 🔹 1) ดึงห้องทั้งหมด
        const resRooms = await fetch(
          `http://localhost:3000/rooms/api/getRoomByHotelId/${hotelId}`
        );
        const roomData: Room[] = await resRooms.json();

        // 🔹 2) ยิง API รีวิวของแต่ละห้อง
        const reviewPromises = roomData.map(async (room) => {
          const resReview = await fetch(
            `http://localhost:3000/reviews/api/getReviewByRoomTypeId/${room.room_id}`
          );
          const reviewData: Review[] = await resReview.json();
          return reviewData;
        });

        // 🔹 3) รวมรีวิวทุกห้อง
        const reviewResults = await Promise.all(reviewPromises);
        const allReviews = reviewResults.flat();
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) fetchReviews();
  }, [hotelId]);

  if (loading) {
    return <p className="text-center mt-6">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  // 🔹 4) คำนวณค่าเฉลี่ยรวม
  const totalReviews = reviews.length;
  const avgHousekeeping =
    reviews.reduce((sum, r) => sum + r.house_keeping_rating, 0) / totalReviews;
  const avgFood =
    reviews.reduce((sum, r) => sum + r.food_rating, 0) / totalReviews;
  const avgService =
    reviews.reduce((sum, r) => sum + r.service_rating, 0) / totalReviews;
  const avgStaff =
    reviews.reduce((sum, r) => sum + r.staff_rating, 0) / totalReviews;

  const avgRating = (
    (avgHousekeeping + avgFood + avgService + avgStaff) /
    4
  ).toFixed(1);

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">

      {/* 🔹 คะแนนรวม */}
      <div className="flex items-center gap-2 mt-2 mb-4">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-lg">
          {avgRating}
        </span>
        <span className="text-gray-600">{reviews.length} reviews</span>
      </div>

      <div className="flex">
        <div className="text-black">
            <p>Housekeeping</p>
            <p>Food</p>
            <p>Service</p>
            <p>Staff</p>
        </div>
        <div className="text-black ml-2">
            <p> {"⭐".repeat(Math.round(avgHousekeeping))}</p>
            <p> {"⭐".repeat(Math.round(avgFood))}</p>
            <p> {"⭐".repeat(Math.round(avgService))}</p>
            <p> {"⭐".repeat(Math.round(avgStaff))}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
