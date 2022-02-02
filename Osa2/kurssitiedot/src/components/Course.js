const Header = ({ name }) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return (
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part, i) => 
          <Part part={part} key={i} />
        )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const sum = parts.reduce((initial, part) => {
        return (initial + part.exercises)
    }, 0)
    return (
      <div>
        <p><strong>total of {sum} exercises</strong></p>
      </div>
    )
    
    
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course