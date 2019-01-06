import React from 'react';
// import Modal from './Modalform';
import {connect} from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import Middlewarefunc from './store/middleware/Middleware';

let data 
function mapStateToProps(state){
    console.log(state.CV_DATA.name)
    return{
        isauthenticated : state.AUTH.name,
        data : state
    }
    console.log(state.SIGNUP.name)
}
function mapDispatchToProps(dispatch){
    return{
        signup : function(state){
            return dispatch(Middlewarefunc.Signup(state))
        },
        login : function(state){
            return dispatch(Middlewarefunc.Login(state))
        } 
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            email : '',
            password : '',
            image : null,
            linearProgress : false
        }
    }
    Signup = (e)=> {
        e.preventDefault();
        if(this.state.name === '' || this.state.email === '' || this.state.password === '' || this.state.image === null){
            alert("Please Fill All Fields")
        }
        else{
            this.props.signup(this.state);
            this.setState({linearProgress:true})
        }
    }
    Login = (e)=> {
        e.preventDefault();
        if(this.state.email === '' || this.state.password === ''){
            alert("Please Fill All Fields")
        }
        else{
            this.props.login(this.state);
            this.setState({linearProgress:true})
        }
    }
    componentWillReceiveProps(nextProps){
        // console.log(nextProps.data.AUTH.Info)
        if(nextProps.data.AUTH.Info){
            this.props.history.push('/CV')
        }
        else{
            this.props.history.push('/modal')
        }
    }
    
    signupdrawer = () => {
        return (
            <div className="checktransition" style={{ width: this.state.open ? '100%' : '0px' , position: 'relative' }}>
                <div className="side_btn1"></div>
                <div className="container-fluid">
                    <h3 className="heading">REGISTER ACCOUNT</h3>
                    <form onSubmit={this.Signup}>
                        <div class="form-group">
                            <label for="name">Full Name:</label>
                            <input type="text" class="form-control col-sm-10" id="email" onChange={(e)=>{this.setState({name:e.target.value})}} placeholder="Enter Name" name="email"/>
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control col-sm-10" id="email" onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="Enter email" name="email"/>
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control col-sm-10" id="password" onChange={(e)=>{this.setState({password:e.target.value})}} placeholder="Password" name="password"/>
                        </div>
                        <div class="check">
                            <input type="file" class="form-control-file hide_file" id="exampleInputFile" onChange={(e)=>{this.setState({image:e.target.files[0]})}} aria-describedby="fileHelp"/>
                        </div>
                        <div className="register" style={{margin : '70px'}}>
                        {this.state.linearProgress ?  <LinearProgress color="#3b77db" style={{backgroundColor:"black"}} mode="indeterminate" />:
                            <input type="submit" value="REGISTER" />
                        }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div className="App">
                <div style={style} className='paper'>
                    {this.signupdrawer()}
                    <button className="side_btn" onClick={() => { this.setState({ open: !this.state.open }) }}><i className="fa fa-bars rotate" ></i></button>
                        <div className={this.state.open ? 'hide' : "container"  }>
                        <div className="container">
                            <h4 className="heading">ACCOUNT LOGIN</h4>
                            <form onSubmit={this.Login}>
                            <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control col-sm-10" id="email" onChange={(e)=>{this.setState({email:e.target.value})}} placeholder="Enter email" name="email"/>
                            </div>
                            <div class="form-group">
                                <label for="password">Password:</label>
                                <input type="password" class="form-control col-sm-10" id="password" onChange={(e)=>{this.setState({password:e.target.value})}} placeholder="Password" name="password"/>
                            </div>
                            <div class="form-check">
                                <div class="form-check-label">
                                <span><a href="https://www.w3schools.com">Forgot my password</a></span>
                                </div>
                            </div><br/>
                                <div  style={{margin : '25px'}}>
                                    {this.state.linearProgress ? <LinearProgress color="#3b77db" style={{backgroundColor:"black" }} mode="indeterminate" /> :
                                    <input type="submit" value="LOG IN" />
                                    }   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const style = {
    height: 330,
    width: 380,
    margin: 40,
    textAlign: 'left',
    display: 'inline-block',

};
export default connect(mapStateToProps,mapDispatchToProps)(Login);