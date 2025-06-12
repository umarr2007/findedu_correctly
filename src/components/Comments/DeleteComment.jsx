import React from "react";
import axios from "axios";

const DeleteComment = ({ commentId, onCommentDeleted }) => {
  const handleDeleteComment = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://findcourse.net.uz/api/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onCommentDeleted(commentId);
    } catch (err) {
      if (err.response?.status === 401) {
        console.error("Avtorizatsiya muddati tugagan.");
      } else if (err.message === "Network Error") {
        console.error("Internet bilan bog'lanishda xato.");
      }
    }
  };

  return (
    <button
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-1.5 px-4 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
      onClick={handleDeleteComment}
    >
      O'chirish
    </button>
  );
};

export default DeleteComment;
