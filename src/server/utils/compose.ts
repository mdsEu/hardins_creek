export const pipe = (...fns: any[]) => (x: any) => fns.reduce((acc, fn) => fn(acc), x);

export const asyncPipe = (...fns: any[]) => (x: any) => fns.reduce(async(acc, fn) => await fn(acc), x);
