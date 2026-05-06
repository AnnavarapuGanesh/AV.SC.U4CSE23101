const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbm5hdmFyYXB1Z2FuZXNoNDZAZ21haWwuY29tIiwiZXhwIjoxNzc4MDU5MzMwLCJpYXQiOjE3NzgwNTg0MzAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxNWEwYTI0NS0zYjdkLTRlMTAtOTE4Ni0xZmZkMTExMTM2MzIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhbm5hdmFyYXB1IGdhbmVzaCIsInN1YiI6ImFiMGM5ZWE4LTFiZjgtNDQzZi05ZTllLWUzNzA4YjY3NDQzZiJ9LCJlbWFpbCI6ImFubmF2YXJhcHVnYW5lc2g0NkBnbWFpbC5jb20iLCJuYW1lIjoiYW5uYXZhcmFwdSBnYW5lc2giLCJyb2xsTm8iOiJhdi5zYy51NGNzZTIzMTAxXzEiLCJhY2Nlc3NDb2RlIjoiUFRCTW1RIiwiY2xpZW50SUQiOiJhYjBjOWVhOC0xYmY4LTQ0M2YtOWU5ZS1lMzcwOGI2NzQ0M2YiLCJjbGllbnRTZWNyZXQiOiJ5clpZYmZRUFVlem10VHRCIn0.hHfIrE_t5pnvcRhqb8giiIhjHx9ADtf9yw3IkyHjP2Y"; // keep token here

export async function Log(stack, level, pkg, message) {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });
  } catch (err) {
    // logging should never crash app
  }
}