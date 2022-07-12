import {useState, useEffect} from 'react'
import axios from 'axios'
import communicate from './communicate'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [renderNotif, setRenderNotif] = useState('DO_NOT_RENDER')
  const [renderData, setRenderData] = useState("")
  useEffect(() => {
    communicate.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])
  

  const submitNewPerson = (name, number) => {
    //check if name already exists
    const personExists = persons.find(person => person.name === name)
    if (personExists) {//case sensitive, though wasn't specified otherwise in the exercise
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        communicate.update(personExists.id, {name, number}).then(updatedPerson => {
          setPersons(persons.map(person => person.id !== personExists.id ? person : updatedPerson))
          setRenderNotif('UPDATED_PERSON')
          setRenderData(name)
        }).catch(error => {
          setPersons(persons.filter(person => person.id !== personExists.id))
          setRenderNotif('NOT_FOUND')
          setRenderData(name)
        })
      }
    }else{
      communicate.create({name, number}).then(newPerson => {
        setPersons(persons.concat(newPerson))
        setRenderNotif('ADDED_NEW_PERSON')
        setRenderData(newPerson.name)
      })
    }
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



  const deletePersonFactory = (person) => {
    return () => {
      if (window.confirm(`Delete ${person.name}?`)) {
        communicate.remove(person.id).then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setRenderNotif('DELETED_PERSON')
          setRenderData(person.name)
        }).catch(error => {
          setPersons(persons.filter(p => p.id !== person.id))
          setRenderNotif('NOT_FOUND')
          setRenderData(person.name)
        })
      }
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification renderNotif={renderNotif} renderData={renderData}
        setRenderNotif={setRenderNotif} />
      <Filter filter={filter} filterChange={filterChange} />
      <AddNewPerson newName={newName} nameChange={nameChange}
      newNumber={newNumber} numberChange={numberChange} handleSubmit={handleSubmit} />
      <Numbers persons={persons} filter={filter} delPerson={deletePersonFactory} />
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
          {personsToShow.map(person => <Person key={person.id} person={person} 
          delPerson={props.delPerson} />)}
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
      <td><button onClick={props.delPerson(props.person)}>delete</button></td>
    </tr>
  )
}

//Notification:
//if DO_NOT_RENDER, return nothing
//if render, start timer for 5 seconds, then set renderNotif to DO_NOT_RENDER
//ADDED_NEW_PERSON => green, `Added ${renderData}`
//NOT_FOUND => red, `Information of ${renderData} has already been removed from server`

function Notification(props) {
  const [timer, setTimer] = useState(null)
  useEffect(() => {
    if (props.renderNotif !== 'DO_NOT_RENDER') {
      setTimer(setTimeout(() => {
        setTimer(null)
        props.setRenderNotif('DO_NOT_RENDER')
      }, 5000))
    }
  }, [props.renderNotif])
  if (props.renderNotif === 'DO_NOT_RENDER') {
    return null
  }
  if (props.renderNotif === 'ADDED_NEW_PERSON') {
    return <p style={{color: 'green'}} className="notif">Added {props.renderData}</p>
  }
  if (props.renderNotif === 'UPDATED_PERSON') {
    return <p style={{color: 'green'}} className="notif">Updated {props.renderData}</p>
  }
  if (props.renderNotif === 'DELETED_PERSON') {
    return <p style={{color: 'salmon'}} className="notif">Deleted {props.renderData}</p>
  }
  if (props.renderNotif === 'NOT_FOUND') {
    return <p style={{color: 'red'}} className="notif">Information of {props.renderData} has already been removed from server</p>
  }
}

export default App;
