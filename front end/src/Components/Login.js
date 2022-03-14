import axios, { Axios } from 'axios';
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {},
            errorMessage: '',
            username:'',
            authToken:'',
            login:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //localStorage.setItem('login',this.state.login);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    handleSubmit(event) {
        event.preventDefault();


        if (this.validate()) {
            console.log(this.state);
            const data = {
                id:1,
                username: this.state.input.username,
                password: this.state.input.password
            }
            axios.post("http://ec2-54-224-252-110.compute-1.amazonaws.com:8085/authenticate", data).then((res) => {
                
               if(res.data!= null){
                this.setState({
                    username:res.data.username,
                    authToken:res.data.authToken,
                })
            }
            else{
                alert("Userid or password is incorrect");
            }

               console.log(res.data);
               localStorage.setItem('token',JSON.stringify(res.data));

               const txt=localStorage.getItem('token');
               const obj = JSON.parse(txt);
               //alert(obj.status);

               axios.post("http://ec2-54-224-252-110.compute-1.amazonaws.com:8085/validate",obj).then((ver)=>{
                   this.setState({
                       login:ver.data,
                   })

                   localStorage.setItem('login',this.state.login);
                   console.log(ver.data);
                if (ver.data) {
                    //alert("ok" +this.state.login)
                   window.location.pathname = "/details";
                 } else {
                     alert("You are Hacker")
                    window.location.pathname = "/";
                }
               })
            })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["username"]) {
            isValid = false;
            errors["username"] = "Please enter your username.";
        }

        if (typeof input["username"] !== "undefined") {
            const re = /^\S*$/;
            if (input["username"].length < 3 || !re.test(input["username"])) {
                isValid = false;
                errors["username"] = "Please enter valid username.";
            }
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (typeof input["password"] !== "undefined") {
            if (input["password"].length < 3) {
                isValid = false;
                errors["password"] = "Please add at least 6 charachter.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <div>
                {
                    !localStorage.getItem('login')?
                    <div className='container-fluid'>
                <br/><br/>
                <Container style={{width:400}}>
                <div className='login-content'>
                    <h1 style={{textAlign:'center'}}>Login</h1>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={this.state.input.username}
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter username"
                                id="username" />

                            <div className="text-danger">{this.state.errors.username}</div>
                        </div>

                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.input.password}
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Enter password"
                                id="password" />
                                <div className="text-danger">{this.state.errors.password}</div>
                        </div>
                        <br/>
                        <div className='login-button loginButtonSection'>
                            <input type="submit" value="Login" className="btn btn-success" />
                        </div>
                    </form>
                </div>
                </Container>
            </div>
            :
            <div>
                {
                    window.location.pathname = "/details"
                }
            </div>
                }
            </div>
        );
    }
}

export default Login;