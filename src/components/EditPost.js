import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null); // Use null for file state
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
  }, [id]);

  const modules = {
    // ... your existing modules configuration
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);

    if (files && files[0]) {
      data.set("file", files[0]);
    }

    const response = await fetch("http://localhost:4000/api/v1/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <>
      <h1 className="text-center text-lg font-bold">Update Your Post Here</h1>
      <form
        className="bg-slate-100 m-10 p-5 w-1/2 rounded-md self-center"
        onSubmit={updatePost}
      >
        <input
          type="text"
          className="w-full p-2 rounded-md"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        <input
          type="text"
          className="w-full mt-4 p-2 rounded-md"
          placeholder="Summary"
          value={summary}
          onChange={handleSummaryChange}
        />
        <br />
        <input
          onChange={handleFilesChange}
          className="w-full mt-5 p-2 rounded-md border border-gray-300"
          type="file"
        />
        <ReactQuill
          className="w-full h-fit mt-5 border border-gray-300 rounded-md"
          value={content}
          onChange={handleContentChange}
          modules={modules}
        />
        <button
          className="bg-zinc-800 text-cyan-50 w-full mt-5 p-2 rounded-md"
          type="submit"
        >
          Update Post
        </button>
      </form>
    </>
  );
}
