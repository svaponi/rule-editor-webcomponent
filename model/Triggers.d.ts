import { FormFieldConditionOrBool } from './Condition';
export interface FormFieldTrigger {
    action: FormFieldTriggerAction;
    condition: FormFieldConditionOrBool;
}
export interface FormFieldTriggerActionBase {
    type: FormFieldTriggerActionType;
}
export declare const FormFieldTriggerActionTypes: string[];
export type FormFieldTriggerActionType = (typeof FormFieldTriggerActionTypes)[number];
export interface FormFieldTriggerActionEval extends FormFieldTriggerActionBase {
    type: 'eval';
    expression: string;
}
export interface FormFieldTriggerActionSetValue extends FormFieldTriggerActionBase {
    type: 'set_value';
    value: any;
}
export interface FormFieldTriggerActionSetTimestamp extends FormFieldTriggerActionBase {
    type: 'set_timestamp';
}
export type FormFieldTriggerAction = FormFieldTriggerActionEval | FormFieldTriggerActionSetValue | FormFieldTriggerActionSetTimestamp;
export declare function isFormFieldTriggerActionEval(action: FormFieldTriggerAction): action is FormFieldTriggerActionEval;
export declare function isFormFieldTriggerActionSetValue(action: FormFieldTriggerAction): action is FormFieldTriggerActionSetValue;
export declare function isFormFieldTriggerActionSetTimestamp(action: FormFieldTriggerAction): action is FormFieldTriggerActionSetTimestamp;
