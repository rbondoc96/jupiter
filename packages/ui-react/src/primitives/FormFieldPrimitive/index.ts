import {FormFieldPrimitiveControl} from '@/primitives/FormFieldPrimitive/FormFieldPrimitiveControl';
import {FormFieldPrimitiveRoot, type FormFieldPrimitiveRootClassNames} from '@/primitives/FormFieldPrimitive/FormFieldPrimitiveRoot';

type FormFieldPrimitiveComponent = typeof FormFieldPrimitiveRoot & {
    Control: typeof FormFieldPrimitiveControl;
};

export type FormFieldPrimitiveClassNames = FormFieldPrimitiveRootClassNames;

export const FormFieldPrimitive: FormFieldPrimitiveComponent = Object.assign(FormFieldPrimitiveRoot, {
    Control: FormFieldPrimitiveControl,
});
