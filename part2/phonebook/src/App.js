import { useState } from 'react'
const Person = (props) => {
  return (<div>{props.name} {props.number}</div>)
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
  const [persons, setPersons] = useState([
  { name: 'Arto Hellas',
    number: '040-1234567'
  },
  {
    name: 'Ada Lovelace',
    number: '012-1951879'
  }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setSearch] = useState('')

const handleSubmit = (event) => {
    event.preventDefault()
    
    const newObj = {
      name: newName,
      number: newNumber
    }
    
    if (newName === '')
    {
      alert("Enter a name")
    }
    else if (newNumber==='')
    {
      alert('Enter a number')
    }
    else if (persons.some(person => person.name === newName))
    {
      
      alert(`${newName} is already added to the phonebook`)
    }
    else
    {
      
      setPersons(persons.concat(newObj))
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
      <h2>Search name</h2>
      <Search newSearch={newSearch} handleSearchChange={handleSearchChange}/>
      
      <h2>Add new number</h2>
      <Form handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName}
       newNumber={newNumber}/>
      <h2>Numbers</h2>
      
      {        
        persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
        .map(person => <Person number={person.number} name={person.name} key={person.name}/>)        
      }
      
    </div>
  )
}

        
export default App;