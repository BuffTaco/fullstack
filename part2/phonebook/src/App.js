import { useState, useEffect } from 'react'
import axios from 'axios'
import services from './services/notes'

const Notification = ({message, type}) => {
  if (message === null)
  {return null}
  return (
    <div className={type}>
      {message}
    </div>
  )
}
const Person = (props) => {
  return (<div>{props.name} {props.number} <button onClick={() => {props.handleDelete(props.id, props.name)}}>Delete</button></div>)
}
const Form = ({handleSubmit, handleNameChange, handleNumberChange, newName, newNumber}) => {
  return (<>
  <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
  </>)
  
}
const Search = ({newSearch, handleSearchChange}) => {
  
  return (    
    <input value={newSearch} onChange={handleSearchChange}/>   
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [message, setMessage] = useState(null)
  const [type, setType] = useState("success")
  
  useEffect(() => {
    services.getAll().then(response => setPersons(response))
  }, []
  )
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')

const handleSubmit = (event) => {
    event.preventDefault()
    
    const newObj = {
      name: newName,
      number: newNumber
    }
    const found = persons.find(person => person.name === newName)
    
    if (newName === '')
    {
      alert("Enter a name")
    }
    else if (newNumber==='')
    {
      alert('Enter a number')
    }
    else if (found !== undefined)
    {
      
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`))
      {
        try{
          services.change(found, newObj)
          services.getAll().then(response => setPersons(response))
          setType("success")
          setMessage(`${newObj.name}'s phone number changed`)
          setTimeout(() => {
          setMessage(null)
        }, 5000)
        }
        catch
        {
          setType("error")
          setMessage(`${newObj.name} was already removed from the server.`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
        
        
      }
    }
    else
    {
      services
      .create(newObj)
      .then(response => {
        setPersons(persons.concat(response))
      })
      setMessage(`${newObj.name} added to the phonebook`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      
    }
    

    

  }
const handleDelete = (id, name) => {
  if (window.confirm(`Remove ${name}?`))
  {
    services.getAll().then(response=>{console.log(response)})
    services.remove(id)
    
    services.getAll().then(response=>{console.log(response)})
    services.getAll().then(response => setPersons(response))
    
  }
  

}
const handleNameChange = (event) => {
  setNewName(event.target.value)
}
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
}
const handleSearchChange = (event) => {
  setSearch(event.target.value)
}

  return (
    <div>
      
      <h1>Phonebook</h1>
      <Notification message={message} type={type}/>
      <h2>Search name</h2>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      
      <h2>Add new number</h2>
      <Form handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName}
       newNumber={newNumber}/>
      <h2>Numbers</h2>
      
      {        
        persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
        .map(person => <Person id={person.id} number={person.number} name={person.name} key={person.name} handleDelete={handleDelete}/>)        
      }
      
    </div>
  )
}

        
export default App;