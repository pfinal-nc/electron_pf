const { app, BrowserWindow,ipcMain } = require('electron')
let win;
const createWindow = () => {
  const win = new BrowserWindow({
    width: 700,
    height: 150,
    frame:false,
    transparent:true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  })

  win.loadFile('index.html')
  // win.openDevTools()
 // 监听渲染进程的消息，移动窗口
 ipcMain.on('move-window', (event, { x, y }) => {
  win.setPosition(x, y, true);
});
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  } else {
    win.close()
  }
})