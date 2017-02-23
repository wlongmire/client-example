export function onlyDomProps(field) {
  const {
    initialValue,
    autofill,
    onUpdate,
    valid,
    invalid,
    dirty,
    pristine,
    active,
    touched,
    visited,
    autofilled,
    error,
    value,
    ...domProps
  } = field;

  return domProps;
}

export function validationStatus(errors, field) {
  return ((errors && errors[field])?"error":"default");
}

export function validationMessage(errors, field) {
  return ((errors && errors[field])?errors[field]:"");
}
