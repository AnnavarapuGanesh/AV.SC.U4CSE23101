import axios from "axios";

// ✅ USE FULL URL (NO PROXY ISSUES)
const BASE_URL = "/evaluation-service";

// ✅ YOUR TOKEN (keep it updated)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbm5hdmFyYXB1Z2FuZXNoNDZAZ21haWwuY29tIiwiZXhwIjoxNzc4MDY0MDM2LCJpYXQiOjE3NzgwNjMxMzYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIwN2Y2NzNmOS00NzBmLTRmZjgtYjljOC1kMjZlY2ZjMTA2ZmYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhbm5hdmFyYXB1IGdhbmVzaCIsInN1YiI6ImFiMGM5ZWE4LTFiZjgtNDQzZi05ZTllLWUzNzA4YjY3NDQzZiJ9LCJlbWFpbCI6ImFubmF2YXJhcHVnYW5lc2g0NkBnbWFpbC5jb20iLCJuYW1lIjoiYW5uYXZhcmFwdSBnYW5lc2giLCJyb2xsTm8iOiJhdi5zYy51NGNzZTIzMTAxXzEiLCJhY2Nlc3NDb2RlIjoiUFRCTW1RIiwiY2xpZW50SUQiOiJhYjBjOWVhOC0xYmY4LTQ0M2YtOWU5ZS1lMzcwOGI2NzQ0M2YiLCJjbGllbnRTZWNyZXQiOiJ5clpZYmZRUFVlem10VHRCIn0.60Ybb2gcVNM4051bK4DCesWXBJASSs4nkbFj4H_UiPM";

export const fetchNotifications = async (page = 1, limit = 10, type = "") => {
  try {
    const res = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    console.log("FULL API RESPONSE:", res.data);

    let notifications = res.data?.notifications || [];

    // ✅ FILTER
    if (type) {
      notifications = notifications.filter((n) => n.Type === type);
    }

    // ✅ SORT (important for better UX)
    notifications.sort(
      (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
    );

    // ✅ PAGINATION (frontend)
    const start = (page - 1) * limit;
    const end = start + limit;

    return notifications.slice(start, end);

  } catch (err) {
    console.error("❌ API ERROR:", err.response?.data || err.message);
    return [];
  }
};