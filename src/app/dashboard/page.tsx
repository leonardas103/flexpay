"use client";

import BankAccountDetails from "@/components/dashboard/BankAccountDetails";
import BankClientDetails from "@/components/dashboard/BankClientDetails";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not signed in. Please sign in to access the dashboard.</p>;
  }

  const { user } = session;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name || "User"}!</h1>
      <p>Email: {user?.email}</p>
      {user?.image && <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full mt-4" />}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500  px-4 py-2 rounded mt-6"
      >
        Sign Out
      </button>
      <BankClientDetails />
      <BankAccountDetails />
      
    </div>
  );
}
