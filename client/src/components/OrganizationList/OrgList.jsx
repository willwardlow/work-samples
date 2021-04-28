import React from 'react';
import {Link} from 'react-router-dom'

export default function OrgList(props) {

  const {handleJoin, orgs } = props;
  return (
    <div className='org-list'>
      <ul>Organizations
      {orgs.map((org, index) => (
        <li key={index}>{org.name} 
        <Link to={`/orgs/${org.id}/edit`}> Edit </Link>
        <Link to={`/home`} onClick={handleJoin}>Join</Link>
        </li>
      ))}
      </ul>
    </div>
  )
}
