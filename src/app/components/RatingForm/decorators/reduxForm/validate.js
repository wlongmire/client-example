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
		"occupancy": {},
		"demo": {},
		"hadWorkStarted": {},
		"excess": {},
		"generalComments": {},
		"contactInfo": {}
	};

	console.log(values);

	if (!values.primaryNamedInsured) {
		errors.primaryNamedCredentials.name = 'First Insured Name is required';
	}

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

	if (values.hasOtherNamedInsured === "yes") {
		if (values.otherNamedInsured.name === "") {
			errors.secondaryNamedInsured.name = 'Name is required';
		}

		if (values.otherNamedInsured.relationship === "") {
			errors.secondaryNamedInsured.relationship = 'Relationship is required';
		}

		if (values.otherNamedInsured.street === "") {
			errors.secondaryNamedInsured.street = 'Street is required';
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
	
	if (values.hasAdditionalInsured === "yes") {
		if (values.additionalInsured.name === "") {
			errors.additionalInsured.name = 'Name is required';
		}

		if (values.otherNamedInsured.relationship === "") {
			errors.additionalInsured.relationship = 'Relationship is required';
		}

		if (values.otherNamedInsured.role === "") {
			errors.additionalInsured.role = 'Role is required';
		}

		if (!values.otherNamedInsured.greaterThanTwoAdditional) {
			errors.additionalInsured.greaterThanTwoAdditional = 'Please check if there are additional insured';
		}
	}

	return errors;
};
