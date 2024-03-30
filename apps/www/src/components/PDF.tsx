// Adds support for annotations (e.g. links) in PDFs rendered by React-PDF
import 'react-pdf/dist/Page/AnnotationLayer.css';

import {BlobProvider} from '@react-pdf/renderer';
import throttle from 'lodash.throttle';
import {
    type FunctionComponent,
    type JSX,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {Document, Page, pdfjs} from 'react-pdf';

import {composeClassName, Skeleton} from '@jupiter/ui-react';

// REQUIRED STEP: Configure PDF.js worker
// https://github.com/wojtekmaj/react-pdf?tab=readme-ov-file#configure-pdfjs-worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type PDFProps = {
    className?: string;
    document: JSX.Element;
};

export const PDF: FunctionComponent<PDFProps> = ({
    className,
    document,
}) => {
    const pdfContainerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({
        height: 0,
        width: 0,
    });

    const handleWindowResize = useMemo(
        () => throttle(
            () => {
                if (pdfContainerRef.current) {
                    const {height, width} = pdfContainerRef.current.getBoundingClientRect();
                    setDimensions({height, width});
                }
            },
            100,
        ),
        [],
    );

    useLayoutEffect(
        () => {
            if (pdfContainerRef.current) {
                setDimensions({
                    height: pdfContainerRef.current.clientHeight,
                    width: pdfContainerRef.current.clientWidth,
                });
            }
        },
        [],
    );

    useEffect(
        () => {
            window.addEventListener('resize', handleWindowResize);
            return () => window.removeEventListener('resize', handleWindowResize);
        },
        [handleWindowResize],
    );

    return (
        <div
            className={composeClassName(
                'aspect-paper-A4 w-[200px] sm:w-[400px] md:w-[500px]',
                className,
            )}
            ref={pdfContainerRef}
        >
            <BlobProvider document={document}>
                {({loading, url}) => (
                    loading
                        ? <Skeleton className="h-full w-full" />
                        : (
                            <Document
                                file={url}
                                // Do not show the default "Loading PDF..." message
                                loading=""
                                renderMode="canvas"
                            >
                                <Page
                                    renderTextLayer={false}
                                    pageNumber={1}
                                    // Settings the width directly allows for the
                                    // canvas (child of Page) to be sized correctly
                                    // Setting it via CSS will not work.
                                    width={dimensions.width}
                                />
                            </Document>
                        )
                )}
            </BlobProvider>
        </div>
    );
};
