### Pre-requisites
You must have NodeJs https://nodejs.org/en/ version 6.0 or greater to use this module.

Instructions
============

Simply create a csv file named data.csv, and data2.csv with two columns: Date and Price. Date must follow the format MM-DD-YYYY.
In data.csv you can enter whatever data you want but in data2.csv it is advised to add only yearly data.

Run the interpolation.js file and the output will be a csv containing values obtained using linear interpolation https://en.wikipedia.org/wiki/Linear_interpolation for each date within the range provided in expandedData.csv. You can run the file by using the command `npm start`. The output in percentageIncrease.csv will show the percentage increase of the price relative to the previous year.

> This repository and everything contained within it is licensed. Please see the licence.md file for details.
