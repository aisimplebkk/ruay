"use client";
import React, { useState } from "react";

const activePolicies = [
  {
    id: 1,
    type: "Health Coverage",
    coverage: "฿2,000",
    status: "Active",
    expiryDate: "2025-03-15",
    purchaseDate: "2025-01-15",
    lotteryTicket: "Daily Fortune #DF-2025-0115",
    benefits: ["Emergency medical", "Hospitalization", "Prescription drugs"],
    claimsUsed: 0,
    maxClaims: 3,
  },
  {
    id: 2,
    type: "Life Insurance",
    coverage: "฿10,000",
    status: "Active",
    expiryDate: "2025-02-20",
    purchaseDate: "2025-01-20",
    lotteryTicket: "Weekly Winner #WW-2025-0120",
    benefits: ["Death benefit", "Accidental coverage", "Terminal illness"],
    claimsUsed: 0,
    maxClaims: 1,
  },
];

const availableInsurance = [
  {
    type: "Property Protection",
    coverage: "฿5,000",
    description: "Protect your home and belongings",
    benefits: ["Fire damage", "Theft protection", "Natural disasters"],
    monthlyEquivalent: "฿25",
  },
  {
    type: "Vehicle Insurance",
    coverage: "฿15,000",
    description: "Comprehensive vehicle coverage",
    benefits: ["Collision coverage", "Theft protection", "Third-party liability"],
    monthlyEquivalent: "฿45",
  },
  {
    type: "Critical Illness",
    coverage: "฿8,000",
    description: "Coverage for serious health conditions",
    benefits: ["Cancer treatment", "Heart disease", "Stroke coverage"],
    monthlyEquivalent: "฿35",
  },
];

export default function InsurancePage() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'available'>('active');

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-b from-[#1a1625] to-[#2d1b69] p-8 rounded-b-3xl text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Insurance Coverage</h1>
        <p className="text-lg text-slate-200 mb-4">Manage your insurance policies and protection</p>
        <div className="flex justify-center gap-4 mb-4">
          <button onClick={() => setSelectedTab('active')} className={`px-6 py-2 rounded-lg font-semibold ${selectedTab === 'active' ? 'bg-purple-500 text-white' : 'bg-white text-slate-700'}`}>Active Policies</button>
          <button onClick={() => setSelectedTab('available')} className={`px-6 py-2 rounded-lg font-semibold ${selectedTab === 'available' ? 'bg-purple-500 text-white' : 'bg-white text-slate-700'}`}>Available Coverage</button>
        </div>
      </div>
      <div className="p-6">
        {selectedTab === 'active' ? (
          <div className="flex flex-col gap-6">
            {activePolicies.map((policy) => (
              <div key={policy.id} className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-bold text-lg text-slate-900">{policy.type}</div>
                    <div className="text-green-700 font-bold">Coverage: {policy.coverage}</div>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">{policy.status}</span>
                </div>
                <div className="text-slate-600 text-sm mb-1">Expires: {policy.expiryDate}</div>
                <div className="text-slate-600 text-sm mb-1">Claims used: {policy.claimsUsed}/{policy.maxClaims}</div>
                <div className="mb-2">
                  <div className="font-semibold text-slate-700">Covered Benefits:</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {policy.benefits.map((benefit, idx) => (
                      <span key={idx} className="bg-purple-100 text-purple-700 rounded-full px-2 py-1 text-xs font-medium">{benefit}</span>
                    ))}
                  </div>
                </div>
                <div className="text-slate-600 text-sm mb-1">Purchased with: <span className="font-semibold">{policy.lotteryTicket}</span></div>
                <button className="mt-2 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 rounded-xl">File a Claim</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="text-lg font-bold text-slate-800 mb-2">Get More Protection</div>
            <div className="text-slate-600 mb-4">Purchase lottery tickets to unlock these insurance coverages</div>
            {availableInsurance.map((insurance, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md flex flex-col gap-2">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-bold text-lg text-slate-900">{insurance.type}</div>
                    <div className="text-green-700 font-bold">Coverage: {insurance.coverage}</div>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">{insurance.monthlyEquivalent}/month</span>
                </div>
                <div className="text-slate-600 text-sm mb-1">{insurance.description}</div>
                <div className="mb-2">
                  <div className="font-semibold text-slate-700">Benefits:</div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {insurance.benefits.map((benefit, bidx) => (
                      <span key={bidx} className="bg-purple-100 text-purple-700 rounded-full px-2 py-1 text-xs font-medium">{benefit}</span>
                    ))}
                  </div>
                </div>
                <button className="mt-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-2 px-4 rounded-xl">View Lottery Options</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 