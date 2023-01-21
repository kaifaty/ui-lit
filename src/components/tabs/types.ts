import type {TemplateResult} from 'lit'

export type TabType = 'button' | 'tab';
export type Tab = {
    value: string;
    text: string | TemplateResult;
    icon?: string | TemplateResult;
}
