import {type IconDefinition} from '@fortawesome/fontawesome-svg-core';
import {Link, StyleSheet} from '@react-pdf/renderer';
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
};

export const LinkWithIcon: FunctionComponent<LinkWithIconProps> = ({
    href,
    icon,
    label,
}) => {
    return (
        <Link href={href} style={styles.container}>
            <FontAwesomeIcon icon={icon} width="12" />
            
            <Text style={styles.text}>
                {label}
            </Text>
        </Link>
    );
};
