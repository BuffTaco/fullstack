const Header = (props) => {
  
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (prop) => {
  
  
  return (
    <>
      <Part name={prop.parts[0].name} exercises={prop.parts[0].exercises}/>
      <Part name={prop.parts[1].name} exercises={prop.parts[1].exercises}/>
      <Part name={prop.parts[2].name} exercises={prop.parts[2].exercises} />
    </>
    
  )
}

const Part = (prop) => {
  return (
    <>
    <p>{prop.name} {prop.exercises}</p>
    </>
  )
}

const Total = (prop) => {

  return (
    <>
    <p>Number of exercises {prop.parts[0].exercises + prop.parts[1].exercises + prop.parts[2].exercises}</p>
    </>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  
   return (
    <>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

export default App