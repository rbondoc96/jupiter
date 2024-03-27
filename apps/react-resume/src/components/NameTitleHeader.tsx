import {StyleSheet, View} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';
import {Text} from '@/components/Text';
import {colors} from '@/theme';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 4,
    },
    nameContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 4,
    },
    firstName: {
        fontFamily: 'Montserrat',
        fontSize: 42,
        fontWeight: 'light',
    },
    lastName: {
        color: colors.primary,
        fontFamily: 'Montserrat',
        fontSize: 42,
        fontWeight: 'semibold',
    },
    jobTitleContainer: {
        marginLeft: 4,
    },
    jobTitle: {
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: 'light',
    },
});

export const NameTitleHeader: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.nameContainer}>
                <Text letterSpacing={-4} style={styles.firstName}>
                    Rodrigo
                </Text>
                <Text letterSpacing={-4} style={styles.lastName}>
                    Bondoc
                </Text>
            </View>
            <View style={styles.jobTitleContainer}>
                <Text style={styles.jobTitle}>
                    Software Engineer
                </Text>
            </View>
        </View>
    );
};
