import React, { useState, useEffect } from "react";
import axios from "axios";
import AddComment from "./AddComment";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";

const Comments = ({ centerId }) => {
  const [comments, setComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(
            "https://findcourse.net.uz/api/users/mydata",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.data?.data) {
            setUser(res.data.data);
            setIsAuthenticated(true);
          }
        } catch (err) {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const res = await axios.get(`https://findcourse.net.uz/api/comments`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      if (res.data?.data) {
        const filtered = res.data.data.filter(
          (c) => parseInt(c.centerId) === parseInt(centerId)
        );
        setComments(filtered);
      } else {
        setComments([]);
      }
    } catch (err) {
      handleAxiosError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (centerId) {
      fetchComments();
    }
  }, [centerId]);

  const handleAxiosError = (err) => {
    console.error(err);
    if (err.response?.status === 401) {
      setError("Avtorizatsiya muddati tugagan.");
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } else if (err.message === "Network Error") {
      setError("Internet bilan bog'lanishda xato.");
    }
  };

  const handleCommentUpdated = (updatedComment) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
    setEditingComment(null);
  };

  const handleCommentDeleted = (commentId) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  };

  return (
    <div>
      <h3>Izohlar</h3>

      {loading && <p>Yuklanmoqda...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading &&
        comments.map((comment) => (
          <div
            key={comment.id}
            style={{ borderBottom: "1px solid #ccc", marginBottom: 10 }}
          >
            <p>
              <strong>
                {comment.user?.firstName} {comment.user?.lastName}
              </strong>
            </p>
            {editingComment === comment.id ? (
              <EditComment
                comment={comment}
                onCommentUpdated={handleCommentUpdated}
                onCancel={() => setEditingComment(null)}
              />
            ) : (
              <>
                <p>{comment.text}</p>
                <p>⭐ {comment.star}</p>
                {user && comment.user?.id === user.id && (
                  <>
                    <div className="flex gap-[20px] mt-[10px]">
                      <button
                        className="bg-purple-500 w-[100px]  hover:bg-purple-600 text-white font-medium py-1.5 px-4 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        onClick={() => setEditingComment(comment.id)}
                      >
                        Tahrirlash
                      </button>
                      <DeleteComment
                        commentId={comment.id}
                        onCommentDeleted={handleCommentDeleted}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        ))}

      {isAuthenticated && (
        <AddComment
          centerId={centerId}
          onCommentAdded={(newComment) => {
            setComments((prev) => [...prev, newComment]);
          }}
          user={user}
        />
      )}
    </div>
  );
};

export default Comments;
