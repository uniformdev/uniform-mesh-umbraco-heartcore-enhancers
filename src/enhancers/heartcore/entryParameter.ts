import { ComponentParameter } from '@uniformdev/canvas';

export interface EditorValue {
  id: string
}

export const HEARTCORE_CANVAS_PARAMETER_TYPES = Object.freeze(['heartcore']);

export function parameterIsEntry(
  parameter: ComponentParameter<any>
): parameter is ComponentParameter<EditorValue> {
  const test = parameter as ComponentParameter<EditorValue>;
  return Boolean(test.type === HEARTCORE_CANVAS_PARAMETER_TYPES[0] && test.value?.id);
}

export function isParameterValueDefined(value: EditorValue) {
  return Boolean(value?.id);
}
