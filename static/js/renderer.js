const { ipcRenderer } = require('electron');
const $ = require('jquery');

$(function () {
  let isDragging = false;
  let offset = { x: 0, y: 0 };

  // 鼠标按下时记录鼠标位置和设置拖拽状态
  $(document).on('mousedown',function (e) {
    isDragging = true;
    offset = { x: e.clientX, y: e.clientY };
  });

  // 鼠标移动时计算窗口新位置并通知主进程
  $(document).on('mousemove',function (e) {
    if (isDragging) {
      const newX = e.screenX - offset.x;
      const newY = e.screenY - offset.y;

      // 通知主进程移动窗口
      ipcRenderer.send('move-window', { x: newX, y: newY });
    }
  });

  // 鼠标释放时重置拖拽状态
  $(document).on('mouseup',function () {
    isDragging = false;
  });

  function updateCurrentTime() {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString();
    $('#time').text(formattedTime);
  }

    // 初次加载页面时更新时间
    updateCurrentTime();

    // 每隔一秒更新一次时间
    setInterval(updateCurrentTime, 1000);
});