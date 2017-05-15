import mongoose from 'mongoose';
import {Broker, Submission, User} from '../models';

// Update the user account as "verified". 
// @TODO Enforce ACL check!!!
function verifyUser(id)
{
    const userId = id;
    let userAccount = User.findById(userId, (err, user) => {
    	user.accountPending = false;
    	user.save();

    	return user;
    });

    return true;
}

// Check to see if user.role is included within roles array (indexed)
function assertRole(user, roles) {
    if (roles.includes(user.role)) {
        return true;
    }

    
}

// function refreshSession(token) {
//       
// }

export default {
    verifyUser,
    assertRole
};