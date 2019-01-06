import ActionTypes from '../action/actiontype';


const Action  = {
    SIGNUP : function(user){
        return{
            type : ActionTypes.SIGNUP,
            val : user
        }
    },
    Login : function(user){
        return{
            type : ActionTypes.LOGIN,
            val : user
        }
    },
    Cv_data : function(data){
        return{
            type : ActionTypes.CV_DATA,
            val : data
        }
    },
    Skills : function(state){
        return{
            type : ActionTypes.INFO
        }
    },
    PersonalInfo : function(state){
        return{
            type : ActionTypes.PERSONAL_INFO,
            val : state
        }
    },
    ResetState : function(){
        return{
            type : ActionTypes.RESET
        }
    }
}

export default Action;