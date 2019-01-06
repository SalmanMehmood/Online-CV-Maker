import React from 'react';
import Dialog from 'material-ui/Dialog';
import {FlatButton , RaisedButton , Menu,Paper} from 'material-ui';
import Middlewarefunc from './store/middleware/Middleware';
import {connect} from 'react-redux';
import Navigation from './Navigation';
import * as firebase from 'firebase';

function mapStateToProps(state){
  console.log(state)
  return{
      data : state
  }
}
function mapDispatchToProps(dispatch){
  return{
    addskills : (skills) =>{
      return dispatch(Middlewarefunc.AddSkills(skills))
    },
    addInfo : (Info) =>{
      return dispatch(Middlewarefunc.AddInfo(Info))
    },
    cvdata : function(){
      return dispatch(Middlewarefunc.GetData())
  }
  }
}
class Modal extends React.Component{
    constructor(){
        super();
        this.state={
            cvdata : [],
            skillsdata : [],
            skillkey : [],
            uids : '',
            open: false,
            Skills : '',
            Pro_title : '',
            name : '',
            email : '',
            phoneNo : '',
            Objective : '',
            Experience : '',
            Education : '',
            Grade : '',
            LinkedIn : '',
            twitter : '',
            image : null
        }
    }
    componentDidMount(){
      this.props.cvdata()
  }
    handleOpen = () => {
        this.setState({open: true});
      };
    
      handleClose = () => {
        this.setState({open: false});
      };
      skilladd = (e)=>{
        e.preventDefault();
        if(this.state.Skills === ''){
          alert("Enter Your Skills...")
        }
        else{
          this.props.addskills(this.state.Skills)
          this.setState({
            Skills : ''
          })
        }
      }
      addPersonalInfo =(e)=>{
        if(this.state.name === '' || this.state.email === '' || this.state.phoneNo === '' || this.state.Objective === '' || this.state.Experience === '' || this.state.image === null){
          alert("Input all fields...")
        }
        else{
          e.preventDefault();
          this.props.addInfo(this.state)
          alert("Successfully Updated..")
          this.props.history.push('/CV')
        }

      }
      deletelist = (index)=>{
        firebase.database().ref(`/Users/${this.state.uids}/Info/Skills/${this.state.skillkey[index]}`).remove()
      }
      componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.data.CV_DATA.Info){
          let skillsdata = nextProps.data.CV_DATA.Info.Skills;
          let skillsdata1 = [];
          let skillkey = [];
          for(var key in skillsdata){
            skillsdata1.push(skillsdata[key].skills)
            skillkey.push(key)
          }
          let data = nextProps.data.CV_DATA.Info;
          this.setState({
            uids : nextProps.data.CV_DATA.key,
            skillsdata : skillsdata1,
            skillkey : skillkey,
            cvdata : nextProps.data.CV_DATA,
            name : data.name,
            email : data.email,
            phoneNo : data.phoneNo,
            Pro_title : data.Professional_Title,
            Objective : data.Objective,
            Experience : data.Experience,
            Education : data.Education,
            Grade : data.Grade,
            LinkedIn : data.LinkedIn,
            twitter : data.Twitter,
          })
        }
        else{
          null
        }
    }
    render(){
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label="Submit"
              primary={true}
              keyboardFocused={true}
              onClick={this.handleClose}
            />,
          ];
        return(
        <div>
          <Navigation nextProps={this.props}/>
          <Paper zDepth="4" style={style}>
            <div class="container">
              <h2>Personal Information</h2>
              <form>
                <div class="form-group">
                <label for="name">Full Name:</label>
                <input type="text" value={this.state.name} class="form-control col-sm-12" onChange={(e)=>{this.setState({name : e.target.value})}} required="required" id="email" placeholder="Enter Name..." />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" value={this.state.email} maxLength="30" class="form-control col-sm-12" onChange={(e)=>{this.setState({email : e.target.value})}}  required="required" id="pwd" placeholder="Enter Email..." />
              </div>
              <div class="form-group">
                <label for="email">ProfessionalTitle:</label>
                <input type="text" value={this.state.Pro_title} maxLength="30" class="form-control col-sm-12" onChange={(e)=>{this.setState({Pro_title : e.target.value})}}  required="required" id="pwd" placeholder="Enter Short Title..." />
              </div>
              <div class="form-group">
                <label for="email">PhoneNo:</label>
                <input type="number" value={this.state.phoneNo} maxLength="11" class="form-control col-sm-12"onChange={(e)=>{this.setState({phoneNo : e.target.value})}}  required="required" id="pwd" placeholder="Enter Phone Number..." />
              </div>
              <div class="form-group">
                <label for="comment">Objective:</label>
                <textarea maxLength="150" value={this.state.Objective} class="form-control"onChange={(e)=>{this.setState({Objective : e.target.value})}}  rows="3" id="comment"></textarea>
              </div>
              <div class="form-group">
                <label for="pwd">Experience:</label>
                <input type="text" value={this.state.Experience} maxLength="30" class="form-control col-sm-12"onChange={(e)=>{this.setState({Experience : e.target.value})}}  required="required" id="pwd" placeholder="Enter Experience..."/>
              </div>
              <div class="form-group">
                <label for="pwd">Education:</label>
                <input type="text" value={this.state.Education} maxLength="10" class="form-control col-sm-12"onChange={(e)=>{this.setState({Education : e.target.value})}}  required="required" id="pwd" placeholder="Last Degree..."/>
              </div>
              <div class="form-group">
                <label for="pwd">Grade:</label>
                <input type="text" value={this.state.Grade} maxLength="10" class="form-control col-sm-12" onChange={(e)=>{this.setState({Grade : e.target.value})}}  required="required" id="pwd" placeholder="Last Degree Grade..."/>
              </div>
              <div class="form-group">
                <label for="pwd">Skills:</label>
                <input type="text" maxLength="17" value={this.state.Skills} onChange={(e)=>{this.setState({Skills : e.target.value})}} class="form-control col-sm-10" required="required" id="pwd" placeholder="Write Skills..."/><button class="btn btn-outline-success"onClick={this.skilladd}>Add</button>
                <div className="showlist">
                  <ul>
                    {this.state.skillsdata.map((data,index)=>{
                      return(
                        <div key={index}>
                          <li><span>{data}</span> <i class="fa fa-trash version" onClick={()=>{this.deletelist(index)}} aria-hidden="true"></i></li>
                        </div>
                      )
                    })}

                  </ul>
                </div>
              </div>
              <div class="form-group">
                <label for="pwd">LinkedInAccount:</label>
                <input type="text" value={this.state.LinkedIn} maxLength="30" class="form-control col-sm-12"onChange={(e)=>{this.setState({LinkedIn : e.target.value})}}  required="required" id="pwd" placeholder="Write LinkedIn Account..."/>
              </div>
              <div class="form-group">
                <label for="pwd">TwitterAccount:</label>
                <input type="text" value={this.state.twitter} maxLength="30" class="form-control col-sm-12"onChange={(e)=>{this.setState({twitter : e.target.value})}}  required="required" id="pwd" placeholder="Write Twitter Accont..."/>
              </div>
              <div class="check">
                <input type="file" class="form-control-file hide_file" onChange={(e)=>{this.setState({image:e.target.files[0]})}}/>
              </div>
              <div className="text-center ">
                <button class="btn btn-primary btn1"onClick={this.addPersonalInfo}>UpdateInfo</button>
              </div>
            </form>
            </div>
            </Paper>
        </div>
          )
    }
}
const style = {
  borderRadius :20,
  height: 1200,
  width: 380,
  marginLeft: 320,
  marginTop: 60,
  display: 'inline-block',

};
export default connect(mapStateToProps,mapDispatchToProps)(Modal);
