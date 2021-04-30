import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAllOrgs, postOrg, putOrg, destroyOrg } from "../services/orgs";
import Edit from "../screens/Edit/Edit";
import Home from "../screens/Home/Home";
import { getAllShifts, postAShift } from "../services/shifts";
import Shifts from "../components/Shifts/Shifts";
import { getAllUsers, putAUser } from "../services/users";

export default function MainContainer(props) {
  const { handleLogout, currentUser, setCurrentUser} = props;
  const [orgs, setOrgs] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [users, setUsers] = useState([]);
  const [created, setCreated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getOrgs = async () => {
      const orgList = await getAllOrgs();
      setOrgs(orgList);
    };
    getOrgs();
  }, []);

  useEffect(() => {
    const getShifts = async () => {
      const shiftList = await getAllShifts();
      setShifts(shiftList);
    };
    getShifts();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const userList = await getAllUsers();
      setUsers(userList);
    };
    getUsers();
  }, []);

  const handleJoin = async (id, userData) => {
    //finding organization that matches org in array and assigning id to currentUser
    const organization = orgs.find((org) => org.id === Number(id));
    userData.organization_id = organization.id;

    //put request to update user
    const updatedUser = await putAUser(userData.id, userData)
    setCurrentUser(prevState => [...prevState, updatedUser]);
  };


  const handleLeave = async() => {
    //reassigning user's organization id to null
    currentUser.organization_id = null;
    //put request to handle the update
    const updatedUser = await putAUser(currentUser.id, currentUser)
    setCurrentUser(prevState => [...prevState, updatedUser]);
  };

  //Post request to create organization
  const handleCreate = async (orgData) => {
    const newOrg = await postOrg(orgData);
    setOrgs((prevState) => [...prevState, newOrg]);
    handleJoin(newOrg.id)
    history.push(`/orgs/${newOrg.id}`);
    
  };

  //put request for updated organization data
  const handleUpdate = async (id, orgData) => {
    const updatedOrg = await putOrg(id, orgData);
    setOrgs((prevState) =>
      prevState.map((org) => {
        return org.id === Number(id) ? updatedOrg : org;
      })
    );
    history.push("/orgs");
  };

  //delete request
  const handleDelete = async (id) => {
    await destroyOrg(id);
    setOrgs((prevState) => prevState.filter((org) => org.id !== Number(id)));
    history.push('/orgs');
  };

  //post request to create shifts
  const handleShiftCreate = async (shiftData,id) => {
    const newShift = await postAShift(shiftData);
    setShifts((prevState) => [...prevState, newShift]);
    setCreated(true);

    if (created) {
      history.push(`/orgs/${id}`);
    }
  };
  

  return (
    <Switch>
      <Route path="/orgs/:id/edit">
        <Edit
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          orgs={orgs}
        />
      </Route>

      <Route path="/orgs/:id">
        <Shifts
          orgs={orgs}
          shifts={shifts}
          users={users}
          handleShiftCreate={handleShiftCreate}
          currentUser={currentUser}
        />
      </Route>
      <Route path="/orgs">
        <Home
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          orgs={orgs}
          handleCreate={handleCreate}
          handleJoin={handleJoin}
          handleLogout={handleLogout}
          handleLeave={handleLeave}
        />
      </Route>
    </Switch>
  );
}
