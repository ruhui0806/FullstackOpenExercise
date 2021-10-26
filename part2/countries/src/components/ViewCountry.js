import React, { useEffect, useState } from 'react'
import axios from 'axios'



const ViewCountry = ({thisCountry}) => {
    const [weather, setWeather] = useState([]);
    console.log(process.env.REACT_APP_API_KEY)
    
    useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${thisCountry.capital}`)
        .then(response => {
            console.log(response.data)
            const currentWeather = response.data.current;
            setWeather(currentWeather)
        }).catch(error => {
            console.log(error)
        })
}, [thisCountry.capital])
    return (
    <>
        <h2>{thisCountry.name.common}</h2>
        <p>capital {thisCountry.capital} </p>
        <p>population {thisCountry.population} </p>
        <h2>languages</h2>
        <ul>
        {Object.keys(thisCountry.languages).map((item, index) => <li key={index}> {thisCountry.languages[item]} </li>)}
        </ul>
        <img src={thisCountry.flags.png} alt="Flag of the current country" />
        <h2>Weather in {thisCountry.capital}</h2>
        <h3>temperature: {weather.temperature} Celcius</h3> 
        <img src={weather.weather_icons} alt="Weather in current capital" />
        <h3>wind: {weather.wind_speed}</h3>
    </>
    )
}
export default ViewCountry
