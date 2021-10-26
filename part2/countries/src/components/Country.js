import React, { useState } from 'react'
import ViewCountry from "./ViewCountry"


const Country = (props) => {
    const [showView, setShow] = useState(false)
    
    const handleViewCountry = () => {
        setShow(!showView)
    }
    if (showView === true) {
        return (
            <>
            <button onClick={handleViewCountry}>
            {showView ?  `hide ${props.country.name.common}` : "show"}
            </button>
            <ViewCountry thisCountry={props.country}/>
            </>
        )
    }

   else return (
        <>
         <li>
            {props.country.name.common}
            <button onClick={handleViewCountry}>
            {showView ? 'hide' : "show"}
            </button>
        </li>
        </>
    )
}

export default Country