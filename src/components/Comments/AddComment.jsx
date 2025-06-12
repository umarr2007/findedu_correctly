import React, { useState } from "react";
import axios from "axios";

const AddComment = ({ centerId, onCommentAdded, user }) => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return setError("Izoh bo'sh bo'lmasligi kerak.");

    try {
      const token = localStorage.getItem("token");
      const data = {
        text: newComment,
        star: rating,
        centerId: parseInt(centerId),
      };

      const res = await axios.post(
        `https://findcourse.net.uz/api/comments`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.data) {
        const newCommentWithUser = {
          ...res.data.data,
          user: res.data.data.user || {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
          },
        };
        onCommentAdded(newCommentWithUser);
        setNewComment("");
        setRating(5);
        setError(null);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Avtorizatsiya muddati tugagan.");
      } else if (err.message === "Network Error") {
        setError("Internet bilan bog'lanishda xato.");
      }
    }
  };

  return (
    <form onSubmit={handleAddComment}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <textarea
        className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500  text-gray-700 resize-none transition duration-300"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Izoh yozing..."
      />
      <br />
      <label>Reyting: </label>
      <select
        className="mt-2 block w-32 px-3 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
      <br />
      <button
        className="bg-purple-600 mt-[20px] hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
        type="submit"
      >
        Izoh qo'shish
      </button>
    </form>
  );
};

export default AddComment;
