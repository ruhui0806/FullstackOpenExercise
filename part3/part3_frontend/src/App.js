import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import personService from './services/persons'
import Persons from "./components/Persons"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {

  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ input, setInput ] = useState("")
  const [showNone, setShowNone] = useState(true)
  const [ newNumber, setNewNumber ] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorOccur, setErrorOccur] = useState(false)

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3001/persons')
  //     .then(response => {
  //       setPersons(response.data)
  //     })
  // }, [])
  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {'name': newName, 'number': newNumber}
    const samePerson = persons.filter(p => p.name === newName)

      if(samePerson.length !== 0) {
        let index = persons.findIndex(obj => obj.name === newName)
        let id = persons[index].id
        if (window.confirm( `${personObject.name} is already added to phonebook, replace the old number with a new one?`)) {
          personService
          .update(id, personObject)
          .then(personObject => {
            setPersons(persons.map(person => person.id !== id ? person : personObject))
            setNotification(`the ${personObject.name}'s information is updated`)
            setTimeout(() => {setNotification(null)}, 3000)
          })
          .catch(err => {
            console.log(err)
            setErrorOccur(true)
            setNotification(`Updation failed, due to one of the reasons: 1)information of ${personObject.name} has already been removed from the server; 2) the new number length is ${newNumber.length}, which is not long enough`)})
          setTimeout(() => {setNotification(null)}, 8000)
          setTimeout(() => setErrorOccur(false), 8000)
        }
        else {
          setNotification(`the updation for ${personObject.name}'s number has been canceled`)
          setTimeout(() => {setNotification(null)}, 3000)
        }
      }

      else if(samePerson.length === 0) {
        personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
        .then(setNotification(`Add a new name: ${newName}`))
        .then(setTimeout(() => {setNotification(null)}, 3000))
        .catch(error => {
          console.log(error.response)
          // if (error.response.data.name === 'ValidationError')
          setErrorOccur(true)
          setNotification(`An error occurred: ${error}`)
          setTimeout(() => {setNotification(null)}, 5000)
          setTimeout(() => setErrorOccur(false), 5000)
        })
      }

    setNewName("")
    setNewNumber("")

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
    event.target.value.length !== 0 ? setShowNone(false) : setShowNone(true)
  }



  const personsToshow = showNone ? persons.filter(item=>item.name === input) : persons.filter(item => item.name.toLowerCase().includes(input.toLowerCase()) === true )


    const deletePerson = (id) => {
      const matchedPerson = persons.filter(p => p.id === id)[0]
      // console.log(matchedPerson)
      window.confirm(`Delete ${matchedPerson.name} ?`) ?
      personService
      .remove(matchedPerson)
      .then(setPersons(persons.filter(n => n.id !== id)))
      .then(
        setNotification(`${matchedPerson.name} has just been deleted`))
        .then(setTimeout(() => setNotification(null), 3000))

        // setPersons(persons.filter(p => p.name !== matchedPerson[0].name))
        :
        setNotification(`${matchedPerson.name} will not be deleted yet`)
        setTimeout(() => setNotification(null), 3000)


      // alert(`Delete ${matchedPerson[0].name} ?`)
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} errorOccured={errorOccur}/>
      <Filter input={input} handlePersonShow={handlePersonShow} personsToshow={personsToshow} />

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={deletePerson} />

    </div>
    )
}

export default App

