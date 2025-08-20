"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import SearchBar from "../../../../component/searchBar";
import { useSearch } from "../../../../context/searchContext";
import Summary from "../../../../component/summary";
import { calculateHotelCost } from "../../../../utils/calculateCost";

interface Room {
  room_id: number;
  room_name: string;
  room_type_id: number;
  capacity: number;
  price: number;
  hotel_id: number;
}

interface Hotel {
  hotel_id: number;
  hotel_name: string;
  location: string;
}

export default function BookingPage() {
    const { keyword, location, checkIn, checkOut, capacity } = useSearch();
    const router = useRouter();
    const { id } = useParams();
    const [room, setRoom] = useState<Room | null>(null);
    const [hotel, setHotel] = useState<Hotel | null>(null);
    const [loading, setLoading] = useState(true);
    const [hotel_id, setHotelId] = useState<number | null>(null);


    // 1) ดึงข้อมูล Room
    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3000/rooms/api/getRoomById/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRoom(data[0]);
                setHotelId(data[0].hotel_id) // ได้ค่า hotel_id จาก room
                setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        console.log("room updated:", room);
    }, [room]);

    // 2) ดึงข้อมูล Hotel เมื่อ hotel_id เปลี่ยน
    useEffect(() => {
        if (hotel_id === null) return; // เช็คชัดเจนว่ามีค่าแล้ว

        fetch(`http://localhost:3000/hotels/api/getHotelById/${hotel_id}`)
            .then((res) => res.json())
            .then((data) => {
                setHotel(data);
            })
        .catch((err) => console.error("Fetch hotel error:", err));
    }, [hotel_id]);

    useEffect(() => {
        console.log("ค่าที่ส่งมาจาก SearchBar:", {
          keyword,
          location,
          checkIn,
          checkOut,
          capacity,
        });
    
        if (location !== "" || keyword !== "") {
          fetch(`/api/searchHotels?keyword=${keyword}&location=${location}`)
            .then((res) => res.json())
            .then((data) => console.log("ผลลัพธ์จาก API:", data));
        }
      }, [keyword, location, checkIn, checkOut, capacity]);

    if (loading) return <div className="p-6">Loading...</div>;
    if (!room) return <div className="p-6">Room not found</div>;

    const cost = calculateHotelCost(
        room.room_name,
        room.price,
        checkIn || "2025-09-01",
        checkOut || "2025-09-02"
    );

    const handleContinue = async () => {
        if (!room) return;

        // คำนวณค่าใช้จ่าย
        const { amount, discount, vat } = calculateHotelCost(
            room.room_name,
            room.price,
            checkIn || "2025-09-01",
            checkOut || "2025-09-02"
        );

        try {
            const res = await fetch("http://localhost:3000/payments/api/addPayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                booking_id: 1, // TODO: ใช้ booking_id จริง
                amount,
                discount,
                vat,
                status: "pending",
            }),
            });

            if (!res.ok) throw new Error("Failed to create payment");

            const data = await res.json();
            console.log("New payment created:", data);

            // redirect ไปหน้า payment โดยใช้ payment_id ที่เพิ่งสร้าง
            router.push(
                `/payment/${room.room_id}?subtotal=${cost.subtotal}&discount=${cost.discount}&vat=${cost.vat}&total=${cost.total}&nights=${cost.nights}`
            );
        } catch (err) {
            console.error(err);
            alert("สร้าง payment ไม่สำเร็จ");
        }
    };


    return (
    <div className="min-h-screen bg-white p-6">
        <div className='ml-24'>
            <SearchBar />
        </div>
        <div className="md:ml-24 flex gap-x-2">
            <div className="flex w-screen gap-6">
                {/* Left Section */}
                <div className="lg:col-span-2 space-y-6 text-black w-2/3">
                    <div className="">
                    <h2 className="text-xl font-semibold mb-2">Review your booking</h2>
                    <h3 className="text-blue-600 font-bold">{hotel?.hotel_name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{hotel?.location}</p>
                    <p className="text-sm text-gray-500 mb-2">{room.room_name}</p>

                    <div className="flex gap-4 bg-gray-100 rounded-lg p-4 my-4">
                        <div className="w-1/2 flex justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Check-in</p>
                                <p className="font-medium">Sunday 21, Dec</p>
                                <p className="text-sm text-gray-500">10am</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <p className="text-center text-blue-800 bg-blue-200 py-2 px-6 rounded-lg">1 night</p>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div>
                                <p className="text-sm text-gray-500">Check-out</p>
                                <p className="font-medium">Monday 22, Dec</p>
                                <p className="text-sm text-gray-500">10am</p>
                            </div>
                        </div>
                    </div>

                    <p className="font-medium">2 Adults - 1 Room</p>
                    </div>

                    {/* Guest Details */}
                    <div className="">
                    <h3 className="font-semibold mb-4">Guest Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <input className="border p-2 rounded border-gray-300" placeholder="First Name" />
                        <input className="border p-2 rounded border-gray-300" placeholder="Last Name" />
                        <input className="border p-2 rounded border-gray-300 col-span-2" placeholder="E-mail address" />
                        <input className="border p-2 rounded border-gray-300 col-span-2" placeholder="Mobile number" />
                    </div>
                    <button className="mt-3 ml-3">
                        Add Guest +
                    </button>

                    <h3 className="font-semibold mt-4 mb-2">Special Request</h3>
                    <textarea
                        className="w-full border p-2 rounded border-gray-300"
                        placeholder="Special Request (optional)"
                    />
                    <button
                        className="mt-4 w-40 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                        onClick={handleContinue}
                        >
                        Continue
                    </button>
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/3">
                    <Summary cost={cost} />
                </div>
            </div>
        </div>
    </div>
  );
}