import {faExternalLink} from '@fortawesome/free-solid-svg-icons';
import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {Link, StyleSheet, View} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';
import {Text} from '@/components/Text';

import {FontAwesomeIcon} from '@/components/FontAwesomeIcon';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
        textDecoration: 'none',
    },
    externalIcon: {
        marginBottom: 3,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 3,
    },
    text: {
        color: '#000',
        fontFamily: 'Montserrat',
        fontSize: 7,
        fontWeight: 'light',
    },
});

type LinkWithIconProps = {
    href?: string;
    icon: IconDefinition;
    label: string;
    showExternalLinkIcon?: boolean;
};

export const LinkWithIcon: FunctionComponent<LinkWithIconProps> = ({
    href,
    icon,
    label,
    showExternalLinkIcon = false,
}) => {
    return (
        <Link href={href} style={styles.container}>
            <FontAwesomeIcon icon={icon} width="12" />
            
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {label}
                </Text>

                {href && showExternalLinkIcon && (
                    <FontAwesomeIcon
                        icon={faExternalLink}
                        style={styles.externalIcon}
                        width="5"
                    />
                )}
            </View>
        </Link>
    );
};
