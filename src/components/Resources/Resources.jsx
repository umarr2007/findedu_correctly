import React, { useState, useEffect } from "react";
import axios from "axios";
import AddResource from "./AddResource";
import EditResource from "./EditResource";
import DeleteResource from "./DeleteResource";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchResources();
    fetchCategories();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://findcourse.net.uz/api/resources"
      );
      if (response.data && response.data.data) {
        const newResourcesIds = JSON.parse(
          localStorage.getItem("newResourcesIds") || "[]"
        );

        const resourcesWithNewFlag = response.data.data.map((resource) => ({
          ...resource,
          isNew: newResourcesIds.includes(resource.id),
        }));

        setResources(resourcesWithNewFlag);
      }
      setError(null);
    } catch (err) {
      console.error("Error fetching resources:", err);
      setError("Resurslarni yuklashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://findcourse.net.uz/api/categories"
      );
      if (response.data && response.data.data) {
        setCategories(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleAddSuccess = (newResource) => {
    setResources((prevResources) => [...prevResources, newResource]);
    setTimeout(fetchResources, 1000);
  };

  const handleEditSuccess = (updatedResource) => {
    setResources((prevResources) =>
      prevResources.map((resource) =>
        resource.id === updatedResource.id ? updatedResource : resource
      )
    );
    setTimeout(fetchResources, 1000);
  };

  const handleDeleteSuccess = () => {
    setResources((prevResources) =>
      prevResources.filter((resource) => resource.id !== selectedResource.id)
    );
    setTimeout(fetchResources, 1000);
  };

  const openEditModal = (resource) => {
    setSelectedResource(resource);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (resource) => {
    setSelectedResource(resource);
    setIsDeleteModalOpen(true);
  };

  const filteredResources = resources
    .filter((resource) => {
      if (selectedCategory === "all") return true;
      return resource.categoryId === Number(selectedCategory);
    })
    .filter((resource) => {
      if (!search) return true;
      const query = search.toLowerCase();
      return (
        resource.name.toLowerCase().includes(query) ||
        (resource.description &&
          resource.description.toLowerCase().includes(query)) ||
        (resource.category &&
          resource.category.name.toLowerCase().includes(query))
      );
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
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

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Resurslar</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          + Yangi resurs
        </button>
      </div>

      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qidirish
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Resurs nomi, tavsifi yoki kategoriyasi bo'yicha qidirish..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategoriya bo'yicha filtrlash
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Barcha kategoriyalar</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {resource.name}
                  </h3>
                  {resource.category && (
                    <span className="inline-block mt-1 px-2 py-1 text-sm bg-purple-100 text-purple-800 rounded">
                      {resource.category.name}
                    </span>
                  )}
                </div>
                {resource.isNew && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(resource)}
                      className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
                      title="Tahrirlash"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal(resource)}
                      className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                      title="O'chirish"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              {resource.description && (
                <p className="text-gray-600 mb-4">{resource.description}</p>
              )}
              {resource.image && (
                <img
                  src={resource.image}
                  alt={resource.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              {resource.media && (
                <a
                  href={resource.media}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Resursni ko'rish
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <AddResource
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
        categories={categories}
      />

      <EditResource
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        resource={selectedResource}
        onSuccess={handleEditSuccess}
        categories={categories}
      />

      <DeleteResource
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        resource={selectedResource}
        onSuccess={handleDeleteSuccess}
      />

    </div>
  );
};

export default Resources;
