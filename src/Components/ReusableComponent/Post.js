import React from "react";

export const Post = ({ user, info }) => {
  return (
    <div className="post">
      {/* profile and title */}
      <header>
        <img src={user.photo} alt={user.displayname} />
        <h5>{user.userName}</h5>
      </header>
      <div>
        <p
          style={{
            color: "white",
            paddingTop: "12px",
          }}
        >
          {user.title}
        </p>
        <p>{user.description}</p>
      </div>
    </div>
  );
};
