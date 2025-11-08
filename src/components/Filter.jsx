import React, {  useState } from "react";

const Filter = ({ notes, sendData }) => {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedNote, setselectedNote] = useState({catagory: "All"});

  const handleSelect = (note) => {
    setselectedNote(note);
    setIsOpen(false);
    sendData(note.catagory); // ✅ directly send selected category
  };

  return (
   <div className="flex flex-col w-full sm:w-72 text-sm mt-3 relative">
  {/* Button */}
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="group flex items-center justify-center gap-32 w-full text-left px-3 py-2 border rounded-lg bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none transition-all duration-200"
  >
    <div className="flex items-center gap-2"> 
      {selectedNote?.catagory || "Select Category"}
    </div>
    <svg
      width="11"
      height="17"
      viewBox="0 0 11 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${
        isOpen ? "rotate-180" : "rotate-0"
      }`}
    >
      <path
        d="M9.92546 6L5.68538 1L1.44531 6"
        stroke="#6B7280"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.44564 11L5.68571 16L9.92578 11"
        stroke="#6B7280"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>

  {/* Dropdown list */}
  {isOpen && (
    <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-xl shadow-lg mt-2 py-2 animate-fadeIn max-h-60 overflow-y-auto">
      {/* ALL option */}
      <li
        className={`flex justify-center ml-8 mr-8 items-center px-4 py-2 mb-2 text-gray-700 font-medium cursor-pointer rounded-lg transition-all duration-200 ${
          "All" === selectedNote.catagory
            ? "bg-indigo-500 text-white"
            : "hover:bg-indigo-500 hover:text-white hover:shadow-md hover:scale-[1.02]"
        }`}
        onClick={() => handleSelect({ ...selectedNote, catagory: "All" })}
      >
        All
        {"All" === selectedNote.catagory && (
          <span className="ml-2 text-sm">✔</span>
        )}
      </li>

      {/* Dynamic categories */}
      {[...new Set(notes.map((note) => note.catagory))].map((category) => (
        <li
          key={category}
          className={`flex  ml-8 mr-8  justify-center items-center px-4 mb-2 py-2 text-gray-700 font-medium cursor-pointer rounded-lg transition-all duration-200 ${
            category === selectedNote.catagory
              ? "bg-indigo-500 text-white"
              : "hover:bg-indigo-500 hover:text-white hover:shadow-md hover:scale-[1.02]"
          }`}
          onClick={() =>
            handleSelect({ ...selectedNote, catagory: category })
          }
        >
          {category}
          {category === selectedNote.catagory && (
            <span className="ml-2 text-sm">✔</span>
          )}
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default Filter;


