import ApiService from './api/apiService';

/**
 * DependencyManager class provides a static method for obtaining instances of dependencies.
 * This class can be used as a simple form of dependency injection.
 * You should use this kind of static dependency when dealing with time-consuming instances
 * like making a DB instance with a connection string
 */
class DependencyManagerStatic {
    private static apiServiceInstance: ApiService | null = null;

    /**
     * Obtains a static instance of the ApiService.
     *
     * @returns {ApiService} - An instance of the ApiService.
     */
    static getApiServiceInstance(): ApiService {
        if (!DependencyManagerStatic.apiServiceInstance) {
            DependencyManagerStatic.apiServiceInstance = new ApiService();
        }
        return DependencyManagerStatic.apiServiceInstance; // lifetime - singleton
    }
}

export default DependencyManagerStatic;
