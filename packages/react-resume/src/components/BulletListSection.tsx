import {StyleSheet, View} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';
import {Text} from '@/components/Text';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 4,
        rowGap: 6,
    },
    headingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2,
    },
    headingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    headingLeft: {
        fontSize: 9,
        fontWeight: 'semibold',
    },
    headingRight: {
        fontSize: 8,
        fontWeight: 'semibold',
    },
    subheadingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2,
    },
    subheading: {
        fontSize: 8,
        fontWeight: 'medium',
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 8,
        rowGap: 4,
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 4,
    },
    item: {
        fontSize: 8,
        fontWeight: 'light',
    },
});

type BulletListSectionProps = {
    headings: Array<[string, string]>;
    items: string[];
    subheadings: string[];
};

export const BulletListSection: FunctionComponent<BulletListSectionProps> = ({
    headings,
    items,
    subheadings,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headingsContainer}>
                {headings.map(([heading, date]) => (
                    <View key={`heading-${heading}-${date}`} style={styles.headingContainer}>
                        <Text style={styles.headingLeft}>
                            {heading}
                        </Text>
                        <Text style={styles.headingRight}>
                            {date}
                        </Text>
                    </View>
                ))}
            </View>
            <View style={styles.subheadingsContainer}>
                {subheadings.map((subheading, index) => (
                    <Text key={`${subheading}-${index}`} style={styles.subheading}>
                        {subheading}
                    </Text>
                ))}
            </View>
            <View style={styles.itemsContainer}>
                {items.map((item, index) => (
                    <View key={`${item}-${index}`} style={styles.itemContainer}>
                        <Text style={styles.item}>
                            {'\u2022'}
                        </Text>
                        <Text style={styles.item}>
                            {item}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};
