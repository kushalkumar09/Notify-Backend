import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Createpost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState(""); // Corrected the state variable name

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

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blackquoute',
        'list', 'bullet', 'indent',
        'link', 'image'           
  ];

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSummaryChange = (e) => {
    setSummary(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
  };

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
        <input className="w-1/2 mt-5" type="file" />
        <ReactQuill
          className="w-full h-fit mt-5"
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
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
