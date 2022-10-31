

export const filterChange = (filter) => {
    return {
        type: "SET_FILTER",
        data: filter
    }
}
// const initialState = 
const filterReducer = (state = "ALL", action) => {
    switch(action.type) {
        case "SET_FILTER":
            return action.data
        default: 
            return state
    }
}

export default filterReducer