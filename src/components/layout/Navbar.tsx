// components/layout/Navbar.tsx
"use client";
import Link from "next/link";
import { NavigationMenu } from "../ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  console.log({session});
  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/" className="text-lg font-bold text-gray-900">
              FlexPay
            </Link>
          </div>

          {/* Navigation Menu (from ShadCN) */}
          <div className="hidden md:flex">
            <NavigationMenu />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
          {status === "authenticated" ? (
              <Link
              href="/"
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign out
            </Link>
          ):(<>
            <Link
              href="/login"
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-100"
            >
              Sign Up
            </Link>
          </>) }
          </div>
        </div>
      </div>
    </nav>
  );
}
