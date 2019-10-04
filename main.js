const electron = require('electron');
const path = require('path');
const url = require('url');
const {app, BrowserWindow, Menu, ipcMain} = electron;
const platform = process.platform == 'darwin' ? 'MAC' : 'WIN';

let mainWindow; // global reference to window onject. w/o this the windows closes auto during garbage clllection.
let addWindow;

// SET ENV
process.env.NODE_ENV = 'development';

// * TODO * - Inheritance of create window. pass in args for dimensions, etc.
function createWindow(){
  // CREATE new window
  mainWindow = new BrowserWindow({
    width:1050,
    height:600,
    icon:__dirname+'/assets/img/b-logo.png',

    webPreferences: {
      nodeIntegration: true
    }

  });
  // TODO this load url should be a function with the param as the string for the html file to load.
  // this will let us more easily set up inidividual html objects, snippets, etc
  // LOAD index.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:', // http is possible
    slashes: true      // will produce: file://dirname/mainWindow.html
  }));
  // BUILD menu from template // TOP menu bar -> overides the defaults
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
    width:450,
    height:500,
    icon:__dirname+'/assets/img/b-logo.png',
    title:'Add Items',
    webPreferences: {
      nodeIntegration: true
    }
  });
  // Load addWindow.html
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
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
  // Still have a reference to addWindow in memory. Need to reclaim memory (Garbage collection)
  //addWindow = null;
});


//  ** MENU TEMPLATES  ** //
const mainMenuTemplate = [
  {
      label:'File',
      submenu:[
        {
          label: 'Add Item',
          accelerator: platform == 'MAC' ? 'Command+1' : 'Control+1', // These accelerators could be pulled from a yml file, or the DB table.
          click(){
            createAddWindow();
          }
        },
        {
          label: 'Clear Items',
          click(){
            mainWindow.webContents.send('item:clear'); // TODO change: we want remove item and remove all itemS
          }
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

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
