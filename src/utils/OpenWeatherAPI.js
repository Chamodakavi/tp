import axios from "axios";

const apiKey = "f1adce962230a4cc8a90a9ed453cd44a";
const ninjaApiKey = "6eg4BXcBmOVJoXf4WJJxpw==UTcJDUQ2yDy8Yr9b";

const AQI_CATEGORIES = [
  {
    name: "Good",
    index: 1,
    SO2: [0, 20],
    NO2: [0, 40],
    PM10: [0, 20],
    PM2_5: [0, 10],
    O3: [0, 60],
    CO: [0, 4400],
  },
  {
    name: "Fair",
    index: 2,
    SO2: [20, 80],
    NO2: [40, 70],
    PM10: [20, 50],
    PM2_5: [10, 25],
    O3: [60, 100],
    CO: [4400, 9400],
  },
  {
    name: "Moderate",
    index: 3,
    SO2: [80, 250],
    NO2: [70, 150],
    PM10: [50, 100],
    PM2_5: [25, 50],
    O3: [100, 140],
    CO: [9400, 12400],
  },
  {
    name: "Poor",
    index: 4,
    SO2: [250, 350],
    NO2: [150, 200],
    PM10: [100, 200],
    PM2_5: [50, 75],
    O3: [140, 180],
    CO: [12400, 15400],
  },
  {
    name: "Very Poor",
    index: 5,
    SO2: [350, Infinity],
    NO2: [200, Infinity],
    PM10: [200, Infinity],
    PM2_5: [75, Infinity],
    O3: [180, Infinity],
    CO: [15400, Infinity],
  },
];

function inRange(value, [min, max]) {
  return value >= min && value <= max;
}

// weather data
export async function getWeatherData(city) {
  console.log(`Fetching weather data for city: ${city}`);

  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
  const url = `${BASE_URL}?q=${city}&appid=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(`Weather data for ${city}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.response ? error.response.data : error.message
    );
  }
}

// air quality data
export async function getAirQuality(city) {
  console.log(`Fetching air quality for city: ${city}`);
  try {
    const coords = await getCityCoordinates(city);
    const { latitude, longitude } = coords;

    const BASE_URL = "http://api.openweathermap.org/data/2.5/air_pollution";
    const url = `${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    const response = await axios.get(url);
    const components = response.data.list?.[0]?.components;

    if (!components) {
      throw new Error("Air pollution data unavailable");
    }

    // Extract pollutant concentrations
    const so2 = components.so2 || 0;
    const no2 = components.no2 || 0;
    const pm10 = components.pm10 || 0;
    const pm2_5 = components.pm2_5 || 0;
    const o3 = components.o3 || 0;
    const co = components.co || 0;

    const pollutants = { so2, no2, pm10, pm2_5, o3, co };
    let worstIndex = 1; // Start with Good category index
    let worstCategory = "Good";

    // Loop through AQI categories and find the worst category
    for (let i = AQI_CATEGORIES.length - 1; i >= 0; i--) {
      const category = AQI_CATEGORIES[i];

      // Compare each pollutant against the current category range
      for (let pollutant in pollutants) {
        const value = pollutants[pollutant];

        // If the pollutant value exceeds the range for this category, we consider this category as the worst
        if (inRange(value, category[pollutant.toUpperCase()])) {
          if (category.index > worstIndex) {
            worstIndex = category.index;
            worstCategory = category.name;
          }
        }
      }
    }

    // Log the result for debugging
    console.log(`Air Quality Category: ${worstCategory}`);
    console.log("Pollutant data:", { so2, no2, pm10, pm2_5, o3, co });

    return {
      index: worstIndex,
      quality: worstCategory,
      concentrations: pollutants,
    };
  } catch (error) {
    console.error(
      "Error fetching air quality data:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function getCityCoordinates(city) {
  try {
    const response = await axios.get(
      "https://api.api-ninjas.com/v1/geocoding",
      {
        params: { city },
        headers: { "X-Api-Key": ninjaApiKey },
      }
    );

    if (response.data && response.data.length > 0) {
      const { latitude, longitude } = response.data[0];
      console.log(
        `City: ${city}, Latitude: ${latitude}, Longitude: ${longitude}`
      );
      return { latitude, longitude };
    } else {
      throw new Error("No location data found for the city");
    }
  } catch (error) {
    console.error("Error fetching city coordinates:", error.message);
    throw error;
  }
}

export async function getCountryData(city) {
  // Use backticks to properly interpolate the city variable
  const url = `https://restcountries.com/v3.1/name/${city}`;
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Country Data:", data);
    const population = data[0]?.population;
    console.log("Population:", population);
    return population;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}
