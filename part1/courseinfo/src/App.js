import React from "react"

const Header = (props) => {
  return (
    <div>
      <p>{props.CourseName}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.each[0].exercise + props.each[1].exercise + props.each[2].exercise} </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.sections.part} {props.sections.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part sections={props.sections[0]}/>
      <Part sections={props.sections[1]}/>
      <Part sections={props.sections[2]}/>
    </div>
  )
}

const App = () => {
  const course = {name: 'Half Stack application development',
                  sections: [{part: "Fundamentals of React", exercise: 10}, 
                            {part: "Using props to pass data", exercise: 7}, 
                            {part: "State of a component", exercise: 14}]}
  
  return (
    <div>
      <Header CourseName={course.name}/>
      <Content sections={course.sections}/>
      <Total each={course.sections}/>
    </div>
  );
}

export default App
