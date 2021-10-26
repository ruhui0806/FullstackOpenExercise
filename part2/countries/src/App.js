import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from "./components/Country"
import ViewCountry from './components/ViewCountry'


const App = () => {

  const [countries, setCountries] = useState([])
  const [input, setInput] = useState("")


  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
      .catch(error => console.log(error))
    }, [])
    

  
  const handleCountriesShow = (event) => {
    setInput(event.target.value)
    console.log(event.target.value)
  }
  
  const countriesToshow = input==="" ? [] : countries.filter(country => {return country.name.common.toLowerCase().includes(input.toLowerCase()) === true})


  if (countriesToshow.length === 1) {
    return (
      <>
        <>find Countries <input type="text" value={input} onChange={handleCountriesShow}/> </>
        <ViewCountry thisCountry={countriesToshow[0]} />
  
      </>
    )
  }

  else return (
    <div>
      <>find Countries <input type="text" value={input} onChange={handleCountriesShow}/> </>
     
      <h2>Countries</h2>
      <ul>{ countriesToshow.length>10 ? "Too many matches, specify another filter" : countriesToshow.map(
        item => <Country key={item.cca2} country= {item} />)}</ul>
   
    </div>
    )
}

export default App

