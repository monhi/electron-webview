const { BrowserWindow } = require("@electron/remote");
const ipcRenderer = require('electron').ipcRenderer

window.prompt = function(title, val)
{
	return  ipcRenderer.sendSync('prompt', {title, val});
}

window.navigator.mediaDevices.getDisplayMedia = async function(constraints) 
{
  const selectedSource =  await ipcRenderer.sendSync('select-media');
  // create MediaStream
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: "desktop",
        chromeMediaSourceId: selectedSource.id,
        minWidth: 1280,
        maxWidth: 1280,
        minHeight: 720,
        maxHeight: 720,
      },
    },
  });
  console.log("Stream Info:",stream);
  return stream;
}

window.addEventListener("DOMContentLoaded", () => {
  // Print function
  
	document.getElementById("print_button").addEventListener("click", () => {
    const url = document.querySelector("webview").getAttribute("src");

    let printWindow = new BrowserWindow({ "auto-hide-menu-bar": true });
    printWindow.loadURL(url);

    printWindow.webContents.on("did-finish-load", () => {
      printWindow.webContents.print();
    });
  });
  
});
