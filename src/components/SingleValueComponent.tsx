import React, {useEffect, useState} from 'react';

const SingleValueTypes = ['string', 'number', 'boolean', 'null', 'undefined'];
type SingleValueType = (typeof SingleValueTypes)[number];

function inferSingleConditionValueType(value: any): SingleValueType {
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  const typeofValue = typeof value;
  switch (typeofValue) {
    case 'number':
    case 'boolean':
    case 'string':
      return typeofValue;
    default:
      return 'string';
  }
}

export function SingleValueComponent({value, setValue}: {value: any; setValue: (value: any) => void}) {
  const [type, setType] = useState<SingleValueType>(inferSingleConditionValueType(value));

  console.log('SingleValueComponent is rendered', value, type);

  useEffect(() => {
    if (type === 'number') {
      let num = Number(value);
      setValue(isNaN(num) ? 0 : num);
    } else if (type === 'boolean') {
      setValue(!!value);
    } else if (type === 'string') {
      setValue(value ?? '');
    } else if (type === 'null') {
      setValue(null);
    } else if (type === 'undefined') {
      setValue(undefined);
    }
  }, [value, type]);

  return (
    <span>
      <select name={'operator'} value={type} onChange={(e) => setType(e.target.value)}>
        {SingleValueTypes.map((vt) => (
          <option value={vt}>{vt}</option>
        ))}
      </select>
      {type === 'number' ? (
        <input type={'number'} name={'value'} value={Number(value)} onChange={(e) => setValue(e.target.value)} />
      ) : type === 'boolean' ? (
        <input type={'checkbox'} name={'value'} checked={!!value} onChange={(e) => setValue(e.target.checked)} />
      ) : type === 'string' ? (
        <input type={'text'} name={'value'} value={value} onChange={(e) => setValue(e.target.value)} />
      ) : null}
    </span>
  );
}
