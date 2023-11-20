export type FormFieldConditionOrBool = boolean | FormFieldCondition;
export interface FormFieldCondition {
    type: FormFieldConditionType;
    reverse?: boolean;
}
export declare const FormFieldConditionTypes: string[];
export type FormFieldConditionType = (typeof FormFieldConditionTypes)[number];
export interface FormFieldMultipleCondition extends FormFieldCondition {
    type: 'multiple_condition';
    operator: FormFieldMultipleConditionOperator;
    value: FormFieldConditionOrBool[];
}
export declare const FormFieldMultipleConditionOperators: string[];
export type FormFieldMultipleConditionOperator = (typeof FormFieldMultipleConditionOperators)[number];
export declare const FormFieldSingleConditionOperators: string[];
export type FormFieldSingleConditionOperator = (typeof FormFieldSingleConditionOperators)[number];
export interface FormFieldSingleCondition extends FormFieldCondition {
    type: 'single_condition';
    operator: FormFieldSingleConditionOperator;
    field_name: string;
    value: any;
}
export declare function isCondition(conditionOrBool: FormFieldConditionOrBool): conditionOrBool is FormFieldCondition;
export declare function isSingleCondition(condition: FormFieldConditionOrBool): condition is FormFieldSingleCondition;
export declare function isMultipleCondition(condition: FormFieldConditionOrBool): condition is FormFieldMultipleCondition;
export declare function isValidSingleCondition(condition: FormFieldSingleCondition): boolean;
export declare function isValidMultipleCondition(condition: FormFieldMultipleCondition): boolean;
