import React, {Fragment} from 'react';
import {Badge} from "reactstrap";

const ActiveUsers = ({activeUsers}) => {
    if (!activeUsers) {
        return <div>No users connected</div>
    }
    return (
        <Fragment>
            <h2 className="Title">Users <Badge color="warning">{activeUsers.length} </Badge></h2>
            <ul>
                {activeUsers.map((user, idx)=> (
                    <li className="User" key={idx}>{user}</li>
                ))}
            </ul>
        </Fragment>
    )
};

export default ActiveUsers;