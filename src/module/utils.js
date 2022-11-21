export function setLayout(template, options = {}) {
    let rootElement = options.root;

    if (!rootElement) {
        rootElement = document.getElementById("root");
    }

    rootElement.innerHTML = template;

    if (options?.cb) {
        options.cb?.();
    }
}