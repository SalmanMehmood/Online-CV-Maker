import ActionTypes from '../action/actiontype';


const initial_State = {
   
}

function AUTH(state = initial_State , action){
    switch(action.type){

        case ActionTypes.SIGNUP : {
            return Object.assign({},state,action.val)
        }
        case ActionTypes.LOGIN : {
            return  Object.assign({},state,action.val)
            // return {...state,list:action.val}
        }
        case ActionTypes.RESET : {
            return initial_State
        }
        default : {
            return state   
        } 
    }
}
export default AUTH