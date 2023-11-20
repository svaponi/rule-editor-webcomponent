import {
  FormFieldCondition,
  FormFieldConditionOrBool,
  FormFieldMultipleCondition,
  FormFieldSingleCondition,
} from './Condition';

export interface FormFieldTrigger {
  action: FormFieldTriggerAction;
  condition: FormFieldConditionOrBool;
}

export interface FormFieldTriggerActionBase {
  type: FormFieldTriggerActionType;
}

export const FormFieldTriggerActionTypes = ['eval', 'set_value', 'set_timestamp'];
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

export type FormFieldTriggerAction =
  | FormFieldTriggerActionEval
  | FormFieldTriggerActionSetValue
  | FormFieldTriggerActionSetTimestamp;

export function isFormFieldTriggerActionEval(action: FormFieldTriggerAction): action is FormFieldTriggerActionEval {
  return action?.type && typeof action?.type === 'string' && action.type === 'eval';
}

export function isFormFieldTriggerActionSetValue(
  action: FormFieldTriggerAction,
): action is FormFieldTriggerActionSetValue {
  return action?.type && typeof action?.type === 'string' && action.type === 'set_value';
}

export function isFormFieldTriggerActionSetTimestamp(
  action: FormFieldTriggerAction,
): action is FormFieldTriggerActionSetTimestamp {
  return action?.type && typeof action?.type === 'string' && action.type === 'set_timestamp';
}
