import { UserController } from './controllers/user.controller';
import { ipcMain } from 'electron';

// Manejar solicitudes para obtener usuarios
ipcMain.handle('get-users', async () => {
  try {
    const users = await UserController.getUsers();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return { error: 'Failed to fetch users' };
  }
});

// Manejar solicitudes para crear usuarios
ipcMain.handle('create-user', async (_event, data: { name: string; email: string; password: string }) => {
  try {
    const newUser = await UserController.createUser(data);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user' };
  }
});
