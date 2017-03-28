import base_form_structure from 'content/formStructure';

export default function validate(values) {
	const errors = {
		"primaryNamedCredentials": {},
		"secondaryNamedInsured": {},
		"additionalInsured": {},
		"projectAddress": {},
		"projectScope": {},
		"projectTerm": {},
		"projectValue": {},
		"towerCrane": {},
		"knownContractor": {},
		"specificFloors": {},
		"occupancy": {},
		"demo": {},
		"hadWorkStarted": {},
		"excess": {},
		"generalComments": {},
		"contactInfo": {}
	};

	//Who is the named insured?
	if (!values.primaryNamedInsured) {
		errors.primaryNamedCredentials.name = 'First Insured Name is required';
	}

	//What is the address of the named insured?
	if (!values.namedInsuredAddress.city) {
		errors.primaryNamedCredentials.city = 'First Insured City is required';
	}

	if (!values.namedInsuredAddress.state) {
		errors.primaryNamedCredentials.state = 'First Insured State is required';
	}

	if (!values.namedInsuredAddress.street) {
		errors.primaryNamedCredentials.street = 'First Insured Street is required';
	}

	if (!values.namedInsuredAddress.zip) {
		errors.primaryNamedCredentials.zip = 'First Insured Zipcode is required';
	}

	//Is there a Secondary Named Insured?
	if (values.hasOtherNamedInsured === "yes") {
		if (values.otherNamedInsured.name === "") {
			errors.secondaryNamedInsured.name = 'Name is required';
		}

		if (values.otherNamedInsured.relationship === "") {
			errors.secondaryNamedInsured.relationship = 'Relationship is required';
		}

		if (values.otherNamedInsured.street === "") {
			errors.secondaryNamedInsured.street = 'Address is required';
		}

		if (values.otherNamedInsured.city === "") {
			errors.secondaryNamedInsured.city = 'City is required';
		}

		if (values.otherNamedInsured.state === "") {
			errors.secondaryNamedInsured.state = 'State is required';
		}

		if (!values.otherNamedInsured.zip) {
			errors.secondaryNamedInsured.zip = 'Zipcode is required';
		}

		if (!values.otherNamedInsured.greaterThanTwoNamed) {
			errors.secondaryNamedInsured.greaterThanTwoNamed = 'Please check if there is another named insured';
		}
	}

	//Any Additional Insured?
	if (values.hasAdditionalInsured === "yes") {
		if (values.additionalInsured.name === "") {
			errors.additionalInsured.name = 'Name is required';
		}

		if (values.additionalInsured.relationship === "") {
			errors.additionalInsured.relationship = 'Relationship is required';
		}

		if (values.additionalInsured.role === "") {
			errors.additionalInsured.role = 'Role is required';
		}

		if (!values.additionalInsured.greaterThanTwoAdditional) {
			errors.additionalInsured.greaterThanTwoAdditional = 'Please check if there are additional insured';
		}
	}

	//Address of project
	if (values.address.city === "") {
		errors.projectAddress.city = 'City is required';
	}

	if (values.address.state === "") {
		errors.projectAddress.state = 'State is required';
	}

	if (values.address.street === "") {
		errors.projectAddress.street = 'Street Address is required';
	}

	if (!values.address.zip) {
		errors.projectAddress.zip = 'Zipcode is required';
	}

	//What is the term of the project
	if (!values.term) {
		errors.projectTerm.term = 'Term is required';
	}

	//What is the total construction
	if (values.costs === "$") {
		errors.projectValue.cost = 'Project value is required';
	}

	//Will there be use of a tower crane
	if (!values.towerCraneUse) {
		errors.towerCrane.tower = 'Please identify if there is crane use.';
	}

	//Does this project require excess coverage?
	if (values.excessDetails.required === "") {
		errors.excess.required = 'Please identify if excess coverage is required.';
	} else if (
		values.excessDetails.required === "yes" &&
		values.excessDetails.limits === 0
	) {
		errors.excess.term = 'Please select the excess limits';
	}

	// Is project limited to specific floors?
	if (values.projectDefinedAreaScope === "") {
		errors.specificFloors.required = "Please choose if project is limited to specific floors";
	}

	//Please provide your contact info to...?
	if (values.contactInfo.email === '') {
		errors.contactInfo.email = 'Please add in a contact email.';
	}

	if (values.contactInfo.phone === '') {
		errors.contactInfo.phone = 'Please add in a contact phone.';
	}

	return errors;
};
