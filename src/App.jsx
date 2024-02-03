import React, { useCallback, useEffect, useState } from "react";
import ForecastDayCard from "./components/ForecastDayCard";
import CurrentWeatherInfo from "./components/CurrentWeatherInfo";
import Loader from "./components/loader";
import axios from "axios";
import "./App.css";
import moment from "moment";
import { FiCloudRain } from "react-icons/fi";
const App = () => {
  const [searchPlace, setSearchPlace] = useState("");
  const [searchres, setSearchRes] = useState([]);

  useEffect(() => {
    try {
      const searchApi = `https://geocoding-api.open-meteo.com/v1/search?name=${searchPlace}&count=5&language=en&format=json`;
      if (searchPlace.length > 0) {
        axios.get(searchApi).then((res) => setSearchRes(res.data));
      } else if (searchPlace === "") {
        setSearchRes([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Bad Request:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }

    return () => {
      setSearchRes([]);
    };
  }, [searchPlace]);

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser");
      }
    };

    getLocation();

    return () => {};
  }, []);

  const m = moment().format();
  const formatted = m.split("T")[0];
  const Isotime = moment().format("HH" + ":00");
  const time = formatted + "T" + Isotime;
  var timeId = 0;

  const handleSearch = (id) => {
    searchres.results.map((city) => {
      if (city.id === id) {
        setLocation({
          latitude: city.latitude,
          longitude: city.longitude,
        });
        setSearchPlace("");
      }
    });
  };

  const [airPollution, setAirPollution] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const airApi = `https://api.waqi.info/feed/geo:${location?.latitude};${location?.longitude}/?token=71ff0bd69c0a245bbe40cab489654baac9d4b498`;
    const api = `https://api.open-meteo.com/v1/forecast?latitude=${location?.latitude}&longitude=${location?.longitude}&current=is_day,temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&hourly=precipitation_probability,visibility,wind_direction_10m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto&forecast_days=8`;
    try {
      axios.get(api).then((res) => setWeatherData(res.data));
      if (location.latitude !== null && location.longitude !== null) {
        axios.get(airApi).then((res) => setAirPollution(res.data));
      }
    } catch (error) {
      console.log("weather Fetch Error");
    }
  }, [location]);
  const [reverseGeo, setReverseGeo] = useState([]);
  const timeSearch = () => {
    weatherData?.hourly?.time.map((item, id) => {
      if (item === time) {
        return (timeId = id);
      }
    });
  };
  timeSearch();

  let currentStats = {
    humidity: weatherData?.current?.relative_humidity_2m,
    windDirection: weatherData?.current?.wind_direction_10m,
    windSpeed: weatherData?.current?.wind_speed_10m,
    visibility: weatherData?.hourly?.visibility[timeId] / 1000,
    feelsLike: weatherData?.current?.apparent_temperature,
    sunrise: weatherData?.daily?.sunrise[0],
    sunset: weatherData?.daily?.sunset[0],
    airPollution: airPollution?.data?.aqi,
    weatherCode: weatherData?.current?.weather_code,
    uvIndex: weatherData?.daily?.uv_index_max[0],
    isDay: weatherData?.current?.is_day,
    address: reverseGeo[0]?.properties?.address_line1,
    countryCode: reverseGeo[0]?.properties?.country_code,
    state: reverseGeo[0]?.properties.state,
    rainProbability: weatherData?.hourly?.precipitation_probability[timeId],
  };

  const daily_temp_Max = weatherData?.daily?.temperature_2m_max.slice(1);
  const daily_temp_Min = weatherData?.daily?.temperature_2m_min.slice(1);
  const daily_weather_code = weatherData?.daily?.weather_code.slice(1);

  const dailyTime = weatherData?.daily?.time.slice(1);

  const [currentIcon, setCurrentIcon] = useState("Loading");
  const [condition, setCondition] = useState("");
  const [conditionIcon, setConditionIcon] = useState("");
  useEffect(() => {
    if (currentStats.isDay == 1) {
      if (currentStats.weatherCode == 0) {
        setCurrentIcon("/day_clear_sky.png");
        setCondition("Clear");
      } else if (
        currentStats.weatherCode == 1 ||
        currentStats.weatherCode == 2 ||
        currentStats.weatherCode == 3
      ) {
        setCurrentIcon("/partly-cloudy.png");
        setCondition("Partly Cloudy");
      } else if (
        currentStats.weatherCode == 48 ||
        currentStats.weatherCode == 45
      ) {
        setCurrentIcon("/day-fog.png");
        setCondition("Foggy");
      } else if (
        currentStats.weatherCode == 51 ||
        currentStats.weatherCode == 53 ||
        currentStats.weatherCode == 55 ||
        currentStats.weatherCode == 56 ||
        currentStats.weatherCode == 57
      ) {
        setCurrentIcon("/drizzle.png");
        setCondition("Drizzle");
      } else if (
        currentStats.weatherCode == 61 ||
        currentStats.weatherCode == 63
      ) {
        setCurrentIcon("/day-normal-rain.png");
        setCondition("Rainy");
      } else if (currentStats.weatherCode == 65) {
        setCurrentIcon("/day-rain-shower.png");
      } else if (
        currentStats.weatherCode == 66 ||
        currentStats.weatherCode == 67 ||
        currentStats.weatherCode == 71 ||
        currentStats.weatherCode == 73 ||
        currentStats.weatherCode == 75 ||
        currentStats.weatherCode == 77
      ) {
        setCurrentIcon("/snow-fall.png");
        setCondition("Snow-fall");
      } else if (
        currentStats.weatherCode == 80 ||
        currentStats.weatherCode == 81 ||
        currentStats.weatherCode == 82
      ) {
        setCurrentIcon("/heavyRain.png");
        setCondition("Rain shower");
      } else if (
        currentStats.weatherCode == 86 ||
        currentStats.weatherCode == 85
      ) {
        setCurrentIcon("snow-shower.png");
        setCondition("Snow shower");
      } else if (currentStats.weatherCode == 95) {
        setCurrentIcon("thunderstorm-day.png");
        setCondition("ThunderStorm");
      }
    } else if (currentStats.isDay == 0) {
      if (currentStats.weatherCode == 0) {
        setCurrentIcon("/nightClear.png");
        setCondition("Clear");
      } else if (
        currentStats.weatherCode == 1 ||
        currentStats.weatherCode == 2 ||
        currentStats.weatherCode == 3
      ) {
        setCurrentIcon("/nightCloudy.png");
        setCondition("Partly Cloudy");
      } else if (
        currentStats.weatherCode == 48 ||
        currentStats.weatherCode == 45
      ) {
        setCurrentIcon("/night-fog.png");
        setCondition("Foggy");
      } else if (
        currentStats.weatherCode == 51 ||
        currentStats.weatherCode == 53 ||
        currentStats.weatherCode == 55 ||
        currentStats.weatherCode == 56 ||
        currentStats.weatherCode == 57
      ) {
        setCurrentIcon("/drizzle.png");
        setCondition("Drizzle");
      } else if (
        currentStats.weatherCode == 61 ||
        currentStats.weatherCode == 63
      ) {
        setCurrentIcon("/nightRain.png");
        setCondition("Rainy");
      } else if (currentStats.weatherCode == 65) {
        setCurrentIcon("/night-rain-shower.png");
      } else if (
        currentStats.weatherCode == 66 ||
        currentStats.weatherCode == 67 ||
        currentStats.weatherCode == 71 ||
        currentStats.weatherCode == 73 ||
        currentStats.weatherCode == 75 ||
        currentStats.weatherCode == 77
      ) {
        setCurrentIcon("/snow-fall.png");
        setCondition("Snow-fall");
      } else if (
        currentStats.weatherCode == 80 ||
        currentStats.weatherCode == 81 ||
        currentStats.weatherCode == 82
      ) {
        setCurrentIcon("/heavyRain.png");
        setCondition("Rain shower");
      } else if (
        currentStats.weatherCode == 86 ||
        currentStats.weatherCode == 85
      ) {
        setCurrentIcon("snow-shower.png");
        setCondition("Snow shower");
      } else if (currentStats.weatherCode == 95) {
        setCurrentIcon("thunderStormNight.png");
        setCondition("ThunderStorm");
      }
    }
  }, [currentStats.isDay, currentStats.weatherCode]);

  useEffect(() => {
    const api = `https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=6847e0b25d6e4ebd89d05dd0aed71f50`;
    try {
      axios.get(api).then((response) => {
        setReverseGeo(response.data.features);
      });
    } catch (error) {
      console.log(error);
    }
  }, [location]);

  return (
    <div
      className={`w-full  flex justify-center items-center  ${
        currentStats.isDay == 1 ? "bg-[#e9e9e9]" : "bg-[#101010]"
      } iphone:flex-col ipadTablet:flex-row ipadTablet:items-center  ipadTablet:h-[100vh] gap-5`}
    >
      <div className="w-[90%]  flex iphone:flex-col ipadTablet:flex-row ipadTablet:items-center ipadTablet:h-[95%] ">
        <div
          className={`px-3 ipadTablet:w-[40%] rounded-l-3xl h-full ${
            currentStats.isDay == 1 ? "bg-slate-50" : "bg-[black]"
          }`}
        >
          <div className="h-full flex iphone:flex-col ipadTablet:flex-col ipadTablet:justify-around iphone:justify-between   px-3 items-start">
            <div className="w-full relative z-[99]">
              <input
                onChange={(e) => {
                  setSearchPlace(e.target.value);
                }}
                value={searchPlace}
                className={`iphone w-full h-[50px] focus:outline-none focus:shadow-lg transition-all duration-300  ${
                  currentStats.isDay == 1
                    ? "bg-[#cecece] text-slate-800 placeholder:text-slate-600"
                    : "bg-[#242424] text-slate-200 placeholder:text-slate-100"
                } iphone:mt-5 ipadTablet:mt-0 rounded-full text-[1.1rem] font-semibold px-4`}
                placeholder="Search Location"
              />

              {searchres.length !== 0 && (
                <div
                  className={`absolute w-full top-[40%] z-[-1] h-auto pb-5 ${
                    currentStats.isDay == 1 ? "bg-[#cecece]" : "bg-[#242424] "
                  } transition-all duration-500 rounded-xl`}
                >
                  <div className="mt-10 px-3 transition-all duration-500">
                    {searchres?.results?.map((city) => {
                      return (
                        <p
                          onClick={() => handleSearch(city.id)}
                          key={city?.id}
                          className={`text-[1.4em] transition-all duration-500 font-RegFont cursor-pointer ]
                          ${
                            currentStats.isDay == 1
                              ? "bg-[#cecece]  hover:bg-[#cecece] text-slate-900"
                              : "bg-[#242424]  hover:bg-[#242424] text-slate-200"
                          }
                          `}
                        >
                          {city?.admin1} <span>, {city?.country}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className=" ">
              <div className="w-[65%] ">
                <img src={`${currentIcon}`} className="w-full h-full" />
              </div>

              <div className="flex  justify-start">
                <p
                  className={`font-RedHat text-[90px]  ${
                    currentStats.isDay == 1
                      ? "text-slate-800"
                      : "text-slate-200"
                  }`}
                >
                  {weatherData?.current?.temperature_2m}
                </p>

                <p
                  className={`font-RedHat text-[60px]  ${
                    currentStats.isDay == 1
                      ? "text-slate-800"
                      : "text-slate-200"
                  }`}
                >
                  &deg;
                </p>

                <p
                  className={`font-RedHat text-[70px]  ${
                    currentStats.isDay == 1
                      ? "text-slate-800"
                      : "text-slate-200"
                  }`}
                >
                  c
                </p>
              </div>
              <p
                className={`font-satoshi text-[20px]   ${
                  currentStats.isDay == 1 ? "text-slate-800" : "text-slate-200"
                }`}
              >
                {moment().format("dddd")}{" "}
                <span className="text-slate-500">
                  {moment().format("hh:mm a")}
                </span>
              </p>
            </div>
            <div className=" border-slate-700 opacity-[.2] h-[1px] border w-full"></div>
            <div className="flex flex-col gap-2 w-full ">
              <p
                className={`font-satoshi text-[20px]  ${
                  currentStats.isDay == 1 ? "text-slate-800" : "text-slate-200"
                }`}
              >
                {condition}
              </p>
              <div className="flex items-center gap-4">
              <img className="w-[35px]" src="rainIcon.png" />
                <p
                  className={`font-satoshi text-[20px]  ${
                    currentStats.isDay == 1
                      ? "text-slate-800"
                      : "text-slate-200"
                  }`}
                >
                  Rain {currentStats?.rainProbability}%
                </p>
                
              </div>
            </div>
            <div
              className={`flex justify-center items-center w-full h-[90px]  ${
                currentStats.isDay == 1 ? "bg-[#cecece]" : " bg-[#242424]"
              } rounded-xl`}
            >
              <p
                className={`text-[1.3em] font-generalSans font-medium ${
                  currentStats.isDay == 1 ? "text-slate-900" : "text-slate-200 "
                }`}
              >
                {currentStats.address}, <span>{currentStats.state},</span>{" "}
                <span className="capitalize">{currentStats.countryCode}</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className={`  w-full ${
            currentStats.isDay == 1 ? "bg-[#cecece]" : "bg-[#2f2f2f]"
          } h-full  rounded-r-3xl `}
        >
          <div className="w-full h-full flex flex-col-reverse justify-around ">
            <div className="py-2">
              <p
                className={`px-12 text-[1.4em] mt-1 font-satoshi font-medium  ${
                  currentStats.isDay == 1 ? "text-slate-800" : "text-slate-200"
                }`}
              >
                Today`s Highlight
              </p>
              <CurrentWeatherInfo
                current={currentStats}
                location={location}
                isDay={currentStats.isDay}
              />
            </div>

            <div className="py-2 ">
              <p
                className={`px-12 text-[1.3em] font-satoshi font-medium ${
                  currentStats.isDay == 1 ? "text-slate-800" : "text-slate-200"
                } mt-1`}
              >
                Week
              </p>
              <ForecastDayCard
                min={daily_temp_Min}
                max={daily_temp_Max}
                dailyTime={dailyTime}
                weatherCode={daily_weather_code}
                isDay={currentStats.isDay}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
