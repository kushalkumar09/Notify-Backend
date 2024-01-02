import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

function Post({ title, summary, cover, createdAt, author, _id }) {
  return (
    <div
      className="w-full md:mt-5 md:p-5 p-3 bg-white rounded-md shadow-md mx-auto"
      style={{ width: "70%" }}
    >
      <div className="md:w-full md:p-4 flex items-center justify-center">
        <Link to={`post/${_id}`}>
          <img
            src={`http://localhost:4000/` + cover}
            alt="Post Cover"
            className="w-full h-80 md:h-96 object-cover rounded-md hover:scale-105 transition-transform"
          />
        </Link>
      </div>

      <div className="md:w-full md:p-4">
        <Link to={`post/${_id}`}>
          <h2 className="text-xl font-bold mb-2 uppercase">{title}</h2>
        </Link>
        <div className="mt-2 text-xs flex flex-col sm:flex-row justify-between items-center text-zinc-700 mb-2">
          <p className="font-bold mb-2 sm:mb-0">
            <b>Author: {author ? author.username : "Author"}</b>
          </p>
          <time className="text-gray-500">
            {formatISO9075(new Date(createdAt))}
          </time>
        </div>
        <p className="text-justify">{summary}</p>
      </div>
    </div>
  );
}

export default Post;
