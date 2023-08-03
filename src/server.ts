import { App } from "@/app";
import { ValidateEnv } from "@utils/validateEnv";
import ExampleRoutes from "./routes/example.route";
import { Server } from "socket.io";
import { CREDENTIALS, ORIGIN } from "./config";

ValidateEnv();

const server = App([ExampleRoutes]); //To Add more routes, add them to the array like this: App([ExampleRoutes, Example2Routes, Example3Routes]);

//SOCKET.IO INITIALIZING
const io = new Server(server, {
  cors: {
    origin: ORIGIN,
    credentials: CREDENTIALS,
  },
});

//SOCKET.IO CONNECTION
io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  io.emit("message", "Hello World!");

  socket.on("disconnect", async () => {
    console.log("user disconnected", socket.id);
  });
});
