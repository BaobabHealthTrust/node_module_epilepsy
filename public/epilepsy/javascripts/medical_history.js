/**
 * Created by chimwemwe on 11/7/15.
 */

var conditions = [];
function selectedOptions(selected) {
    var x = 1
    for (i = 0; i < selected.options.length; i++) {
        if (selected.options[i].selected) {
            conditions.push(x + " : " + selected.options[i].value);
            x += 1
        }
    }

}

function showSelectedConditions() {
    conditions = []
    if ($('tb') && $('tb').value.length > 0)
        conditions.push("TB within the past two years: " + $('tb').value);


    if ($('stroke') && $('stroke').value.length > 0)
        conditions.push("History of stroke: " + $('stroke').value);

    if ($('deformities') && $('deformities').value.length > 0)
        conditions.push("Chest deformities at birth: " + $('deformities').value);

    if ($('allergic') && $('allergic').value.length > 0) {
        conditions.push("Allergic To: ");
        selectedOptions($('allergic'))
    }


    if ($('asthma') && $('asthma').value.length > 0)
        conditions.push("Asthma in the past month: " + $('asthma').value);

    if ($('treatment') && $('treatment').value.length > 0) {
        conditions.push("Medicine being taken: ");
        selectedOptions($('treatment'))
    }

    var html
    html = "<ul>"
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i].length > 0)
            html += "<li class='data'>" + conditions[i] + "</li>";

    }
    html += "</ul>"
    $('inputFrame' + tstCurrentPage).innerHTML = '<div id="summary">' + html + '</div>';
    $("clearButton").style.display = "none";
}
