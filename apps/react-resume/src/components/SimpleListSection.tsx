import {faExternalLink} from '@fortawesome/free-solid-svg-icons';
import {Link, StyleSheet, View} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';
import {FontAwesomeIcon} from '@/components/FontAwesomeIcon';
import {Text} from '@/components/Text';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 4,
        rowGap: 6,
    },
    headingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    heading: {
        fontSize: 9,
        fontWeight: 'bold',
    },
    headingLink: {
        color: '#000',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 3,
        textDecoration: 'none'
    },
    subheading: {
        fontSize: 8,
        fontWeight: 'medium',
    },
    itemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 4,
    },
    item: {
        fontSize: 8,
        fontWeight: 'light',
    },
});

type SimpleListSectionProps = {
    heading: string;
    href?: string;
    items: string[];
    subheading?: string;
};

export const SimpleListSection: FunctionComponent<SimpleListSectionProps> = ({
    heading,
    href,
    items,
    subheading,
}) => {
    const Heading = () => href ? (
        <Link href={href} style={styles.headingLink}>
            <Text style={styles.heading}>
                {heading}
            </Text>

            <FontAwesomeIcon
                icon={faExternalLink}
                width="6"
            />
        </Link>
    ) : (
        <Text style={styles.heading}>
            {heading}
        </Text>
    );

    return (
        <View style={styles.container}>
            <Heading />
            {subheading && (
                <Text style={styles.subheading}>
                    {subheading}
                </Text>
            )}
            <View style={styles.itemsContainer}>
                {items.map(item => (
                    <Text style={styles.item}>
                        {item}
                    </Text>
                ))}
            </View>
        </View>
    );
};
