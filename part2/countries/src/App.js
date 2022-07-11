import {useState, useEffect} from 'react'
import axios from 'axios'

//get country info from https://restcountries.com/v3.1/all
//input partial country name:
//find countries <input>
//show country info
//if >10 then show "Too many matches, specify another filter"
//if <10 then show all matches
//{name}<button>show</button> => change filter to {name}
//if 1 match (or exact match) then show that match in full detail

//full match:
//<h1>{country.name.common}</h1>
//capital: {country.capital}
//<br />
//area: {country.area}
//<h3>languages:</h3>
//<ul>
//  {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
//</ul>
//picture: <img src={country.flag} alt={`flag of ${country.name}`} />


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const stripUselessData = country => {//only name.common, capital, area, languages, flag
      // console.log(Object.values(country.languages)) //why is it a dictionary???
      return {
        name: country.name.common,
        capital: "capital" in country ? country.capital : ["no capital"],
        area: country.area,
        //Antarctica is a special case
        languages: "languages" in country ? Object.values(country.languages) : ["no languages"],
        flag: country.flags.png
      }
    }
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data.map(stripUselessData))
      })
  }, [])

  const handleFilterChange = (event) => {
    const lowerCase = event.target.value.toLowerCase()
    const exactMatch = countries.find(country => country.name.toLowerCase() === lowerCase)
    if (exactMatch) {
      setFilter(exactMatch.name.toLowerCase())
    }else{
      setFilter(lowerCase)
    } 
  }

  const handleShowClickFactory = (country) => {
    return () => {
      setFilter(country.name.toLowerCase())
    }
  }

  return (
    <div>
      <FindCountry filter={filter} filterChange={handleFilterChange} />
      <DisplayMatch countries={countries} filter={filter} onClick={handleShowClickFactory} />
    </div>
  )
}

function FindCountry({filter, filterChange}) {
  return (
    <div>
      find countries <input value={filter} onChange={filterChange} /><br />
    </div>
  )
}

function DisplayMatch({countries, filter, onClick}) {
  let filteredCountries = []
  //filter using for as that allows to break out of the loop upon finding exact match
  for (let i = 0; i < countries.length; i++) {
    const name = countries[i].name.toLowerCase()
    if (name === filter) {
      filteredCountries = [countries[i]]
      break
    } else if (name.includes(filter)) {
      if (filteredCountries.length > 10){
        break
      }
      filteredCountries.push(countries[i])
    }
  }
  if (filteredCountries.length === 0){
    return <div>No matches</div>
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <h1>{filteredCountries[0].name}</h1>
        <p>capital: {filteredCountries[0].capital.join(", ")}
        <br />
        area: {filteredCountries[0].area}
        </p>
        <h3>languages:</h3>
        <ul>
          {filteredCountries[0].languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={filteredCountries[0].flag} alt={`flag of ${filteredCountries[0].name}`} />
      </div>
    )
  } else if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else {
    return (
      <div>
        {filteredCountries.map(country => (
          <div key={country.name}>
            {country.name}
            <button onClick={onClick(country)}>show</button>
            <br />
          </div>
        ))}
      </div>
    )
  }
}





export default App;
