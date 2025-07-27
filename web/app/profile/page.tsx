"use client";
import React from "react";

const userProfile = {
  name: "John Doe",
  phone: "+1 (555) 123-4567",
  email: "john@example.com",
  address: "123 Main St, City, Country",
  totalPurchases: 12,
  totalWinnings: 125,
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-b from-[#1a1625] to-[#2d1b69] p-8 rounded-b-3xl text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-lg text-slate-200 mb-4">Manage your account and view your stats</p>
      </div>
      <div className="p-6">
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
          <div className="text-xl font-bold text-slate-900 mb-2">{userProfile.name}</div>
          <div className="text-slate-700 mb-1">Phone: {userProfile.phone}</div>
          <div className="text-slate-700 mb-1">Email: {userProfile.email}</div>
          <div className="text-slate-700 mb-1">Address: {userProfile.address}</div>
        </div>
        <div className="flex gap-4 mb-6">
          <div className="bg-purple-100 rounded-xl p-4 flex-1 text-center">
            <div className="text-2xl font-bold text-purple-700">{userProfile.totalPurchases}</div>
            <div className="text-slate-700">Total Spent</div>
          </div>
          <div className="bg-green-100 rounded-xl p-4 flex-1 text-center">
            <div className="text-2xl font-bold text-green-700">{userProfile.totalWinnings}</div>
            <div className="text-slate-700">Total Won</div>
          </div>
          <div className="bg-blue-100 rounded-xl p-4 flex-1 text-center">
            <div className="text-2xl font-bold text-blue-700">3</div>
            <div className="text-slate-700">Active Policies</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="text-lg font-bold text-slate-900 mb-2">Personal Information</div>
          <div className="text-slate-700 mb-1">Phone: {userProfile.phone}</div>
          <div className="text-slate-700 mb-1">Email: {userProfile.email}</div>
          <div className="text-slate-700 mb-1">Address: {userProfile.address}</div>
        </div>
      </div>
    </div>
  );
} 