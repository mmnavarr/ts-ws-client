import http from "http";
import WebSocket, { Data } from "ws";

// Constants
const http_port = 8080;
// const ws_url = "ws://dev.templummarkets.com/api/tp/ws";
const ws_url = "wss://echo.websocket.org";

const server = http.createServer();

const ws = new WebSocket(ws_url);

ws.on("open", () => {
  console.log("Socket opened.");

  // Sockets don't accept headers for authentication like other http requests, so we're using a ticketing system instead
  ws.send(JSON.stringify({ type: "AUTHORIZE", data: { authToken: "FAKE_AUTH_TOKEN" } }));
});

ws.on("message", (data: Data) => console.log("Message: " + data));

ws.on("close", (code: number, reason: string) => console.log(`Socket closed with code (${code}) and reason: ${reason}.`));

ws.on("error", (event: Error) => console.error("Error: " + event));

server.listen(http_port, () => console.log(`Server started on port: ${http_port}`));