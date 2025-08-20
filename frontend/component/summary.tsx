// component/summary.tsx
import React from "react";
import { CostBreakdown } from "../utils/calculateCost";

interface SummaryProps {
  cost: CostBreakdown;
}

const Summary: React.FC<SummaryProps> = ({ cost }) => {
  return (
    <div className="space-y-4">
      <div className="text-gray-500">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>{`${cost.nights} night(s) x 1 room`}</span>
            <span className="text-blue-300">{cost.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Total discount</span>
            <span className="text-blue-300">{cost.discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Price after discount</span>
            <span className="text-blue-300">{(cost.subtotal - cost.discount).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes & service fees (7%)</span>
            <span className="text-blue-300">{cost.vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg text-black">
            <span>Total Amount</span>
            <span className="text-blue-600">{cost.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="border rounded-2xl shadow p-4">
        <h4 className="font-semibold text-gray-800">Cancellation Charges</h4>
        <p className="text-xs text-gray-800 mb-4">Non Refundable</p>
        <p className="text-xs text-gray-400">
          Penalty may be charged by the airline & by MMT based on how close to departure
          date you cancel. View fare rules to know more.
        </p>
        <button className="mt-4 text-gray-400 text-xs hover:bg-gray-100">View Policy</button>
      </div>
    </div>
  );
};

export default Summary;
