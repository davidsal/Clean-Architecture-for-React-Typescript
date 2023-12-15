/**
 * Represents a wrapper for data with additional metadata, such as status and message.
 * @template T - The type of the encapsulated data.
 */
export type DataWrapperResponse<T> = {
    data?: T; // The encapsulated data (optional)
    successful: boolean; // Indicates whether the operation was successful
    error: string; // A message associated with the operation, if applicable
};
