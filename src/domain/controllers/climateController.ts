import { Climate } from '../entities/climateEntities';
import { DataWrapper } from '../entities/dataWrapper';
import { getClimateUseCase } from '../useCases/climateUseCases';

/**
 * Class that manages the retrieval of climate data, optionally using a cache.
 */
class ClimateController {
    /**
     * Static method to get climate data, optionally using a cache.
     *
     * @param {boolean} cache - Flag indicating whether to use the cache (defaults to true).
     * @returns {Promise<DataWrapper<Climate>>} - A promise resolving to a DataWrapper containing climate data.
     */
    static async getClimate(
        cache: boolean = false,
        useRealApi: boolean = false
    ): Promise<DataWrapper<Climate>> {
        // Invoke the climate use case with the specified caching option
        return getClimateUseCase(cache, useRealApi);
    }
}

export default ClimateController;
