import React from "react"
import Person from "./Person"
// import personService from "../services/persons"

const Persons = (props) => {

    return(
      <div>
      {props.persons.map((personItem, id)=> <Person key={id} person={personItem} handleDelete= {props.handleDelete} />)} 
      </div>
    )
  }


export default Persons