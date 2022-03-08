import React, { Fragment, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert';
import {Row, Col, Button} from 'react-bootstrap';
import {MDBDataTableV5 } from 'mdbreact'
import { FaTrash, FaPencilAlt} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'

import { getUsers } from '../../../redux/actions/userActions';
import AdminSidebar from '../../layout/AdminSidebar'
const UserList = () => {
    const { loading, error, users } = useSelector(state => state.users)
    const { isLoggedInAdmin, admin} = useSelector(state => state.authAdmin)
    const {adminToken} = useSelector(state => state.authAdminToken)

    const dispatch = useDispatch();
    const history = useHistory();
    const alert = useAlert();

    useEffect(() => {

        if(adminToken){
            dispatch(getUsers(adminToken))
        }

        if (error) {
            alert.error(error);
            // dispatch(clearErrors())
        }

        // if (deleteError) {
        //     alert.error(deleteError);
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     history.push('/admin/course');
        //     alert.success('Course deleted successfully');
        //     dispatch({ type: DELETE_COURSE_RESET })
        // }
        
        if (!isLoggedInAdmin) {
            history.push('/admin/login');

        }
    },[ dispatch, alert, error, history, isLoggedInAdmin,adminToken]);

    const setData = () => { 
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'user_tupid',
                    sort: 'asc'
                },
                {
                    label: 'First Name',
                    field: 'user_fname',
                    sort: 'desc'
                },
                {
                    label: 'Last Name',
                    field: 'user_lname',
                    sort: 'desc'
                },
                {
                    label: 'Contact',
                    field: 'user_contact',
                },
                {
                    label: 'Email',
                    field: 'user_tupmail',
                },
                {
                    label: 'Department',
                    field: 'department',
                },
                {
                    label: 'Course',
                    field: 'course',
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },

            ],
            rows: []
        }

        users.forEach(users => {
            data.rows.push({
                user_tupid: users.user_tupid,
                user_fname: users.user_fname,
                user_lname: users.user_lname,
                user_contact: users.user_contact,
                user_tupmail: users.user_tupmail,
                department: users.user_department.deptname,
                course: users.user_course.coursecode,
                actions: 
                <Fragment>
                    <Link to={`/admin/users/edit/${users._id}`} className="decor-none block">
                        <Button variant="info">
                        <FaPencilAlt/>
                        </Button>
                    </Link>

                    <Button variant="danger" data-toggle="tooltip" data-placement="bottom" title="Deactivate">
                    <i class="fas fa-user-alt-slash"></i>
                    </Button>
                </Fragment>
            })
            console.log('test')
        })

        return data;
    }
    return(
        <Fragment>
        <Row>
        <Col sm= {2}>
            <AdminSidebar/>
        </Col>
            <Col sm={10}>
                <div className="admin-wrapper">
                <h1>Users</h1>
                    <button><Link to="/admin/users/new">Add</Link></button>

                    <MDBDataTableV5 
                        hover 
                        entriesOptions={[5, 10, 15, 25]} 
                        entries={10} 
                        pagesAmount={4}
                        data={setData()} 
                        className='table'
                        container-sm="true"/>
                </div>
            </Col>
        </Row>
        </Fragment>
    )

}

export default UserList