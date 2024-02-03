/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
const ForecastDayCard = (props) => {
 
  console.log(props.weatherCode)
   
  



  return (
    <div className="grid ipadTablet:grid-cols-7 place-items-center px-12 mt-1 gap-2  w-full h-full">
      {props?.dailyTime?.map((time,index) => {
        return (
          <div
            key={index}
            className={`${
              props.isDay == 1 ? "bg-slate-50" : " bg-[black]"
            } w-full h-full rounded-xl py-1 flex flex-col justify-center items-center`}
          >
            <p
              className={`px-2 py-1 ipadTablet:text-center font-satoshi font-semibold ${
                props.isDay == 1 ? "text-slate-900" : " text-slate-200"
              }`}
            >
              {moment(props.dailyTime[index]).format("ddd")}
            </p>

            <div className="flex iphone:flex-row ipadTablet:flex-col iphone:justify-between iphone:items-center ipadTablet:gap-2  px-5">
              <div className="w-[100%]  h-[100%] ">
                {props.weatherCode.map((item, id) => {
                  if (id === index) {
                    if (props.isDay == 1) {
                      if (props.weatherCode[index] == 0) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="day_clear_sky.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 1 ||
                        props.weatherCode[index] == 2 ||
                        props.weatherCode[index] == 3
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="partly-cloudy.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 48 ||
                        props.weatherCode[index] == 45
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="day-fog.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 51 ||
                        props.weatherCode[index] == 53 ||
                        props.weatherCode[index] == 55 ||
                        props.weatherCode[index] == 56 ||
                        props.weatherCode[index] == 57
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="drizzle.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 61 ||
                        props.weatherCode[index] == 63 
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img
                              className="w-[78%]"
                              src="day-normal-rain.png"
                            />
                          </div>
                        );
                      }
                      else if(props.weatherCode[index] == 65){
                        return (
                          <img className="w-[78%]" src="day-rain-shower.png" />
                        );
                      }
                      
                       else if (
                        props.weatherCode[index] == 66 ||
                        props.weatherCode[index] == 67 ||
                        props.weatherCode[index] == 71 ||
                        props.weatherCode[index] == 73 ||
                        props.weatherCode[index] == 75 ||
                        props.weatherCode[index] == 77
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="snow-fall.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 80 ||
                        props.weatherCode[index] == 81 ||
                        props.weatherCode[index] == 82
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="heavyRain.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 86 ||
                        props.weatherCode[index] == 85
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="snowShower.png" />
                          </div>
                        );
                      } else if (props.weatherCode[index] == 95) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img
                              className="w-[78%]"
                              src="thunderstorm-day.png"
                            />
                          </div>
                        );
                      }
                    }
                    if (props.isDay == 0) {
                      if (props.weatherCode[index] == 0) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="nightClear.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 1 ||
                        props.weatherCode[index] == 2 ||
                        props.weatherCode[index] == 3
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="nightCloudy.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 48 ||
                        props.weatherCode[index] == 45
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="night-fog.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 51 ||
                        props.weatherCode[index] == 53 ||
                        props.weatherCode[index] == 55 ||
                        props.weatherCode[index] == 56 ||
                        props.weatherCode[index] == 57
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="drizzle.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 61 ||
                        props.weatherCode[index] == 63  
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="nightRain.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 65
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img
                              className="w-[78%]"
                              src="night-rain-shower.png"
                            />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 66 ||
                        props.weatherCode[index] == 67 ||
                        props.weatherCode[index] == 71 ||
                        props.weatherCode[index] == 73 ||
                        props.weatherCode[index] == 75 ||
                        props.weatherCode[index] == 77
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="snow-fall.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 80 ||
                        props.weatherCode[index] == 81 ||
                        props.weatherCode[index] == 82
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="heavyRain.png" />
                          </div>
                        );
                      } else if (
                        props.weatherCode[index] == 86 ||
                        props.weatherCode[index] == 85
                      ) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img className="w-[78%]" src="snow-shower.png" />
                          </div>
                        );
                      } else if (props.weatherCode[index] == 95) {
                        return (
                          <div className="w-full h-full flex flex-col justify-center items-center">
                            <img
                              className="w-[78%]"
                              src="thunderStormNight.png"
                            />
                          </div>
                        );
                      }
                    }
                  }
                })}
              </div>
              <div className="flex items-center gap-1">
                <p
                  className={`text-[1.1em] font-medium font-RedHat ${
                    props.isDay == 1 ? "text-slate-900" : "text-slate-200"
                  }`}
                >
                  {props.max[index]}&deg;
                </p>
                <p
                  className={`text-[.8em] font-medium font-RedHat ${
                    props.isDay == 1 ? "text-slate-600" : "text-slate-400"
                  }`}
                >
                  {props.min[index]}&deg;
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastDayCard;
