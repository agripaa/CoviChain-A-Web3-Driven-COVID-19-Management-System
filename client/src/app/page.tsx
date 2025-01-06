"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "@/utils";
import { CovidData } from "@/types";

export default function GetCovidDataById() {
  const [idToFetch, setIdToFetch] = useState<string>("");
  const [retrievedData, setRetrievedData] = useState<CovidData | null>(null);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFetch = async () => {
    try {
      if (!window.ethereum) {
        alert("Metamask is not installed!");
        return;
      }

      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const data = await contract.getCovidDataByIdPasien(idToFetch);

      setRetrievedData({
        id: data.id.toString(),
        idPasien: data.idPasien,
        hasilTes: data.hasilTes,
        tanggalTes: data.tanggalTes,
        statusVaksinasi: data.statusVaksinasi,
        owner: data.owner,
      });
      setMessage("");
      setIsModalOpen(true); // Buka modal
    } catch (error: any) {
      console.error("Error fetching data:", error);
      if (error?.reason === "Data not found for the given idPasien") {
        setMessage("Data tidak ditemukan.");
      } else {
        setMessage("Gagal mengambil data!");
      }
      setRetrievedData(null);
      setIsModalOpen(false); // Tutup modal jika error
    }
  };

  // Fungsi untuk membentuk link mailto dengan data pasien
  const mailtoLink = () => {
    if (!retrievedData) return "#";

    // Lakukan URL Encoding pada data pasien
    const subject = encodeURIComponent("Laporan Kesalahan Data COVID 19");
    const body = encodeURIComponent(
      `Berikut adalah data yang ingin dilaporkan:\n
ID Pasien: ${retrievedData.idPasien}\n
Hasil Tes: ${retrievedData.hasilTes}\n
Tanggal Tes: ${retrievedData.tanggalTes}\n
Status Vaksinasi: ${retrievedData.statusVaksinasi}\n
Owner: ${retrievedData.owner}\n
Message : 
Terima kasih.`
    );

    return `mailto:agrieva.xananda08@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-[#252525] flex flex-col items-center justify-center text-white animate-gradient">
      <h2 className="text-3xl font-bold mb-8">Get Your Data Test Covid 19</h2>
      <div className="flex items-center gap-2 w-4/12">
        <input
          className="w-full px-4 py-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukkan ID Pasien"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 w-4/12 transition"
          onClick={handleFetch}
        >
          Fetch Data
        </button>
      </div>

      {message && <p className="mt-4 text-red-400">{message}</p>}

      {/* Modal */}
      {isModalOpen && retrievedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-auto">
            <h3 className="text-2xl font-bold mb-4">Data Pasien</h3>
            <p>ID Pasien: {retrievedData.idPasien}</p>
            <p>Hasil Tes: {retrievedData.hasilTes}</p>
            <p>Tanggal Tes: {retrievedData.tanggalTes}</p>
            <p>Status Vaksinasi: {retrievedData.statusVaksinasi}</p>
            <p>Owner: {retrievedData.owner}</p>
            <div className="w-full flex justify-end mt-2">
              <button
                className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>

              {/* Tombol Report -> mailto */}
              <a
                href={mailtoLink()}
                className="mt-4 px-4 py-2 bg-blue-500 ml-4 rounded-lg hover:bg-blue-700 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Report
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
