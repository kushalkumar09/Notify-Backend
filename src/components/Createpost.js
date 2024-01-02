import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router";

export default function Createpost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState(""); // Corrected the state variable name
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handlefiles = (e) => {
    setFiles(e.target.files);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();
    console.log(files);
    // Add logic to handle form submission
    const response = await fetch("http://localhost:4000/api/v1/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      alert("post created successfully");
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <h1 className="text-center text-lg font-bold">Create Your Post Here</h1>
      <form
        className="bg-slate-100 m-10 p-5 w-1/2 rounded-md self-center"
        onSubmit={handleSubmit}
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
        <input onChange={handlefiles} className="w-1/2 mt-5" type="file" />
        <ReactQuill
          className="w-full h-fit mt-5"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          // formats={formats}
        />
        <button
          className="bg-zinc-800 text-cyan-50 w-full mt-5 p-1 rounded-md"
          type="submit"
        >
          Create Post
        </button>
      </form>
    </>
  );
}
