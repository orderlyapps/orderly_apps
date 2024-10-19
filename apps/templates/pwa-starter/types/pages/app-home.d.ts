import { LitElement } from 'lit';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
export declare class AppHome extends LitElement {
    message: string;
    static styles: import("lit").CSSResult[];
    firstUpdated(): Promise<void>;
    share(): void;
    render(): import("lit").TemplateResult<1>;
}
