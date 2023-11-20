import React from 'react';
import { Rule, RuleType } from './model/Rule';
import './style.css';
interface Props {
    ruleId: unknown;
    rule: unknown;
    type: unknown;
}
export default function RuleEditor({ ruleId: propsRuleId, type: propsType, rule: propsRule }: Props): React.JSX.Element;
export interface InternalProps {
    rule: Rule;
    type: RuleType;
    setRule: (rule: Rule) => void;
}
export {};
