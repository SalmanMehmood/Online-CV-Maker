import React from 'react';
import salman from '../pics/salman.jpg';
import {connect} from 'react-redux';
import {Paper} from 'material-ui';
import Modal from './Modalform'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Middlewarefunc from './store/middleware/Middleware'
import Navigation from '../components/Navigation';
import { RingLoader } from 'react-spinners'

function mapStateToProps(state){
    console.log(state)
    return{
        data : state,
        url1 : state.CV_DATA.url
    }
}
function mapDispatchToProps(dispatch){
    return{
        cvdata : function(){
            return dispatch(Middlewarefunc.GetData())
        }
    }
}
class CV extends React.Component{
    constructor(){
        super();
        this.state={
            CircularProgress : true,
            skillsdata : []
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        if(nextProps.data.CV_DATA.url){
            this.setState({
                CircularProgress :false
            })
        }
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
              image_url : data.image,
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
    componentDidMount(){
        this.props.cvdata()
    }
    check = ()=>{
        console.log('ljflsdfjdlfjdsldj')
    }
    render(){
        return(
            <div>
                {this.state.CircularProgress ?<RingLoader size={100} color={'#ff0000'}  style={{margin:200}} margin="200px auto"/>:
                    <div>
                    <Navigation nextProps={this.props}/>
                <div className="App">
                    <Paper style={style} zDepth={4}>
                    <section className="cvcontainer">
                        <div className="header">
                            <img src={this.state.image_url} className="pic" onClick={this.check} alt="user"/>
                            <h1>{this.state.name}</h1>
                            <h3>{this.state.Pro_title}</h3>
                        </div>
                        <div className="obj_container">
                            <div className="objective">
                                <h4>OBJECTIVE</h4><hr/>
                                <p>{this.state.Objective}</p>
                            </div>
                            <div className="experience">
                                <h4>EXPERIENCE</h4><hr/>
                                <p><strong>JONIUR DEVELOPER • PANACLOUD • JULY/2017 – PRESENT</strong><br/>
                                Summarize your key responsibilities, leadership, and most stellar accomplishments.  Don’t list everything; keep it relevant and include data that shows the impact you made.<br/>
                                <strong>TEACHER • THE BEACON HILL SCHOOL • AUG/2015–AUG/2016</strong><br/>
                                Senior teacher, mathematics subjects for secondary.
                                </p>
                            </div>
                        </div>
                        <div className="obj_container">
                        <div className="skills">
                                <h4>SKILLS</h4><hr/>
                                <p><strong>Programming Skills.
                                    <ul>
                                        {this.state.skillsdata.map((data,index)=>{
                                            return(
                                                <div key={index}>
                                                    <li>{data}</li>
                                                </div>
                                            )
                                        })}
                                    </ul>
                                </strong></p>
                        </div>
                        <div className="education">
                            <h4>EDUCATION</h4><hr/>
                            <p>
                                <strong>BACHELOR BUSINESS ADMINISTRATION• 2016 • PRESENT</strong><br/>
                                Khadim Ali Shah Bukhari Institute of Technology,<br/>
                                <strong>WEB & MOBILE DEV • 2016 • 2017</strong><br/>
                                Sir Syed University of Engineering & Technology,<br/> 
                                <strong>Instructor: </strong>Sir Zia Khan
                            </p>
                            <div className="leadership">
                                <h4>VOLUNTEER EXPERIENCE OR LEADERSHIP</h4><hr/>
                                <p><strong>
                                    <ul>
                                        <li>Conduct Training sessions in collages from my institute.</li>
                                        <li>Organizer for KASBIT Research at Shiekh Zyed Islamic center.</li>
                                    </ul>
                                </strong></p>
                            </div>
                        </div>
                        </div>
                        <div className="obj_container container-col-12">
                            <div className="email container-col-2">
                                <p><i class="fa fa-envelope email1"></i> {this.state.email}</p>
                            </div>
                            <div className="twitter container-col-2">
                                <p><i class="fa fa-twitter email1"></i>{this.state.twitter}</p>   
                            </div>
                            <div className="phoneNo container-col-2">
                                <p><i class="fa fa-phone email1" aria-hidden="true"></i><br/>{this.state.phoneNo}</p>
                            </div>
                            <div className="linkedIn container-col-3">
                                <p><i class="fa fa-linkedin email1" aria-hidden="true"></i>{this.state.LinkedIn}</p>
                            </div>
                        </div>
                    </section>
                    </Paper>
                    </div>
                    </div>
                }
                {/* <Modal/> */}
            </div>
        )
    }
}
const style = {
    backgroundColor: '#DAEEF5',
    height: '900px',
    width: '90%',
    margin: 40,
    textAlign: 'center',
    display: 'inline-block',
  }
export default connect(mapStateToProps,mapDispatchToProps)(CV);