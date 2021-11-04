import React from "react"
import Person from "./Person"
// const Filter = (props) => {
//     if (props.input.length === 0) {
//         return (
//             <>filter shown with <input type="text" value={props.input} onChange={props.handlePersonShow}/> </>
//         )
//     }
//     else {
//         return (
//             <>
//                 <>filter shown with <input type="text" value={props.input} onChange={props.handlePersonShow}/> </>
//                 <>{props.personsToshow.map(personItem => <Person key={personItem.id} person={personItem} />)} </> 
//             </>
//         )
//     }
// }
const Filter = (props) => {
    return (
//     props.input.length === 0 ? 
//     <>filter shown with <input type="text" value={props.input} onChange={props.handlePersonShow}/> </> 
// :
    <>
        <>filter shown with <input type="text" value={props.input} onChange={props.handlePersonShow}/> </>
        <>{props.personsToshow.map(personItem => <Person key={personItem.id} person={personItem} />)} </> 
    </> 
    )
}

export default Filter