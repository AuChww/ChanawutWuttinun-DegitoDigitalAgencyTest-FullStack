"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Room {
  room_id: number;
  room_name: string;
  room_type_id: number;
  capacity: number;
  price: number;
  hotel_id: number;
}

interface Props {
  hotelId: string | number;
}

const RoomList: React.FC<Props> = ({ hotelId }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`http://localhost:3000/rooms/api/getRoomByHotelId/${hotelId}`);
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) fetchRooms();
  }, [hotelId]);

  if (loading) {
    return <p className="text-center mt-6">Loading rooms...</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms && rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room.room_id}
              className="border rounded-xl shadow h-28 bg-white overflow-hidden mt-4 flex"
            >
              {/* สมมุติว่าไม่มีรูปจาก API */}
              <div className="w-1/3 h-auto flex items-center justify-center bg-gray-200">
                <span className="text-gray-500">No Image</span>
              </div>
              <div className="w-2/3 flex justify-between items-center">
                <div className="px-2">
                  <h4 className="font-semibold text-black mb-2 text-xs">{room.room_name}</h4>
                  <p className="text-blue-600 font-bold">
                    {Number(room.price).toLocaleString()} BAHT/night
                  </p>
                </div>
                <button className="bg-blue-600 text-white h-full rounded-r-lg" onClick={() => router.push(`/booking/${room.room_id}`)}>
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No rooms available.</p>
        )}
      </div>
    </div>
  );
};

export default RoomList;
