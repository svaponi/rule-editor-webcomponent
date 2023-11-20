import {
  FormFieldConditionOrBool,
  FormFieldConditionType,
  FormFieldConditionTypes,
  FormFieldMultipleCondition,
  FormFieldMultipleConditionOperators,
  FormFieldSingleCondition,
  FormFieldSingleConditionOperators,
  isCondition,
  isMultipleCondition,
  isSingleCondition,
  isValidMultipleCondition,
  isValidSingleCondition,
} from '../model/Condition';

import React, {ChangeEvent, useEffect, useState} from 'react';
import {SingleValueComponent} from './SingleValueComponent';

export function ConditionOrBoolComponentV2({
  editing,
  onChange,
  condition: thisCondition,
}: {
  editing?: boolean;
  condition?: FormFieldConditionOrBool | null;
  onChange: (condition: FormFieldConditionOrBool | null) => void;
}) {
  console.log('ConditionOrBoolComponentV2 is rendered', {thisCondition});

  if (thisCondition === undefined || thisCondition === null) {
    return <NewConditionComponent onChange={onChange} />;
  }

  if (!isCondition(thisCondition)) {
    return <BooleanConditionComponent condition={thisCondition} editing={editing} onChange={onChange} />;
  }

  if (isSingleCondition(thisCondition)) {
    return <SingleConditionComponent condition={thisCondition} editing={editing} onChange={onChange} />;
  }

  if (isMultipleCondition(thisCondition)) {
    return <MultipleConditionComponent condition={thisCondition} editing={editing} onChange={onChange} />;
  }

  return (
    <div className="containerized condition-container unknown">
      <span className={'json-container'}>{JSON.stringify(thisCondition)}</span>
    </div>
  );
}

function BooleanConditionComponent({
  condition,
  onChange,
  editing: propsEditing,
}: {
  editing?: boolean;
  condition: boolean;
  onChange: (condition: FormFieldConditionOrBool | null) => void;
}) {
  const [thisBooleanCondition, setThisBooleanCondition] = useState<boolean>(condition);
  const [editing, setEditing] = useState<boolean>(propsEditing ?? false);

  useEffect(() => {
    setThisBooleanCondition(condition);
  }, [condition]);

  function handleSave() {
    onChange(thisBooleanCondition);
    setEditing(false);
  }

  function handleCancel() {
    setThisBooleanCondition(condition);
    setEditing(false);
  }

  function handleDelete() {
    if (window.confirm('You sure?')) {
      onChange(null);
    }
  }

  return (
    <div className="containerized condition-container boolean-condition">
      {editing ? (
        <>
          <span className={'form-container'}>
            <input
              type={'checkbox'}
              checked={thisBooleanCondition}
              onChange={(e) => setThisBooleanCondition(e.target.checked)}
            />
          </span>
          <button onClick={() => handleCancel()}>cancel</button>
          <button onClick={() => handleSave()}>save</button>
        </>
      ) : (
        <>
          <span className={'json-container'}>{JSON.stringify(thisBooleanCondition)}</span>
          <button onClick={() => setEditing(true)}>edit</button>
          <button onClick={() => handleDelete()}>delete</button>
        </>
      )}
    </div>
  );
}

const newSingle: FormFieldSingleCondition = {
  type: 'single_condition',
  field_name: '',
  operator: undefined,
  value: undefined,
};
const newMultiple: FormFieldMultipleCondition = {type: 'multiple_condition', operator: undefined, value: []};

function NewConditionComponent({onChange}: {onChange: (condition: FormFieldConditionOrBool | null) => void}) {
  const [type, setType] = useState<FormFieldConditionType>(FormFieldConditionTypes[0]);

  function handleConfirm() {
    onChange(type === 'multiple_condition' ? newMultiple : newSingle);
  }

  return (
    <div className="containerized condition-container new-condition">
      <select name={'type'} value={type} onChange={(e) => setType(e.target.value)}>
        {FormFieldConditionTypes.map((v) => (
          <option value={v}>{v}</option>
        ))}
      </select>
      <button onClick={() => handleConfirm()}>confirm</button>
    </div>
  );
}

function SingleConditionComponent({
  onChange,
  condition,
  editing: propsEditing,
}: {
  editing?: boolean;
  condition: FormFieldSingleCondition;
  onChange: (condition: FormFieldConditionOrBool | null) => void;
}) {
  const [thisSimpleCondition, setThisSimpleCondition] = useState<FormFieldSingleCondition>(condition);
  const [editing, setEditing] = useState<boolean>(propsEditing ?? false);

  console.log('SingleConditionComponent is rendered', thisSimpleCondition);

  useEffect(() => {
    setThisSimpleCondition(condition);
  }, [condition]);

  function handleSave() {
    onChange(thisSimpleCondition);
    setEditing(false);
  }

  function handleCancel() {
    setThisSimpleCondition(condition);
    setEditing(false);
  }

  function handleDelete() {
    if (window.confirm('You sure?')) {
      onChange(null);
    }
  }

  function setValue(value: any) {
    console.log('setValue', value);
    setThisSimpleCondition((prev) => ({...prev, value}));
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    console.log('handleChange', event.target.name, event.target.value);
    setThisSimpleCondition((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleCheck(event: ChangeEvent<HTMLInputElement>) {
    console.log('handleCheck', event.target.name, event.target.checked);
    setThisSimpleCondition((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  }

  const Type = <input type={'text'} name={'type'} value={thisSimpleCondition.type} disabled={true} />;
  const FieldName = (
    <input type={'text'} name={'field_name'} value={thisSimpleCondition.field_name} onChange={handleChange} />
  );
  const OperatorOptions = FormFieldSingleConditionOperators.map((v) => <option value={v}>{v}</option>);
  const Operator = (
    <select name={'operator'} value={thisSimpleCondition.operator} onChange={handleChange}>
      <option></option>
      {OperatorOptions}
    </select>
  );
  const Value = <SingleValueComponent value={thisSimpleCondition.value} setValue={setValue} />;
  const Reverse = (
    <input type={'checkbox'} name={'reverse'} checked={thisSimpleCondition.reverse} onChange={handleCheck} />
  );

  const isValid = isValidSingleCondition(thisSimpleCondition);
  const isValidClass = isValid ? 'valid' : 'invalid';

  return (
    <div className={`containerized condition-container ${isValidClass} single-condition`}>
      {editing ? (
        <>
          <span className="form-container">
            type:{Type} field_name:{FieldName} operator:{Operator} value:{Value} reverse:{Reverse}
          </span>
          <button onClick={() => handleCancel()}>cancel</button>
          <button disabled={!isValid} onClick={() => handleSave()}>
            save
          </button>
        </>
      ) : (
        <>
          <span className={'json-container'}>{JSON.stringify(thisSimpleCondition)}</span>
          <button onClick={() => setEditing(true)}>edit</button>
          <button onClick={() => handleDelete()}>delete</button>
        </>
      )}
    </div>
  );
}

function MultipleConditionComponent({
  onChange,
  condition,
  editing: propsEditing,
}: {
  editing?: boolean;
  condition: FormFieldMultipleCondition;
  onChange: (condition: FormFieldConditionOrBool | null) => void;
}) {
  const [thisMultipleCondition, setThisMultipleCondition] = useState<FormFieldMultipleCondition>(condition);
  const [adding, setAdding] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(propsEditing);

  console.log('MultipleConditionComponent is rendered', thisMultipleCondition);

  useEffect(() => {
    setThisMultipleCondition(condition);
  }, [condition]);

  function handleSave() {
    onChange(thisMultipleCondition);
    setEditing(false);
  }

  function handleCancel() {
    setThisMultipleCondition(condition);
    setEditing(false);
  }

  function handleDelete() {
    if (window.confirm('You sure?')) {
      onChange(null);
    }
  }

  function handleChangeChildCondition(
    newCondition: FormFieldConditionOrBool | null,
    oldCondition: FormFieldConditionOrBool | null,
  ) {
    console.log('handleChangeChildCondition', newCondition, oldCondition);
    if (newCondition === null && oldCondition === null) {
      // do nothing
    } else if (newCondition === null && oldCondition !== null) {
      onChange({
        ...thisMultipleCondition,
        value: [...thisMultipleCondition.value.filter((c) => c !== oldCondition)],
      } as FormFieldMultipleCondition);
    } else if (!isCondition(newCondition)) {
      throw Error(`unsupported new condition ${newCondition}`);
    } else if (isCondition(newCondition)) {
      const value = [...thisMultipleCondition.value];
      const indexToRemove = value.indexOf(oldCondition);
      if (indexToRemove >= 0) {
        value.splice(indexToRemove, 1, newCondition);
      } else {
        value.push(newCondition);
      }
      onChange({...thisMultipleCondition, value} as FormFieldMultipleCondition);
    } else {
      throw Error(`unsupported new condition ${newCondition}`);
    }
    setAdding(false);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    console.log('handleChange', event.target.name, event.target.value);
    setThisMultipleCondition((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  const Type = <input type={'text'} name={'type'} value={thisMultipleCondition.type} disabled={true} />;
  const OperatorOptions = FormFieldMultipleConditionOperators.map((v) => <option value={v}>{v}</option>);
  const Operator = (
    <select name={'operator'} value={thisMultipleCondition.operator} onChange={handleChange}>
      <option></option>
      {OperatorOptions}
    </select>
  );

  const {value: children, ...conditionWithoutChildren} = thisMultipleCondition;
  const isValid = isValidMultipleCondition(thisMultipleCondition);
  const isValidClass = isValid ? 'valid' : 'invalid';

  return (
    <div
      className={`containerized condition-container ${isValidClass} multiple-condition ${thisMultipleCondition.operator}-condition`}
    >
      {editing ? (
        <>
          <span className={'form-container'}>
            type:{Type} operator:{Operator}
          </span>
          <button onClick={() => handleCancel()}>cancel</button>
          <button disabled={!isValid} onClick={() => handleSave()}>
            save
          </button>
        </>
      ) : (
        <>
          <span className={'json-container'}>{JSON.stringify(conditionWithoutChildren)}</span>
          <button disabled={adding} onClick={() => setAdding(true)}>
            {'+'}
          </button>
          <button disabled={editing} onClick={() => setEditing(true)}>
            edit
          </button>
          <button onClick={() => handleDelete()}>delete</button>
        </>
      )}
      {children?.map((child, index) => (
        <div key={JSON.stringify(child)}>
          {index > 0 && <pre>{condition.operator}</pre>}
          <ConditionOrBoolComponentV2
            condition={child}
            onChange={(updatedCondition) => handleChangeChildCondition(updatedCondition, child)}
          />
        </div>
      ))}
      {adding && (
        <>
          {children?.length > 0 && <pre>{condition.operator}</pre>}
          <ConditionOrBoolComponentV2
            editing={true}
            condition={null}
            onChange={(newCondition) => handleChangeChildCondition(newCondition, null)}
          />
        </>
      )}
    </div>
  );
}
