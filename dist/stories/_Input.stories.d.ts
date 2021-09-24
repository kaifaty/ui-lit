import { TemplateResult } from 'lit';
import '../dist/text-field';
import { TextProps } from '../src/text-field';
import { Story, Meta } from '@storybook/web-components';
import './assets/style.css';
interface IProps extends TextProps {
    label: string | TemplateResult;
}
export declare const Default: Story<Partial<IProps>>;
export declare const CancalableIcon: Story<Partial<IProps>>;
declare const _default: Meta<import("@storybook/web-components").Args>;
export default _default;
