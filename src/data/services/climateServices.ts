import DependencyManager from '../dependencies/dependencyManager';
import { ClimateResponse } from '../entities/climateResponse';
import { DataWrapperResponse } from '../entities/dataWrapperResponse';

const API_BASE_URL = 'http://192.168.0.100';
const CLIMATE_PATH = '/';

/**
 * Retrieves climate data from the API.
 *
 * @returns {Promise<DataWrapper<ClimateResponse>>} - A promise resolving to a DataWrapper containing climate data.
 */
export const getClimateData = async (): Promise<DataWrapperResponse<ClimateResponse>> => {
    // Obtain an instance of ApiService from DependencyManager
    const apiService = DependencyManager.getApiServiceInstance();

    // Make a GET request to the climate API using the get method of apiService
    const data = await apiService.get<ClimateResponse>(
        `${API_BASE_URL}${CLIMATE_PATH}`
    );

    // Return the climate data wrapped in a DataWrapper
    return data;
};
