import { Status } from './status';

/**
 * Represents a wrapper for data with additional metadata, such as status and message.
 * @template T - The type of the encapsulated data.
 */
export type DataWrapper<T> = {
    data: T; // The encapsulated data (optional)
    status: Status; // The status of the operation
    message: string; // A message associated with the operation
};
