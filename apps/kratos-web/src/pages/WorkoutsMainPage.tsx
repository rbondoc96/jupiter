import { DateTime } from 'luxon';
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { Button } from '@jupiter/react-components';

import { AppHeader } from '@/components/AppHeader';
import { AppPageShell } from '@/components/AppPageShell';
import {
    useWorkoutEndDateTime,
    useWorkoutFinishWorkout,
    useWorkoutStartDateTime,
    useWorkoutStartWorkout,
} from '@/hooks/stores/useWorkoutStore';
import { sendNotification } from '@/utilities/notifications';

export function WorkoutsMainPage(): ReactNode {
    const finishWorkout = useWorkoutFinishWorkout();
    const startDateTime = useWorkoutStartDateTime()();
    const endDateTime = useWorkoutEndDateTime()();
    const startWorkout = useWorkoutStartWorkout();

    const [currentTime, setCurrentTime] = useState<string>();

    const countdownInterval = useRef<NodeJS.Timeout>();

    const handleTimerPress = useCallback(() => {
        if (countdownInterval.current || endDateTime) {
            clearInterval(countdownInterval.current);
        } else if (startDateTime) {
            countdownInterval.current = setInterval(() => {
                const difference = DateTime.now().diff(startDateTime);
                // const time = DateTime.now().toFormat('HH:mm:ss');
                setCurrentTime(difference.toFormat('mm:ss'));
            }, 1000);
        }
    }, [endDateTime, startDateTime]);

    useEffect(() => {
        if (startDateTime && !endDateTime) {
            countdownInterval.current = setInterval(() => {
                const difference = DateTime.now().diff(startDateTime);
                // const time = DateTime.now().toFormat('HH:mm:ss');
                setCurrentTime(difference.toFormat('mm:ss'));
            }, 1000);
        } else if (startDateTime && endDateTime) {
            setCurrentTime(endDateTime.diff(startDateTime).toFormat('mm:ss'));
        }
    }, [endDateTime, startDateTime]);

    return (
        <AppPageShell
            name="WorkoutsMainPage"
            _mobile={{
                header: <AppHeader title="Workouts" />,
            }}
        >
            <main className="flex-1 flex flex-col gap-y-4 px-4">
                <div>
                    <div>
                        <h2>Workouts Main Page</h2>
                    </div>
                </div>

                <div className="flex gap-x-2">
                    <div>
                        <span>Start Date Time:</span>
                        <div>{startDateTime ? startDateTime.toFormat('yyyy-MM-dd HH:mm:ss') : 'None'}</div>
                    </div>

                    <div>
                        <span>End Date Time:</span>
                        <div>{endDateTime ? endDateTime.toFormat('yyyy-MM-dd HH:mm:ss') : 'None'}</div>
                    </div>
                </div>

                <Button
                    onClick={() =>
                        sendNotification({
                            title: 'My Message Title',
                            body: 'My Message Body',
                        })
                    }
                >
                    Send Test Notification
                </Button>

                {!startDateTime ||
                    (startDateTime && endDateTime && (
                        <Button
                            onClick={() => {
                                startWorkout();
                                handleTimerPress();
                            }}
                        >
                            Start Timer
                        </Button>
                    ))}

                {startDateTime && !endDateTime && (
                    <Button
                        onClick={() => {
                            finishWorkout();
                            handleTimerPress();
                        }}
                    >
                        Stop Timer
                    </Button>
                )}

                {currentTime && (
                    <div>
                        <span>Tracked Time</span>
                        <div>{currentTime}</div>
                    </div>
                )}
            </main>
        </AppPageShell>
    );
}
