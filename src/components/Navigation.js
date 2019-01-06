import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import {IconMenu , MenuItem ,IconButton ,RaisedButton} from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Middlewarefunc from './store/middleware/Middleware';
import {connect} from 'react-redux'
import Action from './store/action/Actions'
import * as firebase from 'firebase';
  
var user_name = '';
var img_url = ''
function mapStateToProps(state){
  user_name = state.CV_DATA.name;
  img_url = state.CV_DATA.url
  console.log(state)
  return{
    state : state
  }
}
function mapDispatchToProps(dispatch){
  return{
    resetstate : ()=>{ return dispatch(Action.ResetState())
    },
    cvdata : function(){
      return dispatch(Middlewarefunc.GetData())
  }
  }
}
class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username : ''
    }
  }
  Signout = ()=>{
    firebase.auth().signOut();
    this.props.nextProps.history.push('/')
    this.props.resetstate();
  }
  editform = ()=>{
    this.props.nextProps.history.push('/modal')
  }
  componentDidMount(){
    this.props.cvdata()
}
    render(){
        return(
            <section>
                  <AppBar style={{backgroundColor : '#07575B' , position:'fixed' , paddingRight:'20px'}}
                    title={<span><img src={img_url} className="pic1"/>
                    {user_name}
                    </span>}
                    showMenuIconButton={false}
                    
                    iconElementRight={<IconMenu 
                    iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                    <MenuItem onClick={this.editform} primaryText="Edit" />
                    <MenuItem primaryText="Send feedback" />
                    <MenuItem primaryText="Help" />
                    <MenuItem onClick={this.Signout} primaryText="Sign out" />
                  </IconMenu>}/>
            </section>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Navigation);