import { FormFieldConditionOrBool } from '../model/Condition';
import React from 'react';
export declare function ConditionOrBoolComponentV2({ editing, onChange, condition: thisCondition, }: {
    editing?: boolean;
    condition?: FormFieldConditionOrBool | null;
    onChange: (condition: FormFieldConditionOrBool | null) => void;
}): React.JSX.Element;
