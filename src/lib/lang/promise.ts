
type NullableError = Error | null;

export function promisify(fn: (...args: any[]) => void): (...args: any[]) => any {
    return (...args: any[]) => {
        return new Promise((resolve, reject) => {
            const nodeCallback = (err: NullableError, result: any) => {
                if (err) reject(err);
                else resolve(result);
            };
            fn.apply(null, [...args, nodeCallback]);
        });
    };
}
