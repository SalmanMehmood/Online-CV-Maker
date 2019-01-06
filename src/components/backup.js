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
        state : state,
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
            CircularProgress : true
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.state.CV_DATA.url){
            this.setState({
                CircularProgress :false
            })
        }
    }
    componentDidMount(){
        this.props.cvdata()
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
                            <img src={this.props.url1} className="pic" alt="user"/>
                            <h1>Salman Mehmood Khan</h1>
                            <h3>Web And Mobile App Developer</h3>
                        </div>
                        <div className="obj_container">
                            <div className="objective">
                                <h4>OBJECTIVE</h4><hr/>
                                <p>My objective is secure a position in the management of a prestigious organization that allows for implementation of communication, service, and design skills to the programming essentials.</p>
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
                                        <li>HTML 5</li>
                                        <li>CSS 3</li>
                                        <li>Material Design</li>
                                        <li>Bootstrap</li>
                                        <li>JavaScript (ES6)</li>
                                        <li>Redux</li>
                                        <li>React JS & with Redux</li>
                                        <li>React Native</li>
                                        <li>React Native with Redux</li>
                                        <li>NodeJS</li>
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
                        <div className="obj_container">
                            <div className="email">
                                <p><i class="fa fa-envelope email1"></i> salmanmehmood.ubit@gmail.com</p>
                            </div>
                            <div className="twitter">
                                <p><i class="fa fa-twitter email1"></i>salmanmehmood.ubit@gmail.com</p>   
                            </div>
                            <div className="phoneNo">
                                <p><i class="fa fa-phone email1" aria-hidden="true"></i><br/>+923462636455</p>
                            </div>
                            <div className="linkedIn">
                                <p><i class="fa fa-linkedin email1" aria-hidden="true"></i>salmanmehmood.ubit@gmail.com</p>
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
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  }
export default connect(mapStateToProps,mapDispatchToProps)(CV);