"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

interface CredentialLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CredentialLoginModal({ isOpen, onClose }: CredentialLoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(""); // Clear any previous errors

      const result = await signIn("credentials", {
        redirect: false, // Prevent auto-redirect, handle it manually
        username,
        password,
      });

      if (result?.error) {
        setError("Invalid username or password.");
      } else {
        window.location.href = "/dashboard"; // Redirect on successful login
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sign in with Credentials</h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit Button */}
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="bg-gray-300 text-black px-4 py-2 rounded w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
