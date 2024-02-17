import React from "react";
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <>
      <main
        style={{
          padding: "1rem",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>There's nothing here!</h1>
        <Link to={"/"}>
          <button
            style={{
              textDecoration: "none",
              border: "none",
              width: 120,
              borderRadius: 5,
              padding: "20px",
              backgroundColor: "black",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Back Home
          </button>
        </Link>
      </main>
    </>
  );
};
