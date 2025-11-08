import React from 'react'

const NotFound = () => {
  return (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 text-sm bg-gradient-to-b from-gray-50 to-gray-100">
    {/* Error Code */}
    <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse">
      404
    </h1>

    {/* Divider */}
    <div className="h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 my-6 md:my-8 shadow-md"></div>

    {/* Title */}
    <p className="text-2xl md:text-3xl font-semibold text-gray-800">
      Page Not Found
    </p>

    {/* Subtitle */}
    <p className="text-sm md:text-base mt-4 text-gray-600 max-w-md text-center leading-relaxed">
      The page you are looking for might have been removed, had its name
      changed, or is temporarily unavailable.
    </p>

    {/* Buttons */}
    <div className="flex items-center gap-4 mt-8">
      <a
        href="/"
        className="bg-indigo-600 hover:bg-indigo-700 px-7 py-2.5 text-white rounded-lg shadow-md active:scale-95 transition-all duration-200"
      >
        Return Home
      </a>
     
    </div>
  </div>
);

}

export default NotFound
