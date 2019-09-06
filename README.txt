# NVD-to-Excel
Converts National Vulnerability Database JSON feeds into an Excel format

Please be sure to have the latest LTS version of nodejs installed on your computer. Nodejs can be downloaded from https://nodejs.org/en/.
Use the terminal or command line to run `npm install` within the `NVD-to-Excel` folder to add node packages to the project. The `node_modules` folder should appear in the `NVD-to-Excel` folder after running `npm install`.
Also run `npm install exceljs` to add the exceljs package to the project.

Download your preferred NVD JSON feed from https://nvd.nist.gov/vuln/data-feeds#JSON_FEED. Extract the JSON file from the zipped folder and place it into the `vulnerabilities` folder.

In the terminal or command line, navigate to the `NVD-to-Excel` folder and run `node VulnerabilityMapping.js [filename of JSON file]`. Replace `[filename of JSON file]` with the filename of the extracted NVD JSON file. The argument `--log` can be added after `[filename of JSON file]` to output console logs within the terminal, but the program will take longer to run if logs are outputted.

The program should produce an Excel sheet containing all the CVEs in the NVD JSON file in the `vul_excel_sheets` folder. This Excel sheet containing the vulnerabilities should be used with the `VULNERABILITY_MAPPING_TOOL` Excel tool. The `VulnerabilityMapping.js` program takes only a couple seconds to run, but adding the `--log` argument can extend runtime to a couple minutes.

The `vulnerabilities` folder and the `vul_excel_sheets` folder already come with the NVD JSON file and the Excel file for 2019 as an example.