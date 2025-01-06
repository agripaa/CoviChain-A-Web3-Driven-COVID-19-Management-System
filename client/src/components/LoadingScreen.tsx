import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg">Loading...</p>
      </div>
    </div>
  );
}
