const Header = ({name}) => {
  
    return (
      <>
        <h2>{name}</h2>
      </>
    )
  }
  const Content = ({parts}) => {
    
    
    return (
      <>
        {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
          )}
        
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
  const Total = ({parts}) => {
  
    return (
      <>
      <p><strong>Total of {parts.reduce((sum, part) => sum+part.exercises, 
      0)} exercises</strong></p>
      </>
      
    )
  }
  const Course = ({course}) => {
    
    return (
      <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </>
    )
  }
  const AllCourses = ({courses}) => {
    return (
      <>
      {courses.map(course =>
      <Course key={course.id} course={course}/>
        )}
      </>
    )
  }

export default AllCourses