
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import axiosinstance from "../Axiosinstance";

const NoteDetails = () => {
  const { slug } = useParams();
  const [note, setnote] = useState(null);
  const navigate = useNavigate();
  // axios
  //   .get(`http://127.0.0.1:8000/notes/noteview/${slug}/`)
  //   .then(res => setnote(res.data) )
  //   .catch(err => console.error(err));

 useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem("accessTokon"); // JWT token
      if (!token) {
        alert("You must be logged in to view notes");
        navigate("/login");
        return;
      }

      try {
        const response = await axiosinstance.get(
          `/notes/noteview/${slug}`
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        );
        setnote(response.data);
      } catch (err) {
        console.error("Error fetching note:", err.response?.data || err.message);
        setnote(null);
      }
    };

    fetchNote();
  }, [slug, navigate]);

  if (!note) return <p className="text-gray-500 mt-10 text-center">Note not found.</p>;

  const DeleteNote = async () => {
    const token = localStorage.getItem("accessTokon");
    if (!token) return;

    try {
      await axiosinstance.delete(`http://127.0.0.1:8000/notes/noteview/${slug}`
        //{     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    );
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Error deleting note:", err.response?.data || err.message);
    }
  };

  return (
    <div className="flex justify-center mt-8 px-4">
      <div className="bg-white text-gray-600 w-full max-w-3xl p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex flex-col gap-6">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center leading-tight">
            {note.title}
          </h1>
          <div className="flex flex-row justify-center gap-5">
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-red-800 font-bold cursor-pointer text-amber-50  max-w-fit p-4 rounded-2xl"
                onClick={DeleteNote}
              >
                Delete
              </button>
            </div>
            <div className="flex justify-center">
              <Link to={`/update-note/${slug}`} className="bg-green-800 font-bold cursor-pointer text-amber-50  max-w-fit p-4 rounded-2xl">
                Update
              </Link>
            </div>
          </div>
          {/* Date */}
          <p className="text-lg text-gray-500 text-center">
            {new Date(note.updated_at).toLocaleString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {/* Body */}
          <h3 className="text-xl md:text-2xl text-gray-800 font-medium text-justify leading-relaxed">
            {note.body}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NoteDetails;
