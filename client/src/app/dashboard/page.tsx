"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import { CovidData } from "@/types";
import { abi, contractAddress } from "@/utils";
import { FiLogOut } from "react-icons/fi"; 
import LoadingScreen from "@/components/LoadingScreen"; 

export default function Dashboard() {
  const [activities, setActivities] = useState<CovidData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<CovidData | null>(null);
  
  const [loading, setLoading] = useState(false); 

  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    const userAddress = localStorage.getItem("userAddress");
    if (!userAddress) {
      alert("You need to log in to access this page.");
      router.push("/login");
    } else {
      fetchActivities();
    }
  }, []);

  const fetchActivities = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const data = await contract.getAllCovidData();
  
      const validData = data
        .filter((item) => item.idPasien && item.idPasien !== "") 
        .map((item) => ({
          id: item[0].toString(), 
          idPasien: item[1],
          hasilTes: item[2],
          tanggalTes: item[3],
          statusVaksinasi: item[4],
          owner: item[5], 
        }));
  
      setActivities(validData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setActivities([]);
    }
  };
  
  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userAddress");
        router.push("/login");
      }
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleEdit = (data: CovidData) => {
    const currentUser = localStorage.getItem("userAddress"); 
    if (data.owner !== currentUser) {
      Swal.fire({
        title: "Unauthorized",
        text: "You are not the owner of this data.",
        icon: "error",
      });
      return;
    }
    
    setEditData({ ...data });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    const selectedData = activities.find((activity) => activity.id === id.toString());
    const currentUser = localStorage.getItem("userAddress");
  
    if (selectedData?.owner !== currentUser) {
      Swal.fire({
        title: "Unauthorized",
        text: "You are not the owner of this data.",
        icon: "error",
      });
      return;
    }
  
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete data with ID ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        
        setLoading(true);
        try {
          const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
          const signer = await provider.getSigner(2);
          const contract = new ethers.Contract(contractAddress, abi, signer);
      
          const tx = await contract.deleteCovidData(id);
          await tx.wait();
      
          Swal.fire("Deleted!", "The data has been deleted.", "success");
          fetchActivities();
        } catch (error) {
          console.error("Error deleting data:", error);
          Swal.fire("Error!", "Failed to delete data.", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleUpdate = async () => {
    if (!editData) {
      alert("No data to update.");
      return;
    }
  
    const currentUser = localStorage.getItem("userAddress");
    if (editData.owner !== currentUser) {
      Swal.fire({
        title: "Unauthorized",
        text: "You are not the owner of this data.",
        icon: "error",
      });
      return;
    }

    setLoading(true); 
    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const signer = await provider.getSigner(2);
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.updateCovidData(
        editData.id,
        editData.idPasien || "",
        editData.hasilTes || "",
        editData.tanggalTes || "",
        editData.statusVaksinasi || ""
      );
      await tx.wait();

      alert("Data updated successfully.");
      setShowModal(false);
      fetchActivities();
    } catch (error) {
      console.error("Error in handleUpdate:", error);
      alert("Failed to update data. Please check your input.");
    } finally {
      setLoading(false); 
    }
  };

  const directToCreateData = () => {
    router.push("/create-data");
  };

  const currentData = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(activities.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-[#252525] text-white p-8 flex flex-col relative">

      {loading && (
        <LoadingScreen />
      )}

      <div className="w-full flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="flex items-center">
          <button
            className="text-white flex items-center mr-2 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
            onClick={handleLogout}
          >
            <FiLogOut size={23} />
          </button>
          <button
            className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600"
            onClick={directToCreateData}
          >
            Add Covid Data
          </button>
        </div>
      </div>

      {activities.length === 0 ? (
        <p className="text-center text-lg">No data available.</p>
      ) : (
        <div className="flex flex-col h-full">
          <div className="overflow-auto flex-grow">
            <table className="w-full table-auto bg-gray-800 rounded-xl">
              <thead>
                <tr className="bg-gray-700">
                  <th className="px-4 py-2 text-center">ID Pasien</th>
                  <th className="px-4 py-2 text-center">Hasil Tes</th>
                  <th className="px-4 py-2 text-center">Tanggal Tes</th>
                  <th className="px-4 py-2 text-center">Status Vaksinasi</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((activity, index) => (
                  <tr key={index} className="border-b border-gray-600">
                    <td className="px-4 py-2 text-center">{activity.idPasien}</td>
                    <td className="px-4 py-2 text-center">{activity.hasilTes}</td>
                    <td className="px-4 py-2 text-center">{activity.tanggalTes}</td>
                    <td className="px-4 py-2 text-center">{activity.statusVaksinasi}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600"
                        onClick={() => handleEdit(activity)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => handleDelete(parseInt(activity.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {showModal && editData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg text-black w-96">
            <h3 className="text-xl font-bold mb-4">Edit Data Pasien</h3>

            {/* ID Pasien */}
            <input
              type="text"
              className="w-full mb-2 p-2 border rounded"
              value={editData?.idPasien ?? ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, idPasien: e.target.value }))
              }
              placeholder="ID Pasien"
            />

            {/* Hasil Tes */}
            <select
              className="w-full mb-2 p-2 border rounded"
              value={editData?.hasilTes ?? ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, hasilTes: e.target.value }))
              }
            >
              <option value="">Pilih Hasil Tes</option>
              <option value="Negatif">Negatif</option>
              <option value="Positif">Positif</option>
            </select>

            {/* Tanggal Tes */}
            <input
              type="date"
              className="w-full mb-2 p-2 border rounded"
              value={editData?.tanggalTes ?? ""}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, tanggalTes: e.target.value }))
              }
            />

            {/* Status Vaksinasi */}
            <select
              className="w-full mb-2 p-2 border rounded"
              value={editData?.statusVaksinasi ?? ""}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  statusVaksinasi: e.target.value,
                }))
              }
            >
              <option value="">Pilih Status Vaksinasi</option>
              <option value="Sudah Vaksin">Sudah Vaksin</option>
              <option value="Belum Vaksin">Belum Vaksin</option>
            </select>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
