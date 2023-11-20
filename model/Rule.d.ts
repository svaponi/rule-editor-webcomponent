import { FormFieldConditionOrBool } from './Condition';
import { FormFieldValidationOrMessage } from './Validation';
import { FormFieldTrigger } from './Triggers';
export type RuleType = 'hidden' | 'disabled' | 'required' | 'validations' | 'triggers';
export type Rule = FormFieldConditionOrBool | FormFieldValidationOrMessage | FormFieldValidationOrMessage[] | FormFieldTrigger[];
