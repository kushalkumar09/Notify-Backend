import Post from "./Post";
import { useEffect, useState } from "react";

export default function IndexPages() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/posts").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <Post {...post} />
        ))}
    </>
  );
}
