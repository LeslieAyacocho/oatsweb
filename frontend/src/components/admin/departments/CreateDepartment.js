import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Row, Col, Button} from 'react-bootstrap';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { newDepartment, clearErrors } from '../../../redux/actions/departmentActions'
import { NEW_DEPARTMENT_RESET } from '../../../redux/constants/departmentConstants'

const CreateDepartment = ({history}) => {
    const [deptname, setDepartmentname] = useState('');
    const [deptcode, setDepartmentcode] = useState('');

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newDepartment);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/department');
            alert.success('department created successfully');
            dispatch({ type: NEW_DEPARTMENT_RESET })
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        console.log(deptname);
        console.log(deptcode);
        formData.set('deptname', deptname);
        formData.set('deptcode', deptcode);

        dispatch(newDepartment(formData))
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">New Department</h1>

                                <div className="form-group">
                                    <label htmlFor="deptname_field">Department Name</label>
                                    <input
                                        type="text"
                                        id="deptname_field"
                                        className="form-control"
                                        value={deptname}
                                        onChange={(e) => setDepartmentname(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="deptcode_field">Department Code</label>
                                    <input
                                        type="text"
                                        id="deptcode_field"
                                        className="form-control"
                                        value={deptcode}
                                        onChange={(e) => setDepartmentcode(e.target.value)}
                                    />
                                </div>

                                <Button id="login_button" type="submit" disabled={loading ? true : false}>
                                    Save
                                </Button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateDepartment
