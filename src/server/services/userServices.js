import mongoose from 'mongoose';
import {broker, submission, user} from '../models';

// Update the user account as "verified". 
async function verifyUser(id)
{
    const userId = req.params.id;
    let user = models.User.findById(userId);

}

export default {
    verifyUser
};