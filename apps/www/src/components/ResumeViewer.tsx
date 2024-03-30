// Adds support for annotations (e.g. links) in PDFs rendered by React-PDF
import 'react-pdf/dist/Page/AnnotationLayer.css';

import {PDFDownloadLink} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';

import {getResumeMetaData, Resume} from '@jupiter/react-resume';
import {Button, Dialog} from '@jupiter/ui-react';

import {PDF} from '@/components/PDF';

export const ResumeViewer: FunctionComponent = () => {
    const {dateOfLastBuild, version} = getResumeMetaData();
    const ResumeDocument = <Resume />;

    return (
        <Dialog.Root>
            <Button asChild>
                <Dialog.Trigger>
                    My Resume
                </Dialog.Trigger>
            </Button>
            <Dialog.Content
                className="max-w-4xl"
                side="center"
            >
                <div className="flex flex-col gap-y-8 md:flex-row md:gap-x-8 md:gap-y-0">
                    <div className="flex justify-center">
                        <PDF document={ResumeDocument} />
                    </div>
                    <div className="flex flex-col gap-y-6 md:justify-between">
                        <div className="flex flex-col gap-y-6">
                            <div>
                                <p className="text-white text-sm flex gap-x-1">
                                    <span>Version:</span>
                                    <span>
                                        {version}
                                    </span>
                                </p>
                                <p className="text-white text-sm flex gap-x-1">
                                    <span>Date Built:</span>
                                    <span>
                                        {dateOfLastBuild.toLocaleDateString('en-us', {
                                            weekday: 'long',
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <Button asChild className="self-stretch">
                                    <PDFDownloadLink
                                        document={ResumeDocument}
                                        fileName="Rodrigo Bondoc Resume.pdf"
                                    >
                                        {({loading}) => {
                                            return loading
                                                ? 'Loading...'
                                                : 'Download PDF';
                                        }}
                                    </PDFDownloadLink>
                                </Button>

                                <Button asChild className="self-stretch" variant="primaryGhost">
                                    <a
                                        href="https://github.com/rbondoc96/jupiter/tree/main/packages/react-resume"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-sm text-center py-2 bg-primary rounded-md"
                                    >
                                        View on GitHub
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <p className="text-sm">
                            Written with 💞 and React.
                        </p>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
};
