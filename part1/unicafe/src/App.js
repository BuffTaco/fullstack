import {useState} from 'react'



const Button = ({handler, text}) =>
{
  return (
    <button onClick={handler}>{text}</button>
  )
}
const Statistics = ({good, bad, neutral, total}) => {
  if (total === 0)
  {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
    <h3><strong>Statistics:</strong></h3>
    <table>
      <tr><StatLine text="Good" value={good}/></tr>
      <tr><StatLine text="Bad" value={bad}/></tr>
      <tr><StatLine text="Neutral" value={neutral}/></tr>
      <tr><StatLine text="All" value={total}/></tr>
      <tr><StatLine text="Average" value={(good-bad)/total}/></tr>
      <tr><StatLine text="Positive" value={(good/total*100+"%")}/></tr>
    </table>    
    </>
  )
}
const StatLine = ({text, value}) => {
  return (
    <>
    <td>{text}</td>
    <td>{value}</td>
    </>
  )  
}

const App = () => {
  const [good, setGood] = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [total, setTotal] = useState(0)

  const addGood = () => {
    const newGood = good+1
    setGood(newGood)
    setTotal(newGood + bad + neutral)
  }
  const addBad = () => {
    const newBad = bad+1
    setBad(newBad)
    setTotal(newBad + good + neutral)
  }
  const addNeutral = () => {
    const newNeutral = neutral+1
    setNeutral(newNeutral)
    setTotal(newNeutral + good + bad)
  }

  return (
    <>
    <h3><strong>Give reviews:</strong></h3>
    <Button handler={addGood} text="Good"/>
    <Button handler={addBad} text="Bad"/>
    <Button handler={addNeutral} text="Neutral"/>
    <Statistics good={good} bad={bad} neutral={neutral} total={total}/>
    
    </>
  )


}

export default App