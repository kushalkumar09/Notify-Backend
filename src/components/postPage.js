import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
      <div className="max-w-full md:max-w-5xl md:mx-auto md:mt-8 p-4 bg-white rounded shadow overflow-hidden">
        {/* Title and Author */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 font-bold leading-tight">
            {postInfo.title}
          </h1>
          <p className="text-gray-600 text-lg font-semibol flex justify-end pr-6">
            By {postInfo.author?.username || "Unknown Author"}
          </p>
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
