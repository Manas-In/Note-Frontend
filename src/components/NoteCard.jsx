import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const catagory_color = {
  IMPORTANT: "text-green-500",
  PERSONAL: "text-blue-500",
  Work: "text-green-500",
  Study: "text-purple-500",
};

const NoteCard = ({ notes }) => {
  const navigate = useNavigate();
  const [notebody, setnotebody] = useState("");

  const NavigateNote = () => {
    navigate(`/NoteDetails/${notes.slug}`); // Correct way
  };

  useEffect(() => {
    //     const body =  notes.body
    //     const words = body.split(" ");
    //   const firstPart = words.slice(0, 30).join(" "); // first 30 words
    //   // Split into sentences by "."
    //   const sentences = firstPart.split(".");
    //   console.log(sentences[0]);

    const body = notes.body;
    const words = body.split(" ");
    const firstpart = words.slice(0, 20).join(" ");
    const sentence = firstpart.split(".");
    if (sentence.length > 1) {
      setnotebody(sentence.slice(0, sentence.length - 1).join(".") + ".");
    } else {
      setnotebody(sentence);
    }

    catagory_color;
  }, [notes]);

  
  
  const ctagory_colors =  catagory_color[notes.catagory] ||'text-gray-500';
  //   title = models.CharField(max_length=100)
  //   body = models.TextField()
  //   slug = models.SlugField(unique=True, blank=True )
  //   catagory = models.CharField( max_length=15 , choices=CATAGORY, default='Pesronal')

  return (
 <div
  onClick={NavigateNote}
  className="p-5 cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 max-w-80 border border-gray-100"
>
  {/* Title */}
  <p
    className={`${ctagory_colors} text-xl font-semibold mt-2 line-clamp-1 tracking-wide`}
  >
    {notes.title}
  </p>

  {/* Updated time */}
  <p className="mt-2 text-xs text-gray-400 italic">
    {new Date(notes.updated_at).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
  </p>

  {/* Note body */}
  <p className="text-gray-600 mt-3 mb-4 ml-1 text-sm line-clamp-3 leading-relaxed">
    {notebody}
  </p>

  {/* Category Tag */}
<div
  className={`${ctagory_colors} flex items-center justify-center px-4 py-2 rounded-full `}
>
  <p className="ml-2 tracking-wide">{notes.catagory || "Uncategorized"}</p>
</div>


</div>

  );
};

export default NoteCard;
