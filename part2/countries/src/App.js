import services from "./services/services"
import {useState, useEffect} from "react"

const App = () => {
  
  
  useEffect(() => {
    services.getAll().then(response => changeAll(response.data))
    

  },[])

  const [all, changeAll] = useState([])
  const [newInput, changeNewInput] = useState("")
  const [shown, changeShown] = useState([])
  const [weather, setWeather] = useState()


 
  const search = (event) => {
    changeNewInput(event.target.value)

    changeShown(all.filter(obj => 
      obj.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    ))
  }
  const Country = ({country}) => {
    
    const request = services.call(country)
    request.then(response=>response.data.current_weather.temperature).then(response=>setWeather(response))
  
    
    
    
    
    
    
    
    
    return (
      <>      
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}<br/>
      Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`}></img>
      <h3>Weather in {country.name.common}:</h3>
      <p>Temperature: {weather} Celcius</p>
      
      </>
    )
  }
  const handleClick = (country) => {
    changeShown([country])
    
  }
  const ShownCountries = () => {
    if (shown.length > 10)
    {
      
      return (
        <p>Too many matches, please specify another filter</p>
      )
    }
    else if (shown.length === 1)
    {
      
      return (<Country country={shown[0]}/>)
    }
    else
    {
      
      return (
        shown.map(country => (
        
        <p key={country.name.common}>{country.name.common}<button onClick={() => handleClick(country)}>Show</button></p>
        
        ))
        
      )
    }
  }

  
  return (
    <div className="App">
      <p>Find countries</p><input value={newInput} onChange={search}/>
      <ShownCountries/>
      
    </div>
  );
}

export default App;
