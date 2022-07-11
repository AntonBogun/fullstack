import {useState, useEffect} from 'react'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  

  const submitNewPerson = (name, number) => {
    //check if name already exists
    const personExists = persons.find(person => person.name === name)
    if (personExists) {//case sensitive, though wasn't specified otherwise in the exercise
      alert(`${name} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: name,//also doesn't check if name is empty or whitespace
      number: number,//I bet that won't cause any problems whatsoever
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
  }

  const [filter, setFilter] = useState('')
  const filterChange = (e) => setFilter(e.target.value)
  const nameChange = (e) => setNewName(e.target.value)
  const numberChange = (e) => setNewNumber(e.target.value)
  const handleSubmit = (event) => {
    event.preventDefault()
    submitNewPerson(newName, newNumber)
    setNewName("")
    setNewNumber("")
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} filterChange={filterChange} />
      <AddNewPerson newName={newName} nameChange={nameChange}
      newNumber={newNumber} numberChange={numberChange} handleSubmit={handleSubmit} />
      <Numbers persons={persons} filter={filter} />
    </div>
  );
}

// <p>filter shown with 
// <input type="text" onChange={updateFilter} />
// </p>
function Filter(props) {
  return (
    <div>
      <p>filter shown with 
      <input type="text" value={props.filter} onChange={props.filterChange} />
      </p>
    </div>
  )
}

//<h1>add a new</h1>
//form:
//<input type="text" onChange={updateName} />
//<input type="text" onChange={updateNumber} />
//<button onClick={submitNewPerson}>add</button>
function AddNewPerson(props) {

  return (
    <div>
      <h1>add a new</h1>
      <form onSubmit={props.handleSubmit}>
        <p>
          name: <input type="text" value={props.newName} onChange={props.nameChange} />
          <br />
          number: <input type="text" value={props.newNumber} onChange={props.numberChange} />
          <br />
          <button type="submit">add</button>
        </p>
      </form>
    </div>
  )
}

//<h1>Numbers</h1>
//<table> <= just looks better
//map (over filtered persons):
//  <tr key={person.id}>
//    <td>name</td>
//    <td>number</td>
//  </tr>
// ...
function Numbers(props) {
  const personsToShow = props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()))
  return (
    <div>
      <h1>Numbers</h1>
      <table>
        <tbody>
          {personsToShow.map(person => <Person key={person.id} person={person} />)}
        </tbody>
      </table>
    </div>
  )
}

function Person(props) {
  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
    </tr>
  )
}


export default App;
