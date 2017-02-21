import base_form_structure from 'content/formStructure';

export default function validate(values) {
	const errors = {
		"primaryNamedCredentials": {},
		"totalCost": {},
		"projectTerm": {},
		"finishDate": {},
		"generalContractor": {},
		"glCarrier": {},
		"expirationDate": {},
		"excessLimits": {},
		"address": {},
		"verticalExpansion": {},
		"specificFloors": {},
		"workDescription": {},
		"insuredInvolved": {},
		"projectRequirements": {},
		"limits": {},
		"contactInfo": {}
	};

	console.log("validation", "values", values);

	//Who is the named insured?
	if (values.primaryNamedInsured === "") {
		errors.primaryNamedCredentials.name = 'Primary Insured Name is required';
	}

	// What is the total cost?
	if (values.costs == "$") {
		errors.totalCost.cost = 'Cost is required';
	}

	// What is the term of the project...?
	if (!values.term) {
		errors.projectTerm.term = 'Term is required';
	}

	// What is anticipated finish date of the project?
	if (values.anticipatedFinishDate === "") {
		errors.finishDate.date = 'Finish date is required';
	}


	// Who is the GL Carrier of Contractor?
	if (values.generalContractor.glCarrier === "") {
		errors.glCarrier.carrier = "General Contractor carrier is required";
	}

	// When is the Expiration Date of the Contractor's GL Policy?
	if (!values.generalContractor.glExpirationDate) {
		errors.expirationDate.date = "General Contractor experation date is required";
	}

	// When is the Excess limits of the Contractor's primary Policy?
	if (values.generalContractor.glLimits === "$") {
		errors.excessLimits.limits = "General Contractor excess limits are required";
	}

	// What is the address of this project?
	if (values.address.street === "") {
		errors.address.street = "Project address must be defined";
	}

	if (values.address.city === "") {
		errors.address.city = "Project city must be defined";
	}

	if (values.address.state === "") {
		errors.address.state = "Project state must be defined";
	}

	if (!values.address.zip) {
		errors.address.zip = "Project zipcode must be defined";
	}

	if (values.address.state === "NY" && values.nycha === "") {
		errors.address.nycha = "Please identify is this is a nycha project";
	}

	// Does the project include the addition of any stories vertical expansion?
	if (values.overFourFloors === "") {
		errors.verticalExpansion.required = "Please choice if additional stories are needed";
	}

	// Is project limited to specific floors?
	if (values.projectDefinedAreaScope === "") {
		errors.specificFloors.required = "Please choice if project is limited to specific floors";
	}

	// Will the named insured be involved with any supervision or oversight of...?
	if (!values.isSupervisingSubs) {
		errors.insuredInvolved.required = "Please choice if named insured is involved with oversight";
	}

	// Does the project require any of the following: ?
	if (!values.projectRequirements) {
		errors.projectRequirements.required = "Please choice if project has special requirements";
	}

	// What limits are being requested for this OCP?
	if (!values.limitsRequested) {
		errors.limits.required = "Please choice the project limits requirements";
	}


	// Please provide your contact info to...?
	if (values.contactInfo.email === "") {
		errors.contactInfo.email = "Please enter your contact email address";
	}

	if (values.contactInfo.phone === "") {
		errors.contactInfo.phone = "Please enter your contact phone number";
	}

	return errors;
};
