import {DateTime} from 'luxon';
import {type FunctionComponent} from 'react';
import {boolean, enum as zEnum, object, type output, string, ZodError} from 'zod';

import {Button} from '@/components/Button';
import {Form} from '@/components/Form';
import {Text} from '@/components/Text';
import {GeneralError} from '@/lib/errors/GeneralError';

const formSchema = object({
    checkbox: boolean(),
    date: string().transform(value => {
        const datetime = DateTime.fromFormat(value, 'MM/dd/yyyy');

        if (!datetime.isValid) {
            throw new ZodError([
                {
                    path: ['date'],
                    code: 'invalid_date',
                    message: 'Invalid date given.',
                },
            ]);
        }

        return datetime;
    }),
    select: zEnum(['option-1', 'option-2', 'option-3']),
    password: string().min(1, 'This field is required'),
    text: string().min(1, 'This field is required'),
});

export const App: FunctionComponent = () => {
    const handleSubmit = (data: output<typeof formSchema>) => {
        console.log(data);
        
        if (data.checkbox) {
            throw new Error('An error occurred.');
        }
    };

    return (
        <div>
            <Text as="h1">
                Kitchen Sink
            </Text>

            <div className="flex gap-x-8">
                <div>
                    <Text as="h2">
                        Color Palette
                    </Text>
                </div>

                <div className="flex flex-col gap-y-2">
                    <Text as="h2">
                        Form
                    </Text>

                    <Form
                        className="flex flex-col gap-y-4"
                        schema={formSchema}
                        errors={{
                            text: {
                                type: '',
                                message: 'This is an initial error message',
                            },
                        }}
                        initialError={new GeneralError('Initial Error', 'This is an initial error.')}
                        initialValues={{
                            password: '',
                            text: '',
                            select: 'option-1',
                        }}
                        onSubmit={handleSubmit}
                    >
                        {control => (
                            <>
                                <Form.Text
                                    control={control}
                                    name="text"
                                    description="This is a text field"
                                    label="Text Field"
                                />

                                <Form.Password
                                    control={control}
                                    name="password"
                                    description="Password"
                                    label="Password"
                                />

                                <Form.Date
                                    control={control}
                                    name="date"
                                    label="Date"
                                />

                                <Form.SimpleSelect
                                    control={control}
                                    description="This is a Simple Select field"
                                    label="Simple Select"
                                    name="select"
                                    options={[
                                        {label: 'Option 1', value: 'option-1'},
                                        {label: 'Option 2', value: 'option-2'},
                                        {label: 'Option 3', value: 'option-3'},
                                    ]}
                                />

                                <Form.Checkbox
                                    control={control}
                                    name="checkbox"
                                    label="Submit the form with an error?"
                                />

                                <Button type="submit" className="self-stretch">
                                    Submit
                                </Button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
};
