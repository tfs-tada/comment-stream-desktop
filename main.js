const { app: electronApp, BrowserWindow, ipcMain } = require("electron");
const cors = require("cors");
const express = require("express");
const { sseMiddleware } = require("express-sse-middleware");
const app = express();

app.use(express.json());
app.use((_, res, next) => {
  res.set("Access-Control-Allow-Private-Network", "true");
  next();
});
app.use(sseMiddleware);

app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

let clients = [];

app.listen(5100, () => {
  console.log("Server is running on http://localhost:5100");
});

app.post("/comments", (req, res) => {
  const comment = req.body;
  clients.forEach((client) =>
    client.res.write(`data: ${JSON.stringify(comment)}\n\n`)
  );
  res.status(204).end();
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  clients.push({ res });

  req.on("close", () => {
    clients = clients.filter((client) => client.res !== res);
  });
});

const createWindows = () => {
  const mainWin = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      preload: __dirname + "/preload.js",
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });
  mainWin.loadFile("control-window/dist/index.html");

  const commentWin = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    transparent: true,
    ignoreMouseEvents: true,
    webPreferences: {
      preload: __dirname + "/preload.js",
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });
  commentWin.loadFile("comment-window/dist/index.html");
  ipcMain.on("ignore-mouse-events", (_, ignore) => {
    commentWin.setIgnoreMouseEvents(ignore);
  });
  ipcMain.on("always-on-top", (_, alwaysOnTop) => {
    commentWin.setAlwaysOnTop(alwaysOnTop);
  });
  ipcMain.on("sample-message", (_, message) => {
    clients.forEach((client) =>
      client.res.write(`data: ${JSON.stringify({ comment: message })}\n\n`)
    );
  });
  ipcMain.on("transparent", (_, transparent) => {
    // commentWinにsendTransparentイベントを送信
    commentWin.webContents.send("sendTransparent", transparent);
  });
};

electronApp.whenReady().then(() => {
  createWindows();
});
