

import React, { useState } from "react";

const Search = ({ senddata }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh if inside a form
    senddata(search);   // send current search to parent
  };

  const handleInput = (e) => {
    setSearch(e.target.value); // just update state
     senddata(e.target.value); 
  };

  return (
  <form
  onSubmit={handleSubmit}
  className="flex items-center gap-3 mt-3 bg-white rounded-full shadow-sm border border-gray-200 hover:shadow-md focus-within:ring-2 focus-within:ring-indigo-400 transition-all duration-200 max-w-md w-full px-3 py-1.5"
>
  {/* Search Icon */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 30 30"
    fill="none"
    className="text-gray-500"
  >
    <path
      d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"
      fill="currentColor"
    />
  </svg>

  {/* Input */}
  <input
    type="text"
    placeholder="Find products..."
    value={search}
    onChange={handleInput}
    className="flex-1 bg-transparent outline-none placeholder-gray-400 text-gray-700 text-sm"
  />


</form>

  );
};

export default Search;
