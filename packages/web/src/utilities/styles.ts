import {cx} from 'class-variance-authority';
import {twMerge} from 'tailwind-merge';

type ClassValue = Parameters<typeof cx>[0];

export function composeClassName(...classes: ClassValue[]): string {
    return twMerge(cx(...classes));
}
