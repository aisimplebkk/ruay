"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const lotteryNumbers = [
  "123456", "654321", "111222", "234567", "345678",
  "456789", "567890", "678901", "789012", "890123"
];

export default function LotteryPage() {
  const [kycVerified] = useState(true); // Set to true for demo
  const [currentPeriod, setCurrentPeriod] = useState("");
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.toLocaleString("en-US", { month: "short" });
    const day = now.getDate();
    let period = "";
    if (day <= 15) {
      period = `1-15 ${month} ${year}`;
    } else {
      // Get last day of month
      const lastDay = new Date(year, now.getMonth() + 1, 0).getDate();
      period = `16-${lastDay} ${month} ${year}`;
    }
    setCurrentPeriod(period);
  }, []);

  const handleNumberSelect = (number: string) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      if (selectedNumbers.length >= 5) return;
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-gradient-to-b from-[#1a1625] to-[#2d1b69] p-8 text-center rounded-b-3xl">
        <h1 className="text-3xl font-bold text-white mb-2">ซื้อสลากกินแบ่ง</h1>
        <p className="text-lg text-slate-200 mb-4">เลือกหมายเลข 6 หลักที่คุณชื่นชอบ ราคาสลากละ ฿80</p>
        <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
          <span className="text-white font-semibold">งวดปัจจุบัน: {currentPeriod}</span>
        </div>
      </div>

      {!kycVerified && (
        <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-4 m-5 flex items-center gap-3">
          <span className="text-yellow-500">⚠️</span>
          <div className="flex-1">
            <div className="font-semibold text-yellow-900 mb-1">ต้องยืนยันตัวตน (KYC)</div>
            <div className="text-yellow-700 text-sm">กรุณายืนยันตัวตนเพื่อซื้อสลากกินแบ่งรัฐบาล</div>
          </div>
          <button className="bg-yellow-400 rounded-full px-4 py-2 text-white font-semibold">ยืนยันตัวตน</button>
        </div>
      )}

      <div className="p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">หมายเลขสลากที่เปิดขาย</h2>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {lotteryNumbers.map((number) => (
            <button
              key={number}
              className={`flex flex-row items-center bg-white rounded-xl border-2 w-80 h-28 shadow-sm overflow-hidden transition-all duration-150 ${selectedNumbers.includes(number) ? "border-purple-500 shadow-lg" : "border-slate-200"}`}
              onClick={() => handleNumberSelect(number)}
              disabled={!kycVerified}
            >
              {/* Left section */}
              <div className="w-20 h-full flex flex-col items-center justify-center bg-slate-100 p-1">
                <div className="w-8 h-8 rounded-full bg-purple-600 mb-1" />
                <div className="text-xs font-bold text-purple-700">สลากกินแบ่งรัฐบาล</div>
                <div className="text-[10px] text-slate-500">THAI GOVERNMENT LOTTERY</div>
              </div>
              {/* Center section */}
              <div className="flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-yellow-50 border border-yellow-400 rounded px-6 py-1 mb-1">
                  <span className="text-2xl font-bold tracking-widest text-slate-900">{number}</span>
                </div>
                <div className="text-xs text-slate-700">1 สิงหาคม 2568</div>
                <div className="text-base font-bold text-purple-600 mt-1">80 บาท</div>
              </div>
              {/* Right section */}
              <div className="w-10 h-full flex items-center justify-center bg-purple-500">
                <span className="text-white text-sm font-bold writing-vertical">สลากคุ้ม</span>
              </div>
            </button>
          ))}
        </div>
        {selectedNumbers.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
            <div className="text-purple-700 font-semibold mb-2">หมายเลขที่เลือก ({selectedNumbers.length}/5):</div>
            <div className="flex flex-wrap gap-2">
              {selectedNumbers.map((number, idx) => (
                <div key={idx} className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center">
                  <span className="text-white font-bold">{number}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        <Link
          href={{
            pathname: "/lottery/selection",
            query: { selectedNumbers: JSON.stringify(selectedNumbers) },
          }}
          className={`block mt-4 ${(!kycVerified || selectedNumbers.length === 0) ? "pointer-events-none opacity-60" : ""}`}
        >
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl py-4 flex items-center justify-center gap-3 shadow-md">
            <span className="text-white font-bold text-lg">
              {kycVerified ? `ซื้อ (${selectedNumbers.length} ใบ)` : "กรุณายืนยันตัวตนก่อน"}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

// Tailwind CSS does not support writing-mode utilities by default, so add this to your globals.css:
// .writing-vertical { writing-mode: vertical-rl; } 