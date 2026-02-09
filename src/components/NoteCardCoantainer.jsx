import React, { useEffect, useMemo, useState } from "react";
import NoteCard from "./NoteCard";
import Filter from "./Filter";
import Search from "./Search";
import axiosinstance from "../Axiosinstance";

const NoteCardContainer = () => {
  const [notes, setNotes] = useState([]);          // ALWAYS an array
  const [filterData, setFilterData] = useState("All");
  const [searchData, setSearchData] = useState("");

  // Child data handlers
  const handleFilterData = (data) => setFilterData(data);
  const handleSearchData = (data) => setSearchData(data);

  useEffect(() => {
    axiosinstance
      .get("/notes/")
      .then((res) => {

        // ✅ Handle ALL possible backend responses safely
        if (Array.isArray(res.data)) {
          setNotes(res.data);
        } else if (Array.isArray(res.data?.results)) {
          setNotes(res.data.results);
        } else {
          setNotes([]);
        }
      })
      .catch((err) => {
        console.error(
          err.response?.data?.detail || err.message
        );
        setNotes([]); // prevent crash
      });
  }, []);

  // ✅ SAFE filtering (no runtime crash)
  const filteredNotes = useMemo(() => {
    if (!Array.isArray(notes)) return [];

    return notes.filter((note) => {
      const category = note?.catagory || "";
      const title = note?.title || "";
      const body = note?.body || "";

      const catMatch =
        filterData === "All" ||
        category.toLowerCase() === filterData.toLowerCase();

      const searchMatch =
        !searchData ||
        title.toLowerCase().includes(searchData.toLowerCase()) ||
        body.toLowerCase().includes(searchData.toLowerCase()) ||
        category.toLowerCase().includes(searchData.toLowerCase());

      return catMatch && searchMatch;
    });
  }, [notes, filterData, searchData]);

  return (
    <>
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row mt-6 mb-6 gap-5 items-center justify-center">
        <Filter sendData={handleFilterData} notes={notes} />
        <Search senddata={handleSearchData} />
      </div>

      {/* Notes Section */}
      <section className="flex flex-wrap mt-6 mb-8 items-center justify-center gap-8">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard key={note.id} notes={note} />
          ))
        ) : (
          <p className="text-gray-500 text-lg font-medium italic">
            No notes found ✨
          </p>
        )}
      </section>
    </>
  );
};

export default NoteCardContainer;
