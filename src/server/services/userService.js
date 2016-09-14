import mongoose from 'mongoose';
import {broker, submission, user} from '../models';

// Update the user account as "verified". 
async function verifyUser(id)
{
    const userId = req.params.id;
    let user = models.User.findById(userId);

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