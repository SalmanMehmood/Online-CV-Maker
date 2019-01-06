import React, { Component } from 'react';
import Login from './components/login'; 
import CV from './components/CV';
import './App.css';
import Modal from './components/Modalform';
import {BrowserRouter as Router , Route } from 'react-router-dom';
import Action from './components/store/action/Actions';
import {connect} from 'react-redux';
import * as firebase from 'firebase';


function mapStateToProps(state){
  return{
    state : state
  }
  console.log(state)
}
function mapDispatchToProps(dispatch){
  return{
    signup : function(state){
        return dispatch(Action.SIGNUP(state))
    }
}
}
class App extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render() {
    return (
      <Router>
          <div>
            <Route exact path="/" component={Login}/>
            <Route path="/CV" component={CV}/>
            <Route path="/modal" component={Modal}/>
          </div>    
      </Router>
      // <CV/>
    );
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
