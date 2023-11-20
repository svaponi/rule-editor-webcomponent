import { FormFieldValidationOrMessage } from '../model/Validation';
import React from 'react';
export declare function ValidationsComponentV2({ validations, onChange, }: {
    validations: FormFieldValidationOrMessage[];
    onChange: (trigger: FormFieldValidationOrMessage[]) => void;
}): React.JSX.Element;
export declare function ValidationOrMessageComponentV2({ validation, onChange, }: {
    validation: FormFieldValidationOrMessage;
    onChange: (trigger: FormFieldValidationOrMessage) => void;
}): React.JSX.Element;
