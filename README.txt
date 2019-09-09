# NVD-to-Excel
Converts National Vulnerability Database JSON feeds into an Excel format

Please be sure to have the latest LTS version of nodejs installed on your computer. Nodejs can be downloaded from https://nodejs.org/en/.
Use the terminal or command line to run `npm install` within the `NVD-to-Excel` folder to add node packages to the project. The `node_modules` folder should appear in the `NVD-to-Excel` folder after running `npm install`.
Then run `npm install exceljs` to add the exceljs package to the project. 
Lastly, run `npm install unzip` to add an unzipper to the project.

In the terminal or command line, navigate to the `NVD-to-Excel` folder and run `node NVDToExcel.js [year]`. Replace `[year]` with the year you would like to get NVD CVEs from. The argument `--log` can be added after `[year]` to output console logs within the terminal, but the program will take longer to run if logs are outputted.

The program should output a zip file in the `vulnerabilities_zip` folder, JSON file in the `vulnerabilities_json` folder, and Excel sheet containing all the NVD CVEs from the specified year in the `vulnerabilities_excel_sheets` folder. 
This Excel sheet containing the vulnerabilities should be used with the `VULNERABILITY_MAPPING_TOOL` Excel tool. 

The `NVDToExcel.js` program takes less than 30 seconds to run, but adding the `--log` argument can extend runtime to a couple minutes.