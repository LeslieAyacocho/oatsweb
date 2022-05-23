import React, { Fragment, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {Form, Row, Col, Button} from 'react-bootstrap'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import FileBase64 from 'react-file-base64';
import  {newThesis, clearErrors} from '../../../redux/actions/thesisActions'
import {getDepartment} from '../../../redux/actions/departmentActions'
import {getCourse} from '../../../redux/actions/courseActions'
import { NEW_THESIS_RESET } from '../../../redux/constants/thesisConstants'
import { showErrMsg } from '../../utils/Notification'
import AdminSidebar from '../../layout/AdminSidebar'

const CreateThesis = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, error, success } = useSelector(state => state.newThesis);
    const { isLoggedInAdmin, admin } = useSelector(state => state.authAdmin);

    //Dropdown Data
    const {department} = useSelector(state => state.department)
    const {course} = useSelector(state => state.courses)

    // Thesis Details
    const [title, setTitle] = useState('')
    const [publishedAt, setPublishedAt] = useState('')
    const [abstract, setAbstract] = useState('')
    const [thisDepartment, setDepartment] = useState('')
    const [nameDepartment, setNameDepartment] = useState('')
    const [thisCourse, setCourse] = useState('')

    //UPLOAD PDF
    const [upload, setUploadFile] = useState('')

    //multiple input fields
    const [authors, setAuthors] = useState([
        {fname: '', lname:''}
    ])

    //keywords
    const [tags, setTags] = useState([])

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/thesis');
            alert.success('thesis created successfully');
            dispatch({ type: NEW_THESIS_RESET })
        }


        dispatch(getDepartment())

        if(admin.role === 'Moderator'){
            setDepartment(admin.admin_department.departments)
            setNameDepartment(admin.admin_department.deptname)
        }

        if(thisDepartment){
            dispatch(getCourse(thisDepartment))
            console.log(thisDepartment)
        }

        if (!isLoggedInAdmin) {
            history.push('/admin/login');
        }
        
        }, [dispatch, alert, error, success, history, thisDepartment,nameDepartment, isLoggedInAdmin, admin])

    const openScanToText = (url) => {
        window.open(url);
    }

    // Author Textbox
    const handleChangeInput = (index, event) => {
        const values = [...authors]
        values[index][event.target.name] = event.target.value
        setAuthors(values)

        // let nAuthor = event.target.value
        // let arr = authors.concat(nAuthor)
    } 

    //Form Submit
    const handleFormSubmit  = (e) => {
        e.preventDefault()
        // setUploadFiles({...uploads,result});
        const formData = new FormData();
        formData.set("title", title)
        formData.set("publishedAt", publishedAt)
        formData.set("abstract", abstract)
        formData.set("departments", thisDepartment)
        formData.set("courses", thisCourse)
        formData.set("upload", upload)
        formData.set("role", "admin")
        formData.set("uploadedId", admin._id)


        tags.forEach(keyword => {
            formData.append('thisKey',keyword)
        });

        formData.append('thisAuthors', JSON.stringify(authors))

        dispatch(newThesis(formData))

        // console.log(thisKeyword)
        // console.log(thisAuthors)
        // console.log(authors)
        // console.log(tags)
        // console.log("title:", title)
        // console.log("publishedAt:", publishedAt)
        // console.log("abstract:", abstract)
        // console.log("departments:", thisDepartment)
        // console.log("courses:", thisCourse)
        // console.log("authors", thisAuthors) 
        // console.log("Keywords", tags)
        // console.log("PDF", upload)
    }

    // Add Author
    const handleAddFields = () => {
        setAuthors([...authors, {fname: '', lname:''}])
    }

    // Remove Author
    const handleRemoveFields = (index) => {
        const values = [...authors]
        if(index !== 0){
            values.splice(index, 1)
            setAuthors(values)
        }
        else{
            
        }
    }

    //Keyword add tags
    const addTags = event => {
        if(event.target.value !== ""){
            setTags([...tags, event.target.value])
            event.target.value = ""
        }
    }

    //Keyword remove tags
    const removeTags = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove))
    }

    return(
        <Fragment>
            <Row>
                <Col sm={2} className="admin-sidebar">
                    <AdminSidebar/>
                </Col>

                <Col sm={10}>
                    <div className='back-button text-start px-3 py-2'>
                        <i className="fas fa-arrow-left"  data-toggle="tooltip" data-placement="bottom" title="Back" onClick={() => history.goBack()}></i>
                        </div>
                    <div className="admin-wrapper px-5">
                        <div className="form-admin-wrapper-two text-start">
                            <div className="wrapper my-2">
                                    <h1>Create Thesis</h1>
                                        <Form action="" onSubmit={handleFormSubmit}>

                                            {/* Title Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    className='w-75 my-1'
                                                    type="title"
                                                    id="inputTitle"
                                                    value={title}
                                                    onChange={(e) => setTitle(e.target.value)}
                                                />
                                            </Form.Group>

                                            {/* Year Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Year Published</Form.Label>
                                                <Form.Control
                                                    className='w-75 my-1'
                                                    type="year"
                                                    id="inputYear"
                                                    aria-describedby="year"
                                                    value={publishedAt}
                                                    onChange={(e) => setPublishedAt(e.target.value)}
                                                />
                                                <Form.Text id="year" muted>
                                                    Only input the year the thesis was published.
                                                </Form.Text>
                                            </Form.Group>

                                            {/* Author Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Author/s</Form.Label>
                                                <div className='d-inline'>
                                                    {authors.map((inputField, index) => (
                                                        <div key={index}>
                                                            <Form.Control
                                                                name="fname"
                                                                label="fname"
                                                                value={inputField.fname}
                                                                className="d-inline w-25 my-2"
                                                                placeholder='First Name'
                                                                onChange={event => handleChangeInput(index, event)}
                                                            />
                                                            <Form.Control
                                                                name="lname"
                                                                label="lname"
                                                                value={inputField.lname}
                                                                className="d-inline w-25 m-2"
                                                                placeholder='Last Name'
                                                                onChange={event => handleChangeInput(index, event)}
                                                            />

                                                            {/* Add Author Button */}
                                                            <Button 
                                                                variant ="outline" 
                                                                className='mx-2'
                                                                onClick={() => handleAddFields()}
                                                            >
                                                                <i class="fas fa-plus"></i>
                                                            </Button>
                                                            
                                                            {/* Remove Author Button */}
                                                            <Button 
                                                                variant ="outline"
                                                                onClick={() => handleRemoveFields(index)}
                                                            >
                                                                <i class="fas fa-minus"></i>
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <Form.Text id="author" muted>
                                                    Input the first and last name of the author respectively.
                                                </Form.Text>
                                            </Form.Group>

                                            {/* Department Input */}
                                            { admin.role === 'Super Admin'? <Form.Group className="mb-3">
                                                <Form.Label>Department</Form.Label><br/>
                                                <Form.Select id="department_field" placeholder="" className="d-inline w-75 my-2"  value={thisDepartment} onChange={(e) => setDepartment(e.target.value)}>
                                                <option> -- SELECT Department --</option>
                                                
                                                    { department && department.map((departments) => (
                                                                
                                                            <option value={departments._id}>{departments.deptname}</option>
                                                                
                                                        ))}
                                                </Form.Select>
                                            </Form.Group>
                                            :
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Department</Form.Label>
                                                    <Form.Control
                                                        className='w-75 my-1'
                                                        type="year"
                                                        id="inputYear"
                                                        aria-describedby="year"
                                                        value={nameDepartment}
                                                        disabled
                                                    />
                                                </Form.Group>
                                            }

                                            {/* Course Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Course</Form.Label><br/>
                                                <Form.Select id="department_field" placeholder="" className="d-inline w-75 my-2" value={thisCourse} onChange={(e) => setCourse(e.target.value)}>
                                                <option> -- SELECT Course --</option>
                                                
                                                {thisDepartment && course && course.map((courses) => (
                                                
                                                                <option value={courses._id}>{courses.coursecode} ({courses.coursename})</option>
                                                                    
                                                ))}
                                                </Form.Select>
                                            </Form.Group>

                                            {/* Keywords Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Keyword/s</Form.Label>
                                                <div className='tags-input'>
                                                    <ul id="tags">
                                                        {tags.map((tag, index) => (
                                                            <li key={index} className="tag">
                                                                <span className='pr-2'>{tag}</span>
                                                                <i 
                                                                    class="fas fa-times-circle"
                                                                    onClick={() => removeTags(index)}
                                                                ></i>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    
                                                    <Form.Control
                                                        className='d-inline w-75 my-1 keywordInput'
                                                        type="text"
                                                        placeholder='Press space to add keywords'
                                                        onKeyUp={e => e.key === " " ? addTags(e): null}
                                                        // onChange={event => handleChangeInputKeywords(index, event)}
                                                    />
                                                </div>
                                            </Form.Group>

                                            {/* Abstract Input */}
                                            <Form.Group className="mb-3">
                                                <Form.Label>Abstract</Form.Label>
                                                <Link onClick={() => openScanToText(window.location.origin + '/scan-to-text')} className='d-block'>Scan-To-Text</Link>
                                                {/* <Link to='/plagiarism' className='d-block'>Plagiarism Checker</Link> */}
                                                <Form.Control
                                                    className='w-75 my-1'
                                                    as="textarea"
                                                    rows={15}
                                                    type="abstract"
                                                    id="inputAbstract"
                                                    aria-describedby="abstract"
                                                    value={abstract}
                                                    onChange={(e) => setAbstract(e.target.value)}
                                                />
                                            </Form.Group>

                                            {/* Upload PDF */}
                                            <Form.Label>Thesis PDF</Form.Label>
                                            
                                            <div className="container">
                                                <label><i>Note: Only PDF files below 500KB can be uploaded</i></label>
                                                {/* <pre>{JSON.stringify(upload, null, '\t')}</pre> */}
                                                    <form action="" onSubmit={handleFormSubmit}> 
                                                    <FileBase64
                                                        type="file"
                                                        accept="application/pdf,application/vnd.ms-excel"
                                                        multiple={false}
                                                        onDone={({ base64 }) => setUploadFile(base64)}
                                                    />
                                                </form>
                                            </div>
                                            
                                            {error && showErrMsg(error)}
                                            <Button 
                                                className='my-3 success'
                                                variant="primary" 
                                                type="submit"
                                                onClick={handleFormSubmit}
                                                disabled={loading ? true : false}
                                            >
                                                Submit
                                            </Button>
                                            
                                        </Form>
                                    
                            </div>
                        </div>
                    </div>
                        
                </Col>
            </Row>
        </Fragment>
    )
}

export default CreateThesis