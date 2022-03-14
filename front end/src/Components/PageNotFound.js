import React, {Component } from 'react';
import { Container} from 'react-bootstrap';

class PageNotFound extends Component {
    render() { 
        return <Container> <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh', color:'red'}}>Page Not Found</h1></Container>;
    }
}
 
export default PageNotFound;