import React, {Component } from 'react';
import {NavLink} from 'react-router-dom';
import Logo from './Images/logolatest.png';
import styles from './style.css';
import { Button} from 'react-bootstrap';

class MenuBar extends Component {
    
    constructor(props) {
        super(props);
        this.loog = this.loog.bind(this);
        this.logout=this.logout.bind(this);
      }

      loog(){
          window.location.pathname("/login")
      }

      logout(){
          localStorage.removeItem('login');
          localStorage.removeItem('token');
          localStorage.removeItem('adhar');
          localStorage.removeItem('pensionUser');
          document.location.reload(true)
      }

    render() { 
        return(

            <nav bg="dark" className=' navbar navbar-dark bg-primary ' >
                    <NavLink  to='/'><h3 style={{color:"black"}}> <img src={Logo} width="40" height="40" className="d-inline-block align-top" />Pension Management System</h3></NavLink>
                        { 
                            !localStorage.getItem('login')?
                            <NavLink to='/login' style={{margin:0}}>
                            <Button variant="secondary" size="lg"  onClick={this.loog} active>Login</Button>
                             </NavLink>
                            :
                            <div>
                                <Button variant="secondary" size="lg" onClick={this.logout} active>Logout</Button>
                            </div>
                        }
   
            </nav>
        );
    }
}
 
export default MenuBar;