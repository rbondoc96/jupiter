import {Document, Page, StyleSheet, View} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';
import {BulletListSection} from '@/components/BulletListSection';
import {NameTitleHeader} from '@/components/NameTitleHeader';
import {LinksHeader} from '@/components/LinksHeader';
import {SkillsPanel} from '@/components/SkillsPanel';
import {SimpleListSection} from '@/components/SimpleListSection';
import {Text} from '@/components/Text';
import {colors} from '@/theme';

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 18,
        paddingHorizontal: '0.5in',
        paddingVertical: '0.5in',
    },
    pageContent: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 20,
    },
    pageContentLeft: {
        flex: 2,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 18,
    },
    pageContentRight: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 18,
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 32,
    },
    linksHeader: {
        flex: 1,
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
    },
    sectionHeader: {
        color: colors.primary,
        fontSize: 12,
        fontWeight: 'semibold',
        marginLeft: 4,
    },
    sectionContent: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 16,
    },
    interests: {
        fontSize: 8,
        fontWeight: 'light',
        marginLeft: 4,
    },
});

export const Resume: FunctionComponent = () => {
    return (
        <Document pageMode="fullScreen">
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <NameTitleHeader />
                    <View style={styles.linksHeader}>
                        <LinksHeader />
                    </View>
                </View>

                <View style={styles.pageContent}>
                    <View style={styles.pageContentLeft}>
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>
                                Professional Experience
                            </Text>

                            <View style={styles.sectionContent}>
                                <BulletListSection
                                    headings={[
                                        ['Software Engineer II', 'Oct. 2023 - Present'],
                                        ['Software Engineer I', 'May 2022 - Oct. 2023'],
                                    ]}
                                    subheadings={['Sourcetoad']}
                                    items={[
                                        'Recognized by management for consistently providing quality feedback in code reviews and demonstrating understanding of the code, leading to an appointment as the subject matter expert for a React Native and Laravel project within the first year of employment',
                                        'Developed Request-for-Quote and price estimation features for an enterprise web app using TypeScript, Vue.js, and Laravel, which prompts customers to submit information and photos detailing their request and calculates estimations for sales users to review',
                                        'Refined the UI development process for the company\'s flagship mobile cruise line app written in TypeScript and React Native, which streamlined how the app is themed based on differing needs of prospective clients',
                                        'Collaborated with designers, project managers, testers, and other engineers to ensure responsiveness and accessible user experiences in each web, iOS, and Android app developed by the team',
                                    ]}
                                />

                                <BulletListSection
                                    headings={[['Software QA Analyst', 'Jan. 2021 - May 2022']]}
                                    subheadings={['Biopharma by Labcorp']}
                                    items={[
                                        'Demonstrated exceptional knowledge of the core system\'s technical requirements by identifying critical bugs and missing features and providing sufficient evidence through root-cause analysis',
                                        'Spearheaded the adoption of new testing and documentation processes for adhering to FDA, HIPAA, and 21 CFR Part 11 regulations, through collaboration with other teams and supporting multiple projects simultaneously',
                                        'Educated other software testers to use browser developer tools, Android Studio, and Xcode to pinpoint bugs, produce error logs, and collect evidence, which led to higher quality bug reports and an increase in the team\'s overall efficiency in resolving issues',
                                    ]}
                                />

                                <BulletListSection
                                    headings={[['Compliance Specialist', 'Dec. 2019 - Dec. 2020']]}
                                    subheadings={['Aya Healthcare']}
                                    items={[
                                        'Increased overall quality and efficiency in producing medical authorization documents by around 30% through automation of repetitive tasks using JavaScript',
                                        'Improved usability and overall visual appeal of existing Excel and Powerpoint templates used for tracking traveling clinicians and creating meeting presentations',
                                        'Tracked and achieved compliance for 200+ clinicians each month during the COVID-19 pandemic by proactively communicating with external health facilities, ensuring accurate and timely delivery of essential health documents',
                                    ]}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>
                                Education
                            </Text>
                            
                            <View style={styles.sectionContent}>
                                <BulletListSection
                                    headings={[['San Diego State University', 'Aug. 2014 - May 2019']]}
                                    subheadings={[
                                        'Bachelor\'s of Science in Electrical Engineering',
                                        'Minor in Computer Science'
                                    ]}
                                    items={[
                                        'Major GPA: 3.74',
                                        'Dean\'s List: 2017 - 2019',
                                    ]}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.pageContentRight}>
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>
                                Skills
                            </Text>

                            <View style={styles.sectionContent}>
                                <SkillsPanel />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>
                                Certifications
                            </Text>

                            <View style={styles.sectionContent}>
                                <SimpleListSection
                                    heading="Certified Scrum Developer"
                                    subheading="Credential ID: 1702381"
                                    href="https://bcert.me/scbvfgdpt"
                                    items={[
                                        'Scrum Alliance',
                                        'Dec. 2022 - Dec. 2024',
                                    ]}
                                />

                                <SimpleListSection
                                    heading="Certified Scrum Master"
                                    subheading="Credential ID: 1637149"
                                    href="https://bcert.me/sdwdnkoww"
                                    items={[
                                        'Scrum Alliance',
                                        'Aug. 2022 - Aug. 2024',
                                    ]}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>
                                Interests
                            </Text>

                            <View style={styles.sectionContent}>
                                <Text style={styles.interests}>
                                    Electronic music, kickball, role-playing games, cats, yoga
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
