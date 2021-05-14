import React from 'react';  
    
import axios from 'axios';  
import { authHeader } from '../../_helpers';
import {
    Badge,
    Button,
    Card,
    Navbar,
    Nav,
    Table,
    Container,
    Row,
    Col,
    
  } from "react-bootstrap";

export default class PostList extends React.Component {  
  state = {  
    posts: []  
    
  }  
    
  componentDidMount() {  
    axios.get(`http://localhost:4000/api/allPdfCv`,{
        headers: authHeader()
})  
      .then(res => {  
        const posts = res.data;  
        this.setState({ posts });  
      })  
  }  
    
  deleteRow(id, e){  
    axios.delete(`http://localhost:4000/api/delete/${id}`,{
        headers: authHeader()
})  
      .then(res => {  
        console.log(res);  
        console.log(res.data);  
    
        const posts = this.state.posts.filter(item => item.id !== id);  
        this.setState({ posts });  
      })  
    
  }  
    
  render() {  
    return (  
 
<Container>
<>{this.state.posts.map((post) => (  
  <Row>

    <Col>
    <Card className="text-center">
  <Card.Header>{post.email}</Card.Header>
  <Card.Body>
    <Card.Title>Special title treatment</Card.Title>
    <Card.Text>
    {post.desc}
    </Card.Text>
    <a href={post.image}> Open CV</a>
  </Card.Body>
  <Card.Footer className="text-muted">{post.createdAt}</Card.Footer>
</Card>
    </Col>


    <Col md="auto"><a href={post.image}> <img src={post.image} width='110'/></a></Col>


    <Col xs lg="2">


    <>
  <Button variant="primary" size="lg" block>
    Contact
  </Button>
  <Button variant="danger"size="lg" block onClick={(e) => this.deleteRow(post._id, e)}>
   Delete profile
  </Button>
</>
    </Col>
           
  </Row>
  ))} </>
</Container>
    )  
  }  
}  