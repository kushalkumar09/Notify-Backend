import React from "react";
import { formatISO9075 } from "date-fns";

function Post({title,summary,cover,content,createdAt,author}) {
  return (
    <>
      <div className="w-full md:flex md:mt-5 md:p-5 p-3">
        <div className="h-80 overflow-hidden flex justify-center md:w-1/2 md:p-4 ">
          <img
            src={`http://localhost:4000/`+cover}
            alt="sky-skeeper"
            className="object-contain md:max-h-96 md:max-w-md "
          />
        </div>
        <div className="md:h-80 md:flex-1 overflow-hidden p-3 text-justify md:w-1/2 md:p-4 ">
          <h2 className="text-2xl font-bold mb-2 bg-zinc-200 uppercase">
            {title}
          </h2>
          <div className="auth mt-2 text-xs flex justify-end text-zinc-700 mb-2">
            <p className="info inline mr-4 text-black font-boldcla">
             
              {author? author.username : "Author"}
            </p>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </div>

          <p className="summary text-justify md:text-left">{summary}</p>
        </div>
      </div>
    </>
  );
}

export default Post;
