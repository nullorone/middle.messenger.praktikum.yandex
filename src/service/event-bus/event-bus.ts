export interface IEventBus {
    on: (event: string, callback: CallableFunction) => void
    off: (event: string, callback: () => void) => void
    emit: (event: string, ...args: unknown[]) => void
}

export default class EventBus {
    private readonly listeners: Record<string, CallableFunction[]> = {};

    constructor() {
        this.listeners = {};
    }

    on(event: string, callback: CallableFunction): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: CallableFunction): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback
        );
    }

    emit(event: string, ...args: unknown[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => listener(...args));
    }
}
