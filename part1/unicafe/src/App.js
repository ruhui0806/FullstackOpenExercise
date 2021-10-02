import React, {useState} from "react"



  const Button = ({handleFunction, name}) => {
    return (
      <>
      <button onClick={handleFunction}> {name} </button> 
      </>
    )
  }

  const StatisticLine = (props) => {
      return (
        
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
        
      )
  }

  const Statistics = (props) => {
    if(props.all === 0) {
        return(
          <table>
            <tbody>
              <tr>
                <td> No feedback given </td>
              </tr>
            </tbody>
          </table>
        )
    }
    return(
      <table>
        <tbody>
          <StatisticLine text="good" value= {props.good} /> 
          <StatisticLine text="bad" value= {props.bad} />
          <StatisticLine text="neutral" value= {props.neutral} />
          <StatisticLine text="all" value= {props.all} />
          <StatisticLine text="average" value= {props.good-props.bad/props.all} />
          <StatisticLine text="positive" value= {props.good*100/props.all + " %"} />
        </tbody>
      </table>
      )
  }

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0) // the allClicks is initialized as an empty array []
  
  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  return(
    <div>
      <h1>give feedback</h1>
      
      <Button handleFunction={handleGoodClick} name="good" />
      <Button handleFunction={handleNeutralClick} name="neutral" />
      <Button handleFunction={handleBadClick} name="bad" />
      

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )

}

export default App;

//Reference for debugging: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_tbody; https://stackoverflow.com/questions/55820297/how-to-fix-warning-validatedomnesting-div-cannot-appear-as-a-child-of/67432835#67432835