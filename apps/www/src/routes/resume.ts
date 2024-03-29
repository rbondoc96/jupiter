import {createFileRoute} from '@tanstack/react-router';
import {ResumeViewerPage} from '@/pages/ResumeViewerPage';

export const Route = createFileRoute('/resume')({
    component: ResumeViewerPage,
});
