"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

const insuranceTypes = [
  {
    id: 1,
    name: "Health Coverage",
    icon: "❤️",
    coverage: "฿2,000",
    price: 10,
    color: "#a259f7",
  },
  {
    id: 2,
    name: "Life Insurance",
    icon: "🛡️",
    coverage: "฿10,000",
    price: 10,
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "Property Protection",
    icon: "🏠",
    coverage: "฿5,000",
    price: 10,
    color: "#10b981",
  },
  {
    id: 4,
    name: "Vehicle Insurance",
    icon: "🚗",
    coverage: "฿15,000",
    price: 10,
    color: "#f59e0b",
  },
  {
    id: 5,
    name: "Family Coverage",
    icon: "👨‍👩‍👧‍👦",
    coverage: "฿15,000",
    price: 10,
    color: "#8b5cf6",
  },
];

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds

  const selectedNumbers = searchParams.get("selectedNumbers")
    ? JSON.parse(searchParams.get("selectedNumbers") as string)
    : [];
  const selectedInsurance = searchParams.get("selectedInsurance")
    ? JSON.parse(searchParams.get("selectedInsurance") as string)
    : [];
  const totalPrice = searchParams.get("totalPrice") || "0";
  const totalCoverage = searchParams.get("totalCoverage") || "0";

  const selectedInsuranceData = insuranceTypes.filter((insurance) =>
    selectedInsurance.includes(insurance.id)
  );

  // Countdown timer
  useEffect(() => {
    if (paymentStatus === "pending" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, paymentStatus]);

  // Simulate payment processing
  const simulatePayment = () => {
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("completed");
      setTimeout(() => {
        router.replace("/tracking");
      }, 2000);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (paymentStatus === "completed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
        <div className="bg-gradient-to-b from-green-500 to-green-700 rounded-3xl p-12 flex flex-col items-center gap-6">
          <span className="text-6xl">✅</span>
          <div className="text-3xl font-bold text-white">ชำระเงินสำเร็จ!</div>
          <div className="text-lg text-white">สลากและประกันของคุณเปิดใช้งานแล้ว</div>
          <div className="text-white opacity-80">กำลังนำคุณไปยังหน้าตั๋วของคุณ...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-gradient-to-b from-[#1a1625] to-[#2d1b69] p-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <Link href="/lottery/selection" className="text-white text-2xl">←</Link>
          <h1 className="text-2xl font-bold text-white">ชำระเงิน</h1>
          <div className="w-8" />
        </div>
        {paymentStatus === "pending" && (
          <div className="flex items-center justify-center gap-2 bg-white/20 rounded-full px-4 py-2">
            <span className="text-white">⏰</span>
            <span className="text-white font-semibold">กรุณาชำระเงินภายใน {formatTime(countdown)}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Order Summary */}
        <div className="mb-8">
          <div className="text-lg font-bold text-slate-800 mb-2">สรุปรายการสั่งซื้อ</div>
          <div className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-4">
            {/* Lottery Numbers */}
            <div>
              <div className="font-bold text-slate-700 mb-1">หมายเลขสลาก</div>
              <div className="flex flex-wrap gap-2">
                {selectedNumbers.map((number: number, idx: number) => (
                  <div key={idx} className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-white font-bold">{number}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Insurance Coverage */}
            <div>
              <div className="font-bold text-slate-700 mb-1">ความคุ้มครองประกัน</div>
              {selectedInsuranceData.map((insurance) => (
                <div key={insurance.id} className="flex items-center justify-between border-b border-slate-100 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" style={{ color: insurance.color }}>{insurance.icon}</span>
                    <span className="font-bold text-slate-900">{insurance.name}</span>
                  </div>
                  <span className="text-green-700 font-bold">{insurance.coverage}</span>
                  <span className="text-slate-700">฿{insurance.price}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-4 border-t-2 border-slate-200">
              <span className="font-bold text-slate-900">ยอดรวม:</span>
              <span className="font-bold text-purple-700 text-lg">฿{parseInt(totalPrice).toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 rounded-lg p-3">
              <span className="text-green-700">🛡️</span>
              <span className="font-bold text-green-700">ความคุ้มครองประกันรวม: ฿{parseInt(totalCoverage).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mb-8">
          <div className="text-lg font-bold text-slate-800 mb-2">สแกนเพื่อชำระเงิน</div>
          <div className="bg-white rounded-xl p-8 flex flex-col items-center shadow-md">
            {paymentStatus === "pending" ? (
              <>
                <div className="flex flex-col items-center gap-4 mb-4">
                  <span className="text-7xl text-purple-500">#️⃣</span>
                  <span className="font-bold text-slate-700">QR Code สำหรับชำระเงิน</span>
                </div>
                <div className="text-slate-600 text-center mb-2">สแกน QR นี้ด้วยแอปธนาคารหรือวอลเล็ตเพื่อชำระเงิน</div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-purple-500" />
                <span className="font-bold text-slate-700">กำลังดำเนินการชำระเงิน...</span>
                <span className="text-slate-500 text-center">กรุณารอสักครู่ ระบบกำลังตรวจสอบการชำระเงินของคุณ</span>
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        {paymentStatus === "pending" && (
          <div className="mb-8">
            <div className="text-lg font-bold text-slate-800 mb-2">ช่องทางการชำระเงินที่รองรับ</div>
            <div className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-2">
              <span className="text-slate-700">• โมบายแบงก์กิ้ง</span>
              <span className="text-slate-700">• วอลเล็ตดิจิทัล (เช่น TrueMoney, ShopeePay)</span>
              <span className="text-slate-700">• กระเป๋าคริปโต</span>
              <span className="text-slate-700">• บริการชำระเงินด้วย QR</span>
            </div>
          </div>
        )}

        {/* Demo Button */}
        {paymentStatus === "pending" && (
          <button
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 rounded-xl mt-2 transition-all hover:scale-105"
            onClick={simulatePayment}
            type="button"
          >
            จำลองการชำระเงิน (สำหรับทดสอบ)
          </button>
        )}
      </div>
    </div>
  );
} 