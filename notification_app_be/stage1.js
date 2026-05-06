import { Log } from "../logging_middleware/log.js";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbm5hdmFyYXB1Z2FuZXNoNDZAZ21haWwuY29tIiwiZXhwIjoxNzc4MDU5MzMwLCJpYXQiOjE3NzgwNTg0MzAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxNWEwYTI0NS0zYjdkLTRlMTAtOTE4Ni0xZmZkMTExMTM2MzIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhbm5hdmFyYXB1IGdhbmVzaCIsInN1YiI6ImFiMGM5ZWE4LTFiZjgtNDQzZi05ZTllLWUzNzA4YjY3NDQzZiJ9LCJlbWFpbCI6ImFubmF2YXJhcHVnYW5lc2g0NkBnbWFpbC5jb20iLCJuYW1lIjoiYW5uYXZhcmFwdSBnYW5lc2giLCJyb2xsTm8iOiJhdi5zYy51NGNzZTIzMTAxXzEiLCJhY2Nlc3NDb2RlIjoiUFRCTW1RIiwiY2xpZW50SUQiOiJhYjBjOWVhOC0xYmY4LTQ0M2YtOWU5ZS1lMzcwOGI2NzQ0M2YiLCJjbGllbnRTZWNyZXQiOiJ5clpZYmZRUFVlem10VHRCIn0.hHfIrE_t5pnvcRhqb8giiIhjHx9ADtf9yw3IkyHjP2Y";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function fetchNotifications() {
  try {
    const res = await fetch("http://20.207.122.201/evaluation-service/notifications", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    console.log("🔍 RESPONSE:", data);

    // ✅ SAFE CHECK (VERY IMPORTANT)
    if (!data || !data.notifications) {
      console.log("❌ No notifications found");
      return [];
    }

    return data.notifications;

  } catch (err) {
    console.log("❌ FETCH ERROR:", err);
    return [];
  }
}

function getTop10(notifications) {
  // ✅ PREVENT CRASH
  if (!notifications || notifications.length === 0) {
    console.log("❌ No data to sort");
    return [];
  }

  notifications.sort((a, b) => {
    const priorityDiff = priorityMap[b.Type] - priorityMap[a.Type];
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });

  return notifications.slice(0, 10);
}

async function main() {
  const notifications = await fetchNotifications();

  // ✅ PREVENT CRASH
  if (!notifications || notifications.length === 0) {
    console.log("❌ API did not return notifications");
    return;
  }

  const top10 = getTop10(notifications);

  console.log("\n✅ TOP 10 NOTIFICATIONS:\n");
  console.table(top10);
}

main();