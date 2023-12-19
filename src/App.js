// import logo from './logo.svg';
// import './App.css';
import Header from "./components/Nav";
import './style/header.css';
import './style/post.css';
import Post from "./components/Post";

function App() {
  return (
    <div>      
      <Header />
      <br></br>
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;
