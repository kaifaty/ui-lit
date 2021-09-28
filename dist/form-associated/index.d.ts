import { LitElement } from 'lit';
import type { FormAssociatedElement } from './interface';
import '../note';
declare type Constructor<T> = new (...args: any[]) => T;
export declare const formAssociated: <T extends Constructor<LitElement>>(superClass: T) => Constructor<FormAssociatedElement> & T;
export {};
