import { useState, useEffect } from "react";
import axios from "axios";
import "./category.css";
function Category() {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1 className="text-center font-mono">Category</h1>
      <div className="grid grid-cols-3 gap-2 w-xl mx-auto border-1 border-solid border-red-700 bg-red-100 rounded-xl text-center px-4 py-4 font-mono">
        {posts.map((post, index) => (
          <div key={index}>
            <a
              href={`https://oceanofgames.com/category/${post}`}
              className="px-4 py-2 bg-stone-600 text-white rounded hover:bg-zinc-700 w-full block h-full"
            >
              {post}
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
export default Category;
