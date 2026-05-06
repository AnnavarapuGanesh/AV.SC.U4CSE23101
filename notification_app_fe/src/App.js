import React, { useState } from "react";
import Notifications from "./pages/Notifications";
import Priority from "./pages/Priority";

function App() {
  const [page, setPage] = useState("all");

  return (
    <div
      style={{
        background: "#eef2f7",
        minHeight: "100vh",
        padding: 20
      }}
    >
      {/* 🔷 Top Navigation */}
      <div style={{ marginBottom: 20 }}>
        <button
          onClick={() => setPage("all")}
          style={{
            padding: "8px 16px",
            marginRight: 10,
            borderRadius: 8,
            border: "none",
            background: page === "all" ? "#1976d2" : "#ccc",
            color: page === "all" ? "#fff" : "#000",
            cursor: "pointer"
          }}
        >
          All
        </button>

        <button
          onClick={() => setPage("priority")}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            background: page === "priority" ? "#1976d2" : "#ccc",
            color: page === "priority" ? "#fff" : "#000",
            cursor: "pointer"
          }}
        >
          Priority
        </button>
      </div>

      {/* 🔷 Page Content */}
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 16,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
      >
        {page === "all" ? <Notifications /> : <Priority />}
      </div>
    </div>
  );
}

export default App;