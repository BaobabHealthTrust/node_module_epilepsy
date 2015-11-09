/**
 * Created by chimwemwe on 10/6/15.
 */

function resetCreatinineRange(current_page) {

    var unit = __$('creatinine_unit').value.trim();

    if (unit == 'µmol/l') {

        __$(current_page).setAttribute('min', 45);
        __$(current_page).setAttribute('max', 330.0);

    }

}

/* convert μmol/l to mg/dl*/
function updateCreatinineResult(){

    var unit = __$('creatinine_unit').value.trim();

    if (unit == 'µmol/l') {

        __$('creatinine_result').value = parseFloat(tstInputTarget.value / 91).toFixed(1);

    } else{

        __$('creatinine_result').value = tstInputTarget.value;

    }

}