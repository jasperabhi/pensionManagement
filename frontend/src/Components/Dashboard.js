import React, {Component} from 'react';
import axios, { Axios } from 'axios';
import './style.css'
import { Container, Form,Button} from 'react-bootstrap';

class Dashboard extends Component  {

    constructor(){
        super();
        const txt=localStorage.getItem('pensionUser');
        const obj = JSON.parse(txt);

        const a=localStorage.getItem('adhar');
        const aadhar = JSON.parse(a);

        const serrviceChar = 500;

        console.log(aadhar);

        axios.post("http://localhost:8082/pensionerDetailByAadhaar/"+aadhar).then((res) => {
            console.log(res.data.bank);
            this.setState({
                bank:res.data.bank
            })
           
        if(res.data.bank.bankType==="private"){
            //console.log("ppp");
            this.setState({
                serviceCharge:550
            })
        }
        })
        console.log(serrviceChar);
        console.log(obj);
        this.state={
            name:obj.name,
            doj:obj.dateOfBirth,
            pan:obj.pan,
            pensionType:obj.pensionType,
            pensionAmmount:obj.pensionAmount,
            aadhar:aadhar,
            bank:{},
            serviceCharge:500,
            statusCode:0
        }
        this.handleSubmit = this.handleSubmit.bind(this);  
    }


    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.serviceCharge);

      
        console.log(this.state.serviceCharge);

        const data={
            aadharNumber:this.state.aadhar,
            pensionAmount:this.state.pensionAmmount,
            serviceCharge:this.state.serviceCharge
        }
        console.log(this.state.bank.bankType);

        

        axios.post("http://localhost:8083/disbursePension",data).then((ver)=>{
            this.setState({
                statusCode:ver.data.pensionStatusCode
            })
            if(ver.data.pensionStatusCode==10)
            {
                alert("Service charge will be "+this.state.serviceCharge);
                localStorage.removeItem('pensionUser');
                localStorage.removeItem('adhar');
                window.location.pathname = "/success";
            }
            else{
                alert("Server error");
                localStorage.removeItem('pensionUser');
                localStorage.removeItem('adhar');
                window.location.pathname = "/details";
            }
        })

       
        //localStorage.removeItem('pensionUser');
        //window.location.pathname = "/success";
    }

    render(){
    return(
        <div>
            {
                 localStorage.getItem('login')?
        <div className="container-fluid" style={{marginTop:5}}>
          <br/><br/>
          <Container style={{width:400}}>
          <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Pensioner Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the name" value={this.state.name}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>PAN Number</Form.Label>
                    <Form.Control type="text" placeholder="PAN Number" value={this.state.pan}/>
                 </Form.Group>
                 <Form.Group className="mb-3">
                    <Form.Label>Pension Type</Form.Label>
                    <Form.Control type="text" placeholder="PAN Number" value={this.state.pensionType}/>
                 </Form.Group>
            <Form.Group className="mb-3">
                 <Form.Label>Pensioner DOB</Form.Label>
                <Form.Control type="text" placeholder="Enter Date of birth" value={this.state.doj}/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                 <Form.Label>Pension Amount</Form.Label>
                <Form.Control type="text" placeholder="TotalAmount" value={this.state.pensionAmmount}/>
            </Form.Group>
           
            <Form.Group className="mb-3">
                 <Form.Label>Bank Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Date of birth" value={this.state.bank.bankName}/>
            </Form.Group>
            <Form.Group className="mb-3">
                 <Form.Label>Account Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Date of birth" value={this.state.bank.accountNumber}/>
            </Form.Group>
            <Form.Group className="mb-3">
                 <Form.Label>Account Number</Form.Label>
                <Form.Control type="text" placeholder="Enter Date of birth" value={this.state.bank.bankType}/>
            </Form.Group>
            <Button variant="primary" type="submit">Disburse Pension</Button>
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
export default Dashboard;