const { ipcMain } = require('electron');

ipcMain.on('getData', (event, args) => {
    console.log('Request received:', args);
    event.reply('dataResponse', { message: 'Hola desde el backend!' });
});
