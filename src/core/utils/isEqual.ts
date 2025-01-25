export type EqualType = Record<string, any> | null | undefined;

export function isEqual(a: EqualType, b: EqualType): boolean {
    if ((typeof a === 'object' && a === null)
        || a === undefined
        || (typeof b === 'object' && b === null)
        || b === undefined
    ) {
        return a === b;
    }

    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }

    for (let key in a) {
        if (typeof a[key] === 'object' && typeof b[key] === 'object' && !isEqual(a[key], b[key])) {
            return false;
        }

        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
