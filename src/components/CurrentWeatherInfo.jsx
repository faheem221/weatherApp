/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
 
import React, { useEffect, useState } from "react";
import moment from "moment";
import Loader from "../components/loader";
import Loader2 from "./loader2";
const CurrentWeatherInfo = (props) => {
  const sunset = moment(props.current.sunset).format("h:mm a");
  const sunrise = moment(props.current.sunrise).format("h:mm a");
  const [airQuality, setAirQuality] = useState("Loading");
  const [uv, setUv] = useState(null);
  const [speed, setSpeed] = useState("Loading");
  const [humidity, setHumidity] = useState("Loading");

  const [airQualityScale, setAirQualityScale] = useState(95)
  

  useEffect(() => {
    if (props.current.airPollution < 50) {
      setAirQuality("Good");
      setAirQualityScale(85);
    } else if (
      props.current.airPollution < 100 &&
      props.current.airPollution > 51
    ) {
      setAirQuality("Moderate");
      setAirQualityScale(60);
    } else if (
      props.current.airPollution < 150 &&
      props.current.airPollution > 101
    ) {
      setAirQuality("Unhealthy");
      setAirQualityScale(35);
    } else if (
      props.current.airPollution < 200 &&
      props.current.airPollution > 151
    ) {
      setAirQuality("Unhealthy");
      setAirQualityScale(20);
    } else if (
      props.current.airPollution < 300 &&
      props.current.airPollution > 201
    ) {
      setAirQuality(<p>Severe</p>);
      setAirQualityScale(13);
    } else if (props.current.airPollution > 300) {
      setAirQuality("Hazardous");
      setAirQualityScale(13);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.current.airPollution, airQualityScale]);

  useEffect(() => {
    if (
      Math.round(props.current.uvIndex) > 0 &&
      Math.round(props.current.uvIndex) <= 2
    ) {
      setUv("Low");
    } else if (
      Math.round(props.current.uvIndex) > 3 &&
      Math.round(props.current.uvIndex) <= 5
    ) {
      setUv("medium");
    }
    if (
      Math.round(props.current.uvIndex) > 6 &&
      Math.round(props.current.uvIndex) <= 7
    ) {
      setUv("High");
    }

    if (
      Math.round(props.current.uvIndex) > 8 &&
      Math.round(props.current.uvIndex) <= 10
    ) {
      setUv("Very High");
    }
    if (Math.round(props.current.uvIndex) > 10) {
      setUv("Extreme");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.current.uvIndex]);

  useEffect(() => {
    if (Math.round(props.current.humidity) < 20) {
      setHumidity("Dry");
    } else if (
      Math.round(props.current.humidity) > 20 &&
      Math.round(props.current.humidity) <= 60
    ) {
      setHumidity("Comfortable");
    }
    if (Math.round(props.current.humidity) > 61) {
      setHumidity("Wet");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.current.humidity]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (Math.round(props.current.windSpeed) < 1) {
      setSpeed("Calm");
    } else if (
      Math.round(props.current.windSpeed) <= 5 &&
      Math.round(props.current.windSpeed) >= 1
    ) {
      setSpeed("Light air");
    } else if (
      Math.round(props.current.windSpeed) <= 6 &&
      Math.round(props.current.windSpeed) >= 4
    ) {
      setSpeed("Light Breeze");
    } else if (
      Math.round(props.current.windSpeed) <= 10 &&
      Math.round(props.current.windSpeed) >= 7
    ) {
      setSpeed("Gentle Breeze");
    } else if (
      Math.round(props.current.windSpeed) <= 16 &&
      Math.round(props.current.windSpeed) >= 11
    ) {
      setSpeed("Moderate Breeze");
    } else if (
      Math.round(props.current.windSpeed) < 21 &&
      Math.round(props.current.windSpeed) >= 17
    ) {
      setSpeed("Fresh Breeze");
    } else if (
      Math.round(props.current.windSpeed) < 27 &&
      Math.round(props.current.windSpeed) >= 22
    ) {
      setSpeed("String Breeze");
    } else if (
      Math.round(props.current.windSpeed) < 33 &&
      Math.round(props.current.windSpeed) >= 28
    ) {
      setSpeed("Near Gale");
    } else if (
      Math.round(props.current.windSpeed) < 40 &&
      Math.round(props.current.windSpeed) >= 34
    ) {
      setSpeed("Gale");
    } else if (
      Math.round(props.current.windSpeed) < 47 &&
      Math.round(props.current.windSpeed) >= 41
    ) {
      setSpeed("Strong Gale");
    } else if (
      Math.round(props.current.windSpeed) < 55 &&
      Math.round(props.current.windSpeed) >= 48
    ) {
      setSpeed("Storm");
    } else if (
      Math.round(props.current.windSpeed) < 63 &&
      Math.round(props.current.windSpeed) >= 56
    ) {
      setSpeed("Violent Storm");
    } else if (Math.round(props.current.windSpeed) > 64) {
      setSpeed("Hurricane");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.current.windSpeed]);
 
  return (
    <div className="grid h-full iphone:grid-cols-2 ipadTablet:grid-cols-3 place-items-center px-12  iphone:grid-rows-6 ipadTablet:grid-rows-2 iphone:gap-1 ipadTablet:gap-2 mt-1 ">
      <div
        className={` w-full rounded-xl iphone:h-[150px] ipadTablet:h-[100%] ${
          props.isDay == 1 ? "bg-slate-50" : " bg-[black]"
        }`}
      >
        <p
          className={`px-3 py-2 font-satoshi font-semibold ${
            props.isDay == 1 ? "text-slate-900" : " text-slate-200"
          }`}
        >
          Air Quality
        </p>
        <div className="w-full h-[60%] flex justify-center items-center">
          {props.current.airPollution ? (
            <div className="flex items-center gap-14 justify-center w-full h-full">
              <p
                className={`text-[3.5rem] text-center font-RedHat ${
                  props.isDay == 1 ? "text-slate-900" : " text-slate-200"
                }`}
              >
                {props.current.airPollution}
              </p>
            </div>
          ) : (
            <Loader />
          )}
        </div>
        <div className="w-full h-[30px] ">
          {props.current.airPollution ? (
            <p
              className={`px-3 font-satoshi font-medium ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {airQuality}
            </p>
          ) : (
            <Loader2 />
          )}
        </div>
      </div>

      <div
        className={` w-full rounded-xl iphone:h-[150px] ipadTablet:h-[100%] ${
          props.isDay == 1 ? "bg-slate-50" : " bg-[black]"
        }`}
      >
        <p
          className={`px-3 py-2 font-satoshi font-semibold ${
            props.isDay == 1 ? "text-slate-900" : " text-slate-200"
          }`}
        >
          Wind Speed
        </p>
        <div className="w-full h-[60%] flex justify-center items-center">
          {props.current.windSpeed ? (
            <p
              className={`text-[3.5rem] text-center font-RedHat ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {props.current.windSpeed}
              <span className="text-[33px] font-RedHat">Km/h</span>
            </p>
          ) : (
            <Loader />
          )}
        </div>
        <div className="w-full h-[30px] ">
          {props.current.windSpeed ? (
            <p
              className={`px-3 font-satoshi font-medium ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {speed}
            </p>
          ) : (
            <Loader2 />
          )}
        </div>
      </div>
      <div
        className={` w-full rounded-xl iphone:h-[150px] ipadTablet:h-[100%] ${
          props.isDay == 1 ? "bg-slate-50" : " bg-[black]"
        }`}
      >
        <p
          className={`px-3 py-2 font-satoshi font-semibold ${
            props.isDay == 1 ? "text-slate-900" : " text-slate-200"
          }`}
        >
          Visibility
        </p>
        <div className="w-full h-[60%] flex justify-center items-center">
          {props.current.visibility ? (
            <p
              className={`text-[3.5rem] text-center font-RedHat ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {props.current.visibility}
              <span className="text-[33px] font-RedHat">Km</span>
            </p>
          ) : (
            <Loader />
          )}
        </div>
        <p
          className={`px-3 font-satoshi font-medium ${
            props.isDay == 1 ? "text-slate-900" : " text-slate-200"
          }`}
        >
          Good
        </p>
      </div>
      <div
        className={` w-full rounded-xl iphone:h-[150px] ipadTablet:h-[100%] ${
          props.isDay == 1 ? "bg-slate-50" : " bg-[black]"
        }`}
      >
        <p
          className={`px-3 py-2 font-satoshi font-semibold ${
            props.isDay == 1 ? "text-slate-900" : " text-slate-200"
          }`}
        >
          Humidity
        </p>

        <div className="w-full h-[60%] flex justify-center items-center">
          {props.current.humidity ? (
            <p
              className={`text-[3.5rem] text-center font-RedHat ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {props.current.humidity}%
            </p>
          ) : (
            <Loader />
          )}
        </div>
        <div className="w-full h-[30px] ">
          {props.current.humidity ? (
            <p
              className={`px-3 font-satoshi font-medium ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {humidity}
            </p>
          ) : (
            <Loader2 />
          )}
        </div>
      </div>
      <div
        className={` w-full rounded-xl iphone:h-[150px] ipadTablet:h-[100%] ${
          props.isDay == 1 ? "bg-slate-50" : " bg-[black]"
        }`}
      >
        <p
          className={`px-3 py-2 font-satoshi font-semibold ${
            props.isDay == 1 ? "text-slate-900" : " text-slate-200"
          }`}
        >
          Uv Index
        </p>
        <div className="w-full h-[60%] flex justify-center items-center">
          {props.current.uvIndex ? (
            <p
              className={`text-[3.5rem] text-center  font-RedHat ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {props.current.uvIndex}{" "}
            </p>
          ) : (
            <Loader />
          )}
        </div>
        <div className="w-full h-[30px] ">
          {props.current.uvIndex ? (
            <p
              className={`px-3 capitalize font-satoshi font-medium ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {uv}
            </p>
          ) : (
            <Loader2 />
          )}
        </div>
      </div>
      <div
        className={` w-full rounded-xl iphone:h-[150px] ipadTablet:h-[100%] ${
          props.isDay == 1 ? "bg-slate-50" : " bg-[black]"
        }`}
      >
        <p
          className={`px-3 py-2 font-satoshi font-semibold ${
            props.isDay == 1 ? "text-slate-900" : " text-slate-200"
          }`}
        >
          Sunrise & Sunset
        </p>
        <div className="flex flex-col justify-center px-3">
          <div className="flex items-center gap-4">
            <img
              className="w-[80px] h-[80px]"
              src="https://cdn-icons-png.flaticon.com/512/1163/1163765.png"
            />
            <p
              className={`text-[2.5rem] text-center font-RedHat ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {sunrise}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <img
              className="w-[80px] h-[80px]"
              src="https://cdn-icons-png.flaticon.com/512/1163/1163765.png"
            />
            <p
              className={`text-[2.5rem] text-center font-RedHat ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {sunset}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherInfo;
