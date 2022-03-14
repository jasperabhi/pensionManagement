import React, {Component } from 'react';
import './style.css';
import { Container, Form,Button} from 'react-bootstrap';
import axios, { Axios } from 'axios';

class Register extends Component {

    constructor() {
        super();
        this.state={
            input: {},
            errors: {},
            errorMessage: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event){
        event.preventDefault();
        console.log(this.state);
        const data={
            name:this.state.input.pName,
            dateOfBirth:this.state.input.pDob,
            pan:this.state.input.pNumber,
            aadharNumber:this.state.input.pAdhar,
            pensionType:this.state.input.ptype
        }

        const txt=localStorage.getItem('token');
        const obj = JSON.parse(txt);
        const accessToken = obj.token;

        axios.post("http://ec2-54-224-252-110.compute-1.amazonaws.com:9091/pensionerInput",data,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((res) =>{
            if(!res.data){
                alert("record not found");
            }
            else{
            localStorage.setItem('pensionUser',JSON.stringify(res.data));
            localStorage.setItem('adhar',JSON.stringify(this.state.input.pAdhar));
            window.location.pathname = "/dashboard";
            }
        })
    }


    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
    }

    render(){
    return(
        <div>
            {
                localStorage.getItem('login')?
      <div className="container-fluid">
          <br/><br/>
          <Container style={{width:400}}>
          <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    onChange={this.handleChange}
                    placeholder="Enter the name"
                    pattern="[a-zA-Z]+([\s][a-zA-Z]*)*"
                    title="Name should not contain any numbers or special symbols"
                    name="pName" 
                    id="pName"/>
                </Form.Group>

            <Form.Group className="mb-3">
                 <Form.Label>Date of birth</Form.Label>
                <Form.Control 
                type="date" 
                onChange={this.handleChange}
                placeholder="Enter Date of birth" 
                name="pDob" 
                id="pDob"/>
            </Form.Group>
        
            <Form.Group className="mb-3">
                 <Form.Label>PAN Number</Form.Label>
                <Form.Control 
                type="text"
                onChange={this.handleChange} 
                placeholder="PAN Number" 
                name="pNumber" 
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" 
                title="Example : ABCDE1234F"
                id="pNumber"/>
            </Form.Group>

            <Form.Group className="mb-3">
                 <Form.Label>Adhar Number</Form.Label>
                <Form.Control 
                type="Number" 
                onChange={this.handleChange}
                placeholder="Adhar Number" 
                pattern="[0-9]{12}" 
                title="Must contain 12 digits only"
                name="pAdhar" 
                id="pAdhar"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Check inline type="radio" label="Self" name ="ptype" value="self" id="ptype" onChange={this.handleChange}/>
                <Form.Check inline type="radio" label="Family"name="ptype" value="family" id="ptype" onChange={this.handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit">Fetch Details</Button>
        </Form>
          </Container>
      </div> 
      :
      <div>
      {
          window.location.pathname = "/login"
      }
      </div>
      }
      </div>     
    )       
}
}
export default Register;