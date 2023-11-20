import {ConditionOrBoolComponentV2} from './ConditionOrBoolComponentV2';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {
  FormFieldTrigger,
  FormFieldTriggerAction,
  FormFieldTriggerActionType,
  FormFieldTriggerActionTypes,
  isFormFieldTriggerActionEval,
  isFormFieldTriggerActionSetTimestamp,
  isFormFieldTriggerActionSetValue,
} from '../model/Triggers';
import {FormFieldConditionOrBool} from '../model/Condition';
import {SingleValueComponent} from './SingleValueComponent';

export function TriggersComponentV2({
  triggers,
  onChange,
}: {
  triggers: FormFieldTrigger[];
  onChange: (trigger: FormFieldTrigger[]) => void;
}) {
  const [adding, setAdding] = useState<boolean>(false);

  function handleChangeTrigger(newTrigger: FormFieldTrigger | null, oldTrigger: FormFieldTrigger | null) {
    console.log('handleChangeTrigger', newTrigger, oldTrigger);
    if (newTrigger === null && oldTrigger === null) {
      // do nothing
    } else if (newTrigger === null && oldTrigger !== null) {
      onChange([...triggers.filter((c) => c !== oldTrigger)]);
    } else if (newTrigger !== null) {
      const triggerCopy = [...triggers];
      const indexToRemove = triggerCopy.indexOf(oldTrigger);
      if (indexToRemove >= 0) {
        triggerCopy.splice(indexToRemove, 1, newTrigger);
      } else {
        triggerCopy.push(newTrigger);
      }
      onChange(triggerCopy);
    } else {
      throw Error(`unsupported new trigger ${newTrigger}`);
    }
    setAdding(false);
  }

  return (
    <>
      {triggers.map((trigger) => (
        <div key={JSON.stringify(trigger)}>
          <TriggerComponent
            trigger={trigger}
            onChange={(updatedTrigger) => handleChangeTrigger(updatedTrigger, trigger)}
          />
        </div>
      ))}
      {adding && (
        <TriggerComponent
          trigger={{action: {type: 'eval', expression: ''}, condition: null}}
          onChange={(updatedTrigger) => handleChangeTrigger(updatedTrigger, null)}
        />
      )}
      <button disabled={adding} onClick={() => setAdding(true)}>
        {'+'}
      </button>
    </>
  );
}

function TriggerComponent({
  trigger,
  onChange,
}: {
  trigger: FormFieldTrigger;
  onChange: (condition: FormFieldTrigger) => void;
}) {
  function setCondition(condition: FormFieldConditionOrBool | null) {
    onChange({...trigger, condition});
  }

  function setAction(action: FormFieldTriggerAction | null) {
    onChange({...trigger, action});
  }

  function handleDelete() {
    onChange(null);
  }

  return (
    <div className="containerized trigger-container">
      <p className="title action-title">action</p>
      <TriggerActionComponent action={trigger.action} onChange={setAction} />
      <p className="title condition-title">condition</p>
      <ConditionOrBoolComponentV2 condition={trigger.condition} onChange={setCondition} />
      <button onClick={() => handleDelete()}>delete trigger</button>
    </div>
  );
}

function TriggerActionComponent({
  action,
  onChange,
  editing: propsEditing,
}: {
  editing?: boolean;
  action: FormFieldTriggerAction;
  onChange: (condition: FormFieldTriggerAction | null) => void;
}) {
  const [thisAction, setThisAction] = useState<FormFieldTriggerAction>(action);
  const [editing, setEditing] = useState<boolean>(propsEditing ?? false);

  useEffect(() => {
    setThisAction(action);
  }, [action]);

  function handleSave() {
    onChange(thisAction);
    setEditing(false);
  }

  function handleCancel() {
    setThisAction(action);
    setEditing(false);
  }

  function handleDelete() {
    if (window.confirm('You sure?')) {
      onChange(null);
    }
  }

  function setType(type: FormFieldTriggerActionType) {
    console.log('setType', type);
    if (type === 'eval') setThisAction({type, expression: ''});
    else if (type === 'set_value') setThisAction({type, value: ''});
    else if (type === 'set_timestamp') setThisAction({type});
    else throw Error(`unknown type ${type}`);
  }

  function setValue(value: any) {
    console.log('setValue', value);
    setThisAction({type: 'set_value', value});
  }

  function setExpression(expression: string) {
    console.log('setExpression', expression);
    setThisAction({type: 'eval', expression});
  }

  const TypeOptions = FormFieldTriggerActionTypes.map((v) => <option value={v}>{v}</option>);
  const Type = (
    <select name={'type'} value={thisAction.type} onChange={(e) => setType(e.target.value)}>
      <option></option>
      {TypeOptions}
    </select>
  );

  return (
    <div className="containerized action-container">
      {editing ? (
        <>
          {isFormFieldTriggerActionEval(thisAction) ? (
            <span className={'form-container'}>
              type:{Type} expression:
              <textarea
                rows={2}
                style={{width: '60%', display: 'inline-table'}}
                name={'expression'}
                value={thisAction.expression}
                onChange={(e) => setExpression(e.target.value)}
              />
            </span>
          ) : isFormFieldTriggerActionSetValue(thisAction) ? (
            <span className={'form-container'}>
              type:{Type} value:
              <SingleValueComponent value={thisAction.value} setValue={setValue} />
            </span>
          ) : isFormFieldTriggerActionSetTimestamp(thisAction) ? (
            <span className={'form-container'}>type:{Type}</span>
          ) : (
            <span className={'form-container'}>unknown action {JSON.stringify(thisAction)}</span>
          )}
          <button onClick={() => handleCancel()}>cancel</button>
          <button onClick={() => handleSave()}>save</button>
        </>
      ) : (
        <>
          <span className={'json-container'}>{JSON.stringify(thisAction)}</span>
          <button onClick={() => setEditing(true)}>edit</button>
          <button onClick={() => handleDelete()}>delete</button>
        </>
      )}
    </div>
  );
}
