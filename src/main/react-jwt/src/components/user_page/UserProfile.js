import React, { Component } from "react";
import UserService from "../../services/User";
import { Card, Col, Row} from "react-bootstrap";
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
            <>
            {this.state.error ? (
                <h3>{this.state.content.status}</h3>
            ) : (
                <Card className="user-card-full">
                    <Row className="m-l-0 m-r-0">
                        <Col sm={4} className="bg-c-lite-green user-profile">
                            <div className="card-block text-center text-white">
                                <div className="m-b-25"><img
                                    src="https://img.icons8.com/bubbles/100/000000/user.png"
                                    className="img-radius" alt="User-Profile-Pic"/></div>
                                <h6 className="f-w-600">Some name</h6>
                                <p>{this.state.content.roles}</p> <i
                                className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                        </Col>
                        <Col sm={8}>
                            <div className="card-block">
                                <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                <Row>
                                    <Col sm={6}>
                                        <p className="m-b-10 f-w-600">Email</p>
                                        <h6 className="text-muted f-w-400">{this.state.content.email}</h6>
                                    </Col>
                                    <Col sm={6}>
                                        <p className="m-b-10 f-w-600">Phone</p>
                                        <h6 className="text-muted f-w-400">123456789</h6>
                                    </Col>
                                </Row>
                                <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                                <Row>
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Recent</p>
                                        <h6 className="text-muted f-w-400">Project 1</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="m-b-10 f-w-600">Most Viewed</p>
                                        <h6 className="text-muted f-w-400">Project 2</h6>
                                    </div>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Card>
            )}
            </>
        )
    }
}