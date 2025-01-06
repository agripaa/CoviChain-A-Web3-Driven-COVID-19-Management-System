"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Untuk redirect
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { contractAddress, abi } from "@/utils";
import LoadingScreen from "@/components/LoadingScreen"; // Import LoadingScreen

export default function Register() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading screen
  const router = useRouter();

  const handleRegister = async () => {
    if (!username) {
      Swal.fire("Error", "Username cannot be empty.", "error");
      return;
    }

    try {
      setLoading(true); // Tampilkan loading screen
      if (!window.ethereum) {
        alert("Metamask is not installed!");
        setLoading(false);
        return;
      }

      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = await provider.getSigner(2);
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.registerUser(username);
      await tx.wait();

      Swal.fire("Success", `Welcome, ${username}! Redirecting to login...`, "success").then(() => {
        router.push("/login");
      });
    } catch (error) {
      Swal.fire("Error", "Registration failed. Please try again.", "error");
      console.error("Registration failed:", error);
    } finally {
      setLoading(false); // Sembunyikan loading screen
    }
  };

  return (
    <div className="min-h-screen bg-[#252525] flex flex-col items-center justify-center text-white animate-gradient">
      {loading && <LoadingScreen />} {/* Tampilkan LoadingScreen saat loading */}
      <h2 className="text-3xl font-bold mb-8">Register Your Account Here!</h2>
      <div className="flex flex-col items-center gap-4 w-1/3">
        <input
          type="text"
          className="w-full px-4 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          onClick={handleRegister}
          disabled={loading}
        >
          Register with Metamask
        </button>
      </div>
    </div>
  );
}