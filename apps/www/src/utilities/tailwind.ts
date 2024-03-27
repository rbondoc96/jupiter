type TailwindStylesConfig = {
    animation?: string;
    background?: string;
    border?: string;
    borderColor?: string;
    margin?: string;
    layout?: string;
    padding?: string;
    positioning?: string;
    shadow?: string;
    textColor?: string;
    textSize?: string;
    textWeight?: string;

    [key: string]: string | undefined;
};

export class TailwindStyles<TStyles extends TailwindStylesConfig = TailwindStylesConfig> {
    private styles: TStyles;

    constructor(styles: TStyles) {
        this.styles = styles;
    }

    public add(key: string, value: string): this {
        return this.override(key, value);
    }

    public appendTo(key: keyof TStyles, value: string): this {
        this.styles[key] = `${this.styles[key]} ${value}` as TStyles[keyof TStyles];
        return this;
    }

    public clear(key: keyof TStyles): this {
        this.styles[key] = undefined as TStyles[keyof TStyles];
        return this;
    }

    public override(key: keyof TStyles, value: string): this {
        this.styles[key] = value as TStyles[keyof TStyles];
        return this;
    }

    public toCssClass(): string {
        return Object.values(this.styles).filter(Boolean).join(' ');
    }
}
