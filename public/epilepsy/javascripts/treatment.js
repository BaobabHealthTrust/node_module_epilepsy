/**
 * Created by chimwemwe on 10/7/15.
 */

function __$(id) {
    return document.getElementById(id);
}

function changeNextButtonText(text){
    __$('nextButton').innerHTML = "<span>" + text + "</span>";
}

function set_diagnosis_for_suggestions() {
    changeNextButtonText('Select Prescription');
    var diagnosis = encodeURIComponent(__$('diagnosis').value);
    __$('touchscreenInput'+tstCurrentPage).setAttribute('ajaxURL', "/prescriptions/suggested_by_diagnosis_name?patient_id=<%= @patient.patient_id %>&diagnosis=" + diagnosis + "&search_string=");
    clearInput();
}


function set_generic_drug_for_formulation() {
    var generic = encodeURIComponent(__$('generic').value);
    __$('touchscreenInput'+tstCurrentPage).setAttribute('ajaxURL', "/prescriptions/formulations?generic=" + generic + "&search_string=");
    __$('infoBar'+tstCurrentPage).innerHTML = __$('generic').value;
    clearInput();
}

function set_drug_formulation() {
    var generic = encodeURIComponent(__$('generic').value);
    __$('touchscreenInput'+tstCurrentPage).setAttribute('ajaxURL', "/prescriptions/drug_formulations?generic=" + generic + "&search_string=");
    clearInput();
}

function set_formulation_for_type() {
    __$('infoBar'+tstCurrentPage).innerHTML = __$('formulation').value;
}

function set_generic_drug_and_formulation_for_duration() {
    var generic = encodeURIComponent(__$('generic').value);
    var formulation = encodeURIComponent(__$('formulation').value);
    __$('touchscreenInput'+tstCurrentPage).setAttribute('ajaxURL', "/prescriptions/durations?generic=" + generic + "&formulation=" + formulation + "&search_string=");
    if (selectedValue('type_of_prescription') == 'Standard Dose')
        __$('infoBar'+tstCurrentPage).innerHTML = __$('formulation').value + ': ' + __$('dose_strength').value + ' ' + units + ' ' + selectedValue('frequency');
    else
        __$('infoBar'+tstCurrentPage).innerHTML = __$('formulation').value + ': ' + 'Variable Dose; ';
    clearInput();
}

function set_generic_drug_and_formulation_for_dose(frequency) {
    frequency = frequency || selectedValue('frequency');
    frequency = encodeURIComponent(frequency);
    var generic = encodeURIComponent(__$('generic').value);
    var formulation = encodeURIComponent(__$('formulation').value);
    __$('touchscreenInput'+tstCurrentPage).setAttribute('ajaxURL', "/prescriptions/dosages?generic=" + generic + "&formulation=" + formulation + "&frequency=" + frequency + "&search_string=");
    __$('infoBar'+tstCurrentPage).innerHTML = __$('formulation').value;
    clearInput();
}

function set_info_for_frequency() {
    __$('infoBar'+tstCurrentPage).innerHTML = __$('formulation').value + ': ' + __$('dose_strength').value + ' ' + units;
}

function set_info_for_prn() {
    __$('infoBar'+tstCurrentPage).innerHTML = __$('formulation').value;
    if (selectedValue('type_of_prescription') == 'Standard Dose')
        __$('infoBar'+tstCurrentPage).innerHTML = __$('formulation').value + ': ' + __$('dose_strength').value + ' ' + units + ' ' + selectedValue('frequency') + ' for ' + __$('duration').value + ' days';
    else
        __$('infoBar'+tstCurrentPage).innerHTML = __$('formulation').value + ': ' + 'Variable Dose; ' + ' for ' + __$('duration').value + ' days';

}

var units = '';

function set_units_for_dose_strength(text) {
    var helpText = __$('helpText'+tstCurrentPage);
    helpText.innerHTML = text;
    var formulation = encodeURIComponent(__$('formulation').value);
    var aUrl = "/prescriptions/units?formulation=" + formulation;
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        set_help_text(helpText, httpRequest);
    };
    try {
        httpRequest.open('GET', aUrl, true);
        httpRequest.send(null);
    } catch(e){
    }
}

function set_help_text(el, req) {
    if (req.readyState == 4 && req.status == 200) {
        units = req.responseText;
        el.innerHTML += (" in " + units);
    }
}

function set_prescriptions_by_diagnosis() {
    var diagnosis_name = __$('diagnosis').value;
    __$('generic').setAttribute('ajaxURL', "/prescriptions/generics?diagnosis=" + diagnosis_name + "&search_string=");
}