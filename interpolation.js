const moment = require('moment');
const csvToJson = require('csvtojson');
const jsonexport = require('jsonexport');
const fs = require('fs');

const interpolate = (pointA, pointB, x) => {
  const numerator = pointB.Price - pointA.Price;
  const denominator = pointB.Date - pointA.Date;
  const factor = x - pointA.Date;
  const interpolation = factor * (numerator / denominator);
  const result = pointA.Price + interpolation;
  return result;
}

csvToJson().fromFile('./data.csv')
  .then(data => {
    data = data.map(d => ({
      Price: parseFloat(d.Price),
      Date: moment(d.Date, 'MM-DD-YYYY').unix(),
    }));
    const expandedData = [];
    expandedData.push({
      Price: data[0].Price,
      Date: moment.unix(data[0].Date).format('MM-DD-YYYY').toString(),
    });
    data.forEach((pointA, index) => {
      let date = pointA.Date;
      if (index === 0) {
        date += 86400;
      }
      const pointB = data[index + 1];
      if (pointB) {
        while (date !== pointB.Date) {
          const price = interpolate(pointA, pointB, date);
          expandedData.push({
            Date: moment.unix(date).format('MM-DD-YYYY').toString(),
            Price: price,
          });
          date += 86400;
        }
      }
    });
    return expandedData;
  })
  .then(expandedData => {
    jsonexport(expandedData, (err, csv) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFileSync('expandedData.csv', csv);
    });
  });

csvToJson().fromFile('./data2.csv')
  .then(data => {
    const increases = data.map((date, index) => {
      if (index === 0) {
        return {
          Year: moment(date.Date, 'MM-DD-YYYY').year().toString(),
          Increase: '0%',
        };
      }
      if (data[index - 1]) {
        return {
          Year: moment(date.Date, 'MM-DD-YYYY').year().toString(),
          Increase: `${(date.Price - data[index - 1].Price) / 100}%`,
        };
      }
    });
    jsonexport(increases, (err, csv) => {
      if (err) {
        return console.log(err);
      }
      fs.writeFileSync('percentageIncrease.csv', csv);
    });
  });
