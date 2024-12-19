// src/types.d.ts
export {}; // Esto asegura que no haya conflictos de módulos.

declare global {
    interface Window {
        api: {
            send: (channel: string, data: any) => void;
            receive: (channel: string, callback: (...args: any[]) => void) => void;
        };
    }
}
