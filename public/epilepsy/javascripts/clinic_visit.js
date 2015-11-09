/**
 * Created by chimwemwe on 11/7/15.
 */

var conditions = [];

function showSelectedConditions() {
    //alert($('patient_type').value)
    if ($('patient_type').value.length > 0){
        conditions.push("Patient Type: " + $('patient_type').value);
    }
    if ($('location').value.length > 0){
        conditions.push("Transferred From: " + $('location').value);
    }

    if ($('1.1.1').value.length > 0){
        conditions.push("Have you been diagnose with TB?: " + $('1.1.1').value);
    }

    if ($('year_of_tb_diagnosis').value.length > 0){
        conditions.push("Year(s) of TB diagnos: ");
        selectedOptions($('year_of_tb_diagnosis'))
    }

    if ($('1.1.3').value.length > 0){
        conditions.push("Patient has diabetes: " + $('1.1.3').value);
    }

    if ($('year_of_diabetes_diagnosis').value.length > 0){
        conditions.push("Year(s) of diabetes diagnos: ");
        selectedOptions($('year_of_diabetes_diagnosis'))
    }

    if ($('1.1.5').value.length > 0){
        conditions.push("Patient pregnant: " + $('1.1.5').value);
    }

    if ($('1.1.6').value.length > 0){
        conditions.push("Patient breastfeeding: " + $('1.1.6').value);
    }


    /* if ($('1.1.5').value.length > 0){
     conditions.push("Patient pregnat: " + $('1.1.5').value);
     }
     if ($('1.1.6').value.length > 0){
     conditions.push("Patient breastfeeding: " + $('1.1.6').value);
     } */
    var html
    html = "<ol>"
    for(var i=0;i < conditions.length;i++) {
        if (conditions[i].length > 0)
            if(i % 2 == 0){
                html += "<li class='even' group='even'>" + conditions[i] + "</li>";
            }
            else{
                html += "<li class='odd' group='odd'>" + conditions[i] + "</li>";
            }

    }
    html += "</ol>"
    $('inputFrame'+tstCurrentPage).innerHTML = '<div id="summary">' + html + '</div>' ;
    $("clearButton").style.display = "none";
}