import React, { useState, useEffect } from "react";
import axios from "axios";

const EditResource = ({ isOpen, onClose, resource, onSuccess, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    media: "",
    image: "",
    categoryId: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (resource) {
      setFormData({
        name: resource.name || "",
        description: resource.description || "",
        media: resource.media || "",
        image: resource.image || "",
        categoryId: resource.categoryId || "",
      });
    }
  }, [resource]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Resursni tahrirlash uchun avval tizimga kiring");
      return;
    }

    if (!formData.name.trim() || !formData.categoryId) {
      setError("Resurs nomi va kategoriyasi to'ldirilishi shart");
      return;
    }

    try {
      setError(null);
      const requestData = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        media: formData.media.trim() || null,
        image: formData.image.trim() || null,
        categoryId:parseInt(formData.categoryId),
      };

      const response = await axios.patch(
        `https://findcourse.net.uz/api/resources/${resource?.id}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.data && response.data.data) {
        onSuccess(response.data.data);
        onClose();
      }
    } catch (err) {
      console.error("Error updating resource:", err);

      if (err.response?.status === 401) {
        if (err.response?.data?.message === "Unauthenticated.") {
          alert("Sessiya muddati tugagan. Iltimos, qaytadan kiring");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else {
          setError("Avtorizatsiya xatosi. Iltimos, qaytadan kiring");
        }
      } else if (err.response?.status === 422) {
        const validationErrors = err.response.data.errors;
        if (validationErrors) {
          const errorMessages = Object.entries(validationErrors).map(
            ([field, messages]) => `${field}: ${messages.join(", ")}`
          );
          setError(errorMessages.join("\n"));
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Ma'lumotlar noto'g'ri formatda");
        }
      } else {
        setError(
          "Resursni tahrirlashda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring"
        );
      }
    }
  };

  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 bg-[#a9a5a5] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Resursni tahrirlash
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resurs nomi
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategoriya
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Kategoriyani tanlang</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tavsif
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Media URL
              </label>
              <input
                type="text"
                value={formData.media}
                onChange={(e) =>
                  setFormData({ ...formData, media: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Media URL sini kiriting"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rasm URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Rasm URL sini kiriting"
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Bekor qilish
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Saqlash
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditResource;
