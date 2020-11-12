import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchFeeback } from "../actions/feedback.actions"
// reactstrap components
import {
    Card,
    CardBody,
    Row,
    Col,
} from "reactstrap";

const genderOptions = {
    male:"Male",
    female:"Female"
}

const Feedbacklist = () => {
    let isLoading = useSelector((state) => state.feedback.loading);
    let error = useSelector((state) => state.feedback.error);
    let feedbackList = useSelector((state) => state.feedback.feedbackList);
    console.log("feedbackList====>", feedbackList)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFeeback())
    }, [])
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="10">
                        <Card>
                            <CardBody>
                                <div>
                                    <table class="table table-hover">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th scope="col">User Name</th>
                                                <th scope="col">Mobile Number</th>
                                                <th scope="col">Email Id</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">Feedback</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {feedbackList?.map((item) => {
                                                return(<tr>
                                                    <td scope="row">{item.customer?.firstName}{" "}{item.customer?.lastName}</td>
                                                    <td>{item.customer?.phone}</td>
                                                    <td>{item.customer?.email}</td>
                                                    <td>{genderOptions[item.customer?.gender]}</td>
                                                    <td>{item.message}</td>
                                                </tr>)
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>

    )
}

export default Feedbacklist;