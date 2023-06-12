import React from 'react';
import { useState } from 'react';
import './style.css';
import axios from 'axios';

export default function Home() {
  const [data,setData]=useState({
    celcius:10,
    name:'london',
    humidity:10,
    speed:2,
    weather:'',
    image:'./Images/cloud.png'
  })

  const [name,setName]=useState('London');
  const [error,setError]=useState('');

  const handleClick=()=> {
    if(name !== "") {
      const apiUrl= `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=433a65d960303830d0337466d5af16d1&units=metric`;
   axios.get(apiUrl)
   .then(res => {
      let imagePath=' ';
      if(res.data.weather[0].main=== "Clouds") {
        imagePath="./Images/cloud.png";
      }else if(res.data.weather[0].main=== "Clear") {
        imagePath="./Images/sunny.png";        
      }else if(res.data.weather[0].main=== "Rain") {
        imagePath="./Images/rain.png";        
      }else if(res.data.weather[0].main=== "Drizzle") {
        imagePath="./Images/drizzle.png";        
      }else if(res.data.weather[0].main=== "Mist") {
        imagePath="./Images/snow.png";        
      }else if(res.data.weather[0].main=== "Haze") {
        imagePath="./Images/haze.png"; 
      }else {
        imagePath="./Images/cloud.png";        
      }
       console.log(res.data);
        setData({celcius:res.data.main.temp, name:res.data.name,
                  humidity:res.data.main.humidity,speed:res.data.wind.speed,
                  weather:res.data.weather[0].main,image:imagePath})
                setError('');

   })
   .catch(err=> {
      if(err.response.status === 404) {
        setError("Invalid City Name")
      }else {
        setError('');
      }
   console.log(err)
  }); 
    }
  }
  return (
    <div className='container'>
        <div className="weather">
            <div className="search">
                <input type="text" placeholder="Enter city name" onChange={e=>setName(e.target.value)}/>
                <button><img src="./Images/search.png" alt="" onClick={handleClick}/></button>
            </div>
            <div className="error">
              <p>{error}</p>
            </div>
            <div className="winfo">
                <img id="weather" src={data.image} alt="" />
                <h1>{Math.round(data.celcius)} °C</h1> 
                <h2>{data.name}</h2> 
                <h2>{data.weather}</h2>

                <div className="details">
                  <div className="col">
                   <img src="./Images/humidity.png" alt="" />
                    <div className='humidity'>
                      <p>{Math.round(data.humidity)}</p>
                      <p>Humidity</p>
                    </div>
                  </div>
                  <div className="col">
                   <img src="./Images/wind.png" alt="" />
                    <div className='wind'>
                      <p>{Math.round(data.speed)} km/hr</p>
                      <p>Wind</p>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}
