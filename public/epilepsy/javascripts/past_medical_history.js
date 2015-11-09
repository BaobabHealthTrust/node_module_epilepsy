/**
 * Created by chimwemwe on 10/5/15.
 */

function setConceptNamesAndValues() {

    var values_string = selectedValue('past_medical_history');

    if (__$('stroke')) {

        if (values_string.contains("STROKES")) {
            __$('stroke').value = "Yes";
        } else {
            __$('stroke').value = "";
        }

    }

    if (__$('serious_cardiac_problem')) {

        if (values_string.contains("SERIOUS CARDIAC PROBLEMS")) {
            __$('serious_cardiac_problem').value = "Yes";
        } else {
            __$('serious_cardiac_problem').value = "";
        }

    }

    if (__$('hypertension')) {

        if (values_string.contains("HYPERTENSION")) {
            __$('hypertension').value = "Yes";
        } else {
            __$('hypertension').value = "";
        }

    }

    if (__$('other_medical_condition')) {

        if (values_string.contains("OTHER MEDICAL CONDITIONS")) {
            __$('other_medical_condition').value = "Yes";
        } else {
            __$('other_medical_condition').value = "";
        }

    }

}