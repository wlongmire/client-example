export default {
    auth: {
      login: {
        desc: "Triggered for each login",
        eventName: "Authentication: Logged in"
      },
  
      newAccount: {
        desc: "Triggered for new account",
        eventName: "Authentication: New account"
      }
    },
  
    submission: {
      create: {
        desc: "Triggered each time a submission is created.",
        eventName: "Submission: Created"
      },
      passClearance: {
        desc: "Triggered each time user passes clearance and is able to proceed with filling out the rest of the form.",
        eventName: "Submission: Pass Clearance"
      },
  
      failClearance: {
        desc: "Triggered each time clearance prevents user from filling out the rest of the form.",
        eventName: "Submission: Fail Clearance"
      },
      pendingClearance: {
        desc: "Triggered each time user pending clearance but is still able to proceed with filling out the rest of the form.",
        eventName: "Submission: Pending Clearance"
      },
  
      edit: {
        desc: "Triggered when a submission is openned for editing",
        eventName: "Submission: Editing"
      },
      
      review: {
        desc: "Triggered when a submission is open for review",
        eventName: "Submission: In Review"
      },
      
      knockout: {
        desc: "Triggered each time a submission is knocked out.",
        eventName: "Submission: Non Quote"
      },
  
      quoted: {
        desc: "Triggered each time a submission is quoted.",
        eventName: "Submission: Quote"
      },
  
      error: {
        desc: "There was an error with quote / knockout",
        eventName: "Submission: Error Quote/Knockout"
      }
    }
  }