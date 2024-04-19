export const Gender = {
    Female: 'female',
    Male: 'male',
    NonBinary: 'non_binary',
    Other: 'other',
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export function displayGender(gender: Gender): string {
    switch (gender) {
        case Gender.Female:
            return 'Female';
        case Gender.Male:
            return 'Male';
        case Gender.NonBinary:
            return 'Non-binary';
        case Gender.Other:
            return 'Prefer Not to Say';
    }
}

export default Gender;
