import { FormFieldConditionOrBool } from "./Condition";
export type FormFieldValidationOrMessage = string | FormFieldValidation;
export interface FormFieldValidation {
    message: string | undefined;
    condition: FormFieldConditionOrBool;
}
export declare function isMessage(validationOrMessage: FormFieldValidationOrMessage): validationOrMessage is string;
export declare function isValidation(validationOrMessage: FormFieldValidationOrMessage): validationOrMessage is FormFieldValidation;
