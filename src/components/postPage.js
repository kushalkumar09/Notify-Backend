import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((postInfo) => {
        setPostInfo(postInfo);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        // Handle the error (e.g., show an error message to the user)
      });
  }, [id]);

  if (!postInfo) {
    // Return loading state (e.g., a loading spinner or message)
    return <p>Loading...</p>;
  }

  // Render post content
  return (
    <>
      <div className="max-w-full md:max-w-5xl md:mx-auto md:mt-8 p-4 bg-white rounded md:shadow overflow-hidden">
        <button className="bg-slate-500 text-white px-4 py-2 rounded-md flex items-center m-auto md:mr-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.793 2.793a1 1 0 0 1 1.414 0l1 1a1 1 0 0 1 0 1.414L4.5 18.914a1 1 0 0 1-1.414 0l-1-1a1 1 0 0 1 0-1.414L14.793 2.793zM16 6L6 16H2v-4l10-10h4v4z"
            />
          </svg>
          Edit Post
        </button>

        {/* Title and Author */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 font-bold leading-tight text-center">
            {postInfo.title}
          </h1>
          <p className="text-gray-500 text-lg font-bold flex justify-center mt-2 pr-6 capitalize ">
            by {postInfo.author?.username || "Unknown Author"}
          </p>
          <p className="text-gray-500 text-lg font-bold flex justify-center mt-2 pr-6 capitalize"> {format(new Date(postInfo.createdAt),"MM/dd/yyyy")}</p>
        </div>

        {/* Image */}
        <img
          className="w-full h-auto rounded-md mb-4 object-cover"
          src={`http://localhost:4000/${postInfo.cover}`}
          alt={postInfo.title}
        />

        {/* Summary */}
        <p className="text-gray-600 mb-4">{postInfo.summary}</p>

        {/* Content */}
        <div className="prose max-w-full text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
      </div>
    </>
  );
}
