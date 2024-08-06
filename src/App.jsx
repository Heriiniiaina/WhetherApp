import React,{useEffect, useState} from 'react'
import Daily from './Composant/Daily'
import Hourly from './Composant/Hourly'
import Details from './Composant/Datails'
import Current from './Composant/Current'
import axios from 'axios'

import "./App.css"
export default function App() {
  const [weatherData,setWeatherData] = useState(null)
  const [loading,SetLoading] = useState(null)
  const [error , setError] = useState(null)
  const apiKey = '0f5c9de4e91047abbd795306240608';
  const city = 'Antananarivo'; 
  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
          params: {
            key: apiKey,
            q: city,
            days: 10,
            aqi: 'yes',
            alerts: 'no'
          }
        });
        setWeatherData(response.data)
      } catch (error) {
        setError(error)
      } finally{
        SetLoading(false)
      }
    }
    fetchData()
  },[])
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!weatherData) return <div>No data available</div>;
  const current = {
    location: weatherData.location.name,
    temperature: weatherData.current.temp_c,
    description: weatherData.current.condition.text,
    summary: weatherData.current.condition.text,
  }
  const hourly= weatherData.forecast.forecastday[0].hour.map(hour => ({
    time: hour.time.split(' ')[1],
    temperature: hour.temp_c,
    icon: hour.condition.icon,
    description: hour.condition.text,
  }))
  const daily = weatherData.forecast.forecastday.map(day => ({
    date: day.date,
    temperature: day.day.avgtemp_c,
    icon: day.day.condition.icon,
    description: day.day.condition.text,
  }))
  const details = [
    { title: 'Feels Like', value: `${weatherData.current.feelslike_c}°` },
    { title: 'Precipitation', value: `${weatherData.current.precip_mm} mm` },
    { title: 'Visibility', value: `${weatherData.current.vis_km} km` },
    { title: 'Humidity', value: `${weatherData.current.humidity}%` },
    { title: 'UV Index', value: weatherData.current.uv },
    { title: 'Wind', value: `${weatherData.current.wind_kph} kph` },
  ];
 
   return <div className='App'>
    <div className='current'>
    <Current weather={current}/>
    </div>
    <div className='forecast'>
    <Hourly forecast={hourly}/>
    <Daily forecast={daily}/>
    
    </div>
      
      
   </div>
}
