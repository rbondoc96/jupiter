import {DateTime} from 'luxon';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

import {fromIsoString} from '@/utilities/datetime';

type WorkoutStore = {
    endDateTime: () => DateTime<true> | undefined;
    endDateTimeRaw: string | null;
    startDateTime: () => DateTime<true> | undefined;
    startDateTimeRaw: string | null;
    finishWorkout: () => void;
    startWorkout: () => void;
};

export const useWorkoutStore = create(persist<WorkoutStore>(
    (set, get) => ({
        endDateTime: () => fromIsoString(get().endDateTimeRaw),
        endDateTimeRaw: null,
        startDateTime: () => fromIsoString(get().startDateTimeRaw),
        startDateTimeRaw: null,
        finishWorkout: () => {
            set({
                endDateTimeRaw: DateTime.now().toString(),
            });
        },
        startWorkout: () => {
            set({
                endDateTimeRaw: undefined,
                startDateTimeRaw: DateTime.now().toString(),
            });
        },
    }),
    {
        name: 'workout',
        storage: createJSONStorage(() => localStorage),
    },
));

export const useWorkoutEndDateTime = () => useWorkoutStore(state => state.endDateTime);
export const useWorkoutStartDateTime = () => useWorkoutStore(state => state.startDateTime);
export const useWorkoutFinishWorkout = () => useWorkoutStore(state => state.finishWorkout);
export const useWorkoutStartWorkout = () => useWorkoutStore(state => state.startWorkout);