import React from "react"
import Person from "./Person"
const Filter = (props) => {
    return (
        <>
            <>filter shown with <input type="text" value={props.input} onChange={props.handlePersonShow}/> </>
            <>{props.personsToshow.map(personItem => <Person key={personItem.id} person={personItem} />)} </> 
        </>
    )
}

export default Filter