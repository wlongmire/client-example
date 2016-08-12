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
    ...domProps
  } = field;
  return domProps;
}
