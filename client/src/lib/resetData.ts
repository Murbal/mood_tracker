/**
 * resets provided data
 *
 * @param data data to reset, has to have a property called initialData which holds the initial data
 */
export const resetData = <T>(data: T & { initialData: T }): void => {
  Object.assign(data, data.initialData);
};
