export type OptionsType = {
    cb?(): void;
    root?: HTMLElement;
};

export function setLayout(template: string, options?: OptionsType) {
    let rootElement = options.root;

    if (!rootElement) {
        rootElement = document.getElementById("root");
    }

    rootElement.innerHTML = template;

    if (options?.cb) {
        options.cb?.();
    }
}
