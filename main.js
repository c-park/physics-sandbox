const electron = require('electron');
const url = require('url');
const path = require('path');
const config = require(path.join(__dirname, 'package.json'));

const {app, BrowserWindow, Menu, ipcMain} = electron;

// SET ENV
process.env.NODE_ENV = 'development';

let mainWindow;
let addWindow;

// Listen for app to be ready
app.setName(config.productName);
app.on('ready', () => {
    // create new window
    mainWindow = new BrowserWindow({
        title: config.productName,
        width: 1920,
        height: 1080
    });
    // load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Quit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    })

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert meu
    Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow(){
   // create new window
   addWindow = new BrowserWindow({
       width: 300,
       height: 200,
       title: 'Add Shopping List Item'
   });
   // load html into window
   addWindow.loadURL(url.format({
       pathname: path.join(__dirname, 'addWindow.html'),
       protocol: 'file:',
       slashes: true
   }));
   // Garbage collection handle
   addWindow.on('close', () => {
       addWindow = null;
   });
}

// Catch item:add
ipcMain.on('item:add', (e, item) => {
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
})


// Create menu template
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
                label: 'Clear Items',
                click(){
                    mainWindow.webContents.send('item:clear');
                }
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]

    }
];

// if mac, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

// Add developer tools if not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                   focusedWindow.toggleDevTools(); 
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}