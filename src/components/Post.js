import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
function Post({ title, summary, cover, content, createdAt, author,_id }) {
  return (
    <>
      <div className="w-full md:flex md:mt-5 md:p-5 p-3">
        <div className="md:w-1/2 md:p-4 flex flex-col items-center">
          <Link to={`post/${_id}`}>
            <img
              src={`http://localhost:4000/` + cover}
              alt="Post Cover"
              className=" object-contain md:object-cover w-full h-80 md:h-96 md:w-full max-h-full rounded-lg md:shadow-md transition-transform transform md:hover:scale-105"
            />
          </Link>
        </div>

        <div className="md:w-1/2 md:p-4">
          <Link to={`post/${_id}`}>
            <h2 className="text-3xl font-bold mb-2 md:bg-zinc-200 uppercase">
              {title}
            </h2>
          </Link>
          <div className="auth mt-2 text-xs flex flex-col sm:flex-row justify-between items-center text-zinc-700 mb-2">
            <p className="info text-black font-bold mb-2 sm:mb-0">
              <b>Author: {author ? author.username : "Author"}</b>
            </p>
            <time className="text-gray-500">
              {formatISO9075(new Date(createdAt))}
            </time>
          </div>
          <p className="summary text-justify">{summary}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
