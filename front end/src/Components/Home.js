import React, { Component } from 'react';
import MenuBar from './MenuBar';
import axios from 'axios';

class Home extends Component {
   
    render() { 
        return <div>
            <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh',fontWeight: 'bold',color:'#8803fc'}}>Welcome To Pension Management System</h1>
        </div>;
    }
}
 
export default Home;