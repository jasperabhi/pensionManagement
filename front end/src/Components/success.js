import React, { Component } from 'react';

class Success extends Component {
    constructor() {
        super();
        this.state = { 

         }
    }
    render() { 
        return ( 
            <div>
                {
                localStorage.getItem('login')?
                <div>
                 <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh',fontWeight: 'bold',color:'green'}}>Congratulation!!</h1>
                 <h3 style={{display: 'flex',  justifyContent:'center', alignItems:'center',fontWeight: 'bold',color:'green'}}>Amount has been disbursed to your bank account
                 <a href="/details">Click to transfer more pension</a>
                 </h3>
                </div>
                :
                <div>
                {
                    window.location.pathname = "/login"
                }
                </div>
                }
            </div> 
         );
    }
}
 
export default Success;