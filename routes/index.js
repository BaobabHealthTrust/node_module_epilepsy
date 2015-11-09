/*
 * GET home page.
 */
module.exports = function (router, session_username) {

    var fs = require('fs');

    var lineReader = require('line-reader');

    var data_connection = require(__dirname + '/../config/data_connection.json');

    var dde_connection = require(__dirname + '/../config/dde_connection.json');

    var dateFormat = require('dateformat');

    var moment = require("moment");

    var url = require('url');

    function reAlignData(data) {

        var result = {};

        result = data;

        var program = (data.data.programs ? Object.keys(data.data.programs)[0] : null);

        if (program != null) {

            var uuid = (data.data.programs[program].patient_programs ? Object.keys(data.data.programs[program].patient_programs)[0] : null);

            if (uuid != null) {

                var visit = (data.data.programs[program].patient_programs[uuid].visits ? Object.keys(data.data.programs[program].patient_programs[uuid].visits)[0] : null);

                if (visit != null) {

                    var encounter = (data.data.programs[program].patient_programs[uuid].visits[visit] ? Object.keys(data.data.programs[program].patient_programs[uuid].visits[visit])[0] : null);

                    if (encounter != null && data.data.programs[program].patient_programs[uuid].visits[visit][encounter].data) {

                        var innerData = data.data.programs[program].patient_programs[uuid].visits[visit][encounter].data[0];

                        result.data.programs[program].patient_programs[uuid].visits[visit][encounter].data = [];

                        var keys = Object.keys(innerData);

                        for (var i = 0; i < keys.length; i++) {

                            var concept_name = (innerData[keys[i]].concept ? innerData[keys[i]].concept.name : null);

                            if (concept_name != null && typeof(concept_name) != "string") {

                                var count = concept_name.length;

                                var response_values = (innerData[keys[i]].response ? innerData[keys[i]].response.value : []);

                                var response_categories = (innerData[keys[i]].response ? innerData[keys[i]].response.category : []);

                                var concept_uuids = (innerData[keys[i]].concept ? innerData[keys[i]].concept.UUID : []);

                                for (var j = 0; j < count; j++) {

                                    var node = {};

                                    node[keys[i]] = {
                                        response: {
                                            value: response_values[j],
                                            category: response_categories[j]
                                        },
                                        concept: {
                                            UUID: concept_uuids[j],
                                            name: concept_name[j]
                                        }
                                    }

                                    if (innerData[keys[i]].child) {

                                        node[keys[i]].child = [];

                                        var childKeys = Object.keys(innerData[keys[i]].child);

                                        for (var k = 0; k < childKeys.length; k++) {

                                            var child_concept_names = (innerData[keys[i]].child[childKeys[k]].concept ? innerData[keys[i]].child[childKeys[k]].concept.name : []);

                                            var child_concept_uuids = (innerData[keys[i]].child[childKeys[k]].concept ? innerData[keys[i]].child[childKeys[k]].concept.UUID : []);

                                            var child_response_values = (innerData[keys[i]].child[childKeys[k]].response ? innerData[keys[i]].child[childKeys[k]].response.value : []);

                                            var child_response_categories = (innerData[keys[i]].child[childKeys[k]].response ? innerData[keys[i]].child[childKeys[k]].response.category : []);

                                            var childNode = {};

                                            childNode[childKeys[k]] = {
                                                response: {
                                                    value: child_response_values[j],
                                                    category: child_response_categories[j]
                                                },
                                                concept: {
                                                    UUID: child_concept_uuids[j],
                                                    name: child_concept_names[j]
                                                }
                                            }

                                            node[keys[i]].child.push(childNode);

                                        }

                                    }

                                    result.data.programs[program].patient_programs[uuid].visits[visit][encounter].data.push(node);

                                }

                            } else {

                                var node = {};

                                node[keys[i]] = {
                                    response: {
                                        value: (innerData[keys[i]].response.value ? innerData[keys[i]].response.value.toString() : null),
                                        category: innerData[keys[i]].response.category.toString()
                                    },
                                    concept: {
                                        UUID: innerData[keys[i]].concept.UUID,
                                        name: innerData[keys[i]].concept.name
                                    }
                                }

                                if (innerData[keys[i]].child) {

                                    node[keys[i]].child = [];

                                    var childKeys = Object.keys(innerData[keys[i]].child);

                                    for (var k = 0; k < childKeys.length; k++) {

                                        var child_concept_name = (innerData[keys[i]].child[childKeys[k]].concept ? innerData[keys[i]].child[childKeys[k]].concept.name : []);

                                        var child_concept_uuid = (innerData[keys[i]].child[childKeys[k]].concept ? innerData[keys[i]].child[childKeys[k]].concept.UUID : []);

                                        var child_response_value = (innerData[keys[i]].child[childKeys[k]].response ? innerData[keys[i]].child[childKeys[k]].response.value : []);

                                        var child_response_categorie = (innerData[keys[i]].child[childKeys[k]].response ? innerData[keys[i]].child[childKeys[k]].response.category : []);

                                        if (typeof(child_concept_name) != "string") {

                                            var size = child_concept_name.length;

                                            for (var s = 0; s < size; s++) {

                                                var childNode = {};

                                                childNode[childKeys[k]] = {
                                                    response: {
                                                        value: (child_response_value ? child_response_value[s].toString() : null),
                                                        category: (child_response_categorie ? child_response_categorie[s].toString() : null)
                                                    },
                                                    concept: {
                                                        UUID: (child_concept_uuid ? child_concept_uuid[s].toString() : null),
                                                        name: (child_concept_name ? child_concept_name[s].toString() : null)
                                                    }
                                                }

                                                node[keys[i]].child.push(childNode);

                                            }

                                        } else {

                                            var childNode = {};

                                            childNode[childKeys[k]] = {
                                                response: {
                                                    value: (child_response_value ? child_response_value.toString() : null),
                                                    category: (child_response_categorie ? child_response_categorie.toString() : null)
                                                },
                                                concept: {
                                                    UUID: (child_concept_uuid ? child_concept_uuid.toString() : null),
                                                    name: (child_concept_name ? child_concept_name.toString() : null)
                                                }
                                            }

                                            node[keys[i]].child.push(childNode);

                                        }

                                    }

                                }

                                // node[keys[i]] = innerData[keys[i]];

                                result.data.programs[program].patient_programs[uuid].visits[visit][encounter].data.push(node);

                            }

                        }

                    }

                }

            }

        }

        return result;

    }

    function getAge(birthdate, birthdate_estimated) {

        if (!birthdate_estimated) {

            birthdate_estimated = 0;

        }

        var age;

        if ((new Date(birthdate)) == "Invalid Date") {

            return "???";

        }

        if ((((new Date()) - (new Date(birthdate))) / (365 * 24 * 60 * 60 * 1000)) > 1) {

            age = (birthdate_estimated == 1 ? "~" : "") + Math.round((((new Date()) - (new Date(birthdate))) / (365 * 24 * 60 * 60 * 1000)), 0);

        } else if ((((new Date()) - (new Date(birthdate))) / (30 * 24 * 60 * 60 * 1000)) > 1) {

            age = (birthdate_estimated == 1 ? "~" : "") + Math.round((((new Date()) - (new Date(birthdate))) / (30 * 24 * 60 * 60 * 1000)), 0) + " months";

        } else if ((((new Date()) - (new Date(birthdate))) / (7 * 24 * 60 * 60 * 1000)) > 1) {

            age = (birthdate_estimated == 1 ? "~" : "") + Math.round((((new Date()) - (new Date(birthdate))) / (7 * 24 * 60 * 60 * 1000)), 0) + " weeks";

        } else if ((((new Date()) - (new Date(birthdate))) / (24 * 60 * 60 * 1000)) > 1) {

            age = (birthdate_estimated == 1 ? "~" : "") + Math.round((((new Date()) - (new Date(birthdate))) / (24 * 60 * 60 * 1000)), 0) + " days";

        } else if ((((new Date()) - (new Date(birthdate))) / (60 * 60 * 1000)) > 1) {

            age = (birthdate_estimated == 1 ? "~" : "") + Math.round((((new Date()) - (new Date(birthdate))) / (60 * 60 * 1000)), 0) + " hours";

        } else {

            age = (birthdate_estimated == 1 ? "~" : "") + "< 1hr";

        }

        return age;

    }

    function reMapPrescription(data) {

        var result = {};

        result.data = data.data;

        if (data.prescriptions) {

            var leaf = {data: []};

            var drugOrders = {"Drug Orders": []};

            for (var i = 0; i < data.prescriptions.length; i++) {

                if (typeof(data.prescriptions[i].concept_name) != "string") {

                    var count = data.prescriptions[i].concept_name.length;


                } else {

                    var auto_expire_date = (new Date());

                    auto_expire_date.setDate(auto_expire_date.getDate() + parseInt(data.prescriptions.duration.toString()));

                    var drugOrder = {
                        concept: {
                            UUID: null
                        },
                        instructions: null,
                        start_date: dateFormat((new Date()), "yyyy-mm-dd"),
                        auto_expire_date: dateFormat(auto_expire_date, "yyyy-mm-dd"),
                        frequency: data.prescriptions.frequency
                    }

                }

            }

        }

        return result;

    }

    router.route('/patient/:id')
        .get(function (req, res) {

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var dde_auth = {user: dde_connection.username, password: dde_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/search_by_identifier/" +
                req.params.id, function (data, response) {

                var result = JSON.parse(data);

                if (result.error) {

                    res.redirect(404, '/no_match_found/%s', req.params.id);

                    return;

                }

                var age = getAge(result.data.birthdate, result.data.birthdate_estimated);

                result.data.age = age;

                res.render('epilepsy/index', {title: "Epilepsy Module", id: req.params.id, person: result, doctor: false,
                    clinician: false, nurse: false, registration_clerk: false, super_user: true, hivHighlight: true,
                    highlight: false});

            })

        });

    router.route('/no_match_found/:id')
        .get(function (req, res) {

            res.render('epilepsy/no_match_found');

        })

    router.route('/epilepsy/graph/weight/:id')
        .get(function (req, res) {

            var weight_history = [];

            res.render('epilepsy/graphs/weight', {id: req.params.id, weight_history: JSON.stringify(weight_history)});

        })

    router.route('/epilepsy/vitals/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var treatements_list = require(__dirname + "/../config/application.json");

            if(treatements_list) {

                treatements_list = treatements_list.vitals;

            }

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                var current_height = (json.current_height ? json.current_height : 0);

                var patient_age = (json.age ? json.age : 0);

                var patient_gender = (json.gender ? json.gender : "Unknown");

                res.render('epilepsy/vitals', {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW",
                    treatements_list: treatements_list, current_height: current_height, patient_age: patient_age,
                    patient_gender: patient_gender});

            })

        })

    router.route('/epilepsy/encounter/create/:id')
        .post(function (req, res) {

            var input = req.body;

            console.log(JSON.stringify(input));

            input = reAlignData(input);

            console.log(JSON.stringify(input));

            var args = {
                data: input,
                headers: {"Content-Type": "application/json"}
            };

            // console.log(JSON.stringify(input));

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).post(data_connection.url + "/openmrs/v1.7/save_patient", args, function (data, response) {

                var json = JSON.parse(data);

                res.redirect("/patient/" + req.params.id);

            })

        })

    router.route('/epilepsy/supplementary_questions/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                res.render('epilepsy/supplementary_questions', {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW"});

            })

        })

    router.route('/epilepsy/outcome/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                res.render('epilepsy/outcome', {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW"});

            })

        })

    router.route('/epilepsy/static_locations')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var searchString = query.s.toLowerCase();

            var file = __dirname + "/../public/epilepsy/data/locations.txt";

            var locations = "<li></li>";

            if (fs.existsSync(file)) {

                lineReader.eachLine(file, function (line, last) {

                    if (searchString.trim().length == 0 || line.trim().toLowerCase().match('^' + searchString)) {

                        locations += "<li>" + line + "</li>";

                    }

                    if (last) {

                        res.status(200).send(locations);

                    }

                })

            } else {

                console.log("not matched");

                res.status(200).send(locations);

            }

        });

    router.route('/epilepsy/lab_results/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                res.render('epilepsy/lab_results', {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW"});

            })

        })

    router.route('/epilepsy/clinic_visit/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {


                (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/search_by_identifier/" +
                    req.params.id, function (data, response) {

                    var result = JSON.parse(data);

                    var json = JSON.parse(data);

                    var age = getAge(result.data.birthdate, result.data.birthdate_estimated);

                    result.data.age = age;

                    res.render('epilepsy/clinic_visit', {id: req.params.id, uuid: query.uuid,
                        program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                        today: dateFormat((new Date()), "yyyy-mm-dd"), age: age, encounter_uuid: "NEW", person: result});

                });

            })

        })

    router.route('/epilepsy/family_history/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                res.render('epilepsy/family_history', {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW"});

            })

        })

    router.route('/epilepsy/social_history/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                res.render('epilepsy/social_history', {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW"});

            })

        })

    router.route('/epilepsy/general_health/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                var treatments = ["treatments list"];

                res.render('epilepsy/general_health', {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW", treatments: treatments});

            })

        })

    router.route('/epilepsy/medical_history/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                var meds = ["Chronics Meds"];

                res.render('epilepsy/medical_history', {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW", meds: meds});

            })

        })

    router.route('/epilepsy/complications/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                res.render('epilepsy/complications', {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW"});

            })

        })

    router.route('/epilepsy/epilepsy_test/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                var root = (query.epilepsy_test_type ? query.epilepsy_test_type.replace(/\s/g, "_").trim().toLowerCase() : "");

                res.render("epilepsy/" + root, {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW"});

            })

        })

    router.route('/epilepsy/treatments/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            var patient_epilepsy_treatments = [];

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                if (patient_epilepsy_treatments.length <= 0) {

                    res.render('epilepsy/treatment', {id: req.params.id, uuid: query.uuid,
                        program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                        today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW",
                        patient_epilepsy_treatments: patient_epilepsy_treatments});

                } else {

                    res.render('epilepsy/prescriptions', {id: req.params.id, uuid: query.uuid,
                        program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                        today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW",
                        patient_epilepsy_treatments: patient_epilepsy_treatments});

                }

            })

        })

    router.route('/epilepsy/prescriptions/create/:id')
        .post(function (req, res) {

            var input = req.body;

            var frequencies = {
                "AMLODIPINE": ["OD"],
                "LISINOPRIL": ["OD"],
                "GLIBENCLAMIDE": ["OD", "BD"],
                "METFORMIN": ["BD", "OD", "TDS"],
                "CAPTOPRIL": ["BD", "TDS"],
                "QUINAPRIL": ["OD"],
                "ASPIRIN": ["OD"],
                "NIFEDIPINE SR(SLOW RELEASE)": ["BD"],
                "NIFEDIPINE": ["TDS"],
                "HYDROCHLOROTHIAZIDE": ["OD"],
                "PROPANOLOL": ["BD", "TDS"],
                "METHYLDOPA": ["BD", "TDS"],
                "FUROSEMIDE": ["BD", "OD"],
                "ATENOLOL": ["OD"],
                "AMITRIPTYLINE": ["NOCTE"],
                "IBUPROFEN": ["TDS"],
                "VITAMIN B CO": ["BD"],
                "PYRIDOXINE": ["OD"],
                "HYDRALAZINE": ["OD", "BD"],
                "PARACETAMOL": ["TDS"],
                "VITAMIN B COMPLEX": ["BD"]
            };

            var defs = {
                OD: "One per day",
                QWK: "Once per week",
                BD: "Two per day",
                TDS: "Three per day",
                QID: "Four times a day",
                "5XD": "Five times per day",
                Q4hrs: "Six times per day",
                QOD: "Every other day",
                NOCTE: "Once a day at night",
                QHS: "Once a day at night",
                QAM: "In the morning",
                QPM: "In the evening (QPM)",
                Qnoon: "Once per day at noon"
            }

            var args = {
                data: frequencies,
                headers: {"Content-Type": "application/json"}
            };

            // console.log(JSON.stringify(input));

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).post(data_connection.url + "/openmrs/v1.7/drugs", args, function (data, response) {

                var json = JSON.parse(data);

                var prescriptions = {};

                prescriptions.data = input.data;

                var drugOrders = [];

                for (var i = 0; i < input.prescriptions.length; i++) {

                    if (typeof(input.prescriptions[i].concept_name) == "string") {

                        var auto_expire_date = (new Date());

                        auto_expire_date.setDate(auto_expire_date.getDate() + parseInt(input.prescriptions[i].duration.toString()));

                        var dose = 0;

                        var morning_dose = (input.prescriptions[i].morning_dose ? parseInt(input.prescriptions[i].morning_dose) : 0);

                        var afternoon_dose = (input.prescriptions[i].afternoon_dose ? parseInt(input.prescriptions[i].afternoon_dose) : 0);

                        var evening_dose = (input.prescriptions[i].evening_dose ? parseInt(input.prescriptions[i].evening_dose) : 0);

                        dose = morning_dose + afternoon_dose + evening_dose;

                        var drugOrder = {
                            "Drug Order": {
                                concept: {
                                    UUID: null,
                                    name: "Drug Order"
                                },
                                instructions: null,
                                start_date: dateFormat((new Date()), "yyyy-mm-dd"),
                                auto_expire_date: dateFormat(auto_expire_date, "yyyy-mm-dd"),
                                frequency: defs[input.prescriptions[i].frequency],
                                quantity: dose,
                                drug: {
                                    dispensed: false,
                                    obs: {
                                        UUID: null
                                    },
                                    concept: {
                                        UUID: null,
                                        name: input.prescriptions[i].generic
                                    }
                                }
                            }
                        }

                        var drug = json[input.prescriptions[i].generic];

                        for (var j = 0; j < drug.length; j++) {

                            if (drug[j][0] == input.prescriptions[i].drug_strength && (drug[j][5] == input.prescriptions[i].frequency || drug[j][1] == input.prescriptions[i].frequency)) {

                                drugOrder["Drug Order"].drug.name = drug[j][2];

                                drugOrder["Drug Order"].units = drug[j][4];

                                drugOrder["Drug Order"].dose = (dose <= 0 ? parseInt(drug[j][3]) : dose);

                                drugOrder["Drug Order"].quantity = (parseInt(drugOrder.dose) * parseInt(input.prescriptions[i].duration));

                                drugOrder["Drug Order"].instructions = drugOrder["Drug Order"].drug.name + ": " +
                                    drugOrder["Drug Order"].units + " " + defs[input.prescriptions[i].frequency];

                                break;

                            }

                        }

                        drugOrders.push(drugOrder);

                    } else {

                        var variableCounter = 0;
                        var variableCount = 0;

                        for (var c = 0; c < input.prescriptions[i].type_of_prescription.length; c++) {

                            if (input.prescriptions[i].type_of_prescription[c].trim().toLowerCase() == "variable") {

                                variableCount++;

                            }

                        }

                        for (var c = 0; c < input.prescriptions[i].type_of_prescription.length; c++) {

                            var auto_expire_date = (new Date());

                            auto_expire_date.setDate(auto_expire_date.getDate() + parseInt(input.prescriptions[i].duration[c].toString()));

                            var dose = 0;

                            var morning_dose = (input.prescriptions[i].morning_dose ? parseInt(input.prescriptions[i].morning_dose) : 0);

                            var afternoon_dose = (input.prescriptions[i].afternoon_dose ? parseInt(input.prescriptions[i].afternoon_dose) : 0);

                            var evening_dose = (input.prescriptions[i].evening_dose ? parseInt(input.prescriptions[i].evening_dose) : 0);

                            dose = morning_dose + afternoon_dose + evening_dose;

                            var drugOrder = {
                                "Drug Order": {
                                    concept: {
                                        UUID: null,
                                        name: "Drug Order"
                                    },
                                    instructions: null,
                                    start_date: dateFormat((new Date()), "yyyy-mm-dd"),
                                    auto_expire_date: dateFormat(auto_expire_date, "yyyy-mm-dd"),
                                    frequency: defs[input.prescriptions[i].frequency[c]],
                                    quantity: dose,
                                    drug: {
                                        dispensed: false,
                                        obs: {
                                            UUID: null
                                        },
                                        concept: {
                                            UUID: null,
                                            name: input.prescriptions[i].generic[c]
                                        }
                                    }
                                }
                            }

                            var drug = json[input.prescriptions[i].generic[c]];

                            if (drug) {

                                for (var j = 0; j < drug.length; j++) {

                                    if (drug[j][0] == input.prescriptions[i].drug_strength[c] && (drug[j][5] == input.prescriptions[i].frequency[c] ||
                                        drug[j][1] == input.prescriptions[i].frequency[c])) {

                                        drugOrder["Drug Order"].drug.name = drug[j][2];

                                        drugOrder["Drug Order"].units = drug[j][4];

                                        drugOrder["Drug Order"].dose = (dose <= 0 ? parseInt(drug[j][3]) : dose);

                                        drugOrder["Drug Order"].quantity = parseInt(drugOrder["Drug Order"].dose) * parseInt(input.prescriptions[i].duration[c]);

                                        drugOrder["Drug Order"].instructions = drugOrder["Drug Order"].drug.name + ": " +
                                            drugOrder["Drug Order"].units + " " + defs[input.prescriptions[i].frequency[c]];

                                        break;

                                    }

                                }

                            } else {

                                drugOrder["Drug Order"].drug.name = input.prescriptions[i].generic[c];

                                drugOrder["Drug Order"].units = null;

                                drugOrder["Drug Order"].dose = dose;

                                drugOrder["Drug Order"].quantity = (parseInt(drugOrder["Drug Order"].dose)) * parseInt(input.prescriptions[i].duration[c]);

                                drugOrder["Drug Order"].instructions = drugOrder["Drug Order"].drug.name + ": " +
                                    (drugOrder["Drug Order"].units ? drugOrder["Drug Order"].units : "");

                            }

                            drugOrders.push(drugOrder);

                        }

                    }

                }

                var today = dateFormat((new Date()), "yyyy-mm-dd");

                if (prescriptions.data && prescriptions.data.programs && prescriptions.data.programs["EPILEPSY PROGRAM"] &&
                    prescriptions.data.programs["EPILEPSY PROGRAM"].patient_programs) {

                    var program = Object.keys(prescriptions.data.programs["EPILEPSY PROGRAM"].patient_programs)[0];

                    if (prescriptions.data.programs["EPILEPSY PROGRAM"].patient_programs[program] &&
                        prescriptions.data.programs["EPILEPSY PROGRAM"].patient_programs[program].visits &&
                        prescriptions.data.programs["EPILEPSY PROGRAM"].patient_programs[program].visits[today] &&
                        prescriptions.data.programs["EPILEPSY PROGRAM"].patient_programs[program].visits[today]["EPILEPSY TREATMENTS"]) {

                        prescriptions.data.programs["EPILEPSY PROGRAM"].patient_programs[program].visits[today]["EPILEPSY TREATMENTS"].data = [];

                        prescriptions.data.programs["EPILEPSY PROGRAM"].patient_programs[program].visits[today]["EPILEPSY TREATMENTS"].data.push({"Drug Orders": drugOrders});

                    }

                }

                var args = {
                    data: prescriptions,
                    headers: {"Content-Type": "application/json"}
                };

                var options_auth = {user: data_connection.username, password: data_connection.password};

                var Client = require('node-rest-client').Client;

                (new Client(options_auth)).post(data_connection.url + "/openmrs/v1.7/save_patient", args, function (data, response) {

                    var json = JSON.parse(data);

                    res.redirect("/" + req.params.id);

                })
                // res.redirect("/" + req.params.id);

                // res.status(200).json(prescriptions);

            });

        })

    router.route('/epilepsy/hiv_status/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                var root = (query.epilepsy_test_type ? query.epilepsy_test_type.replace(/\s/g, "_").trim().toLowerCase() : "");

                res.render("epilepsy/hiv_status", {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW"});

            })

        })

    router.route('/epilepsy/generate_bookings/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/get_latest_program_uuid/" +
                req.params.id + "?program=EPILEPSY PROGRAM", function (data, response) {

                var json = JSON.parse(data);

                var root = (query.epilepsy_test_type ? query.epilepsy_test_type.replace(/\s/g, "_").trim().toLowerCase() : "");

                res.render("epilepsy/bookings", {id: req.params.id, uuid: query.uuid,
                    program_uuid: (json.patient_program_uuid ? json.patient_program_uuid : "NEW"),
                    today: dateFormat((new Date()), "yyyy-mm-dd"), age: 1, encounter_uuid: "NEW"});

            })

        })

    router.route('/epilepsy/cancel_booking/:id')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var username = (session_username ? session_username : "admin");

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/cancel_booking/" +
                req.params.id + "/?appointment_date=" + query.appointment_date + "&username=" + username + "&start_date=" +
                query.start_date + "&end_date=" + query.end_date, function (data, response) {

                var json = JSON.parse(data);

                res.json(json);

            })

        })

    router.route('/epilepsy/bookings')
        .get(function (req, res) {

            var url_parts = url.parse(req.url, true);

            var query = url_parts.query;

            var options_auth = {user: data_connection.username, password: data_connection.password};

            var Client = require('node-rest-client').Client;

            (new Client(options_auth)).get(data_connection.url + "/openmrs/v1.7/bookings?start_date=" +
                query.start_date + "&end_date=" + query.end_date, function (data, response) {

                var json = JSON.parse(data);

                res.json(json);

            })

        })

    return router;

}