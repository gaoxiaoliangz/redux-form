/// <reference types="react" />
import { Component } from 'react';
import * as actions from './actions';
export interface FormConfig {
    form: string;
    fields: string[];
    validate?: (values: any) => any;
    destroyOnUnmount?: boolean;
}
export interface FormProps {
    change: typeof actions.change;
    touch: typeof actions.touch;
    defineField: typeof actions.defineField;
    destroy: typeof actions.destroy;
    form: any;
    formValues: any;
    formMeta: any;
    formDefinition: any;
}
export declare class ElementClass extends Component<any, any> {
}
export interface CreateFormClassDecorator {
    <T extends Function>(config: FormConfig): T;
}
declare const createForm: CreateFormClassDecorator;
export default createForm;
