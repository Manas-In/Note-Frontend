
import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
import NoteCard from "./NoteCard";
import Filter from "./Filter";
import Search from "./Search";
import axiosinstance from "../Axiosinstance";

const NoteCardContainer = () => {
  const [notes, setNotes] = useState([]);
  const [filterData, setFilterData] = useState("All");
  const [searchData, setSearchData] = useState("");

  // Child data handlers
  const handleFilterData = (data) => setFilterData(data);
  const handleSearchData = (data) => setSearchData(data);

  useEffect(() => {
    // const token = localStorage.getItem("accessTokon"); // from login
    axiosinstance
      .get("/notes/" 
    //     {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    )
      .then((res) => setNotes(res.data))
      .catch((err) =>
        console.error(err.response?.data?.detail || err.message)
      );
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      // Category filter
      const catMatch =
        filterData === "All" ||
        note.catagory.toLowerCase() === filterData.toLowerCase();
      // Search filter
      const searchMatch =
        !searchData ||
        note.title.toLowerCase().includes(searchData.toLowerCase()) ||
        note.body.toLowerCase().includes(searchData.toLowerCase()) ||
        note.catagory.toLowerCase().includes(searchData.toLowerCase());

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
          filteredNotes.map((note) => <NoteCard key={note.id} notes={note} />)
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
