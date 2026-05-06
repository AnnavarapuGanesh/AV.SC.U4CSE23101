import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Grid
} from "@mui/material";

export default function Notifications() {
  const [data, setData] = useState([]);
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);
  const [viewed, setViewed] = useState(new Set()); // ✅ viewed tracking

  const limit = 6;

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, [type, page]);

  const loadData = async () => {
    const res = await fetchNotifications(page, limit, type);
    setData(res || []);
  };

  const totalPages = 5;

  // 🎯 mark as viewed
  const handleClick = (id) => {
    const updated = new Set(viewed);
    updated.add(id);
    setViewed(updated);
  };

  return (
    <div
      style={{
        padding: 20,
        background: "#f5f7fb",
        borderRadius: 16,
        minHeight: "100vh"
      }}
    >
      <h2 style={{ color: "#2b6cb0" }}>All Notifications</h2>

      {/* 🔘 FILTER BUTTONS */}
      <div style={{ marginBottom: 20 }}>
        {["", "Placement", "Result", "Event"].map((t) => (
          <Button
            key={t}
            variant={type === t ? "contained" : "outlined"}
            onClick={() => {
              setType(t);
              setPage(1);
            }}
            style={{ marginRight: 10 }}
          >
            {t === "" ? "ALL" : t.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* 📦 CARDS */}
      <Grid container spacing={2}>
        {data.map((n) => {
          const isViewed = viewed.has(n.ID);

          return (
            <Grid item xs={12} sm={6} md={4} key={n.ID}>
              <Card
                onClick={() => handleClick(n.ID)}
                style={{
                  borderRadius: 12,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  opacity: isViewed ? 0.6 : 1,
                  transition: "0.3s"
                }}
              >
                <CardContent>
                  {/* 🏷️ TYPE */}
                  <Chip
                    label={n.Type}
                    color={
                      n.Type === "Placement"
                        ? "primary"
                        : n.Type === "Result"
                        ? "secondary"
                        : "success"
                    }
                    size="small"
                    style={{ marginBottom: 10 }}
                  />

                  {/* 🔴 NEW badge */}
                  {!isViewed && (
                    <Chip
                      label="NEW"
                      color="error"
                      size="small"
                      style={{ marginLeft: 10 }}
                    />
                  )}

                  {/* 📝 MESSAGE */}
                  <Typography variant="h6">{n.Message}</Typography>

                  {/* 📅 TIME */}
                  <Typography variant="body2" color="text.secondary">
                    {n.Timestamp}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* ❌ No Data */}
      {data.length === 0 && (
        <p style={{ marginTop: 20 }}>❌ No notifications found</p>
      )}

      {/* 🔢 PAGINATION */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 10
        }}
      >
        <Button
          variant="outlined"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          {"<"}
        </Button>

        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant={page === i + 1 ? "contained" : "outlined"}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outlined"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        >
          {">"}
        </Button>
      </div>
    </div>
  );
}