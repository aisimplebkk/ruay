"use client";
import React, { useState } from "react";

const currentTickets = [
  {
    id: 1,
    lotteryName: "Health Guardian",
    ticketNumber: "HG-2025-0201",
    purchaseDate: "2025-02-01",
    drawDate: "2025-02-15",
    amount: "฿5",
    status: "Active",
    insurance: "Health Coverage - ฿2,000",
  },
  {
    id: 2,
    lotteryName: "Life Protector",
    ticketNumber: "LP-2025-0203",
    purchaseDate: "2025-02-03",
    drawDate: "2025-02-15",
    amount: "฿15",
    status: "Active",
    insurance: "Life Insurance - ฿10,000",
  },
  {
    id: 3,
    lotteryName: "Property Shield",
    ticketNumber: "PS-2025-0205",
    purchaseDate: "2025-02-05",
    drawDate: "2025-02-15",
    amount: "฿10",
    status: "Active",
    insurance: "Property Insurance - ฿5,000",
  },
];

export default function TrackingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-gradient-to-b from-[#1a1625] to-[#2d1b69] p-8 rounded-b-3xl text-center">
        <h1 className="text-3xl font-bold text-white mb-2">My Lottery Tickets</h1>
        <p className="text-lg text-slate-200 mb-4">Track your lottery tickets and insurance coverage</p>
      </div>
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setSelectedPeriod("current")} className={`px-6 py-2 rounded-lg font-semibold ${selectedPeriod === "current" ? "bg-purple-500 text-white" : "bg-white text-slate-700"}`}>Current Period</button>
          <button onClick={() => setSelectedPeriod("previous")} className={`px-6 py-2 rounded-lg font-semibold ${selectedPeriod === "previous" ? "bg-purple-500 text-white" : "bg-white text-slate-700"}`}>Previous Period</button>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 flex-1 text-center shadow-md">
            <div className="text-2xl font-bold text-purple-700">{currentTickets.length}</div>
            <div className="text-slate-700">Active Tickets</div>
          </div>
          <div className="bg-green-100 rounded-xl p-6 flex-1 text-center shadow-md">
            <div className="text-2xl font-bold text-green-700">฿125</div>
            <div className="text-slate-700">Total Winnings</div>
          </div>
          <div className="bg-blue-100 rounded-xl p-6 flex-1 text-center shadow-md">
            <div className="text-2xl font-bold text-blue-700">฿27,000</div>
            <div className="text-slate-700">Coverage Value</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-lg font-bold text-slate-900 mb-2">Tickets</div>
          <div className="flex flex-col gap-4">
            {currentTickets.map((ticket) => (
              <div key={ticket.id} className="bg-purple-50 rounded-xl p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-bold text-lg text-slate-900">{ticket.lotteryName}</div>
                    <div className="text-slate-700">#{ticket.ticketNumber}</div>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">{ticket.status}</span>
                </div>
                <div className="text-slate-600 text-sm mb-1">Purchased: {ticket.purchaseDate}</div>
                <div className="text-slate-600 text-sm mb-1">Draw: {ticket.drawDate}</div>
                <div className="text-slate-600 text-sm mb-1">Amount: {ticket.amount}</div>
                <div className="text-slate-600 text-sm mb-1">Insurance: {ticket.insurance}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 