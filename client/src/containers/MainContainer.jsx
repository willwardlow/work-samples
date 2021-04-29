import { Switch, Route, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {getAllOrgs, postOrg, putOrg, destroyOrg} from '../services/orgs'
import Edit from '../screens/Edit/Edit';
import Home from '../screens/Home/Home';
import { getAllShifts } from '../services/shifts';
import Shifts from '../components/Shifts/Shifts';
import { getAllUsers } from '../services/users';

export default function MainContainer(props) {

  const { handleLogout, currentUser } = props;
  const [orgs, setOrgs] = useState([]);
  const [shifts, setShifts] = useState([])
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const getOrgs = async () => {
      const orgList = await getAllOrgs();
      setOrgs(orgList);
    }
    getOrgs();
  }, []);

  useEffect(() => {
    const getShifts = async () => {
      const shiftList = await getAllShifts();
      setShifts(shiftList);
    }
    getShifts();
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const userList = await getAllUsers();
      setUsers(userList);
    }
    getUsers();
  }, [])


  const handleJoin = () => {
    const organization = orgs.find
    currentUser.organization_id = organization.id;
  }

  const handleLeave = () => {
    currentUser.organization_id = null;
    history.push('/home')
  }

  const handleCreate = async(orgData) => {
    const newOrg = await postOrg(orgData);
    setOrgs(prevState => [...prevState, newOrg]);
    history.push('/')
  }

  const handleUpdate = async (id, orgData) => {
    const updatedOrg = await putOrg(id, orgData);
    setOrgs(prevState => prevState.map(org => {
      return org.id === Number(id) ? updatedOrg : org
    }))
  }

  const handleDelete = async (id) => {
    await destroyOrg(id);
    setOrgs(prevState => prevState.filter((org) => org.id !== Number(id)))
    history.push('/home')
  }
  
  
  return (
    <Switch>

      <Route path='/orgs/:id/edit'>
        <Edit handleUpdate={handleUpdate} handleDelete={ handleDelete} orgs={orgs} />
      </Route>

      <Route path='/orgs/:id'>
        <Shifts
          orgs={orgs}
          shifts={shifts}
          users={users}
          />
      </Route>
      <Route path='/orgs'>
        <Home currentUser={currentUser}
          orgs={orgs}
          handleCreate={handleCreate}
          handleJoin={handleJoin}
          handleLogout={handleLogout}
          handleLeave={handleLeave}/>
      </Route>
  </Switch>
  )
}
