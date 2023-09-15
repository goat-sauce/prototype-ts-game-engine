export const wait = (ms: number) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve({ success: true });
            } catch (error) {
                reject({ success: false, error });
            }
        }, ms);
    });
}