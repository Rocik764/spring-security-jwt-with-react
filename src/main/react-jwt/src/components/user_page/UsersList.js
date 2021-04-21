import React, { Component } from "react";
import UserService from "../../services/User";
import {Container, Table} from "react-bootstrap";

export default class UsersList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: false,
            content: []
        };
    }

    componentDidMount() {
        UserService.getUsersList().then(
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

        let users = ""

        if(!this.state.error) {
             users = this.state.content.map((element, i) => {
                return (
                    <tr key={i}>
                        <td>{element.id}</td>
                        <td>{element.email}</td>
                        <td>{element.roles}</td>
                    </tr>
                );
            });
        }


        return (
            <Container>
                {this.state.error ? (
                    <h3>{this.state.content.status}</h3>
                ) : (
                    <Table responsive="sm">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Roles</th>
                        </tr>
                        </thead>
                        <tbody>
                            {users}
                        </tbody>
                    </Table>
                )}
            </Container>
        )
    }
}