// utils/calculateCost.ts
export interface CostBreakdown {
  roomType: string;
  nights: number;
  roomPrice: number;
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
}

export function calculateHotelCost(
  roomType: string,
  roomPrice: number,
  checkIn: string,
  checkOut: string
): CostBreakdown {
  const discount = 0;

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights =
    Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;

  const subtotal = roomPrice * nights;
  const vat = subtotal * 0.07;
  const total = subtotal - discount + vat;

  return {
    roomType,
    nights,
    roomPrice,
    subtotal,
    discount,
    vat,
    total,
  };
}
