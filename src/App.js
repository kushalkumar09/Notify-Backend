// import logo from './logo.svg';
// import './App.css';
// import Post from "./components/Post";
// import Header from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import "./style/header.css";
import "./style/post.css";
import Layout from "./components/Layout";
import IndexPages from "./components/Pages";
import Login from "./components/Login";
import Register from "./components/Register";
import {UserContextProvider} from "./components/UserContext";
import Createpost from "./components/Createpost";
import PostPage from "./components/postPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<Createpost />} />
          <Route path="/post/:id" element={<PostPage/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
