/**
 * Created by chimwemwe on 11/6/15.
 */

var maximum = 1;

function showSelectedConditions() {
    var conditions = [];
    var riskValue = 0;
    var epValue = 0;
    var asthmaRisk = 0;

    if ($('family_members').value.length > 0){
        conditions.push("Family members: " + $('family_members').value);
    }
    if ($('position').value.length > 0){
        value = parseInt($('position').value)
        if (value == 1){
            $('position').value = value + " st Born"
        }
        else if (value == 2){
            $('position').value = value + " nd Born"
        }
        else if (value == 3){
            $('position').value = value + " rd Born"
        }
        else {
            $('position').value = value + " th Born"
        }
        conditions.push("Position of patient in family: " + $('position').value);
    }

    if ($('epilepsy').value.length > 0){
        conditions.push("Family history of Epilepsy: " + $('epilepsy').value);
    }

    if ($('convulsion').value.length > 0){
        conditions.push("Family history of Convulsions: " + $('convulsion').value);
    }

    if ($('seizures').value.length > 0){
        conditions.push("Family history of Seizures: " + $('seizures').value);
    }

    if ($('mental_disorder').value.length > 0){
        conditions.push("Family history of Mental Disorders: " + $('mental_disorder').value);
    }

    submitForm = document.getElementById("family_history");
    if (conditions.length == 0){
        submitForm.submit()
    }

    if (riskValue > 0) {
        riskValue = (riskValue / 4) * 99;
        conditions.push("<i style='color: red'>Patient's hypertension risk is almost: " + riskValue + "% </i>");

        newElement = document.createElement("input");
        newElement.setAttribute("name","concept[Hypertension]");
        newElement.setAttribute("type","hidden");
        newElement.value = riskValue + "%";
        submitForm.appendChild(newElement);
    }

    if (asthmaRisk > 0) {
        asthmaRisk = (asthmaRisk / 3) * 99;
        conditions.push("<i style='color: red'>Patient's asthma risk is almost: " + asthmaRisk + "% </i>");

        newElement = document.createElement("input");
        newElement.setAttribute("name","concept[asthma]");
        newElement.setAttribute("type","hidden");
        newElement.value = asthmaRisk + "%";
        submitForm.appendChild(newElement);
    }
    var html
    html = "<ol>"
    for(var i=0;i < conditions.length;i++) {
        if (conditions[i].length > 0)
            html += "<li class='data'>" + conditions[i] + "</li>";

    }
    html += "</ol>"
    $('inputFrame'+tstCurrentPage).innerHTML = '<div id="summary">' + html + '</div>' ;
    $("clearButton").style.display = "none";
}

function setLimit() {

    maximum = parseInt($('family_members').value);

}

function limitNumber(td) {

    if (parseInt(td.value) > maximum) {
        return false
    }
    else {
        return true
    }

}