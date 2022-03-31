import React, {useEffect, useState} from 'react'
import { Link as Link2} from "react-scroll"
import {Link as Link1, useParams} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector} from 'react-redux'
import { Row, Col, Button, Form} from 'react-bootstrap'
import Loader from '../../utils/Loader'
import { getThesisDetails, clearErrors } from '../../../redux/actions/thesisActions'
const ThesisDetails = () => {
    
    const dispatch = useDispatch()
    const alert = useAlert()
    const [title, setTitle] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [abstract, setAbstract] = useState('')
    const [keywords, setKeyword] = useState('')
    const [authors, setAuthor] = useState('')
    const [thisDepartment,setThisDepartment] = useState('')
    const [thisCourse,setThisCourse] = useState('')
    const {loading, error, thesis } = useSelector(state => state.thesisDetails);

    let {thesisId} = useParams()

    useEffect(() => {
        
        if(thesis && thesis._id !== thesisId){
            dispatch(getThesisDetails(thesisId))
        } else {
            setTitle(thesis.title)
            setPublishedAt(thesis.publishedAt)
            setAbstract(thesis.abstract)
            setKeyword(thesis.keywords)
            setAuthor(thesis.authors)
            setThisDepartment(thesis.department)
            setThisCourse(thesis.course)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error ,thesisId, thesis]);

    return ( 
        <div className="wrapper">
            {loading ? <Loader /> : (
                <Row>
                <Col sm={9}>
                <div className="details-title text-start mx-5">
                <h5 className="m-3">{title}</h5>
                
                <div className="m-3">
                <label> Published: <Link1>{publishedAt}</Link1> | Department:<Link1> {thisDepartment.deptname}</Link1> | Course: <Link1>{thisCourse.coursecode}</Link1> 
                </label>
                </div>
                <div className='details-button'>
                        <Button data-toggle="tooltip" data-placement="bottom" title="Download PDF">
                        <i className="fas fa-file-pdf"></i> PDF  
                        </Button>
                        
                </div>
                        
            </div>
            
            
            <Row>
                <Col sm={3}>
                <ul className="list-group p-5">
                <li className="list-group-item">
                    <Link2
                        activeClass="active"
                        to="abstract"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        Abstract
                    </Link2>
                    </li>
                    <li className="list-group-item">
                    <Link2
                        activeClass="active"
                        to="authors"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                    Authors
                    </Link2>
                    </li>
                    <li className="list-group-item">
                    <Link2
                        activeClass="active"
                        to="keywords"
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                    >
                        Keywords
                    </Link2>
                    </li>
                
                </ul>
                </Col>
                <Col sm={9}>
                <div className="text-start m-1 my-5">
                    <h5 id="abstract">Abstract</h5>
                    <p className="text-justify">{abstract}</p>
                </div>

                <Button variant="danger" className='mx-1' data-toggle="modal" data-target={'#subscriptionModal'}>
                    Purchase Subscription
                </Button>

                <div className="modal fade" id="subscriptionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">OATS Thesis Archive Subscription</h5>
                            </div>

                            <div className="modal-body text-start">
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            label="₱50/month"
                                            name="group1"
                                            type={type}
                                            id={`${type}`}
                                        />
                                        <Form.Check
                                            label="₱140/quarter"
                                            name="group1"
                                            type={type}
                                            id={`${type}`}
                                        />
                                        <Form.Check
                                            label="₱550/year"
                                            name="group1"
                                            type={type}
                                            id={`${type}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save changes</button>
                                <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="modal fade" id="subscriptionModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">OATS Thesis Archive Subscription</h5>
                            </div>

                            <div className="modal-body text-start">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked/>
                                    <label className="form-check-label" for="exampleRadios1">
                                        Default radio
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2"/>
                                    <label className="form-check-label" for="exampleRadios2">
                                        Second default radio
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled/>
                                    <label className="form-check-label" for="exampleRadios3">
                                        Disabled radio
                                    </label>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Save changes</button>
                                <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* <div className="modal fade" id={'subscriptionModal'} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <Form.Group className='mb-3'>
                                    <Form.Label>OATS Thesis Archive Subscription</Form.Label>
                                    <Form.Control
                                        className='w-75 my-1 flex-center'
                                        type="date"
                                        // onChange={(e) => setDateReturned(e.target.value)}
                                    />
                                </Form.Group>
                            </div>

                            <div className="modal-footer">
                                <Button  className="btn btn-secondary" data-dismiss="modal">Close</Button>
                                {/* <Button  className="btn btn-danger" data-dismiss="modal" onClick={() => returnHandler(borrow._id)}>Submit</Button> 
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className='p-3'>
                    <div className="user-accordion accordion" id="accordionExample">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                            <h2 className="mb-0">
                                <button id="authors" className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Authors
                                </button>
                            </h2>
                            </div>

                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body text-start">
                            { authors && authors.map((x) => (
                                <li>{x.fname} {x.lname}</li>
                            ))}
                            </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header" id="headingTwo">
                            <h2 className="mb-0">
                                <button id="keywords" className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Keywords
                                </button> 
                            </h2>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className="card-body text-start">
                            { keywords && keywords.map((x) => (
                                <li>{x.keyword}</li>
                            ))}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </Col>
            </Row>
                </Col>
                <Col sm={2}></Col>
            </Row>

    
            )}
            
        </div>
        
    );
}

export default ThesisDetails;