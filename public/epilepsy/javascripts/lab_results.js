
function getSelected(){
    var choices = "";

    for(var o = 0; o < __$('test_types').options.length; o++){
        if(__$('test_types').options[o].selected == true){
            choices += __$('test_types').options[o].innerHTML + " ";
        }
    }

    return choices;
}

function resetPageAttributes(currentPage, attr){
    var attributes = {};

    switch(attr){
        case 'fbs':
            if ($('fbs_unit').value == 'mmol/l')
                attributes = {'min':[2.7],'max':[27.8]};
            else
                attributes = {'min':[50],'max':[500]};
            break;

        case 'ctn':
            if ($('ctn_unit').value == 'mmol/l')
                attributes = {'min':[2.7],'max':[27.8]};
            else
                attributes = {'min':[50],'max':[500]};
            break;

        case 'rbs':
            if ($('rbs_unit').value == 'mmol/l')
                attributes = {'min':[2.7],'max':[27.8]};
            else
                attributes = {'min':[50],'max':[500]};
            break;

        case 'hba1c':
            attributes = {'min':[4], 'max':[30], 'absoluteMin':[0], 'absoluteMax':[50]};
            break;

        case 'cf':
            if ($('cf_unit').value == 'mmol/l')
                attributes = {'min':[7],'max':[17]};
            else if($('cf_unit').value == 'mg/dl')
                attributes = {'min':[130],'max':[300]};
            else{
                $('cf_value_text').value     = '';
                $('cf_value_numeric').value  = '';
            }
            break;

        case 'cnf':
            if ($('cnf_unit').value == 'mmol/l')
                attributes = {'min':[7],'max':[17]};
            else if($('cnf_unit').value == 'mg/dl')
                attributes = {'min':[130],'max':[300]};
            else{
                $('cnf_value_text').value     = '';
                $('cnf_value_numeric').value  = '';
            }
            break;
    }

    setAttributes(currentPage, attributes);
}

function setAttributes(currentPage, attributes){

    for (var value in attributes){
        $(currentPage).setAttribute(value, attributes[value]);
    }
}