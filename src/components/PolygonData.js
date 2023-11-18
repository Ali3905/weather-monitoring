import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PolygonData = ({polygon}) => {
    const [soilData, setSoilData] = useState(null)
    const [UVIData, setUVIData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    
    const getSoilData = async() => {
        const res = await axios({
            method : "get",
            url : `http://api.agromonitoring.com/agro/1.0/soil?polyid=${polygon.polygon_id}&appid=39616ee7914d351dca20ec8e000b1b64`,
            
        })
        setSoilData(res.data)
    }
    const getUVIData = async() => {
        const res = await axios({
            method : "get",
            url : `http://api.agromonitoring.com/agro/1.0/uvi?polyid=${polygon.polygon_id}&appid=39616ee7914d351dca20ec8e000b1b64`,
            
        })
        setUVIData(res.data)
    }
    const getWeatherData = async() => {
        const res = await axios({
            method : "get",
            url : `https://api.agromonitoring.com/agro/1.0/weather?lat=${polygon.lat}&lon=${polygon.long}&appid=39616ee7914d351dca20ec8e000b1b64`,
            
        })
        console.log(res);
        setWeatherData(res.data)
    }

    useEffect(()=>{
        getSoilData()
        getUVIData()
        getWeatherData()
    }, [polygon])

  return (
    <div className='mt-8 flex gap-5'>
      {soilData !== null && <div className='border border-gray-400 p-4'>
        <p className='text-base font-bold'>Soil Data</p>
      <p> Moisture : {soilData.moisture}</p>
      <p> Temperature at 10cm depth : {soilData.t10}K</p>
      <p> Temperature at surface : {soilData.t0}K</p>
      </div>}
      {UVIData !== null && <div className='border border-gray-400 p-4'>
        <p className='text-base font-bold'>UVI Data</p>
      <p> UV Index : {UVIData.uvi}</p>
      </div>}
      {weatherData !== null && <div className='border border-gray-400 p-4'>
        <p className='text-base font-bold'>Weather Data</p>
      <p> Temperature : {weatherData.main.temp}K</p>
      <p> Feels Like : {weatherData.main.feels_like}K</p>
      <p> Humidity : {weatherData.main.humidity}%</p>
      <p> Wind Speed : {weatherData.wind.speed} meter per second</p>
      <p> Wind Direction : {weatherData.wind.deg} degrees</p>
      </div>}
    </div>
  )
}

export default PolygonData
