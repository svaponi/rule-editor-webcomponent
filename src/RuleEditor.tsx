import React, {useEffect, useState} from 'react';
import {ConditionOrBoolComponentV2} from './components/ConditionOrBoolComponentV2';
import {ValidationOrMessageComponentV2, ValidationsComponentV2} from './components/ValidationOrMessageComponentV2';
import {TriggersComponentV2} from './components/TriggerComponentV2';
import {FormFieldConditionOrBool} from './model/Condition';
import {FormFieldValidationOrMessage} from './model/Validation';
import {FormFieldTrigger} from './model/Triggers';
import {Rule, RuleType} from './model/Rule';
import './style.css';
import {ErrorBoundary} from './components/ErrorBoundary';

interface Props {
  ruleId: unknown;
  rule: unknown;
  type: unknown;
}

export default function RuleEditor({ruleId: propsRuleId, type: propsType, rule: propsRule}: Props) {
  console.log('RuleEditor is rendered', propsRuleId, propsType, propsRule);
  const [ruleId, setRuleId] = useState<string>();
  const [rule, setRule] = useState<Rule | undefined | null>();
  const [type, setType] = useState<RuleType | undefined | null>();

  useEffect(() => {
    if (propsRuleId == undefined) return;
    else if (typeof propsRuleId === 'string') setRuleId(propsRuleId);
    else if (typeof propsRuleId === 'number') setRuleId(`${propsRuleId}`);
    else throw Error('invalid ruleId ' + propsRuleId);
  }, [propsRuleId]);

  useEffect(() => {
    if (propsRule == undefined) return;
    else if (typeof propsRule === 'string') setRule(JSON.parse(propsRule));
    else if (typeof propsRule === 'object') setRule(propsRule as Rule);
    else if (typeof propsRule === 'boolean') setRule(propsRule);
    else throw Error('invalid rule ' + propsRule);
  }, [propsRule]);

  useEffect(() => {
    if (propsType == undefined) return;
    else if (propsType === 'hidden') setType(propsType);
    else if (propsType === 'disabled') setType(propsType);
    else if (propsType === 'required') setType(propsType);
    else if (propsType === 'validations') setType(propsType);
    else if (propsType === 'triggers') setType(propsType);
    else throw Error('invalid type ' + propsType);
  }, [propsType]);

  useEffect(() => {
    if (rule) {
      if (ruleId) {
        window.dispatchEvent(new CustomEvent(`RuleEditor-${ruleId}-RuleChangeEvent`, {detail: JSON.stringify(rule)}));
      } else {
        window.dispatchEvent(new CustomEvent('RuleEditor-RuleChangeEvent', {detail: JSON.stringify(rule)}));
      }
    }
  }, [rule, ruleId]);

  return (
    <div className="rule-editor" id={'rule-editor-' + ruleId}>
      <h3>
        <code>{type}</code>
      </h3>
      {rule === undefined ? (
        <span>
          <code>undefined</code>
        </span>
      ) : rule === null ? (
        <span>
          <code>null</code>
        </span>
      ) : type === undefined || type === null ? (
        <span>
          invalid <code>type</code>
        </span>
      ) : (
        <ErrorBoundary>
          <RuleEditorInternal rule={rule} type={type} setRule={setRule} />
        </ErrorBoundary>
      )}
    </div>
  );
}

export interface InternalProps {
  rule: Rule;
  type: RuleType;
  setRule: (rule: Rule) => void;
}

function RuleEditorInternal({rule, type, setRule}: InternalProps) {
  console.log('RuleEditorInternal is rendered', type, rule);
  if (type === 'hidden' || type === 'disabled') {
    const condition = rule as FormFieldConditionOrBool;
    return <ConditionOrBoolComponentV2 condition={condition} onChange={setRule} />;
  }
  if (type === 'required') {
    const validation = rule as FormFieldValidationOrMessage;
    return <ValidationOrMessageComponentV2 validation={validation} onChange={setRule} />;
  }
  if (type === 'validations') {
    const validations = rule as FormFieldValidationOrMessage[];
    return <ValidationsComponentV2 validations={validations} onChange={setRule} />;
  }
  if (type === 'triggers') {
    const triggers = rule as FormFieldTrigger[];
    return <TriggersComponentV2 triggers={triggers} onChange={setRule} />;
  }
  return <pre>unknown type {type}</pre>;
}
