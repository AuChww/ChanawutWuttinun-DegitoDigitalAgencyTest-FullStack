"use client"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import SearchBar from "../../../../component/searchBar";

interface Room {
  room_id: number;
  room_name: string;
  room_type_id: number;
  capacity: number;
  price: number;
  hotel_id: number;
}

export default function BookingPage() {
  const router = useRouter();
  const { id } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/rooms/api/getRoomById/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRoom(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!room) return <div className="p-6">Room not found</div>;

  const taxes = 140;
  const totalAmount = room.price + taxes;

  return (
    <div className="min-h-screen bg-white p-6">
        <div className='ml-24'>
            <SearchBar value={''} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                throw new Error('Function not implemented.');
            } }/>
        </div>
        <div className="max-w-5xl md:ml-24 mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6 text-black">
            <div className="">
            <h2 className="text-xl font-semibold mb-2">Review your booking</h2>
            <h3 className="text-blue-600 font-bold">Holiday In Resort</h3>
            <p className="text-sm text-gray-500 mb-2">Tambudki, Arpora, Goa, India</p>

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
            <button className="mt-4 w-40 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                Continue
            </button>
            </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
            <div className="text-gray-500">
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>1 room x 1 night</span>
                        <span className="text-blue-300">{room?.price ? Number(room.price).toFixed(2) : "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Total discount</span>
                        <span className="text-blue-300">0.00</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Price after discount</span>
                        <span className="text-blue-300">{room?.price ? Number(room.price).toFixed(2) : "0.00"}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Taxes & service fees</span>
                        <span className="text-blue-300">{taxes.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-black">
                        <span>Total Amount</span>
                        <span className="text-blue-600">{room?.price ? (Number(room.price) + taxes).toFixed(2) : "0.00"}</span>
                    </div>
                </div>
            </div>

            <div className="border rounded-2xl shadow p-4">
                <h4 className="font-semibold text-gray-800">Cancellation Charges</h4>
                <p className="text-xs text-gray-800 mb-4">Non Refundable</p>
                <p className="text-xs text-gray-400">
                    Penalty may be charged by the airline & by MMT based on how close to departure date you cancel. View fare rules to know more.
                </p>
                <button className="mt-4  text-gray-400 text-xs hover:bg-gray-100">
                    View Policy
                </button>
            </div>
        </div>
        </div>
    </div>
  );
}