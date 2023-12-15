import { ClimateResponse } from '../../data/entities/climateResponse';
import { DataWrapperResponse } from '../../data/entities/dataWrapperResponse';
import { getClimateData } from '../../data/services/climateServices';
import { climateResponseToClimate } from '../converters/climateConverters';
import { Climate } from '../entities/climateEntities';
import { DataWrapper } from '../entities/dataWrapper';
import { Status } from '../entities/status';

// In-memory object to store the last response and the time of the last call
let cacheData: DataWrapper<Climate> | null = null;
let lastCallTime: number = 0;

/**
 * Retrieves climate data, optionally using a cache with a 5-second cooldown.
 *
 * @param {boolean} cache - Flag indicating whether to use the cache.
 * @returns {Promise<DataWrapper<Climate>>} - A promise resolving to a DataWrapper containing climate data.
 */
// Assume ClimateResponse has properties temperature, presion, and altitud

export const getClimateUseCase = async (
    cache: boolean = false,
    useRealApi: boolean = false
): Promise<DataWrapper<Climate>> => {
    // If cache is enabled and less than 5 seconds have passed since the last call, return cached data
    if (cache && cacheData && Date.now() - lastCallTime < 5000) {
        console.log('Returning cached data');
        return cacheData;
    }

    // Mock data for testing purposes
    // {"temperature":22.80,"presion":76355.00,"altitud":2325.12}
    const mockApiResponse: DataWrapperResponse<ClimateResponse> = {
        error: '',
        successful: true,
        data: { altitud: 2325.12, presion: 76355.0, temperature: 22.8 }
    };

    // Invoke the function to get fresh climate data (from an API URL)
    const climateDataResponse = useRealApi ? await getClimateData() : mockApiResponse;

    // Convert the response to imperial units
    const climateData: Climate = climateResponseToClimate(
        climateDataResponse.data
    );

    const climateDataImperial: Climate = convertToImperial(climateData);

    cacheData = {
        data: climateDataImperial,
        status: climateDataResponse.successful ? Status.OK : Status.ERROR,
        message: climateDataResponse.error
    };

    lastCallTime = Date.now();

    console.log('Returning fresh data');

    return cacheData;
};

// Function to convert metric climate data to imperial
const convertToImperial = (metricData: Climate): Climate => {
    // Conversion logic goes here
    // For example, if temperature is in Celsius, convert it to Fahrenheit
    const temperatureImperial = ((metricData.temperature || 0) * 9) / 5 + 32;

    // You may need to adjust the conversion for pressure and altitude as needed

    return {
        ...metricData,
        temperature: temperatureImperial
        // Update other properties as needed
    };
};
