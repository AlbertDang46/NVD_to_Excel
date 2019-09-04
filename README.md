# NVD-to-Excel
Converts NVD JSON feeds into an Excel format

Please be sure to have nodejs installed on your computer. The latest version of nodejs is preferable.
Within the project folder, run `npm install` to add node packages to the project.
Also run `npm install exceljs` to add the exceljs package to the project.

Download your preferred NVD JSON feed from https://nvd.nist.gov/vuln/data-feeds#JSON_FEED. Extract the JSON file from the zipped folder and place it into the `vulnerabilities` folder.

In the terminal or command line, navigate to the `NVD-to-Excel` folder and execute `node VulnerabilityMapping.js [filename of JSON file]`. Replace `[filename of JSON file]` with the filename of the extracted NVD JSON file. The argument `--log` can be added after `[filename of JSON file]` to output console logs within the terminal, but the program will take longer to run.

The program should produce an Excel sheet containing all the CVEs in the NVD JSON file in the `vul_excel_sheets` folder. This Excel sheet containing the vulnerabilities of one year should be used with the `VULNERABILITY_MAPPING_TOOL` Excel tool. The program takes only a couple seconds to run, but adding the `--log` argument can extend runtime to a couple minutes.

