import React, { useEffect, useState } from "react";
import { fetchNotifications } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid
} from "@mui/material";

// ✅ Priority mapping
const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

export default function Priority() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const loadData = async () => {
    let res = await fetchNotifications(1, 50);

    if (!res || res.length === 0) {
      setData([]);
      return;
    }

    // ✅ Sort by priority + latest time
    res.sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    // ✅ Take top 10
    setData(res.slice(0, 10));
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
      <h2 style={{ color: "#2b6cb0" }}>
        Priority Notifications
      </h2>

      {/* 📦 CARDS GRID */}
      <Grid container spacing={2} style={{ marginTop: 10 }}>
        {data.map((n) => (
          <Grid item xs={12} sm={6} md={3} key={n.ID}>
            <Card
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              <CardContent>
                {/* 🏷️ Type Badge */}
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

                {/* 📝 Message */}
                <Typography variant="h6">
                  {n.Message}
                </Typography>

                {/* 📅 Date */}
                <Typography variant="body2" color="textSecondary">
                  {n.Timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ❌ Empty */}
      {data.length === 0 && (
        <p style={{ marginTop: 20 }}>❌ No notifications found</p>
      )}
    </div>
  );
}