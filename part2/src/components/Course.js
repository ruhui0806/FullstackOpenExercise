import React from 'react'

// const Part = ({parts}) => {
//     return (
//       <>
//       <p>{parts.name} {parts.exercises} </p>
//       </>
//     )
//   }
  
  
//   const Content = ({course}) => {
//     const allParts = course.parts.map(itemP => <Part key={itemP.id} parts={itemP}  />)
//     return(
//       <>
//       <h2>{course.name}</h2>
//       {allParts}
//       </>
//     )
//   }
  
  const Part = ({parts}) => {

    return(
    <>
     <p>{parts.name} {parts.exercises}</p>
    </>
    )
  }


  const Course = ({eachCourse}) => {
    const courseSection = eachCourse.parts.map(part => <Part key={part.id} parts={part} />)
    
    const total = eachCourse.parts.reduce((results, itemPart) => {
      // console.log("this is", results, itemPart)
      return results + itemPart.exercises
    }, 0)
  
    return (
      <>
      <h2>{eachCourse.name}</h2>
      <>{courseSection}</> 
      <p><b>total of {total} exercises</b></p>
      </>
      )
    }

export default Course