import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';

import {Resume} from '@/Resume';

export const App: FunctionComponent = () => (
    <div className="app">
        <PDFViewer height="100%" width="100%">
            <Resume />
        </PDFViewer>
        <PDFDownloadLink
            document={<Resume />}
            fileName="resume.pdf"
        >
            Download PDF
        </PDFDownloadLink>
    </div>
);
