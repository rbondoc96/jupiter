import {StyleSheet, View} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';
import {Text} from '@/components/Text';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 4,
        rowGap: 12,
    },
    headingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 6,
    },
    sectionContent: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 4,
    },
    heading: {
        fontSize: 9,
        fontWeight: 'bold',
    },
    subheading: {
        fontSize: 8,
        fontWeight: 'medium',
    },
    item: {
        fontSize: 8,
        fontWeight: 'light',
    },
});

export const SkillsPanel: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.heading}>
                    Programming Languages
                </Text>

                <View style={styles.sectionContent}>
                    <Text style={styles.subheading}>
                        Proficient
                    </Text>
                    <Text style={styles.item}>
                        JavaScript, TypeScript, PHP, HTML, CSS
                    </Text>
                </View>
                <View style={styles.sectionContent}>
                    <Text style={styles.subheading}>
                        Familiar
                    </Text>
                    <Text style={styles.item}>
                        Rust, Python, C
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.heading}>
                    Libraries, Frameworks, & Runtimes
                </Text>

                <Text style={styles.item}>
                    React, React Native, Solid.js, Vue.js, Laravel, Node.js, Express.js, Jest, TailwindCSS
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.heading}>
                    Tools & Platforms
                </Text>

                <Text style={styles.item}>
                    Git, GitHub, GitHub Actions, Docker, Vite, PostgreSQL, Figma
                </Text>
            </View>
        </View>
    );
};
