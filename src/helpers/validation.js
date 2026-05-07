const regexPatterns = {
    lettersRegex: '^[א-תA-Za-z ."״()-/\'/׳]+$',
    lettersOnlyRegex: '^[א-תA-Za-z\\s]+$',
    numbersRegex: '^[0-9]+$',
    numbersNotZeroRegex: '^[1-9]{1}\\d*$',
    lettersNumbersRegex: '^[א-תA-Za-z0-9 "״()-/\'/׳]+$',
    lettersNumbersOnlyRegex: '^[א-תA-Za-z0-9 ]+$',
    phoneRegex: '^0(5[012345678]|6[47]){1}(\\-)?[^0\\D]{1}\\d{6}$',
    phoneGeneralRegex: '^0[0-9]{8,10}$',
    monthDate: '^(0?[1-9]|1[012])$',
    yearDate: '[0-9][0-9]',
    emailRegex: '^(([^<>()[\\]\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    identityRegex: '^\\d{9,10}$',
};


export const validateField = (validationRules, value) => {
    if (!validationRules) { return ''; }

    if (validationRules.required) {
        if (!value) { return validationRules.requiredMessage; }
    }
    else {
        if (!value) { return ''; }
    }

    if (validationRules.regexName) {
        const pattern = regexPatterns[validationRules.regexName];
        let re = new RegExp(pattern);
        const isOk = re.test(String(value).toLowerCase());
        if (!isOk) { return validationRules.regexMessage; }
    }

    return '';
}

export const validateForm = (form) => {
    let validatedForm = form;
    let isValid = true;

    Object.keys(form).map(function (fieldName) {
        const error = validateField(form[fieldName].validationRules, form[fieldName].value);
        validatedForm[fieldName].error = error;
        if (error) { isValid = false; }
    });

    const result = { form: validatedForm, isValid: isValid };
    return result;
}

