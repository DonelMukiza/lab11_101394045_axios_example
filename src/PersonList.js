import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

class PersonList extends Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    axios.get(`https://randomuser.me/api/?results=10`)
      .then((res) => {
        const persons = res.data.results;
        this.setState({ persons });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }

  render() {
    return (
      <Container className="mt-5">
        <h2 className="text-center mb-4">User List</h2>
        {this.state.persons.map((person, index) => (
          <Card key={index} className="mb-4 shadow-lg">
            <Row noGutters>
              <Col md={3}>
                <Card.Img
                  variant="top"
                  src={person.picture.large}
                  alt={`${person.name.first} ${person.name.last}`}
                  className="img-fluid rounded-circle m-4"
                />
              </Col>
              <Col md={9}>
                <Card.Body>
                  <Card.Title>{`${person.name.title} ${person.name.first} ${person.name.last}`}</Card.Title>
                  <Card.Text>
                    <strong>User Name:</strong> {person.login.username} <br />
                    <strong>Gender:</strong> {person.gender.toUpperCase()} <br />
                    <strong>Time Zone Description:</strong> {person.location.timezone.description} <br />
                    <strong>Address:</strong> {`${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.state}, ${person.location.country} - ${person.location.postcode}`} <br />
                    <strong>Email:</strong> {person.email} <br />
                    <strong>Birth Date and Age:</strong> {`${new Date(person.dob.date).toLocaleDateString()} (${person.dob.age} years)`} <br />
                    <strong>Register Date:</strong> {new Date(person.registered.date).toLocaleDateString()} <br />
                    <strong>Phone:</strong> {person.phone} <br />
                    <strong>Cell:</strong> {person.cell}
                  </Card.Text>
                  <Button variant="info">Details</Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))}
      </Container>
    );
  }
}

export default PersonList;
