import {FormFieldValidation, FormFieldValidationOrMessage, isValidation} from '../model/Validation';
import {ConditionOrBoolComponentV2} from './ConditionOrBoolComponentV2';
import React, {useEffect, useState} from 'react';
import {FormFieldConditionOrBool} from '../model/Condition';

export function ValidationsComponentV2({
  validations,
  onChange,
}: {
  validations: FormFieldValidationOrMessage[];
  onChange: (trigger: FormFieldValidationOrMessage[]) => void;
}) {
  const [adding, setAdding] = useState<boolean>(false);

  function handleChangeValidation(
    newValidation: FormFieldValidationOrMessage | null,
    oldValidation: FormFieldValidationOrMessage | null,
  ) {
    console.log('handleChangeValidation', newValidation, oldValidation);
    if (newValidation === null && oldValidation === null) {
      // do nothing
    } else if (newValidation === null && oldValidation !== null) {
      onChange([...validations.filter((c) => c !== oldValidation)]);
    } else if (newValidation !== null) {
      const triggerCopy = [...validations];
      const indexToRemove = triggerCopy.indexOf(oldValidation);
      if (indexToRemove >= 0) {
        triggerCopy.splice(indexToRemove, 1, newValidation);
      } else {
        triggerCopy.push(newValidation);
      }
      onChange(triggerCopy);
    } else {
      throw Error(`unsupported new validation ${newValidation}`);
    }
    setAdding(false);
  }

  return (
    <>
      {validations.map((validation) => (
        <div key={JSON.stringify(validation)}>
          <ValidationOrMessageComponentV2
            validation={validation}
            onChange={(updated) => handleChangeValidation(updated, validation)}
          />
        </div>
      ))}
      {adding && (
        <ValidationOrMessageComponentV2
          validation={{message: '', condition: null}}
          onChange={(updated) => handleChangeValidation(updated, null)}
        />
      )}
      <button disabled={adding} onClick={() => setAdding(true)}>
        {'+'}
      </button>
    </>
  );
}

export function ValidationOrMessageComponentV2({
  validation,
  onChange,
}: {
  validation: FormFieldValidationOrMessage;
  onChange: (trigger: FormFieldValidationOrMessage) => void;
}) {
  return isValidation(validation) ? (
    <ValidationComponentV2 validation={validation} onChange={onChange} />
  ) : (
    <MessageComponent message={validation} onChange={onChange} />
  );
}

function ValidationComponentV2({
  validation,
  onChange,
}: {
  validation: FormFieldValidation;
  onChange: (validation: FormFieldValidation) => void;
}) {
  function setCondition(condition: FormFieldConditionOrBool | null) {
    onChange({...validation, condition});
  }

  function setMessage(message: string | undefined) {
    onChange({...validation, message});
  }

  function handleDelete() {
    onChange(null);
  }

  return (
    <div className="containerized validation-container">
      <p className="title message-title">message</p>
      <MessageComponent message={validation.message} onChange={setMessage} />
      <p className="title condition-title">condition</p>
      <ConditionOrBoolComponentV2 condition={validation.condition} onChange={setCondition} />
      <button onClick={() => handleDelete()}>delete validation</button>
    </div>
  );
}

function MessageComponent({
  message,
  onChange,
  editing: propsEditing,
}: {
  editing?: boolean;
  message: string;
  onChange: (message: string | null) => void;
}) {
  const [thisMessage, setThisMessage] = useState<string>(message);
  const [editing, setEditing] = useState<boolean>(propsEditing ?? false);

  useEffect(() => {
    setThisMessage(message);
  }, [message]);

  function handleSave() {
    onChange(thisMessage);
    setEditing(false);
  }

  function handleCancel() {
    setThisMessage(message);
    setEditing(false);
  }

  function handleDelete() {
    if (window.confirm('You sure?')) {
      onChange(null);
    }
  }

  return (
    <div className="containerized message-container">
      {editing ? (
        <>
          <span className={'form-container'}>
            <textarea value={thisMessage} onChange={(e) => setThisMessage(e.target.value)} />
          </span>
          <button onClick={() => handleCancel()}>cancel</button>
          <button onClick={() => handleSave()}>save</button>
        </>
      ) : (
        <>
          <span className={'json-container'}>{JSON.stringify(thisMessage)}</span>
          <button onClick={() => setEditing(true)}>edit</button>
          <button onClick={() => handleDelete()}>delete</button>
        </>
      )}
    </div>
  );
}
