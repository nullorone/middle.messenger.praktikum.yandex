declare module '*.hbs' {
    import { TemplateDelegate } from 'handlebars';
    declare const template: TemplateDelegate;

    export default template;
}

declare module 'handlebars/dist/handlebars.runtime' {
    declare const options: {
        registerPartial: (string, string) => void
    };

    export default options;
}
