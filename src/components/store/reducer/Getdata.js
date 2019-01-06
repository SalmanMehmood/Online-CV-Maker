import ActionTypes from '../action/actiontype';


const initial_State = {
}

function CV_DATA(state = initial_State , action){
    switch(action.type){
        case ActionTypes.CV_DATA : {
            return Object.assign({},state,action.val)
        }
        case ActionTypes.INFO:{
            return Object.assign({},state,action)
        }
        case ActionTypes.PERSONAL_INFO:{
            return Object.assign({},state,action.val)
        }
        case ActionTypes.RESET : {
            return initial_State
        }
        default : {
            return state   
        } 
    }
}
export default CV_DATA