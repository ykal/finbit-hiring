# Finbit react developer hiring test
In this test, you are required to consume an API that returns a JSON data of COVID cases for countries and visualize part of it. 
![](todo.gif)
The API returns an array of objects each representing data for a single country. Each object has the following structure
```
{
  country: "China",
  records: [
    {
      day: 1,
      new: 23,
      death: 5,
      recovered: 14
    },
    {
      day: 2,
      new: 12,
      death: 4,
      recovered: 7
    },
    ...
  ]
}
```
The ```records``` is an array of daily reports of COVID cases for 30 days. Each object contains the daily number of new cases, deaths and recoveries.

## Getting started
1. Fork this repository 
2. Clone your fork on your computer
3. Switch to the ```starter``` branch
4. Create a new branch named ```develop```.
5. You will see that we have already implemented a ```LineChart``` and ```PieChart``` components in the ```core``` directory. You are not expected to make changes to those components. Simply import and use them in your code. Both chart components expect a single ```data``` property. The line chart takes an array of objects each having country name as ID and an array of points with day as field ```x``` and number of cases as ```y```. 
```
[
 {
    "id": "China",   
    "data": [
      {
        "x": 1,
        "y": 130
      },
      {
        "x": 2,
        "y": 96
      },
      ...
]
```
The pie chart takes an array of 3 objects as following
```
[
  {
    "id": "new",
    "label": "New Case",
    "value": 43,   
  },
  {
    "id": "death",
    "label": "Deaths",
    "value": 26,
  },
  {
    "id": "recovery",
    "label": "Recoveries",
    "value": 12,
  } 
```

You will prepare a form that lets the user filter the data by selecting countries and specifying start and end days.
Make sure the form will work if more countries are added to the data.

The pie chart at the bottom shows data for the most affected county. The most affected country is defined as the one with the largest sum of new cases and deaths within the defined duration. 

Good luck!
