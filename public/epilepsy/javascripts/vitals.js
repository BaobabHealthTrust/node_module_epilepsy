/**
 * Created by chimwemwe on 11/6/15.
 */

jQuery.noConflict();

var currentBmi;
var currentWeight;
var currentHeight;
var currentHeightPercentile;
var currentWeightPercentile;
var displayText;
var medianWeightHeight;
var systolicColor = "";
var diastolicColor = "";
var conditions = [];

function getSelected() {
    var choices = "";

    for (var o = 0; o < __$('choice').options.length; o++) {
        if (__$('choice').options[o].selected == true) {
            choices += __$('choice').options[o].innerHTML + " ";
        }
    }

    return choices;
}

function calculateBP(pos) {
    var bp;

    if (!$('bp')) {
        var div = document.createElement("div");
        div.id = "bp";
        div.className = "statusLabel";

        $("inputFrame" + tstCurrentPage).appendChild(div);
    }

    if (pos == 1) {
        if (parseInt($("touchscreenInput" + tstCurrentPage).value) >= 120 && parseInt($("touchscreenInput" + tstCurrentPage).value) < 140) {
            systolicColor = ": #FFE47A"
        }
        if (parseInt($("touchscreenInput" + tstCurrentPage).value) >= 140 && parseInt($("touchscreenInput" + tstCurrentPage).value) < 160) {
            systolicColor = ": #FF9933"
        }

        if (parseInt($("touchscreenInput" + tstCurrentPage).value) >= 160 && parseInt($("touchscreenInput" + tstCurrentPage).value) <= 180) {
            systolicColor = ": #FF3333"
        }

        if (parseInt($("touchscreenInput" + tstCurrentPage).value) < 120)
            systolicColor = ": #336600"

        if (parseInt($("touchscreenInput" + tstCurrentPage).value) > 180)
            systolicColor = ": #B8002E"

        bp = ($("touchscreenInput" + tstCurrentPage).value.trim().length > 0 ? "<i style='color" + systolicColor + "'>" + $("touchscreenInput" +
            tstCurrentPage).value.trim() + "</i>" : "?") +
            "/" + ($("diastolic_blood_pressure").value.trim().length > 0 ? "<i style='color" + diastolicColor + "'>" + $("diastolic_blood_pressure").value.trim() + "</i>" : "?");
        $("bp").innerHTML = "Blood Pressure: <i style='font-size: 1.2em; float: right;'>" + bp + "</i>";
    } else if (pos == 2) {

        if (parseInt($("touchscreenInput" + tstCurrentPage).value) >= 80 && parseInt($("touchscreenInput" + tstCurrentPage).value) < 90) {
            diastolicColor = ": #FFE47A"
        }
        if (parseInt($("touchscreenInput" + tstCurrentPage).value) >= 90 && parseInt($("touchscreenInput" + tstCurrentPage).value) < 100) {
            diastolicColor = ": #FF9933"
        }

        if (parseInt($("touchscreenInput" + tstCurrentPage).value) >= 100 && parseInt($("touchscreenInput" + tstCurrentPage).value) <= 110) {
            diastolicColor = ": #FF3333"
        }

        if (parseInt($("touchscreenInput" + tstCurrentPage).value) < 80) {
            diastolicColor = ": #336600"
        }


        if (parseInt($("touchscreenInput" + tstCurrentPage).value) > 110) {
            diastolicColor = ": #B8002E"
        }


        bp = ($("systolic_blood_pressure").value.trim().length > 0 ? "<i style='color" + systolicColor + "'>" + $("systolic_blood_pressure").value.trim() + "</i>" : "?") +
            "/" + ($("touchscreenInput" + tstCurrentPage).value.trim().length > 0 ? "<i style='color" + diastolicColor + "'>" + $("touchscreenInput" +
            tstCurrentPage).value.trim() + "</i>" : "?");
        $("bp").innerHTML = "Blood Pressure: <i style='font-size: 1.2em; float: right;'>" + bp + "</i>";
    } else if (pos == 3) {
        if ($("touchscreenInput" + tstCurrentPage).value.trim().length > 0)
            if (parseInt($("touchscreenInput" + tstCurrentPage).value) > 130 || parseInt($("touchscreenInput" + tstCurrentPage).value) < 40) {
                $("bp").innerHTML = "Pulse Rate: <i style='font-size: 1.2em; float: right;'>" + $("touchscreenInput" + tstCurrentPage).value + " : Emergency</i>";
            }
            else {
                $("bp").innerHTML = "Pulse Rate: <i style='font-size: 1.2em; float: right;'>" + $("touchscreenInput" + tstCurrentPage).value + ": Normal</i>";
            }
        else {
            $("bp").innerHTML = "Pulse Rate: <i style='font-size: 1.2em; float: right;'> Specify</i>";
        }
    } else if (pos == 4) {
        if ($("touchscreenInput" + tstCurrentPage).value.trim().length > 0)
            if (parseInt($("touchscreenInput" + tstCurrentPage).value) < 90) {
                $("bp").innerHTML = "Oxygen Saturation: <i style='font-size: 1.2em; float: right;'>" + $("touchscreenInput" + tstCurrentPage).value + " : Emergency</i>";
            }
            else {
                $("bp").innerHTML = "Oxygen Saturation: <i style='font-size: 1.2em; float: right;'>" + $("touchscreenInput" + tstCurrentPage).value + ": Normal</i>";
            }
        else {
            $("bp").innerHTML = "Oxygen Saturation: <i style='font-size: 1.2em; float: right;'> Specify</i>";
        }
    }


    timedEvent = setTimeout('calculateBP(' + pos + ')', 500);
}


function showSelectedConditions() {
    currentHeight = current_height;

    conditions = [];
    sex = patient_gender.toLowerCase();
    if (sex == "female")
        sex = "f"

    if (sex == "male")
        sex = "m"

    if ($('weight').value.length > 0) {

        currentWeight = $('weight').value

        conditions.push("Weight: " + $('weight').value);
    }
    try {

        if ($('height').value.length > 0) {
            currentHeight = $('height').value;
            conditions.push("Height: " + $('height').value);
        }
    } catch (e) {

    }

    currentBmi = (currentWeight / (currentHeight * currentHeight) * 10000).toFixed(1);
    console.log(currentHeight)

    conditions.push("BMI : " + currentBmi + "<br>");
    //growthIndicators()
    $('bmi').value = currentBmi;
    var col = "<i>"

    if ($('temperature').value.length > 0)
        conditions.push("Temperature: " + $('temperature').value);

    if ($('respiratory_rate').value.length > 0)
        conditions.push("Respiratory rate: " + $('respiratory_rate').value);

    if ($('pulse').value.length > 0) {
        pulse = parseFloat($('pulse').value);
        if (pulse > 130 || pulse < 40) {
            conditions.push("Pulse Rate: " + $('pulse').value + ' : EMERGENCY');
        }
        else {
            conditions.push("Pulse Rate: " + $('pulse').value);
        }
    }

    if ($('oxygen').value.length > 0) {
        oxygen = parseFloat($('oxygen').value);
        if (oxygen < 90) {
            conditions.push("Oxygen Saturation: " + $('oxygen').value + ' : EMERGENCY');
        }
        else {
            conditions.push("Oxygen Saturation: " + $('oxygen').value);
        }
    }

    if ($('expiratory_flow_rate').value.length > 0) {
        var age = patient_age;
        if (age < 18)
            pefr = parseInt(((currentHeight - 100) * 5) + 100);

        if ((age >= 18) && (sex == "m")) {
            currentHeight /= 100;
            pefr = parseInt((((currentHeight * 5.48) + 1.58) - (age * 0.041)) * 60);
        }

        if ((age >= 18) && (sex == "f")) {
            currentHeight /= 100;
            pefr = parseInt((((currentHeight * 3.72) + 2.24) - (age * 0.03)) * 60);
        }
        $("estimated").value = pefr;
        conditions.push("Estimated expiratory Flow Rate (L/m): " + $('expiratory_flow_rate').value);
        conditions.push("Expected expiratory Flow Rate (L/m): " + pefr);
        if (pefr > parseInt($('expiratory_flow_rate').value)) {
            conditions.push("<i style='color: #B8002E'> Measurements for expiratory below normal: Possibly indicate obstructed airways </i>");
        }
    }

    if ($('waist_circumference').value.length > 0)
        conditions.push("Waist Circumference: " + $('waist_circumference').value);

    var alert = ""
    var form = $('vitals');
    if ($('systolic_blood_pressure').value.length > 0 && $('diastolic_blood_pressure').value.length > 0) {
        if ($('systolic_blood_pressure').value < 120 && $('diastolic_blood_pressure').value < 80) {
            $("cva").value = "Normal"
            alert = "  : <i style='color: #336600'> Normal</i>"
            col = "<i style='color: #336600'>"
        }

        if (($('systolic_blood_pressure').value >= 120 && $('systolic_blood_pressure').value < 140) || ($('diastolic_blood_pressure').value >= 80 && $('diastolic_blood_pressure').value < 90)) {
            $("cva").value = "Uncomplicated hypertension"
            alert = "  : <i style='color: #FFE47A'> Prehypertension</i>"
            col = "<i style='color: #FFE47A'>"
        }

        if (($('systolic_blood_pressure').value >= 140 && $('systolic_blood_pressure').value < 160) || ($('diastolic_blood_pressure').value >= 90 && $('diastolic_blood_pressure').value < 100)) {
            $("cva").value = "Hypertension Stage 1"
            alert = "  : <i style='color: #FF9933'> Hypertension Stage 1</i>"
            col = "<i style='color: #FF9933'>"
        }

        if (($('systolic_blood_pressure').value >= 160 && $('systolic_blood_pressure').value < 180) || ($('diastolic_blood_pressure').value >= 100 && $('diastolic_blood_pressure').value < 110)) {
            $("cva").value = "Hypertension Stage 2"
            alert = "  : <i style='color: #FF3333'> Hypertension Stage 2</i>"
            col = "<i style='color: #FF3333'>"
        }

        if (($('systolic_blood_pressure').value >= 180) || ($('diastolic_blood_pressure').value >= 110)) {
            $("cva").value = "Hypertensive crisis"
            alert = "  : <i style='color: #B8002E'> Hypertension Crisis. Emergency care needed </i>"
            col = "<i style='color: #B8002E'>"
        }

        conditions.push("BP: " + col + $('systolic_blood_pressure').value + "</i>/" + col + $('diastolic_blood_pressure').value + "</i>" + alert);

    }

    //var container = $("summary_container");
    var html
    html = "<ul>"
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i].length > 0)
            html += "<li class='data'>" + conditions[i] + "</li>";

    }
    html += "</ul>"

    $('inputFrame' + tstCurrentPage).innerHTML = '<table width="100%"><tr><td width="50%" valign="top"><div id="summary">' + html + '</div></td><td  width="50%" valign="top"><div style="font-size:18px;">Weight Chart</div><div id="charts" style="margin:2px 6px 6px;padding:2px;width:500px;font-size:18px;"></div></td></tr></table>';
    jQuery('#charts').empty().load('/epilepsy/graph/weight/' + patient_id + '?currentWeight=' + currentWeight);

    $("clearButton").style.display = "none";

    if(__$("inputFrame" + tstCurrentPage)) {

        __$("inputFrame" + tstCurrentPage).style.height = "580px";

    }
}
