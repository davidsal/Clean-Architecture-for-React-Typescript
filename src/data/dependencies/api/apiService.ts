import { DataWrapperResponse } from '../../entities/dataWrapperResponse';

/**
 * ApiService class provides methods for making HTTP requests.
 */
class ApiService {
    /**
     * Makes a GET request to the specified URL and returns a DataWrapperResponse with the result.
     *
     * @template T - The type of data expected in the response.
     * @param {string} URL - The URL to make the GET request to.
     * @param {number} [timeout=1000] - The maximum time to wait for the request, in milliseconds.
     * @returns {Promise<DataWrapperResponse<T>>} - A promise that resolves to a DataWrapperResponse containing the result.
     */
    async get<T>(
        URL: string,
        timeout: number = 1000
    ): Promise<DataWrapperResponse<T>> {
        try {
            // Create a timeout promise
            const timeoutPromise = new Promise<DataWrapperResponse<T>>(
                (_, reject) => {
                    setTimeout(() => {
                        reject(new Error('Timeout exceeded'));
                    }, timeout);
                }
            );

            // Create a promise for the GET request
            const fetchPromise = fetch(URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/plain'
                }
            });

            // Use Promise.race to wait for either of the two promises to resolve first
            const response = await Promise.race([fetchPromise, timeoutPromise]);

            // Check if the response is successful; otherwise, return a DataWrapperResponse with ERROR
            if (!(response instanceof Response) || !response.ok) {
                return {
                    data: undefined,
                    successful: false,
                    error: `${
                        response instanceof Response
                            ? response.status
                            : 'Unknown'
                    }: ${
                        response instanceof Response
                            ? response.statusText
                            : 'Unknown'
                    }`
                };
            }

            // Parse the text response and return a DataWrapperResponse with OK status
            const data: T = await response.json();
            return { data, successful: true, error: '' };
        } catch (error) {
            // Handle errors by returning a DataWrapperResponse with ERROR status and error message
            return {
                data: undefined,
                successful: false,
                error: `Exception: ${error}`
            };
        }
    }
}

export default ApiService;
