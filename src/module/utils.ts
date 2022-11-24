export interface OptionsType {
    cb?: () => void
    root?: HTMLElement | undefined | null
}

export function setLayout(template: string, options?: OptionsType): void {
    let rootElement = options?.root;

    if (!rootElement) {
        rootElement = document.getElementById('root');
    }

    if (rootElement) {
        rootElement.innerHTML = template;
    }

    if (options?.cb) {
        options.cb?.();
    }
}
