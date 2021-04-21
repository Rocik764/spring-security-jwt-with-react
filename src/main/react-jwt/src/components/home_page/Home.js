import React, { Component } from "react";
import UserService from "../../services/User";

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
            <div className="container">
                {this.state.error ? (
                    <h3>Forbidden</h3>
                ) : (
                    <h3>{this.state.content}</h3>
                )}
            </div>
        );
    }
}