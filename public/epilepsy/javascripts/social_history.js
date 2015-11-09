/**
 * Created by chimwemwe on 11/6/15.
 */


function showSelectedConditions() {
    var conditions = [];

    if ($('education') && $('education').value.length > 0)
        conditions.push("Highest Education: <b>" + $('education').value + "</b>");

    if ($('substance_use') && $('substance_use').value.length > 0)
        conditions.push("Substance Use: <b>" + $('substance_use').value + "</b>");

    if ($('pork') && $('pork').value.length > 0)
        conditions.push("Eats pork: <b>" + $('pork').value + "</b>");

    if ($('smoking') && $('smoking').value.length > 0)
        conditions.push("Smoke Cigarettes: <b>" + $('smoking').value + "</b>");

    if ($('number_of_cigarettes') && $('number_of_cigarettes').value.length > 0){
        cigaretesPerminute = (60 * 24) / $('number_of_cigarettes').value
        if ($('smoking').value.toLowerCase() == "yes")
            conditions.push("Number of cigarettes per day: <b>" + $('number_of_cigarettes').value + " Cigarettes : 1 per every " + parseInt(cigaretesPerminute) + " Minutes </b>");
    }


    if ($('current_smoker') && $('current_smoker').value.length > 0)
        conditions.push("Currently smokes: <b>" + $('current_smoker').value + "</b>");

    if ($('duration') && $('duration').value.length > 0){
        conditions.push("Duration on smoking: <b>" + $('duration').value + "</b>");
    }
    else if ($('duration')){
        $('duration').value = "Passive Smoker"
        conditions.push("Duration on smoking: <b>Passive Smoker</b>");
    }

    if ($('smoke_history') && $('smoke_history').value.length > 0)
        conditions.push("Patient with family member who smoke: <b>" + $('smoke_history').value + "</b>");

    if ($('patient_home') && $('patient_home').value.length > 0)
        conditions.push("Patient lives or works near: <b>" + $('patient_home').value + "</b>");

    if ($('exposed') && $('exposed').value.length > 0)
        conditions.push("Patient exposed to pollution: <b>" + $('exposed').value + "</b>");

    if ($('cooking') && $('cooking').value.length > 0)
        conditions.push("Patient mode of cooking: <b>" + $('cooking').value + "</b>");

    if ($('drink_alcohol') && $('drink_alcohol').value.length > 0)
        conditions.push("Drinks alcohol: <b>" + $('drink_alcohol').value + "</b>");

    if ($('drinks_per_day') && $('drinks_per_day').value.length > 0)
        conditions.push("Units of alcohol per day: <b>" + $('drinks_per_day').value + " Units</b>");

    if ($('days_per_week') && $('days_per_week').value.length > 0)
        conditions.push("Number of Alcohol drinking days per week: <b>" + $('days_per_week').value + " Days</b>");

    if ($('employment') && $('employment').value.length > 0)
        conditions.push("Type of employment: <b>" + $('employment').value + "</b>");

    var html
    html = "<ol>"
    for(var i=0;i < conditions.length;i++) {
        if (conditions[i].length > 0)
            html += "<li class='data'>" + conditions[i] + "</li>";
    }
    html += "</ol>"
    if ((($('drinks_per_day') && $('drinks_per_day').value > 6) || ($('days_per_week') && $('days_per_week').value > 3)) & $('alcoholism') && $('refer_to_clinician')) {
        html += "<span class='warning'>Patient is a heavy drinker! <br>Please refer patient for advice on life changes</span>";
        $('alcoholism').value = "Yes"
        $('refer_to_clinician').value = "Yes"
    }

    $('inputFrame'+tstCurrentPage).innerHTML = '<div id="summary">' + html + '</div>' ;
    $("clearButton").style.display = "none";
}