/**
 * Created by chimwemwe on 11/7/15.
 */

var conditions = [];

function selectedOptions(selected){
    var x = 1
    for (i = 0; i < selected.options.length; i++) {
        if (selected.options[i].selected) {
            conditions.push( x + " : <i>" + selected.options[i].value) + "</i>";
            x += 1
        }
    }

}

function clearTreatment(){
    $('regimen_concept_id').value = null
}
function showSelectedConditions() {
    conditions = [];
    var i = 0
    if ($('drug_allergy').value.length > 0)
        conditions.push("Allergies: " + $('drug_allergy').value);

    if ($('choice').value.length > 0)
    { conditions.push("Chronic Diseases: ");
        selectedOptions($('choice'));
        i += 1
    }


    if ($('regimen_concept_id').value.length > 0)
    {conditions.push("Treatment Received: ");
        selectedOptions($('regimen_concept_id'))
    }

    if ($('epilepsy').value.length > 0)
    {
        conditions.push("Epilepsy experienced on: ");
        selectedOptions($('epilepsy'))
    }

    if ($("1.1.13").value.length > 0)
    {
        conditions.push("Complications during birth: " );
        selectedOptions( $('1.1.13'))
    }

    if ($('explanation').value != "")
    {
        conditions.push("Epilepsy experienced on: " + $('explanation').value);
    }
    var html
    html = "<ol>"
    for(var i=0;i < conditions.length;i++) {
        if (conditions[i].length > 0){
            html += "<li class='data'>" + conditions[i] + "</li>";
        }
    }

    if (conditions.length <= 0) {
        html += "<li class='data'>No conditions selected</li>";
    }

    if (i > 0){
        html += "<li class='warning'>Please refer patient for advice</li>";
        $('refer_to_clinician').value = "Yes"
    }
    html += "</ol>"
    $('inputFrame'+tstCurrentPage).innerHTML = '<div id="summary" style="width:98%;overflow:auto;hieght:500px ! important; height: 88%; overflow: auto; margin-bottom: 10px;">' + html + '</div>' ;
    $("clearButton").style.display = "none";
}
