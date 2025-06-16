import React, { useState } from "react";
import axios from "axios";

const EditComment = ({ comment, onCommentUpdated, onCancel }) => {
  const [editText, setEditText] = useState(comment.text);
  const [error, setError] = useState(null);

  const handleEditComment = async () => {
    if (!editText.trim()) return setError("Izoh bo'sh bo'lmasligi kerak.");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `https://findcourse.net.uz/api/comments/${comment.id}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.data) {
        onCommentUpdated({ ...res.data.data, user: comment.user });
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
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
      />
      <br />
      <div className="flex gap-3 ">
        <button
          className="bg-purple-600 text-white font-medium py-1.5 px-4 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleEditComment}
        >
          Saqlash
        </button>
        <button
          className="bg-red-500 hover:bg-gray-600 text-white font-medium py-1.5 px-4 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          onClick={onCancel}
        >
          Bekor qilish
        </button>
      </div>
    </div>
  );
};
export default EditComment;