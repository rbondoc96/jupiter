import { FormDate } from './FormDate';
import { FormCheckbox } from './FormCheckbox';
import { FormPassword } from './FormPassword';
import { FormRoot } from './FormRoot';
import { FormSimpleSelect } from './FormSimpleSelect';
import { FormText } from './FormText';

type FormComponent = typeof FormRoot & {
    Checkbox: typeof FormCheckbox;
    Date: typeof FormDate;
    Password: typeof FormPassword;
    SimpleSelect: typeof FormSimpleSelect;
    Text: typeof FormText;
};

export const Form: FormComponent = Object.assign(FormRoot, {
    Checkbox: FormCheckbox,
    Date: FormDate,
    Password: FormPassword,
    SimpleSelect: FormSimpleSelect,
    Text: FormText,
});
