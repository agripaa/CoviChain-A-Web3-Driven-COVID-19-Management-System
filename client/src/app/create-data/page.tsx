"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import LoadingScreen from "@/components/LoadingScreen"; // Import LoadingScreen
import { abi, contractAddress } from "@/utils";

export default function CovidDataCreate() {
  const [idPasien, setIdPasien] = useState("");
  const [hasilTes, setHasilTes] = useState("");
  const [tanggalTes, setTanggalTes] = useState("");
  const [statusVaksinasi, setStatusVaksinasi] = useState("");
  const [loading, setLoading] = useState(false); // State untuk loading screen
  const router = useRouter();

  const handleCreateData = async () => {
    if (!idPasien || !hasilTes || !tanggalTes || !statusVaksinasi) {
      Swal.fire("Error!", "All fields must be filled.", "error");
      return;
    }

    try {
      setLoading(true); // Tampilkan loading screen
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = await provider.getSigner(2);
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.addCovidData(idPasien, hasilTes, tanggalTes, statusVaksinasi);
      await tx.wait();

      Swal.fire("Success!", "Covid data successfully created!", "success").then(() => {
        router.push("/dashboard"); // Redirect ke dashboard
      });
    } catch (error) {
      Swal.fire("Error!", "Failed to create data. Please try again.", "error");
      console.error("Error creating data:", error);
    } finally {
      setLoading(false); // Sembunyikan loading screen
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {loading && <LoadingScreen />} {/* Tampilkan loading screen */}
      <div className="absolute top-12 left-12">
        <button
          className="text-blue-400 hover:text-blue-500 font-semibold flex items-center"
          onClick={() => router.push("/dashboard")}
        >
          ← Dashboard
        </button>
      </div>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Covid Data</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ID Pasien"
            value={idPasien}
            onChange={(e) => setIdPasien(e.target.value)}
          />
          <select
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={hasilTes}
            onChange={(e) => setHasilTes(e.target.value)}
          >
            <option value="">Pilih Hasil Tes</option>
            <option value="Negatif">Negatif</option>
            <option value="Positif">Positif</option>
          </select>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tanggalTes}
            onChange={(e) => setTanggalTes(e.target.value)}
          />
          <select
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={statusVaksinasi}
            onChange={(e) => setStatusVaksinasi(e.target.value)}
          >
            <option value="">Pilih Status Vaksinasi</option>
            <option value="Sudah Vaksin">Sudah Vaksin</option>
            <option value="Belum Vaksin">Belum Vaksin</option>
          </select>
        </div>
        <button
          className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-200"
          onClick={handleCreateData}
        >
          Create Data
        </button>
      </div>
    </div>
  );
}
