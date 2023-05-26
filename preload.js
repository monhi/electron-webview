const { BrowserWindow } = require("@electron/remote");
const ipcRenderer = require('electron').ipcRenderer


window.prompt = function(title, val)
{
	return  ipcRenderer.sendSync('prompt', {title, val});
}

/*
window.navigator.mediaDevices.getDisplayMedia =function (constraints) 
{
	if (!(constraints && constraints.video)) 
	{
		const err = new DOMException('getDisplayMedia without video ' +	'constraints is undefined');
		err.name = 'NotFoundError';
		err.code = 8;
		return Promise.reject(err);
    }
  
    const preferredMediaSource = ipcRenderer.sendSync('select-media');
  
  
  if (constraints.video === true) 
  {
	constraints.video = {mediaSource: preferredMediaSource};
  } 
  else 
  {
	constraints.video.mediaSource = preferredMediaSource;
  }
  return navigator.mediaDevices.getUserMedia(constraints);
};
*/



navigator.mediaDevices.getDisplayMedia = function (window, preferredMediaSource) 
{
  const selectedSource = ipcRenderer.sendSync('select-media');
	console.log("MONHI:",selectedSource);
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
  return stream;
};





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
