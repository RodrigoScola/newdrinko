import React, { useEffect, useState } from "react";
import { Background } from "../ReusableComponent/background";
import { Navbar } from "../ReusableComponent/navBar";
import { Post } from "../ReusableComponent/Post";
import { addNewDocument } from "../../utils/firebase";
import { queryDocuments } from "../../utils/firebase";
import "../styles/pages.css";

export const Feed = ({ user, page, setPage }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    queryDocuments("post").then((res) => {
      setPosts(res);
    });
  }, []);
  console.log(user);
  const [postData, setPostData] = useState({ title: "", description: "" });
  const createPost = async (e) => {
    e.preventDefault();
    addNewDocument("post", {
      title: postData.title,
      description: postData.description,
      userName: user.displayName,
      photo: user.photoUrl,
      createdAt: Date.now(),
      uid: user.uid,
    });
  };

  if (posts) {
    const length = posts.length || 123;
    const height = `${length * 122 * 2}px`;
    return (
      <div style={{ height: height, backgroundColor: "#3d3fac" }}>
        <Background>
          <div style={{}} className="centered-container">
            <form
              style={{
                marginTop: "20px",
              }}
              className=" "
              onSubmit={(e) => {
                createPost(e);
              }}
            >
              <input
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    title: e.target.value,
                  });
                }}
                type="text"
                className="form-control"
                placeholder="title"
                required
              />
              <textarea
                onChange={(e) => {
                  setPostData({
                    ...postData,
                    description: e.target.value,
                  });
                }}
                required
                className="form-control"
                style={{
                  marginTop: 12,
                  resize: "none",
                }}
                rows={3}
                cols={50}
              ></textarea>
              <button
                style={{
                  marginTop: 12,
                }}
                className="btn btn-outline-success "
                type="submit"
              >
                Create post
              </button>
            </form>
            <div className="formContainer">
              {/* posts */}
              {posts.map((value, idx) => {
                return <Post key={idx} user={value} />;
              })}
            </div>
          </div>
          <Navbar page={page} setPage={setPage} />
        </Background>
      </div>
    );
  }
  return <Background />;
};
