import React, { useState } from "react";
import axios from "axios";

const DeleteResource = ({ isOpen, onClose, resource, onSuccess }) => {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Resursni o'chirish uchun avval tizimga kiring");
      return;
    }

    try {
      setError(null);
      await axios.delete(
        `https://findcourse.net.uz/api/resources/${resource.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const newResourcesIds = JSON.parse(
        localStorage.getItem("newResourcesIds") || "[]"
      );
      const updatedNewResourcesIds = newResourcesIds.filter(
        (id) => id !== resource.id
      );
      localStorage.setItem(
        "newResourcesIds",
        JSON.stringify(updatedNewResourcesIds)
      );

      onSuccess();
      onClose();
    } catch (err) {
      console.error("Error deleting resource:", err);

      if (err.response?.status === 401) {
        if (err.response?.data?.message === "Unauthenticated.") {
          alert("Sessiya muddati tugagan. Iltimos, qaytadan kiring");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setError("Avtorizatsiya xatosi. Iltimos, qaytadan kiring");
        }
      } else {
        setError(
          "Resursni o'chirishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring"
        );
      }
    }
  };

  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 bg-[#fff] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Resursni o'chirish
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{error}</span>
              <button
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setError(null)}
              >
                <span className="sr-only">Yopish</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
          <p className="text-gray-600 mb-6">
            Siz ushbu resursni o'chirishni istaysizmi? Bu amalni bekor qilib
            bo'lmaydi.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Bekor qilish
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              O'chirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteResource; 