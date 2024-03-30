import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faEnvelope, faGlobe, faMapLocationDot, faMobilePhone} from '@fortawesome/free-solid-svg-icons';
import {StyleSheet, View} from '@react-pdf/renderer';
import {type FunctionComponent} from 'react';

import {LinkWithIcon} from '@/components/LinkWithIcon';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 6,
    },
});

export const LinksHeader: FunctionComponent = () => {
    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <LinkWithIcon
                    icon={faGithub}
                    href="https://github.com/rbondoc96"
                    label="/rbondoc96"
                />

                <LinkWithIcon
                    icon={faLinkedin}
                    href="https://linkedin.com/in/rbondoc96"
                    label="/in/rbondoc96"
                />

                <LinkWithIcon
                    icon={faGlobe}
                    href="https://rbondoc.dev"
                    label="rbondoc.dev"
                />
            </View>

            <View style={styles.column}>
                <LinkWithIcon
                    icon={faEnvelope}
                    href="mailto:rbondoc96@gmail.com"
                    label="rbondoc96@gmail.com"
                />

                <LinkWithIcon
                    icon={faMobilePhone}
                    href="tel:7148018816"
                    label="(714) 801-8816"
                />

                <LinkWithIcon
                    icon={faMapLocationDot}
                    label="Los Angeles, CA, USA"
                />
            </View>
        </View>
    );
};
