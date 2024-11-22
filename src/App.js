import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './NavBar.js';
import Sidebar from './Sidebar';
import Main from './Main';
import TaskForm from './TaskForm';
import Footer from './Footer.js';
import NotFound from './NotFound.js';
import { TASKS } from './Tasks.js';

import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router';

function App() {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([...TASKS]);

  const addTask = (task) => {
    setTasks(oldTasks => [...oldTasks, task]);
  }

  const updateTask = (task) => {
    setTasks(oldTasks => {
      return oldTasks.map(et => {
        if (et.id === task.id)
          return { id: task.id, description: task.description, isUrgent: task.isUrgent, isPrivate: task.isPrivate, deadline: task.deadline };
        else
          return et;
      });
    });
  }

  return (
    <Router>
      <NavBar setShow={setShow}/>
      <Container fluid>
        <Row className="weig-100">
          <Sidebar show={show} />
          
          <Switch>
            <Route path={`/${filter}/Update`} render={() =>
              <Col sm={8} className='below-nav'>
                <Main filter={filter} tasks={tasks} setTasks={setTasks} />
                <TaskForm title='Updating old task...' tasks={tasks} setTasks={setTasks} filter={filter} addOrUpdate={updateTask} />
                <Footer filter={filter} />
              </Col>
            }/>

            <Route exact path={`/${filter}/Add`} render={() =>
              <Col sm={8} className='below-nav'>
                <Main filter={filter} tasks={tasks} setTasks={setTasks} />
                <TaskForm title='Creating new task...' tasks={tasks} setTasks={setTasks} filter={filter} addOrUpdate={addTask} />
                <Footer filter={filter} />
              </Col>
            } />

            <Route exact path='/' render={() =>
              <Redirect to='/All' />
            } />

            <Route exact path={['/All', '/Important', '/Today', '/Next 7 Days', '/Private']} render={({match}) =>
              <Col sm={8} className='below-nav'>
                {setFilter(match.path.substr(1))}
                <Main filter={filter} tasks={tasks} setTasks={setTasks} />
                <Footer filter={filter} />
              </Col>
            }/>

            <Route path='/' render={() =>
              <Col sm={8} className='below-nav'>
                <NotFound />
              </Col>
            } />
          </Switch>

        </Row>
      </Container>
    </Router >
  );
}

export default App;