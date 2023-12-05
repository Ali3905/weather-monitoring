import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Map from './MapComponent'

const PolygonData = ({polygon}) => {
    const [soilData, setSoilData] = useState(null)
    const [UVIData, setUVIData] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    
    const getSoilData = async() => {
        const res = await axios({
            method : "get",
            url : `http://api.agromonitoring.com/agro/1.0/soil?polyid=${polygon.polygon_id}&appid=778761e9e8a810e53ab4c02784115c3d`,
            
        })
        setSoilData(res.data)
    }
    const getUVIData = async() => {
        const res = await axios({
            method : "get",
            url : `http://api.agromonitoring.com/agro/1.0/uvi?polyid=${polygon.polygon_id}&appid=778761e9e8a810e53ab4c02784115c3d`,
            
        })
        setUVIData(res.data)
    }
    const getWeatherData = async() => {
        const res = await axios({
            method : "get",
            url : `https://api.agromonitoring.com/agro/1.0/weather?lat=${polygon.lat}&lon=${polygon.long}&appid=778761e9e8a810e53ab4c02784115c3d`,
            
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
    <div className='mt-8 flex flex-col gap-5 w-full'>
      <h2 className='font-bold text-2xl'>{polygon.name}</h2>
      <div className='map_data_grid gap-4 w-full'>
        <Map polygon={polygon}/>
        <div className='flex flex-col gap-5'>
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
      </div>
    </div>
  )
}

export default PolygonData
