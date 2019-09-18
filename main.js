const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const platform = process.platform == 'darwin' ? 'MAC' : 'WIN';

let mainWindow; // global reference to window onject. w/o this the windows closes auto during garbage clllection.
let addWindow;

function createWindow(){
  // create new window
  mainWindow = new BrowserWindow({
    width:800,
    height:600,
    icon:__dirname+'/img/slytherin.png',

    webPreferences: {
      nodeIntegration: true
    }

  });
  // Load index.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:', // http?
    slashes: true
  }));

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //  Insert Menu
  Menu.setApplicationMenu(mainMenu)

  mainWindow.on('closed', function(){
    mainWindow = null; // Garbage collection Handle
    app.quit();
  });

}

// Handle add / create window
function createAddWindow(){
  // create new window
  addWindow = new BrowserWindow({
    width:300,
    height:200,
    title:'Add Shopping List Item',
    webPreferences: {
      nodeIntegration: true
    }
  });
  // Load index.html
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:', // http?
    slashes: true
  }));
  // Garbage collection Handle
  addWindow.on('closed', function() {
    addWindow = null;
  });
}


// Begin Script
app.on('ready', createWindow);


//  ** CATCH CRUD  **  //
// catch item:add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close();
});


//  ** MENU TEMPLATES  ** //
const mainMenuTemplate = [
  {
      label:'File',
      submenu:[
        {
          label: 'Add Item',
          click(){
            createAddWindow();
          }
        },
        {
          label: 'Clear Items'
        },
        {
          label: 'Quit',
          accelerator: platform == 'MAC' ? 'Command+Q' : 'Ctrl+Q',
          click() {
            app.quit();
          }
        }
      ]
  }
];

// If Mac, add empty obj to menu
if(platform == 'MAC'){
  mainMenuTemplate.unshift({});
}
// Add DevTools item if not in prod
if(process.env.NODE_ENV !== 'production' ){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        label: 'Toggle DevTools',
        accelerator: platform == 'MAC' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  });

}
// Quite when all windows are closed
app.on('window-all-closed', () => {
  if(platform !== 'MAC'){
    app.quit();
  }
});
