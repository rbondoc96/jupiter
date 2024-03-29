import {PDFViewer} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';
import {getResumeMetaData, Resume} from '@jupiter/react-resume';
import {Dialog} from '@jupiter/ui-react';

export const ResumeViewerPage: FunctionComponent = () => {
    const {dateOfLastBuild, version} = getResumeMetaData();

    return (
        <div className="relative h-screen w-screen">
            <PDFViewer height="100%" width="100%">
                <Resume />
            </PDFViewer>
            <Dialog.Root>
                <div className="absolute bottom-0 right-0">
                    <div className="mr-6 mb-4">
                        <Dialog.Trigger className="bg-primary px-4 py-2 rounded-lg text-white">
                            More Info
                        </Dialog.Trigger>
                    </div>
                </div>
                <Dialog.Content side="center">
                    <Dialog.Header>
                        <Dialog.Title className="text-left">
                            Resume Information
                        </Dialog.Title>
                    </Dialog.Header>

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

                        <p className="text-xs text-white">
                            Written with 💞 and React.
                        </p>
                    </div>

                    <Dialog.Footer>
                        <a
                            href="https://github.com/rbondoc96/jupiter/tree/main/apps/react-resume"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-white text-sm text-center py-2 bg-primary rounded-md"
                        >
                            View on GitHub
                        </a>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog.Root>
        </div>
    );
};
