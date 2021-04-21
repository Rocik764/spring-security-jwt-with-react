import React, { Component } from "react";
import UserService from "../../services/User";
import {Container} from "react-bootstrap";
import AuthService from "../../services/Auth";

export default class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            content: []
        };
    }

    componentDidMount() {
        let user = AuthService.getCurrentUser();
        if(user) {
            UserService.getUserProfile(user.user.id).then(
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
    }

    render() {
        return (
            <Container>
                {this.state.error ? (
                    <h3>{this.state.content.status}</h3>
                ) : (
                    <div>
                        <h2>{this.state.content.email}</h2>
                        <h3>{this.state.content.roles}</h3>
                    </div>
                )}
            </Container>
        )
    }
}