"use client";
import { useState } from "react";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { contractAddress, abi } from "@/utils";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen"; 

export default function Login() {
  const [loading, setLoading] = useState(false); 
  const router = useRouter(); 

  const handleLogin = async () => {
    try {
      setLoading(true); 
      const rpcUrl = "http://127.0.0.1:8545"; 
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const signer = await provider.getSigner(2); 
      const userAddress = await signer.getAddress();

      const contract = new ethers.Contract(contractAddress, abi, signer);

      const registered = await contract.isUserRegistered(userAddress);

      if (registered) {
        setLoading(false)
        
        Swal.fire({
          title: "Login Successful!",
          html: `
            <p>Your Address: ${userAddress}</p>
            <p>Welcome back!</p>
          `,
          icon: "success",
          confirmButtonText: "Proceed to Dashboard",
        }).then(() => {
          
          localStorage.setItem("userAddress", userAddress);
          router.push("/dashboard"); 
        });
      } else {
        setLoading(false)
        Swal.fire({
          title: "User Not Registered",
          text: "Please register first.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      setLoading(false)
      console.error("Login failed:", error);
      Swal.fire({
        title: "Login Failed",
        text: "Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#252525] flex flex-col items-center justify-center text-white animate-gradient">
      {loading && <LoadingScreen />} {/* Tampilkan LoadingScreen saat loading */}
        
      <button
        className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition"
        onClick={handleLogin}
      >
        Login with Metamask
      </button>
    </div>
  );
}
