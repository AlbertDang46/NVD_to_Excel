/*****************************************
VULNERABILITY MAPPING
******************************************/

const fs = require("fs");
const https = require("https");
const unzip = require("unzip");
const excel = require("exceljs/modern.nodejs");

const ZIP_FOLDER = "./vulnerabilities_zip"
const JSON_FOLDER = "./vulnerabilities_json";
const EXCEL_FOLDER = "./vulnerabilities_excel_sheets";

if (!fs.existsSync(ZIP_FOLDER)) { 
    fs.mkdirSync(ZIP_FOLDER);
}
if (!fs.existsSync(JSON_FOLDER)) { 
    fs.mkdirSync(JSON_FOLDER);
}
if (!fs.existsSync(EXCEL_FOLDER)) { 
    fs.mkdirSync(EXCEL_FOLDER);
}

let nvdYear = process.argv[2];
let nvdFileName = "nvdcve-1.0-" + nvdYear;
let nvdJSONName = nvdFileName + ".json";
let nvdZipName = nvdJSONName + ".zip";
let nvdExcelName = nvdFileName + ".xlsx";
let nvdZipURL = "https://nvd.nist.gov/feeds/json/cve/1.0/" + nvdZipName;
let zipFilepath = ZIP_FOLDER + "/" + nvdZipName;
let jsonFilepath = JSON_FOLDER + "/" + nvdJSONName;
let excelFilepath = EXCEL_FOLDER + "/" + nvdExcelName;

if(nvdYear === undefined) {
    console.log("Must provide NVD year!");
    process.exit(1);
}

const zipFile = fs.createWriteStream(zipFilepath);
https.get(nvdZipURL, function(response) {
    response.pipe(zipFile).on("finish", function() {
        fs.createReadStream(zipFilepath).pipe(unzip.Extract({ path: JSON_FOLDER }).on("close", function() {
            createNVDExcelSheet();
        }));
    });
});

function createNVDExcelSheet() {
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("VulnerabilitySheet");
    worksheet.addRow(["CVE_ID", "Vector_String", "Attack_Vector", "Attack_Complexity", 
                    "Privileges_Required", "User_Interaction", "Scope", "Confidentiality_Impact", 
                    "Integrity_Impact", "Availability_Impact", "Base_Score", "Base_Severity", 
                    "Exploitability_Score", "Impact_Score", "Vendor_Name", "Product_Name", "Versions"]);

    fs.readFile(jsonFilepath, "utf8", function(err, data) {
        let vulnerabilitiesJSON = JSON.parse(data);

        vulnerabilitiesJSON.CVE_Items.forEach((item) => {
            let cve_id = item.cve.CVE_data_meta.ID;       
            let vector_string = "";
            let attack_vector = "";
            let attack_complexity = "";
            let privileges_required = "";
            let user_interaction = "";
            let scope = "";
            let confidentiality_impact = "";
            let integrity_impact = "";
            let availability_impact = "";
            let base_score = "";
            let base_severity = "";
            let exploitability_score = "";
            let impact_score = "";
            let vendor_name = "";
            let product_name = "";
            let versions = [];

            let vendor_data = item.cve.affects.vendor.vendor_data;
            if(vendor_data.length)
            {
                vendor_name = vendor_data[0].vendor_name.replace(/_/g, " ");
                product_name = vendor_data[0].product.product_data[0].product_name.replace(/_/g, " ");
                versions = vendor_data[0].product.product_data[0].version.version_data.map((v_num) => {
                    if(v_num.version_value.localeCompare("*") == 0 || v_num.version_value.localeCompare("-") == 0) {
                        return "";
                    }
                    return v_num.version_value;
                });
            }
            else
            {
                return;
            }

            if(item.impact.hasOwnProperty("baseMetricV3"))
            {
                let cvssV3 = item.impact.baseMetricV3.cvssV3;

                vector_string = cvssV3.vectorString;
                attack_vector = cvssV3.attackVector;
                attack_complexity = cvssV3.attackComplexity;
                privileges_required = cvssV3.privilegesRequired;
                user_interaction = cvssV3.userInteraction;
                scope = cvssV3.scope;
                confidentiality_impact = cvssV3.confidentialityImpact;
                integrity_impact = cvssV3.integrityImpact;
                availability_impact = cvssV3.availabilityImpact;
                base_score = cvssV3.baseScore;
                base_severity = cvssV3.baseSeverity;
                exploitability_score = item.impact.baseMetricV3.exploitabilityScore;
                impact_score = item.impact.baseMetricV3.impactScore;
            }
            
            if(process.argv[3] === "--log")
            {
                console.log("CVE ID: " + cve_id);
                console.log("Vector String: " + vector_string);
                console.log("Attack Vector: " + attack_vector);
                console.log("Attack Complexity: " + attack_complexity);
                console.log("Privileges Required: " + privileges_required);
                console.log("User Interaction: " + user_interaction);
                console.log("Scope: " + scope);
                console.log("Confidentiality Impact: " + confidentiality_impact);
                console.log("Integrity Impact: " + integrity_impact);
                console.log("Availability Impact: " + availability_impact);
                console.log("Base Score: " + base_score);
                console.log("Base Severity: " + base_severity);
                console.log("Exploitability Score: " + exploitability_score);
                console.log("Impact Score: " + impact_score);
                console.log("Vendor Name: " + vendor_name);
                console.log("Product Name: " + product_name);
                console.log("Versions Affected: ");
                versions.forEach((version_value) => {
                    console.log(version_value);
                });
                console.log("\n");
            }

            worksheet.addRow([cve_id, vector_string, attack_vector, attack_complexity, 
                            privileges_required, user_interaction, scope, confidentiality_impact, 
                            integrity_impact, availability_impact, base_score, base_severity, 
                            exploitability_score, impact_score, vendor_name, product_name, ...versions]);
        });

        workbook.xlsx.writeFile(excelFilepath);
    });
}