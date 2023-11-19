export type FormFieldConditionOrBool = boolean | FormFieldCondition;

export interface FormFieldCondition {
  type: FormFieldConditionType;
  reverse?: boolean;
}

export const FormFieldConditionTypes = ['single_condition', 'multiple_condition'];

export type FormFieldConditionType = (typeof FormFieldConditionTypes)[number];

export interface FormFieldMultipleCondition extends FormFieldCondition {
  type: 'multiple_condition';
  operator: FormFieldMultipleConditionOperator;
  value: FormFieldConditionOrBool[];
}

export const FormFieldMultipleConditionOperators = ['and', 'or'];

export type FormFieldMultipleConditionOperator = (typeof FormFieldMultipleConditionOperators)[number];

export const FormFieldSingleConditionOperators = [
  'eval',
  'regex',
  'equal',
  'equal_ignore_case',
  'is_blank',
  'is_not_blank',
  'is_valid_type',
  'max_length',
  'max_length_relative',
  'min_length',
  'min_length_relative',
  'greater_than',
  'greater_than_relative',
  'greater_than_or_equal',
  'greater_than_or_equal_relative',
  'less_than',
  'less_than_relative',
  'less_than_or_equal',
  'less_than_or_equal_relative',
];

export type FormFieldSingleConditionOperator = (typeof FormFieldSingleConditionOperators)[number];

export interface FormFieldSingleCondition extends FormFieldCondition {
  type: 'single_condition';
  operator: FormFieldSingleConditionOperator;
  field_name: string;
  value: any;
}

export function isCondition(conditionOrBool: FormFieldConditionOrBool): conditionOrBool is FormFieldCondition {
  return typeof conditionOrBool !== 'boolean';
}

export function isSingleCondition(condition: FormFieldConditionOrBool): condition is FormFieldSingleCondition {
  return isCondition(condition) && condition.type === 'single_condition';
}

export function isMultipleCondition(condition: FormFieldConditionOrBool): condition is FormFieldMultipleCondition {
  return isCondition(condition) && condition.type === 'multiple_condition';
}

export function isValidSingleCondition(condition: FormFieldSingleCondition) {
  return (
    condition.type === 'single_condition' &&
    condition.operator &&
    FormFieldSingleConditionOperators.includes(condition.operator) &&
    condition.field_name &&
    condition.field_name.trim() !== ''
  );
}

export function isValidMultipleCondition(condition: FormFieldMultipleCondition) {
  return (
    condition.type === 'multiple_condition' &&
    condition.operator &&
    FormFieldMultipleConditionOperators.includes(condition.operator) &&
    Array.isArray(condition.value)
  );
}
