import { ClimateResponse } from '../../data/entities/climateResponse';
import { Climate } from '../entities/climateEntities';

/**
 * Converts a ClimateResponse object to a Climate object.
 *
 * @param {ClimateResponse | undefined} climateResponse - The climate response object to be converted.
 * @returns {Climate} - The converted Climate object.
 */
export const climateResponseToClimate = (
    climateResponse?: ClimateResponse
): Climate => {
    // Use optional chaining and nullish coalescing to handle potential undefined properties
    return {
        temperature: climateResponse?.temperature || 0,
        pressure: climateResponse?.presion || 0,
        altitude: climateResponse?.altitud || 0
    };
};
