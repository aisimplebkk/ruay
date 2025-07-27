"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const insuranceTypes = [
  {
    id: 1,
    name: "ประกันสุขภาพ",
    icon: "❤️",
    coverage: "฿2,000",
    price: 10,
    description: "ค่ารักษาพยาบาลและการเข้ารักษาในโรงพยาบาล",
    benefits: ["ฉุกเฉิน", "นอนโรงพยาบาล", "ค่ายา", "ทันตกรรม"],
    color: "#a259f7",
  },
  {
    id: 2,
    name: "ประกันชีวิต",
    icon: "🛡️",
    coverage: "฿10,000",
    price: 10,
    description: "คุ้มครองชีวิตและอุบัติเหตุ",
    benefits: ["เสียชีวิต", "อุบัติเหตุ", "โรคร้ายแรง", "ค่าทำศพ"],
    color: "#3b82f6",
  },
  {
    id: 3,
    name: "ประกันทรัพย์สิน",
    icon: "🏠",
    coverage: "฿5,000",
    price: 10,
    description: "คุ้มครองบ้านและทรัพย์สิน",
    benefits: ["ไฟไหม้", "ขโมย", "ภัยธรรมชาติ", "การทำลายทรัพย์สิน"],
    color: "#10b981",
  },
  {
    id: 4,
    name: "ประกันรถยนต์",
    icon: "🚗",
    coverage: "฿15,000",
    price: 10,
    description: "คุ้มครองรถยนต์แบบครบวงจร",
    benefits: ["ชน", "ขโมย", "บุคคลที่สาม", "ช่วยเหลือฉุกเฉิน"],
    color: "#f59e0b",
  },
  {
    id: 5,
    name: "ประกันครอบครัว",
    icon: "👨‍👩‍👧‍👦",
    coverage: "฿15,000",
    price: 10,
    description: "คุ้มครองทั้งครอบครัว",
    benefits: ["ค่ารักษาครอบครัว", "การศึกษาบุตร", "ท่องเที่ยว", "ฉุกเฉิน"],
    color: "#8b5cf6",
  },
];

export default function InsuranceSelectionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedNumbers = searchParams.get("selectedNumbers")
    ? JSON.parse(searchParams.get("selectedNumbers") as string)
    : [];
  const [selectedInsurance, setSelectedInsurance] = useState<number[]>([]);
  const maxSelection = 1;

  const toggleInsuranceSelection = (insuranceId: number) => {
    if (selectedInsurance.includes(insuranceId)) {
      setSelectedInsurance([]);
    } else {
      setSelectedInsurance([insuranceId]);
    }
  };

  const getTotalPrice = () => {
    const lotteryCost = selectedNumbers.length * 80;
    const insuranceCost = selectedInsurance.length > 0 ? 10 : 0;
    return lotteryCost + insuranceCost;
  };

  const getTotalCoverage = () => {
    return selectedInsurance.reduce((total, id) => {
      const insurance = insuranceTypes.find((i) => i.id === id);
      if (!insurance || !insurance.coverage) return total;
      const match = insurance.coverage.replace(/[^\d]/g, "");
      const coverage = match ? parseInt(match, 10) : 0;
      return total + coverage;
    }, 0);
  };

  const handleProceedToPayment = () => {
    if (selectedInsurance.length === 0) {
      alert("Please select at least one insurance type to proceed.");
      return;
    }
    router.push(
      `/lottery/payment?selectedNumbers=${encodeURIComponent(
        JSON.stringify(selectedNumbers)
      )}&selectedInsurance=${encodeURIComponent(
        JSON.stringify(selectedInsurance)
      )}&totalPrice=${getTotalPrice()}&totalCoverage=${getTotalCoverage()}`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-b from-[#1a1625] to-[#2d1b69] p-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <Link href="/lottery" className="text-white text-2xl">←</Link>
          <h1 className="text-2xl font-bold text-white">เลือกประกัน</h1>
          <div className="w-8" />
        </div>
        <div className="text-slate-200 text-center mb-2">เลือกความคุ้มครองสำหรับสลากของคุณ</div>
        <div className="flex justify-center mb-2">
          <span className="text-white bg-white/20 rounded-full px-4 py-1 font-semibold">
            เลือกแล้ว {selectedInsurance.length}/{maxSelection}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Selected Numbers Display */}
        <div className="mb-6">
          <div className="text-lg font-bold text-slate-800 mb-2">หมายเลขสลากของคุณ</div>
          <div className="flex flex-wrap gap-2">
            {selectedNumbers.map((number: number, index: number) => (
              <div key={index} className="bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center">
                <span className="text-white font-bold">{number}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance Types */}
        <div className="mb-6">
          <div className="text-lg font-bold text-slate-800 mb-2">ตัวเลือกประกัน</div>
          <div className="flex flex-col gap-4">
            {insuranceTypes.map((insurance) => {
              const isSelected = selectedInsurance.includes(insurance.id);
              return (
                <button
                  key={insurance.id}
                  className={`flex flex-row items-start bg-white rounded-xl border-2 p-4 shadow-sm transition-all duration-150 text-left gap-4 ${isSelected ? "border-purple-500 bg-purple-50" : "border-transparent"}`}
                  onClick={() => toggleInsuranceSelection(insurance.id)}
                  type="button"
                >
                  <div className="flex flex-col items-center mt-1">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? "bg-purple-500 border-purple-500" : "border-slate-300"}`}>
                      {isSelected && <span className="text-white">✔</span>}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl" style={{ color: insurance.color }}>{insurance.icon}</span>
                      <span className="font-bold text-slate-900">{insurance.name}</span>
                    </div>
                    <div className="text-slate-600 text-sm mb-1">{insurance.description}</div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-600 text-sm">ความคุ้มครอง:</span>
                      <span className="font-bold text-green-600">{insurance.coverage}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {insurance.benefits.slice(0, 3).map((benefit, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-700 rounded-full px-2 py-1 text-xs font-medium">
                          {benefit}
                        </span>
                      ))}
                      {insurance.benefits.length > 3 && (
                        <span className="text-purple-500 font-semibold text-xs">+{insurance.benefits.length - 3} รายการเพิ่มเติม</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary Footer */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">จำนวนสลาก:</span>
              <span className="font-bold text-slate-900">{selectedNumbers.length} ใบ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">ประเภทประกัน:</span>
              <span className="font-bold text-slate-900">
                {selectedInsurance.length > 0
                  ? insuranceTypes.find((i) => i.id === selectedInsurance[0])?.name || "-"
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">
                ราคารวม <span className="text-xs text-slate-400">(รวมประกัน + ค่าฝากสลาก)</span>
              </span>
              <span className="font-bold text-purple-700">฿{getTotalPrice()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 font-medium">ความคุ้มครองรวม:</span>
              <span className="font-bold text-green-700">฿{getTotalCoverage().toLocaleString()}</span>
            </div>
          </div>
          <button
            className={`w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 rounded-xl mt-2 transition-all ${selectedInsurance.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
            onClick={handleProceedToPayment}
            disabled={selectedInsurance.length === 0}
            type="button"
          >
            ดำเนินการชำระเงิน ({selectedInsurance.length})
          </button>
        </div>
      </div>
    </div>
  );
} 