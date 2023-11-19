import {FormFieldConditionOrBool} from "./Condition";


export type FormFieldValidationOrMessage = string | FormFieldValidation;

export interface FormFieldValidation {
    message: string | undefined;
    condition: FormFieldConditionOrBool;
}

export function isMessage(validationOrMessage: FormFieldValidationOrMessage): validationOrMessage is string {
    return typeof validationOrMessage === 'string';
}

export function isValidation(validationOrMessage: FormFieldValidationOrMessage): validationOrMessage is FormFieldValidation {
    return !isMessage(validationOrMessage);
}
