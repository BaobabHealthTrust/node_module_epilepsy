<!--

var generic = ["CAPTOPRIL", "GLIBENCLAMIDE", "METFORMIN", "QUINAPRIL", "ASPIRIN", "AMLODIPINE",
        "LENTE INSULIN", "SOLUBLE INSULIN", "HYDROCHLOROTHIAZIDE", "NIFEDIPINE", "NIFEDIPINE SR(SLOW RELEASE)", "PROPANOLOL",
        "METHYLDOPA", "FUROSEMIDE", "ATENOLOL", "AMITRIPTYLINE", "IBUPROFEN", "VITAMIN B COMPLEX", "PYRIDOXINE",
        "LISINOPRIL", "HYDRALAZINE", "PARACETAMOL"];

var drugs = {"PYRIDOXINE": [
    ["50mg", "OD", "Pyridoxine (50mg)", 1, "tab(s)", "One per day"],
    ["100mg", "OD", "Pyridoxine (100mg)", 1, "tab(s)", "One per day"],
    ["300mg", "OD", "Pyridoxine (300mg)", 1, "tab(s)", "One per day"],
    ["25mg", "OD", "Pyridoxine (25mg)", 1, "tab(s)", "One per day"],
    ["60mg", "OD", "Pyridoxine (60mg)", 1, "tab(s)", "One per day"],
    ["20mg", "OD", "Pyridoxine (20mg)", 1, "tab(s)", "One per day"]
], "ATENOLOL": [
    ["25mg", "OD", "Atenolol (25mg tablet)", 1, "tab(s)", "One per day"],
    ["100mg", "OD", "Atenolol (100mg tablet)", 1, "tab(s)", "One per day"],
    ["50mg", "OD", "Atenolol (50mg tablet)", 1, "tab(s)", "One per day"]
], "AMITRIPTYLINE": [
    ["25mg", "NOCTE", "Amitriptyline (25mg tablets)", 1, "tab(s)", "Once a day at night"],
    ["50mg", "NOCTE", "Amitriptyline (50mg tablet)", 50, "", "Once a day at night"],
    ["75mg", "NOCTE", "Amitriptyline (75mg tablet)", 1, "tab(s)", "Once a day at night"]
], "ASPIRIN": [
    ["300mg", "OD", "Aspirin (300mg tablet)", 1, "tab(s)", "One per day"],
    ["75mg", "OD", "Aspirin (75mg tablet)", 1, "tab(s)", "One per day"],
    ["150mg", "OD", "Aspirin (150mg tablet)", 1, "tab(s)", "One per day"],
    ["600mg", "OD", "Aspirin (600mg tablet)", 1, "tab(s)", "One per day"]
], "FUROSEMIDE": [
    ["40mg", "BD", "Furosemide (40mg tablet)", 1, "tab(s)", "Two per day"],
    ["40mg", "OD", "Furosemide (40mg tablet)", 1, "tab(s)", "One per day"],
    ["20mg", "BD", "Furosemide (20mg tablet)", 1, "tab(s)", "Two per day"],
    ["20mg", "OD", "Furosemide (20mg tablet)", 1, "tab(s)", "One per day"],
    ["60mg", "BD", "Furosemide (60mg tablet)", 1, "tab(s)", "Two per day"],
    ["60mg", "OD", "Furosemide (60mg tablet)", 1, "tab(s)", "One per day"],
    ["80mg", "BD", "Furosemide (80mg tablet)", 1, "tab(s)", "Two per day"],
    ["80mg", "OD", "Furosemide (80mg tablet)", 1, "tab(s)", "One per day"],
    ["120mg", "BD", "Furosemide (120mg tablet)", 1, "tab(s)", "Two per day"],
    ["120mg", "OD", "Furosemide (120mg tablet)", 1, "tab(s)", "One per day"]
], "HYDRALAZINE": [
    ["25mg", "OD", "Hydralazine (25mg tablet)", 1, "tab(s)", "One per day"],
    ["25mg", "BD", "Hydralazine (25mg tablet)", 1, "tab(s)", "Two per day"],
    ["1ml", "OD", "Hydralazine HCl (1ml Injection)", 1, "ml", "One per day"],
    ["1ml", "BD", "Hydralazine HCl (1ml Injection)", 1, "ml", "Two per day"],
    ["50mg", "OD", "Hydralazine (50mg tablet)", 1, "tab(s)", "One per day"],
    ["50mg", "BD", "Hydralazine (50mg tablet)", 1, "tab(s)", "Two per day"],
    ["5ml", "OD", "Hydralazine HCl (5ml)", 5, "mg (injection)", "One per day"],
    ["5ml", "BD", "Hydralazine HCl (5ml)", 5, "mg (injection)", "Two per day"],
    ["10ml", "OD", "Hydralazine HCl (10ml)", 10, "mg (injection)", "One per day"],
    ["10ml", "BD", "Hydralazine HCl (10ml)", 10, "mg (injection)", "Two per day"],
    ["100mg", "OD", "Hydralazine (100mg tablet)", 1, "tab(s)", "One per day"],
    ["100mg", "BD", "Hydralazine (100mg tablet)", 1, "tab(s)", "Two per day"]
], "HYDROCHLOROTHIAZIDE": [
    ["25mg", "OD", "Hydrochlorothiazide (25mg tablet)", 1, "tab(s)", "One per day"],
    ["12.5mg", "OD", "Hydrochlorothiazide (12.5mg tablet)", 1, "tab(s)", "One per day"],
    ["50mg", "OD", "Hydrochlorothiazide (50mg tablet)", 1, "tab(s)", "One per day"]
], "IBUPROFEN": [
    ["100mg", "TDS", "Ibuprofen (100mg capsule)", 1, "tab(s)", "Three per day"],
    ["200mg", "TDS", "Ibuprofen (200mg tablet)", 1, "tab(s)", "Three per day"],
    ["400mg", "TDS", "Ibuprofen (400mg tablet)", 1, "tab(s)", "Three per day"],
    ["800mg", "TDS", "Ibuprofen (800mg)", 1, "tab(s)", "Three per day"]
], "METHYLDOPA": [
    ["250mg", "BD", "Methyldopa (250mg tablet)", 1, "tab(s)", "Two per day"],
    ["250mg", "TDS", "Methyldopa (250mg tablet)", 1, "tab(s)", "Three per day"],
    ["125mg", "BD", "Methyldopa (125mg tablet)", 1, "tab(s)", "Two per day"],
    ["125mg", "TDS", "Methyldopa (125mg tablet)", 1, "tab(s)", "Three per day"],
    ["500mg", "BD", "Methyldopa (500mg tablet)", 1, "tab(s)", "Two per day"],
    ["500mg", "TDS", "Methyldopa (500mg tablet)", 1, "tab(s)", "Three per day"]
], "PARACETAMOL": [
    ["5ml", "TDS", "Paracetamol (5ml)", 5, "ml", "Three per day"],
    ["500mg", "TDS", "Paracetamol (500mg tablet)", 1, "tab(s)", "Three per day"],
    ["1g", "TDS", "Paracetamol (1g)", 1, "g", "Three per day"]
], "VITAMIN B COMPLEX": [
    ["15mg", "BD", "Vitamin B complex (15mg tablet)", 1, "tab(s)", "Two per day"]
], "CAPTOPRIL": [
    ["25mg", "BD", "Captopril (25mg tablet)", 1, "tab(s)", "Two per day"],
    ["25mg", "TDS", "Captopril (25mg tablet)", 1, "tab(s)", "Three per day"],
    ["6.25mg", "BD", "Captopril (6.25mg tablet)", 1, "tab(s)", "Two per day"],
    ["6.25mg", "TDS", "Captopril (6.25mg tablet)", 1, "tab(s)", "Three per day"],
    ["12.5mg", "BD", "Captopril (12.5mg tablet)", 1, "tab(s)", "Two per day"],
    ["12.5mg", "TDS", "Captopril (12.5mg tablet)", 1, "tab(s)", "Three per day"],
    ["50mg", "BD", "Captopril (50mg tablet)", 1, "tab(s)", "Two per day"],
    ["50mg", "TDS", "Captopril (50mg tablet)", 1, "tab(s)", "Three per day"]
], "GLIBENCLAMIDE": [
    ["5mg", "OD", "Glibenclamide (5mg tablet)", 1, "tab(s)", "One per day"],
    ["5mg", "BD", "Glibenclamide (5mg tablet)", 1, "tab(s)", "Two per day"],
    ["10mg", "OD", "Glibenclamide (10mg tablet)", 1, "tab(s)", "One per day"],
    ["10mg", "BD", "Glibenclamide (10mg tablet)", 1, "tab(s)", "Two per day"],
    ["15mg", "OD", "Glibenclamide (15mg tablet)", 1, "tab(s)", "One per day"],
    ["15mg", "BD", "Glibenclamide (15mg tablet)", 1, "tab(s)", "Two per day"],
    ["2.5mg", "OD", "Glibenclamide (2.5mg tablet)", 1, "tab(s)", "One per day"],
    ["2.5mg", "BD", "Glibenclamide (2.5mg tablet)", 1, "tab(s)", "Two per day"]
], "METFORMIN": [
    ["1g", "BD", "Metformin (1g)", 1, "g", "Two per day"],
    ["1g", "OD", "Metformin (1g)", 1, "g", "One per day"],
    ["1g", "TDS", "Metformin (1g)", 1, "g", "Three per day"],
    ["850mg", "BD", "Metformin (850mg)", 1, "tab(s)", "Two per day"],
    ["850mg", "OD", "Metformin (850mg)", 1, "tab(s)", "One per day"],
    ["850mg", "TDS", "Metformin (850mg)", 1, "tab(s)", "Three per day"],
    ["750mg", "BD", "Metformin (750mg)", 1, "tab(s)", "Two per day"],
    ["750mg", "OD", "Metformin (750mg)", 1, "tab(s)", "One per day"],
    ["750mg", "TDS", "Metformin (750mg)", 1, "tab(s)", "Three per day"],
    ["1000MG", "BD", "METFORMIN (1000MG)", 1, "tab(s)", "Two per day"],
    ["1000MG", "OD", "METFORMIN (1000MG)", 1, "tab(s)", "One per day"],
    ["1000MG", "TDS", "METFORMIN (1000MG)", 1, "tab(s)", "Three per day"],
    ["500", "BD", "Metformin (500 mg tablet)", 1, "tab(s)", "Two per day"],
    ["500", "OD", "Metformin (500 mg tablet)", 1, "tab(s)", "One per day"],
    ["500", "TDS", "Metformin (500 mg tablet)", 1, "tab(s)", "Three per day"]
], "QUINAPRIL": [
    ["20mg", "OD", "Quinapril (20mg)", 1, "tab(s)", "One per day"],
    ["40mg", "OD", "Quinapril (40mg tablet)", 1, "tab(s)", "One per day"],
    ["10mg", "OD", "Quinapril (10mg)", 1, "tab(s)", "One per day"],
    ["30mg", "OD", "Quinapril (30mg)", 1, "tab(s)", "One per day"]
], "NIFEDIPINE": [
    ["10mg", "TDS", "Nifedipine (10mg tablet)", 1, "tab(s)", "Three per day"],
    ["20mg", "TDS", "Nifedipine (20mg tablet)", 1, "tab(s)", "Three per day"]
], "NIFEDIPINE SR(SLOW RELEASE)": [
["10mg", "BD", "Nifedipine SR (10mg tablet)", 1, "tab(s)", "Two per day"],
    ["20mg", "BD", "Nifedipine SR (20mg tablet)", 1, "tab(s)", "Two per day"]
], "LENTE INSULIN": [], "PROPANOLOL": [
    ["160mg", "BD", "Propanolol (160mg tablet)", 1, "tab(s)", "Two per day"],
    ["160mg", "TDS", "Propanolol (160mg tablet)", 1, "tab(s)", "Three per day"],
    ["240mg", "BD", "Propanolol (240mg tablet)", 1, "tab(s)", "Two per day"],
    ["240mg", "TDS", "Propanolol (240mg tablet)", 1, "tab(s)", "Three per day"],
    ["320mg", "BD", "Propanolol (320mg tablet)", 1, "tab(s)", "Two per day"],
    ["320mg", "TDS", "Propanolol (320mg tablet)", 1, "tab(s)", "Three per day"],
    ["40mg", "BD", "Propanolol (40mg tablet)", 1, "tab(s)", "Two per day"],
    ["40mg", "TDS", "Propanolol (40mg tablet)", 1, "tab(s)", "Three per day"],
    ["80mg", "BD", "Propanolol (80mg)", 1, "tab(s)", "Two per day"],
    ["80mg", "TDS", "Propanolol (80mg)", 1, "tab(s)", "Three per day"]
], "SOLUBLE INSULIN": [], "LISINOPRIL": [
    ["10mg", "OD", "Lisinopril (10mg tablet)", 1, "tab(s)", "One per day"],
    ["20mg", "OD", "Lisinopril (20mg tablet)", 1, "tab(s)", "One per day"],
    ["5mg", "OD", "Lisinopril (5mg tablet)", 1, "tab(s)", "One per day"],
    ["2.5mg", "OD", "Lisinopril (2.5mg tablet)", 1, "tab(s)", "One per day"]
], "AMLODIPINE": [
    ["5mg", "OD", "Amlodipine (5mg tablet)", 1, "tab(s)", "One per day"],
    ["10mg", "OD", "Amlodipine (10mg tablet)", 1, "tab(s)", "One per day"]
]};

//-->