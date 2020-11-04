export const initalstate = null

export const reducer = (state, action) => {
    if (action.type == "USER") {
        return action.payload
    }
    if (action.type == "CLEAR") {
        return null
    }
    if (action.type == "UPDATE") {
        return {
            ...state,
            followers: action.payload.followers,
            following: action.payload.following
        }
    }
    if (action.type == "UPDATEPIC") {
        return {
            ...state,
            pic: action.payload
        }
    }
    return state
}

//-------------------------usereducer-------------------------//
//  so first we import usereducer now usereducer function takes to pramas 
//  1 - reducer fun takes current value and action to perfrom on current value
//  2 - initila value ex=0
//  now to use the usereducer return to value
//  1 - count which means current satte    
//  2 - dispatch which is cpable of performinng the changes on current state