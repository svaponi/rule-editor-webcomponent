import { FormFieldConditionOrBool } from './Condition';
export interface FormFieldTrigger {
    action: FormFieldTriggerAction;
    condition: FormFieldConditionOrBool;
}
export interface FormFieldTriggerActionBase {
    type: FormFieldTriggerActionType;
}
export type FormFieldTriggerActionType = 'eval' | 'set_value' | 'set_timestamp';
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
