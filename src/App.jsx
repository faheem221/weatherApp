'use client'
import React, {useCallback, useEffect, useState} from 'react'
import axios from 'axios';
import cloud from 'remixicon-react/CloudLineIcon' 
import ArrowDown from 'remixicon-react/ArrowDownLineIcon'

import ArrowUp from 'remixicon-react/ArrowUpLineIcon'
 

const App = () => {
  const [getCurrentLattitude, setGetCurrentLattitude] = useState(0)
  const [getCurrentLongitude, setGetCurrentLongitude] = useState(0)
  const currentWeatherApiKey = '38b1749b721f46da8a772913230210'
  const [city, setCity] = useState('New Delhi')
  const [currentweatherdata, setCurrentweatherdata] = useState({})
  const [forecastweatherextras, setForecastweatherextras] = useState([])
  const [chanceofRain, setChanceofRain] = useState('2')
  const [sunset, setSunset] = useState('06:00 pm')
  const [sunrise, setSunrise] = useState('05:00 am')
  const[countryCodes, setCountryCodes] = useState('In')
  const [feelslikeCondition, setFeelslikeCondition] = useState('Normal')
  const [allcountrycode, setAllCountrycode] = useState([])

  const currentweatherapicall = async () =>{
    try {
      await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${currentWeatherApiKey}&q=${city}`)
    .then((res)=>{
      const currentWeather = {
        city:`${res.data.location.name}`,
        currentTemp:`${res.data.current.temp_c}`,
        windSpeed:`${res.data.current.wind_kph}`,
        windDirection:`${res.data.current.wind_dir}`,
        humidity:`${res.data.current.humidity}`,
        visibility:`${res.data.current.vis_km}`,
        feelsLike:`${res.data.current.feelslike_c}`,
        condition:`${res.data.current.condition.text}`,
        country:`${res.data.location.country}`
      }

      const tempForecast = res.data.forecast.forecastday
 
      setForecastweatherextras(tempForecast)



      setCurrentweatherdata(currentWeather)
      
    }
    )
    } catch (error) {
      
    }
  
  }
  useEffect(()=>{
    forecastweatherextras.map((obj)=>{
      setSunset(obj.astro.sunset)
      setSunrise(obj.astro.sunrise)
      setChanceofRain(obj.day.daily_chance_of_rain)
    })
  }, [forecastweatherextras, city])
  
  
  
  
  useEffect(()=>{
    currentweatherapicall()
    
  }, [city])
  
  

  useEffect(()=>{
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition((position)=>{
        setGetCurrentLattitude(position.coords.latitude)
        setGetCurrentLongitude(position.coords.longitude)
      })
  }
  else{
    console.error('Check Location permission')
  }

  },[])

  const weatherIcons = {
    sunny: `https://cdn-icons-png.flaticon.com/512/3222/3222691.png`,
    clear: `https://cdn-icons-png.flaticon.com/512/3222/3222691.png`,
    cloudy: `https://cdn-icons-png.flaticon.com/512/1163/1163736.png`,
    mist:`https://cdn-icons-png.flaticon.com/512/175/175872.png`,
    fog:`https://cdn-icons-png.flaticon.com/512/175/175872.png`,
    Thunderstorm: ` https://cdn-icons-png.flaticon.com/512/3104/3104612.png`,
    windy: ` https://cdn-icons-png.flaticon.com/512/3026/3026375.png`,
    sleet: `https://cdn-icons-png.flaticon.com/512/7084/7084507.png`
  }
  const [icon, setIcon] = useState(`https://cdn-icons-png.flaticon.com/512/3222/3222691.png`)

   

  useEffect(()=>{
    const countryAlphaCode = async () =>{
      axios.get('https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json')
      .then(res=>{setAllCountrycode(res.data)})
    }
    allcountrycode.filter((country)=>{
      if(country.Name == currentweatherdata.country){
        setCountryCodes(country.Code)
      }
      else{
        console.log(false)
      }

      })

    countryAlphaCode()
  }, [city])
 
  return (

      <div className='flex justify-center items-center w-full bg-[#Dedede] h-[100vh]'>
        <div className='flex max-w-1240px h-[95vh]'>

            <div className=' flex justify-center w-[300px] bg-slate-50 rounded-l-3xl'>
             <div className='flex flex-col '>
                  <form className='mt-5' onSubmit={(e)=>{
                    e.preventDefault()
                    setCity('')
                    }}>
                    <input className='bg-slate-200 relative rounded-3xl w-[260px] h-[35px] px-3 focus:outline-none focus:shadow-[0_0px_15px_0px_#FFD710] transition-shadow z-[99]' placeholder='Search City...' onChange={e=>setCity(e.target.value)} value={city}/>
                  </form> 
                  <div className=' w-[200px] mt-8'><img src={icon}/></div>
                  <div className='' ><p className='text-[6.8em] font-RedHat'>{currentweatherdata.currentTemp}&deg;c</p> <div className='mt-[-13px]' ><p className='text-[1.2em] text-slate-600'>Monday, 16:00</p></div></div>
                  <div className='font-RegFont mt-5  py-3' >
                      <div className='mt-1 text-[.9em] flex'> <div className='w-[20px]' ><img src={'https://cdn-icons-png.flaticon.com/512/399/399421.png'} /></div> <p className='ml-2'> {currentweatherdata.condition}</p></div>
                      <div className='mt-1 text-[.9em] flex' > <div className='w-[20px]' ><img src={'https://cdn-icons-png.flaticon.com/512/1779/1779907.png'} /></div> <p className='ml-2' >Chances of Rain: {chanceofRain}%</p></div>
                  </div>
                  <div className=' w-[100%] h-[80px] rounded-3xl border flex justify-center items-center border-slate-400' >
                        <p className='font-RegFont text-[1.5em] font-semibold'>{currentweatherdata.city}, <span className='text-[.6em]'>{countryCodes}</span> </p>
                  </div>
             </div>

            </div>


            <div className='w-[900px] bg-[#Ececec]  rounded-r-3xl'>
                  <div className=''>
                      <div className='px-12 mt-6 '>
                          <p className='border-b border-slate-400 inline-block'>Week</p>
                      </div>

                      <div className='flex justify-center items-center mt-[20px] '>
                      <div className='grid grid-cols-7 w-[800px] place-items-center ' >
                          
                          <div className='w-[105px] h-[120px] bg-white rounded-xl flex flex-col items-center gap-1'>
                              <p className='mt-1'>Sun</p>
                              <div className='w-[55px]'><img src='https://cdn-icons-png.flaticon.com/512/146/146182.png' /></div>
                              <div className='font-RedHat text-[1.1em]'>15&deg;</div>
                            </div>

                            <div className='w-[105px] h-[120px] bg-white rounded-xl flex flex-col items-center gap-1'>
                              <p className='mt-1'>Mon</p>
                              <div className='w-[55px]'><img src='https://cdn-icons-png.flaticon.com/512/146/146182.png' /></div>
                              <div className='font-RedHat text-[1.1em]'>15&deg;</div>
                            </div>
                            


                            <div className='w-[105px] h-[120px] bg-white rounded-xl flex flex-col items-center gap-1'>
                              <p className='mt-1 font-RegFont'>Tue</p>
                              <div className='w-[55px]'><img src='https://cdn-icons-png.flaticon.com/512/146/146182.png' /></div>
                              <div className='font-RedHat text-[1.1em]'>15&deg;</div>
                            </div>

                            <div className='w-[105px] h-[120px] bg-white rounded-xl flex flex-col items-center gap-1'>
                              <p className='mt-1 font-RegFont'>Wed</p>
                              <div className='w-[55px]'><img src='https://cdn-icons-png.flaticon.com/512/146/146182.png' /></div>
                              <div className='font-RedHat text-[1.1em]'>15&deg;</div>
                            </div>

                            <div className='w-[105px] h-[120px] bg-white rounded-xl flex flex-col items-center gap-1'>
                              <p className='mt-1 font-RegFont'>Thu</p>
                              <div className='w-[55px]'><img src='https://cdn-icons-png.flaticon.com/512/146/146182.png' /></div>
                              <div className='font-RedHat text-[1.1em]'>15&deg;</div>
                            </div>

                            <div className='w-[105px] h-[120px] bg-white rounded-xl flex flex-col items-center gap-1'>
                              <p className='mt-1 font-RegFont'>Fri</p>
                              <div className='w-[55px]'><img src='https://cdn-icons-png.flaticon.com/512/146/146182.png' /></div>
                              <div className='font-RedHat text-[1.1em]'>15&deg;</div>
                            </div>
                            <div className='w-[105px] h-[120px] bg-white rounded-xl flex flex-col items-center gap-1'>
                              <p className='mt-1 font-RegFont'>Sat</p>
                              <div className='w-[55px]'><img src='https://cdn-icons-png.flaticon.com/512/146/146182.png' /></div>
                              <div className='font-RedHat text-[1.1em]'>15&deg;</div>
                            </div>

                           
                      </div>

                      </div>

                    </div>


                 
                  <div className='px-12 mt-9 '>
                          <p className=''>Today's Highlight</p>
                      </div>

                      <div className='flex justify-center items-center mt-[20px] '>
                      <div className='grid grid-cols-3 grid-rows-2 w-[800px] place-items-center gap-y-4 ' >
                           
                          <div className='w-[260px] h-[190px] bg-white rounded-xl '>
                               <p className='text-slate-600 px-4 py-2 font-RegFont'>Air Quality</p>
                               <div className='flex gap-8'>
                                    <div>
                                        <p className='text-[4.5em] font-RedHat px-4 w-[135px]'>89 </p>
                                        <p className='font-RegFont px-4'>Good</p>
                                    </div>

                                    <div className=' w-[40px] rounded-full flex justify-center border'>
                                        <div className='bg-[#00FFBF] w-[35px] h-[35px] rounded-full mt-[2px] translate-y-[80px]'></div>
                                    </div>
                              </div>
                            </div>

                            <div className='w-[260px] h-[190px] bg-white rounded-xl '>
                            <p className='text-slate-600 px-4 py-2'>Wind Speed</p>

                            <p className='text-[4.5em] font-RedHat px-4'>{currentweatherdata.windSpeed} <span className='text-[.5em]'>km/h</span> </p>
                               <p className='font-RegFont px-4 flex items-center'><div className='w-[30px] h-[30px] flex justify-center items-center border rounded-full mr-3'><img className='w-[80%]' src='https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png' /></div>{currentweatherdata.windDirection}</p>
                            </div>


                            <div className='w-[260px] h-[190px] bg-white rounded-xl '>
                                <p className='text-slate-600 px-4 py-2'>Sunrise Sunset</p>
                                <div className='flex'>
                                <div className='flex flex-col gap-6 px-4'>
                                  <div className='w-[55px] relative'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/146/146182.png' />
                                    <ArrowUp className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />
                                  </div>
                               
                                  <div className='w-[55px] relative'>
                                    <img src='https://cdn-icons-png.flaticon.com/512/146/146182.png' />
                                    <ArrowDown className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />
                                  </div>

                                </div>

                                <div className='flex flex-col gap-9'>
                                    <p className='font-RedHat text-[1.7em] mt-2'>{sunrise}</p>
                                    <p className='font-RedHat text-[1.7em]'>{sunset}</p>
                                </div>

                                </div>

                            </div>

                            <div className='w-[260px] h-[190px] bg-white rounded-xl '>
                            <p className='text-slate-600 px-4 py-2'>Visibilty</p>
                            <p className='text-[4.5em] font-RedHat px-4'>{currentweatherdata.visibility}<span className='text-[.5em]'>km</span></p>
                               <p className='font-RegFont px-4'>Low</p>
                            </div>

                            <div className='w-[260px] h-[190px] bg-white rounded-xl '>
                              <p className='text-slate-600 px-4 py-2'>Humidity</p>
                              <div className='flex gap-8'>
                                    <div>
                                        <p className='text-[4.5em] font-RedHat px-4'>{currentweatherdata.humidity}<span className='text-[.5em]'>%</span></p>
                                        <p className='font-RegFont px-4'>Normal</p>
                                    </div>

                                    <div className=' w-[40px] rounded-full flex justify-center border'>
                                        <div className='bg-blue-500 w-[35px] h-[35px] rounded-full mt-[2px]'></div>
                                    </div>
                              </div>

                            </div>

                            <div className='w-[260px] h-[190px] bg-white rounded-xl '>
                                <p className='text-slate-600 px-4 py-2'>Feels like</p>
                                <p className='font-RedHat text-[4.5em] px-4'>{currentweatherdata.feelsLike}&deg;</p>
                                <div className='w-[30px] ml-2 flex font-RegFont items-center'><img src={'https://upload.wikimedia.org/wikipedia/en/d/d5/Thermometer_icon.png'} />{feelslikeCondition}</div>
                            </div>
                            

                           
                      
                      </div>
                  </div>
             </div>


          </div>

      </div>
  )
}

export default App
