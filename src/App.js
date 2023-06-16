import React from 'react';
import CreateCategoryForm from './category_of_account/create'
import UpdateCategoryForm from './category_of_account/update'
import DeleteCategoryForm from './category_of_account/delete'
import TeacherCountForm from './view'
import CreateUserForm from './user/create';
import DeleteUserForm from './user/delete'
import UpdateUserForm from './user/update'
import CreateSupervisorForm from './supervisor/create'
import DeleteSupervisorForm from './supervisor/delete'
import UpdateSupervisorForm from './supervisor/update'
import CreateGroupForm from './group/create'
import DeleteGroupForm from './group/delete'
import UpdateGroupForm from './group/update'
import CreateCourseForm from './course/create'
import DeleteCourseForm from './course/delete'
import UpdateCourseForm from './course/update'
import Func from './function'
import './App.scss'



const App = () => {
  return (
    <div className="container-fluid">
      <h1>Create Category</h1>
      <CreateCategoryForm />
      <hr />
      <h1>Update Category</h1>
      <UpdateCategoryForm />
      <hr />
      <h1>Delete Category</h1>
      <DeleteCategoryForm />
      <hr />
      <h1>Create User</h1>
      <CreateUserForm />
      <hr />
      <h1>Delete User</h1>
      <DeleteUserForm />
      <hr />
      <h1>Update User</h1>
      <UpdateUserForm />
      <hr />
      <h1>Create Supervisor</h1>
      <CreateSupervisorForm />
      <hr />
      <h1>Delete Supervisor</h1>
      <DeleteSupervisorForm />
      <hr />
      <h1>Update Supervisor</h1>
      <UpdateSupervisorForm />
      <hr />
      <h1>Create Group</h1>
      <CreateGroupForm />
      <hr />
      <h1>Delete Group</h1>
      <DeleteGroupForm />
      <hr />
      <h1>Update Group</h1>
      <UpdateGroupForm />
      <hr />
      <h1>Create Course</h1>
      <CreateCourseForm />
      <hr />
      <h1>Update Course</h1>
      <UpdateCourseForm />
      <hr />
      <h1>Delete Course</h1>
      <DeleteCourseForm />
      <hr />
      <h1>View Function</h1>
      <TeacherCountForm />
      <hr />
      <h1>Function</h1>
      <Func />
    </div>
  );
};

export default App;