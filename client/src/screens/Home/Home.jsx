import React from "react";
import Create from "../../components/Create/Create";
import { Link } from "react-router-dom";
import OrgList from "../../components/OrganizationList/OrgList";

export default function Home(props) {
  const {
    currentUser,
    handleCreate,
    handleJoin,
    orgs,
    handleLogout,
    handleLeave,
  } = props;
  const userOrg = orgs.find((org) => currentUser?.organization_id === org.id);

  return (
    <div className="home-container">
      Logged in as {currentUser?.name}{" "}
      <Link to="/" onClick={handleLogout}>
        Log Out
      </Link>
      {currentUser?.organization_id ? (
        <div className="user-orgs">
          <h2> Your Organization </h2>
          <h3>{userOrg?.name}</h3>
          <Link to={`/orgs/${userOrg?.id}`}> View Shifts</Link>
          <Link to={`/orgs/${userOrg?.id}/edit`}>Edit</Link>
          <Link to={`/orgs`} onClick={() => { handleLeave() }}>
            Leave
          </Link>
        </div>) :
        (
        <p>
            You aren't a member of any organizations. Join an existing one or
            create a new one.
            <OrgList handleJoin={handleJoin} orgs={orgs} currentUser={currentUser}/>
          <Create handleCreate={handleCreate} handleJoin={handleJoin} />
        </p>
      )}
    </div>
  );
}
