const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  sendIgnoreMouseEvents: (ignore) =>
    ipcRenderer.send("ignore-mouse-events", ignore),
  sendAlwaysOnTop: (alwaysOnTop) =>
    ipcRenderer.send("always-on-top", alwaysOnTop),
  sendSampleMessage: (message) => ipcRenderer.send("sample-message", message),
  sendTransparent: (transparent) =>
    ipcRenderer.send("transparent", transparent),
  onMainTransparent: (callback) =>
    ipcRenderer.on("main-transparent", (_event, value) => callback(value)),
  sendExit: () => ipcRenderer.send("exit"),
});

contextBridge.exposeInMainWorld("electronAPI", {});
