import React, {useState} from "react"



  const Button = ({handleFunction, text}) => {
    return (
      <>
      <button onClick={handleFunction}> {text} </button> 
      </>
    )
  }


  const App = () => {
    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]
     
    const [selected, setSelected] = useState(0)
    const [point, setPoint] = useState(Array(7).fill(0))
    const randomSelect = () => setSelected(Math.floor(Math.random()*anecdotes.length))

    const voteFunc = () => { 
      const newPoint = [...point]
      newPoint[selected] += 1
      setPoint(newPoint);
    }

    return (
      <div>
      <h1>Anecdote of the day</h1>
      <table>
      <tbody>
      <tr>
      <td>{anecdotes[selected]}</td>
      </tr>
      <tr>
      <td>{"has "+ point[selected] + " vote"}</td>
      </tr>
      </tbody>
      </table>
      <Button handleFunction={voteFunc} text="vote" />
      <Button handleFunction={randomSelect} text="next anecdote" />

      <h1>Anecdote with most votes</h1>
      <table>
      <tbody>
      <tr>
      <td>{anecdotes[point.indexOf(Math.max(...point))]}</td> 
      </tr>
      <tr>
      <td>{"has "+ Math.max(...point) + " vote"}</td>
      </tr>
      </tbody>
      </table>
      </div>
    )
  }

export default App;

//Reference for debugging: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_tbody; https://stackoverflow.com/questions/55820297/how-to-fix-warning-validatedomnesting-div-cannot-appear-as-a-child-of/67432835#67432835
// find the index of the max number in an array: arr.indexOf(Math.max(...arr)) 