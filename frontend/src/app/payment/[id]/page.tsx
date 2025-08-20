"use client"
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import SearchBar from "../../../../component/searchBar";
import { useSearch } from "../../../../context/searchContext";
import Summary from "../../../../component/summary";
import { calculateHotelCost } from "../../../../utils/calculateCost";
import { CostBreakdown } from "../../../../utils/calculateCost";

interface Room {
  room_id: number;
  room_name: string;
  room_type_id: number;
  capacity: number;
  price: number;
  hotel_id: number;
}


export default function PaymentPage() {
    const router = useRouter();
    const [room, setRoom] = useState<Room | null>(null);
    const [loading, setLoading] = useState(true);
    const state = (router as any).state || {};
    const { amount, vat, discount } = state;
    const searchParams = useSearchParams();
    const { id } = useParams();

    const cost: CostBreakdown = {
        subtotal: Number(searchParams.get("subtotal")) || 0,
        discount: Number(searchParams.get("discount")) || 0,
        vat: Number(searchParams.get("vat")) || 0,
        total: Number(searchParams.get("total")) || 0,
        nights: Number(searchParams.get("nights")) || 1,
    };

    // 1) ดึงข้อมูล Room
    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3000/rooms/api/getRoomById/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setRoom(data[0]);
                setLoading(false);
        });
    }, [id]);

    useEffect(() => {
        console.log("room updated:", room);
    }, [room]);
    
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
            router.push(`/payment/${data.payment_id}`);
        } catch (err) {
            console.error(err);
            alert("สร้าง payment ไม่สำเร็จ");
        }
    };


    return (
    <div className="min-h-screen bg-white p-6 ">
        <div className="md:ml-24 md:mt-20 flex gap-x-2">
            <div className="w-full flex gap-6">
                <div className="w-2/3">

                </div>
                <div className="w-1/3">
                    <Summary cost={cost} />
                </div>
            </div>
        </div>
    </div>
  );
}