import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/CreateProfile';
import AddExperience from '../profile-forms/addExperience';
import AddEducation from '../profile-forms/addEducation';
import Profiles from '../profiles/Profile';
import Profile from '../profile/profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import EditComponent from '../profile-forms/EditComponent';
import PrivateRoute from '../routing/PrivateRoute';
import Register from '../auth/Register';
import Login from '../auth/Login';

const Routes = () => {
    return (
      <Fragment>
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={Profiles} />
            <Route exact path="/profile/:id" component={Profile} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            <PrivateRoute exact path="/edit-profile" component={EditComponent} />
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            <PrivateRoute exact path="/posts" component={Posts} />
            <PrivateRoute exact path="/posts/:id" component={Post} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </Fragment>
    )
}


export default Routes
