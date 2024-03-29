import {PDFViewer} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';
import {getResumeMetaData, Resume} from '@jupiter/react-resume';
import {DialogSheet} from '@jupiter/ui-react';

export const ResumeViewerPage: FunctionComponent = () => {
    const {dateOfLastBuild, version} = getResumeMetaData();

    return (
        <div className="relative h-screen w-screen">
            <PDFViewer height="100%" width="100%">
                <Resume />
            </PDFViewer>
            <DialogSheet.Root>
                <div className="absolute bottom-0 right-0">
                    <div className="mr-6 mb-4">
                        <DialogSheet.Trigger className="bg-primary px-4 py-2 rounded-lg text-white">
                            More Info
                        </DialogSheet.Trigger>
                    </div>
                </div>
                <DialogSheet.Content side="center">
                    <DialogSheet.Header>
                        <DialogSheet.Title className="text-left">
                            Resume Information
                        </DialogSheet.Title>
                    </DialogSheet.Header>

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

                    <DialogSheet.Footer>
                        <a
                            href="https://github.com/rbondoc96/jupiter/tree/main/apps/react-resume"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-white text-sm text-center py-2 bg-primary rounded-md"
                        >
                            View on GitHub
                        </a>
                    </DialogSheet.Footer>
                </DialogSheet.Content>
            </DialogSheet.Root>
        </div>
    );
};
