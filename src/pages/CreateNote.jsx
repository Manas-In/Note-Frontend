
import React, { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosinstance from "../Axiosinstance";

const categories = ["IMPORTANT", "BUSINESS", "PERSONAL"];

const CreateNote = () => {
  const navigate = useNavigate();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("accessTokon");
    if (!token) {
      setError("You must be logged in to create a note.");
      return;
    }
    
   
    

    try {
      const noteCatagory = category
      await axiosinstance.post(
        "http://127.0.0.1:8000/notes/",
        {
          title: noteTitle,
          body: noteContent,
          category: noteCatagory,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      navigate("/"); // redirect to home or notes list
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError("Failed to create note. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-50 px-4">
      <div className="bg-white w-full max-w-lg mx-auto p-8 rounded-3xl shadow-xl transition hover:shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          📝 Create Note
        </h2>

        {error && (
          <p className="text-red-600 font-medium bg-red-100 px-4 py-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              type="text"
              placeholder="Enter note title"
              required
              className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Content</label>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write something..."
              required
              className="w-full h-32 bg-gray-50 border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl flex justify-between px-4 shadow"
            >
              {category} <span>&#9662;</span>
            </button>

            {open && (
              <ul className="absolute mt-2 w-full bg-white border rounded-xl shadow-lg z-10">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className="px-4 py-2 hover:bg-indigo-600 hover:text-white cursor-pointer"
                    onClick={() => {
                      setCategory(cat);
                      setOpen(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg shadow-md hover:from-indigo-600 hover:to-purple-700"
          >
            Save Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;

