
export type TCkeckboxValue = 'on' | 'off';
export type TCheckboxType = 'switcher' | 'checkbox';

export type CheckboxEvents = {
  'changed': {
    value: string
    checked: boolean
  }
}