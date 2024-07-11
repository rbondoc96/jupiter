import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faCheckCircle,
    faExclamationCircle,
    faQuestionCircle,
    faWarning,
    faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { composeClassName } from '@jupiter/web';
import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';

import { Button } from './Button';

const alertVariants = cva(['self-stretch flex gap-4', 'border-2 rounded-lg', 'px-4 py-4'], {
    variants: {
        type: {
            error: 'border-destructive text-destructive-foreground',
            info: 'border-info text-info-foreground',
            success: ['bg-success/10', 'border-success', 'text-success-foreground'],
            warning: 'border-caution text-caution-foreground',
        },
    },
});

const alertIconVariants = cva(['flex items-center text-lg'], {
    variants: {
        type: {
            error: 'text-destructive',
            info: 'text-info',
            success: 'text-success',
            warning: 'text-caution',
        },
    },
});

const alertCloseIconVariants = cva(['flex items-center text-lg'], {
    variants: {
        type: {
            error: 'text-destructive-foreground hover:text-destructive-foreground/60',
            info: 'text-info-foreground hover:text-info-foreground/60',
            success: 'text-success-foreground hover:text-success-foreground/60',
            warning: 'text-caution-foreground hover:text-caution-foreground/60',
        },
    },
});

type AlertType = Exclude<AlertVariantProps['type'], null | undefined>;

export type AlertClassNames = Partial<{
    closeIcon: string;
    closeIconContainer: string;
    content: string;
    description: string;
    descriptionItem: string;
    descriptionItemBullet: string;
    descriptionItemContainer: string;
    descriptionItemList: string;
    iconContainer: string;
    icon: string;
    root: string;
    title: string;
}>;

export type AlertContext = {
    description: string;
    descriptionItems?: string[];
    title: string;
    type: AlertType;
};

type AlertVariantProps = VariantProps<typeof alertVariants> &
    VariantProps<typeof alertIconVariants> &
    VariantProps<typeof alertCloseIconVariants>;

export type AlertProps = AlertVariantProps & {
    classNames?: AlertClassNames;
    context?: AlertContext;
    show?: boolean;
    onClose?: () => void;
};

function getAlertIcon(type: AlertType): IconDefinition {
    switch (type) {
        case 'error': {
            return faExclamationCircle;
        }
        case 'info': {
            return faQuestionCircle;
        }
        case 'success': {
            return faCheckCircle;
        }
        case 'warning': {
            return faWarning;
        }
        default: {
            return faXmarkCircle;
        }
    }
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(({ classNames, context, show = true, onClose }, ref) => {
    return (
        <AnimatePresence>
            {context && show && (
                <motion.div
                    className="overflow-hidden self-stretch"
                    initial={{
                        height: 0,
                    }}
                    animate={{
                        height: 'auto',
                    }}
                    exit={{
                        height: 0,
                        transition: {
                            duration: 0.5,
                        },
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                >
                    <motion.div
                        initial={{
                            translateY: '-100%',
                        }}
                        animate={{
                            translateY: 0,
                        }}
                        transition={{
                            duration: 0,
                        }}
                        exit={{
                            translateY: '-100%',
                            transition: {
                                duration: 0.5,
                            },
                        }}
                    >
                        <div
                            ref={ref}
                            className={composeClassName(alertVariants({ type: context.type }), classNames?.root)}
                        >
                            <div className={composeClassName('flex items-center text-lg', classNames?.iconContainer)}>
                                <FontAwesomeIcon
                                    className={composeClassName(
                                        alertIconVariants({ type: context.type }),
                                        classNames?.icon,
                                    )}
                                    icon={getAlertIcon(context.type)}
                                />
                            </div>

                            <div className={composeClassName('flex-1 flex flex-col gap-y-1', classNames?.content)}>
                                <p className={composeClassName('text-sm font-bold', classNames?.title)}>
                                    {context.title}
                                </p>

                                <p className={composeClassName('text-sm', classNames?.description)}>
                                    {context.description}
                                </p>

                                {context.descriptionItems && (
                                    <div
                                        className={composeClassName(
                                            'flex flex-col gap-0.5 pl-2',
                                            classNames?.descriptionItemList,
                                        )}
                                    >
                                        {context.descriptionItems.map((item, index) => (
                                            <div
                                                key={`form-alert-${item}-${index}`}
                                                className={composeClassName(
                                                    'flex flex-row items-center gap-x-1',
                                                    classNames?.descriptionItemContainer,
                                                )}
                                            >
                                                <span className={composeClassName(classNames?.descriptionItemBullet)}>
                                                    {'\u2022'}
                                                </span>
                                                <p className={composeClassName('text-sm', classNames?.descriptionItem)}>
                                                    {item}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {onClose && (
                                <Button
                                    type="button"
                                    classNames={{
                                        root: composeClassName(
                                            alertCloseIconVariants({ type: context.type }),
                                            classNames?.closeIconContainer,
                                        ),
                                    }}
                                    variant="unstyled"
                                    onClick={onClose}
                                >
                                    <FontAwesomeIcon icon={faXmarkCircle} className={classNames?.closeIcon} />
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

Alert.displayName = 'Alert';
