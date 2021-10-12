import React, { useState } from 'react';
import Persons from "./components/Persons"
import phoneBook from "./components/phoneBook"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([...phoneBook])
  const [ newName, setNewName ] = useState('')
  const [ input, setInput ] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [ newNumber, setNewNumber ] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {name: newName, number: newNumber, id: persons.length +1} 
    const uniqueArray = (a) => a.filter((item, index) => {
      return a.findIndex(obj => obj.name === item.name) === index;
    })
    
    let foundPerson = false;
    for (let i = 0; i < persons.length; i++) {
      if (personObject.name === persons[i].name && newNumber.length !== 0) {
        foundPerson = true;
        let updatePersons = [...persons, persons[i].number=newNumber]
        setPersons(uniqueArray(updatePersons))
      }
      else if (personObject.name === persons[i].name && newNumber.length === 0) {
        foundPerson = true;
        alert(`${newName} is already added to phonebook`)
        setPersons(uniqueArray(persons))
      }
      else if (foundPerson === false) {
        setPersons(persons.concat(personObject))
      }
      setNewName("")
      setNewNumber("")
    }
    
  }
 

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
    // setNumber(number.concat(numberObject))
  }
  
  const handlePersonShow = (event) => {
    setInput(event.target.value)
    setShowAll(false)
    
  }

  const personsToshow = showAll ? persons : persons.filter(item => {return item.name.toLowerCase().includes(input.toLowerCase()) === true})

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter input={input} handlePersonShow={handlePersonShow} personsToshow={personsToshow} />
     
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons persons={persons} />
 
    </div>
    )
}

export default App

