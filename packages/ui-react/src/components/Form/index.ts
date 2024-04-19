import {FormDate} from '@/components/Form/FormDate';
import {FormCheckbox} from '@/components/Form/FormCheckbox';
import {FormPassword} from '@/components/Form/FormPassword';
import {FormRoot} from '@/components/Form/FormRoot';
import {FormSimpleSelect} from '@/components/Form/FormSimpleSelect';
import {FormText} from '@/components/Form/FormText';

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
