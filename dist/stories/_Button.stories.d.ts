import { TemplateResult } from 'lit';
import '../dist/button';
import { ButtonProps } from '../src/button';
import { Story, Meta } from '@storybook/web-components';
interface IProps extends ButtonProps {
    label: string | TemplateResult;
}
export declare const Default: Story<Partial<IProps>>;
export declare const Disabled: Story<Partial<IProps>>;
export declare const Borderless: Story<Partial<IProps>>;
export declare const Switch: Story<Partial<IProps>>;
export declare const Primary: Story<Partial<IProps>>;
export declare const Success: Story<Partial<IProps>>;
export declare const Error_: Story<Partial<IProps>>;
declare const _default: Meta<import("@storybook/web-components").Args>;
export default _default;
