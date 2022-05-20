/** pipes initial value through the pipes (front to back) */
export const pipe = <T>(pipes: CallableFunction[], initial: T): T => {
  return pipes.reduce((acc, pipe) => pipe(acc), initial);
};
