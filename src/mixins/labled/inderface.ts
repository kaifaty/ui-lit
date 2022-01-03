import { LitElement } from 'lit';
import { LitLabel } from '../../label/index';

export interface ILabled extends LitElement{
    readonly labels: LitLabel[]
    addLabel(data: LitLabel): void
    removeLabel(data: LitLabel): void
}