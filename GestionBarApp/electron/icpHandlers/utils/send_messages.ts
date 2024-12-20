import { IpcMainEvent } from 'electron';


function handleGetData(event: IpcMainEvent) {
    console.log('Manejando solicitud de datos');
    event.reply('receive-reply', 'Aquí están los datos solicitados');
}

function handleSaveData(event: IpcMainEvent) {
    console.log('Manejando guardado de datos');
    event.reply('receive-reply', 'Datos guardados correctamente');
}

function handleDefaultMessage(event: IpcMainEvent, message: string) {
    console.log('Manejando mensaje por defecto:', message);
    event.reply('receive-reply', `Mensaje recibido: ${message}`);
}

export function hanldleSendMessage(event: IpcMainEvent, message: string) {
    console.log('Mensaje recibido en el proceso principal:', message);

    switch (message) {
        case 'get-data':
            handleGetData(event);
            break;
        case 'save-data':
            handleSaveData(event);
            break;
        default:
            handleDefaultMessage(event, message);
    }
}