
import React, { useEffect, useState } from "react";
// import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import axiosinstance from "../Axiosinstance";


const categories = ["IMPORTANT", "BUSINESS", "PERSONAL"];

const UpdateNote = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [note, setNote] = useState(null);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch note
  useEffect(() => {
    const token = localStorage.getItem("accessTokon");
    if (!token) {
      setError("You must be logged in.");
      setLoading(false);
      return;
    }

    axiosinstance
      .get(`http://127.0.0.1:8000/notes/noteview/${slug}`
    //     , {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    )
      .then((res) => {
        setNote(res.data);
        setNoteTitle(res.data.title);
        setNoteContent(res.data.body);
        setCategory(res.data.catagory?.toUpperCase() || categories[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.response?.data || err.message);
        setError("Failed to fetch note.");
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading note...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  // Update note
  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();


    const token = localStorage.getItem("accessTokon");
    if (!token) return;

    try {
      await axiosinstance.put(
        `http://127.0.0.1:8000/notes/noteview/${slug}`,
        { title: noteTitle, body: noteContent, catagory: category,updated_at :now  }
        // { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/NoteDetails/${slug}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to update note.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-50 px-4 py-10">
      <div className="bg-white w-full max-w-lg mx-auto p-8 rounded-3xl shadow-xl transition hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          📝 Update Note
        </h2>

        {error && (
          <p className="text-red-600 font-medium bg-red-100 px-4 py-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              type="text"
              required
              className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold mb-2">Content</label>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              required
              className="w-full h-32 bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl flex justify-between px-4 shadow"
            >
              {category} <span className="ml-2">&#9662;</span>
            </button>

            {open && (
              <ul className="absolute top-full left-0 w-full mt-1 bg-white border rounded-xl shadow-lg z-10">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className="px-4 py-2 hover:bg-indigo-600 hover:text-white cursor-pointer"
                    onClick={() => {
                      setCategory(cat); // always uppercase
                      setOpen(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-md hover:from-indigo-600 hover:to-purple-700"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNote;
