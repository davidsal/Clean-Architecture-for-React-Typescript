# Elegant Weather Project 🌦️

Welcome to our Clean Architecture React application with TypeScript for weather data! This project provides an opportunity to explore and visualize weather information elegantly, sourced from both a Wi-Fi-enabled Arduino and simulated data.

**Note:**
This project actively avoids the utilization of null and undefined, steering clear of the "billion-dollar mistake." 🚀

## Project Structure 🏗️

```
- App.tsx
- data
    - dependencies
        - api
            - apiService.ts
        - dependencyManagerStatic.ts
        - dependencyManager.ts
    - entities
        - climateResponse.ts
        - dataWrapperResponse.ts
    - services
        - climateServices.ts
- domain
    - controllers
        - climateController.ts
    - converters
        - climateConverters.ts
    - entities
        - climateEntities.ts
        - dataWrapper.ts
        - status.ts
    - useCases
        - climateUseCases.ts
- ui
    - main
        - main.tsx
```

## How to Start the Project 🚀

Getting this weather engineering gem up and running is as simple as following these steps:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Application:**
   ```bash
   npm start
   ```

**Note:**
Ensure you have Node.js and npm installed. As this project uses TypeScript, make sure your code editor supports TypeScript and is configured correctly.

## Data Flow / Programming Flow

¡Mis disculpas por la confusión! Aquí está una versión mejor formateada para que sea más fácil de leer en un README:

### Data Flow / Programming Flow

#### Data Layer

```
+---------------------------------+
|      Dependencies               |
| (ApiService, DependencyManager) |
+---------------------------------+
            |
            V
+-------------------------+
|        Entities         |
| (Climate, DataWrapper)  |
+-------------------------+
            |
            V
+-------------------------+
|        Services         |
|    (ClimateServices)    |
+-------------------------+
```

#### Domain Layer

```
+--------------------------------+
|        Entities                |
| (Climate, DataWrapper, Status) |
+--------------------------------+
            |
            V
+-------------------------+
|       Converters        |
| (ClimateConverters)     |
+-------------------------+
            |
            V
+-------------------------+
|       Use Cases         |
| (ClimateUseCases)       |
+-------------------------+
            |
            V
+-------------------------+
|      Controllers        |
| (ClimateController)     |
+-------------------------+
```

#### User Interface

```
+-----------------------------------+
|         UI Flow                   |
| (Local State, Reactive Interface, |
|  Loading, Error, OK, Buttons)     |
+-----------------------------------+     
```

## Data: Data Management 📊

The **Data** layer is the backbone of our project, responsible for managing data from external sources. Let's delve into its key elements:

### Dependencies:

In the `/data/dependencies` directory, we manage connections to data sources. The `ApiService` class, residing in `/data/dependencies/api`, unleashes the magic of HTTP requests. This promise-based interface gracefully handles responses and errors.

### Entities:

In `/data/entities`, we forge fundamental data structures. `ClimateResponse` models the essence of weather data expected from the API, while `DataWrapperResponse` wraps these results, providing additional narrative about the operation's status.

### Services:

In `/data/services`, `ClimateServices` emerges as a specialized service directing the symphony of weather data. By turning to `ApiService` through `DependencyManager`, this service executes HTTP requests, wraps the results gracefully in `DataWrapperResponse`, and sets the stage for upper layers.

### Programming Flow:

1. **`ApiService`:**
   - Provides a secure passage to the realm of HTTP requests.
   - Orchestrates a symphony of promises, handles timeouts, and unveils the art of the response.

2. **`DependencyManager`:**
   - Deploys an elegant dance of dependency injection, granting access to the essence of `ApiService`.

3. **`ClimateResponse`:**
   - Defines the structured harmony of weather data, anticipating its arrival with grace and precision.

4. **`DataWrapperResponse`:**
   - Wraps the results of HTTP expeditions, providing a masterful presentation of the operation's status.

5. **`ClimateServices`:**
   - Acquires a magical wand called `ApiService` through the charming `DependencyManager`.
   - Rolls out the red carpet for weather data, using the `get` method of `ApiService` and wrapping the result in a majestic `DataWrapperResponse`.

This symphony of layers facilitates the harmonization of data, allowing our project to resonate with elegance, scalability, and reusability in all its splendor. Get ready for an amazing experience of weather data management! 🌐🚀

## Domain: Business Logic ⚙️

The **Domain** layer is the essence of our application, encapsulating vital business logic. Dive into this fascinating world:

### Controllers:

In `/domain/controllers`, orchestrators like `ClimateController` are born. These masters of user-app interaction manage logic related to weather data, elegantly connecting the user interface with use cases.

### Converters:

In `/domain/converters`, we reside in the realm of transformers like `ClimateConverters`. These data wizards alter the shape of information as required by domain logic, ensuring seamless harmony.

### Entities:

Within `/domain/entities`, vital entities reside: `ClimateEntities`, `DataWrapper`, and `Status`. These essential structures represent fundamental elements of the domain, from the shape of weather data to the state of operations.

### Use Cases:

`/domain/useCases` is the sanctuary of use cases like `ClimateUseCases`. These actions define what our application can achieve concerning weather data, linking reality with aspirations.

### Programming Flow:

1. **`ClimateEntities`:**
   - Defines the essential architecture to represent weather data throughout the application, ensuring consistency and clarity.

2. **`DataWrapper`:**
   - Wraps weather data, granting them states and messages for richer and safer communication.

3. **`Status`:**
   - Is an enumeration distilling the different states an operation can assume, from success to possible errors or loading indications.

4. **`ClimateConverters`:**
   - Transforms the essence of climate responses (`ClimateResponse`) into the required form in the domain (`Climate`), creating harmony in data presentation.

5. **`ClimateUseCases`:**
   - Invokes the climate service to obtain fresh data and prepares it for use in the application.
   - Considers the option of using real-time data or a fictitious dataset for testing.
   - Applies additional logic, such as unit conversions or specific domain adjustments.

6. **`ClimateController`:**
   - Acts as the bridge between the user interface and use cases.
   - Manages the retrieval of weather data, offering options such as using a cache to improve efficiency.

This journey into the domain layer reveals how our application brings weather data to life, from representation to presentation, masterfully merging logic and the user interface. Get ready for an exciting journey through the climate domain! 🌐🔧

## UI: User Interface 🖥️

The **UI** layer is the visible and friendly face of our application, where the user experience comes to life. Let's highlight its core:

### Main:

Within `/ui/main`, the epitome of the user interface, the `main.tsx` main component stands tall. This component acts as the essential structure of the user interface, serving as the canvas where weather data takes shape and is presented with elegance.

### Explanation:

Here, we observe the journey of weather data through different layers:

1. **Data Layer (Data Layer):**
   - The `ApiService` class, injected into `ClimateServices`, returns data as obtained from the API.

2. **Domain Layer (Domain Layer):**
   - The use case (`ClimateUseCases`) takes data from the API and transforms it into

 the format used by the application (UI/Domain).
   - Controllers manage and format this data, considering modifications and choosing the data source.

3. **User Interface Layer (UI Layer):**
   - The main component (`main.tsx`) is responsible for visualizing the data obtained by the controllers.

### Main Screen Explanation:

1. We can visualize temperature (in Fahrenheit), pressure (in Pascals), and altitude (in meters) on the screen.
2. The "Update" button gets the data considering cache utilization.
3. The "Force" button ignores the cache and calls the API directly using the `get` method.

### `main.tsx` Component:

This component is the visual epicenter of our application, cleverly connecting domain logic with the user interface. Some notable aspects include:

- Use of local state to handle the application state and update the interface reactively.
- Handling various states, such as "Loading," "Error," and "OK," to provide clear feedback to the user.
- Structured presentation of weather data in separate cards for temperature, pressure, and altitude.
- Interactive buttons to update data with or without using the cache, providing flexibility to the user.

This component, merging elegance and functionality, personifies the mission of the UI layer by providing a captivating and efficient user experience. Get ready to immerse yourself in the climate interface with style! 🌐💻
