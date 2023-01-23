/**
 * Generate a unique identifier that does not match the given array of IDs
 * @param {array} list - array of existent IDs
 */
function generateUid(list) {

    let generatedNumber = Math.floor(Math.random() * 100000 + 1);

    while (true) {
        list.forEach(id => {
            if (id == generatedNumber) {
                return generatedNumber(list);
            }
        })
        return generatedNumber;
    }
}


// Validating all form
function validateEachForm(forms) {
    const result = [];
    let accepted = true;

    for (const key in forms) {
        const form = forms[key].current;

        const obj = validateInputs(form.inputs);

        if (obj.accepted != true){
            accepted = false;
        }
        
        obj["id"] = form.state.id;
        result.push(obj);
    }

    return { accepted: accepted, values: result };
}

// Validtaing a single FORM component
function validateInputs(objInputs) {
    const result = {};

    for (const key in objInputs) {
        try {
            result[objInputs[key].state.elemName] = objInputs[key].validateInput();
        } catch (err) {
            result[objInputs[key].state.elemName] = objInputs[key].selectInput.current.value;
        }
    }

    if (Object.values(result).every(ea => ea)) {
        result["accepted"] = true;

    } else {
        result["accepted"] = false;
    }

    return result;
}

async function autoCompleteData(input) {
    let query = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=address&key=API_KEY`);

    return query.json();
}

function generateYears(from) {
    // get current date
    const date = new Date();

    if (typeof (from) != "number" || from == null) {
        console.error("Please use valid input. INT lesser than the current year")
        return;
    }
    if (from > date.getFullYear()) {
        console.error("beginning year cannot be greater than current year");
        return;
    }

    const years = [];
    for (let i = date.getFullYear(); i >= from; i--) {
        years.push(i);
    }

    return years;
}

export { generateUid, validateInputs, autoCompleteData, generateYears, validateEachForm };