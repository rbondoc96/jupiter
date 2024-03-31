import resumeMetaData from '@/assets/resume-meta-data.json';

type ResumeMetaData = {
    dateOfLastBuild: Date;
    version: string;
};

export function getResumeMetaData(): ResumeMetaData {
    return {
        dateOfLastBuild: new Date(resumeMetaData.dateOfLastBuild),
        version: resumeMetaData.version,
    };
}
