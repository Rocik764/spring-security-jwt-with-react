import React, { Component } from "react";
import UserService from "../../services/User";
import {Card, Col, Container, Row} from "react-bootstrap";

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            content: []
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    error: false,
                    content: response.data
                });
            },
            error => {
                this.setState({
                    error: true,
                    content: error.response
                });
            }
        );
    }

    render() {
        return (
            <Card className="justify-content-center">
                {this.state.error ? (
                    <h3>Forbidden</h3>
                ) : (
                    <>
                        <Card.Header>{this.state.content}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <a href="https://github.com/Rocik764/spring-security-jwt-with-react">Source code</a>
                        </Card.Footer>
                    </>
                )}
            </Card>
        );
    }
}