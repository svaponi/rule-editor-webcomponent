import {ConditionOrBoolComponentV2} from './ConditionOrBoolComponentV2';
import React, {useEffect, useState} from 'react';
import {FormFieldTrigger, FormFieldTriggerAction} from '../model/Triggers';
import {FormFieldConditionOrBool} from '../model/Condition';

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
  const [thisActionAsString, setThisActionAsString] = useState<string>(JSON.stringify(action));
  const [editing, setEditing] = useState<boolean>(propsEditing ?? false);

  useEffect(() => {
    setThisActionAsString(JSON.stringify(action));
  }, [action]);

  function handleSave() {
    onChange(JSON.parse(thisActionAsString));
    setEditing(false);
  }

  function handleCancel() {
    setThisActionAsString(JSON.stringify(action));
    setEditing(false);
  }

  function handleDelete() {
    if (window.confirm('You sure?')) {
      onChange(null);
    }
  }

  return (
    <div className="containerized action-container">
      {editing ? (
        <>
          <span className={'form-container'}>
            <textarea value={thisActionAsString} onChange={(e) => setThisActionAsString(e.target.value)} />
          </span>
          <button onClick={() => handleCancel()}>cancel</button>
          <button onClick={() => handleSave()}>save</button>
        </>
      ) : (
        <>
          <span className={'json-container'}>{thisActionAsString}</span>
          <button onClick={() => setEditing(true)}>edit</button>
          <button onClick={() => handleDelete()}>delete</button>
        </>
      )}
    </div>
  );
}
