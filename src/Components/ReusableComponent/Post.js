import react from "react";

export const Post = ({ user, info }) => {
  return (
    <div className="post">
      {/* profile and title */}
      <header>
        <img src={user.photoUrl} alt={user.displayname} />
        <h5>{user.displayName}</h5>
      </header>
      <div>
        <p
          style={{
            color: "white",
            paddingTop: "12px",
          }}
        >
          so this is going to be the post that everyone sees
        </p>
      </div>
    </div>
  );
};
