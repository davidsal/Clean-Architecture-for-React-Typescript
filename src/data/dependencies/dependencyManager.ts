import ApiService from './api/apiService';

/**
 * DependencyManager class provides a static method for obtaining instances of dependencies.
 * This class can be used as a simple form of dependency injection.
 * Use this kind of short lived dependencies for things that take small time to instantiate
 * like Date(), Fetch(), etc.
 */
class DependencyManager {
  /**
   * Obtains a instance of the ApiService.
   *
   * @returns {ApiService} - An instance of the ApiService.
   */
  static getApiServiceInstance(): ApiService {
    return new ApiService();  // Short-lived instance
  }
}

export default DependencyManager;
