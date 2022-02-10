import { combineReducers , createStore, applyMiddleware, compose} from "redux";

import { thesisReducer, thesisDetailsReducer } from "./reducers/thesisReducer";
import { departmentsReducer, newDepartmentReducer, departmentReducer, DepartmentDetailsReducer } from "./reducers/departmentReducer";
import { coursesReducer, newCourseReducer, courseReducer, CourseDetailsReducer } from "./reducers/courseReducer";
import {authReducer} from './reducers/authReducer'

import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    // Thesis
    thesis: thesisReducer,
    thesisDetails: thesisDetailsReducer,
    // Department
    department: departmentsReducer, 
    newDepartment: newDepartmentReducer,
    departments: departmentReducer,
    departmentDetails: DepartmentDetailsReducer,
    //Course
    courses: coursesReducer,
    newCourse: newCourseReducer,
    course: courseReducer,
    courseDetails: CourseDetailsReducer,
    // Authentication
    auth: authReducer
})

const store = createStore(
    reducer,
    {}, 
    composeEnhancers(applyMiddleware(thunk))
);

export default store;