import * as firebase from 'firebase';
import Action from '../action/Actions';

export default class Middlewarefunc {
    static Signup(state){ 
        return(dispatch)=>{
            firebase.auth().createUserWithEmailAndPassword(state.email,state.password).then(()=>{
                let uids = firebase.auth().currentUser.uid;
                firebase.storage().ref(`images/${state.image.name}`).put(state.image).then(function(user){
                    firebase.storage().ref(`images/${state.image.name}`).getDownloadURL().then(function(url){
                        firebase.auth().currentUser.updateProfile({
                            displayName : state.name,
                            photoURL : url
                        }).then(()=>{
                            firebase.database().ref(`Users/${uids}`).set({
                                email: state.email,
                                name: state.name,
                                key: uids,
                                url : url
                            })
                        })
                    }).then(()=>{
                        dispatch(Action.SIGNUP(state))
                    })
                })
            })
        }
    }
    static Login(state){
        return(dispatch)=>{
            firebase.auth().signInWithEmailAndPassword(state.email,state.password).then((e)=>{
                firebase.database().ref(`Users/${e.uid}`).on('value',snap=>{
                    var data = snap.val();
                    dispatch(Action.Login(data))
                })
            })
        }
    }
    static GetData(){
        return(dispatch)=>{
            firebase.auth().onAuthStateChanged((user)=>{
                let uids = user.uid;
                firebase.database().ref(`Users/${uids}`).on('value',snap=>{
                    let data = snap.val();
                    console.log(data);
                    dispatch(Action.Cv_data(data))
                })
            })
        }
    }
    static AddSkills(state){
        console.log(state)
        return(dispatch)=>{
            firebase.auth().onAuthStateChanged((user)=>{
                let uids = user.uid;
                firebase.database().ref(`Users/${uids}/Info/Skills`).push({
                    skills : state
                }).then(()=>{
                    dispatch(Action.Skills(state))
                })
            })
        }
    }
    static AddInfo(state){
        return(dispatch)=>{
            firebase.auth().onAuthStateChanged((user)=>{
                let uids = user.uid;
                firebase.storage().ref(`CV_Images/${state.image.name}`).put(state.image).then(function(user){
                    firebase.storage().ref(`CV_Images/${state.image.name}`).getDownloadURL().then(function(url){
                        firebase.database().ref(`Users/${uids}/Info/`).update({
                            name : state.name,
                            email : state.email,
                            phoneNo : state.phoneNo,
                            Objective : state.Objective,
                            Professional_Title : state.Pro_title,
                            Experience : state.Experience,
                            Education : state.Education,
                            Grade : state.Grade,
                            LinkedIn : state.LinkedIn,
                            Twitter : state.twitter,
                            image : url
                        })
                    }).then(()=>{
                        dispatch(Action.PersonalInfo(state))
                    })
                })
            })
        }
    }
}