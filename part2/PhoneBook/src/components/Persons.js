import React from "react"
import Person from "./Person"
const Persons = (props) => {
    return(
      <div>
      {props.persons.map(personItem => <Person key={personItem.id} person={personItem} />)} 
      </div>
    )
  }


export default Persons