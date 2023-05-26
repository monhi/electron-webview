// Electron
const { app, Menu, desktopCapturer , BrowserWindow} = require("electron");
const remoteMain = require("@electron/remote/main");
const prompt = require('electron-prompt');

remoteMain.initialize();

const electron = require('electron');
const ipcMain = electron.ipcMain

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
	app.allowRendererProcessReuse = true;

app.on('web-contents-created', function (webContentsCreatedEvent, contents) {
  if (contents.getType() === 'webview') {
    contents.on('new-window', function (newWindowEvent, url) {
      console.log('block');
      //newWindowEvent.preventDefault();
      mainWindow.loadURL(url);
    });
  }
});

app.on("ready", () => {
  // Main window
  const window = require("./src/window");
  mainWindow = window.createBrowserWindow(app);
  remoteMain.enable(mainWindow.webContents);

  // Option 1: Uses Webtag and load a custom html file with external content
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Option 2: Load directly an URL if you don't need interface customization
  //mainWindow.loadURL("https://github.com");
  // Option 3: Uses BrowserView to load an URL
  //const view = require("./src/view");
  //view.createBrowserView(mainWindow);
  // Display Dev Tools
  mainWindow.openDevTools();
  // Menu (for standard keyboard shortcuts)
  const menu = require("./src/menu");
  const template = menu.createTemplate(app.name);
  const builtMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(builtMenu);
  
  ipcMain.on('select-media', (eventRet, arg)=>
  {
	let selectedSource;
	desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
	  for (const source of sources) 
	  {
		selectedSource = source;			
	  }
	  eventRet.returnValue = selectedSource;
	})	  
  })
  
  ipcMain.on('prompt', (eventRet, arg)=>
  {

	prompt({		
		title: arg.title,
		width:  300,
		height: 200,
		label: 'Message',		
		alwaysOnTop:true,
		resizable:false,
		type: 'input'
	})
	.then((r) => {
		if(r === null)
		{
			eventRet.returnValue = "";
			console.log('user cancelled');			
		} 
		else 
		{
			eventRet.returnValue = r;
			console.log('Result di:', r);
		}
	})
	.catch(console.log);
  })

});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});


