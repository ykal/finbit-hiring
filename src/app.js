import React, { useEffect, useState } from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import {
  getData,
  getDataForLineChart,
  getDataForPieChart,
  range,
  getMostInfectedCountry,
  filterCaseData,
} from "./utils";
import "./style.css";
import { COUNTRIES } from "./constants";

const Checkbox = ({ id, value, isSelected, onChange }) => (
  <>
    <input
      type="checkbox"
      id={value}
      name={value}
      value={value}
      onChange={onChange}
      checked={isSelected}
    />
    <span>{value}</span>
  </>
);

const App = (props) => {
  const [caseData, setCaseData] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([...COUNTRIES]);
  const [dateRange, setDateRange] = useState({
    start: 1,
    end: 30,
  });

  useEffect(() => {
    getData().then((res) => {
      setCaseData(res);
    });
  }, []);

  const handleCheckboxSelected = (event) => {
    const value = event.target.value;
    const tempSelectedCountries = selectedCountries;
    tempSelectedCountries.indexOf(value) !== -1
      ? tempSelectedCountries.splice(tempSelectedCountries.indexOf(value), 1)
      : tempSelectedCountries.push(value);
    setSelectedCountries([...tempSelectedCountries]);
  };

  const renderSelectOptions = (n) => {
    return range(n).map((date) => (
      <option key={date} value={date + 1} label={date + 1} />
    ));
  };

  const renderCheckboxes = () =>
    COUNTRIES.map((country) => (
      <Checkbox
        key={country}
        value={country}
        onChange={handleCheckboxSelected}
        isSelected={selectedCountries.includes(country)}
      />
    ));

  const handleDateRangeChange = (event, rangeType) => {
    const value = event && event.target && event.target.value;
    value &&
      rangeType === "startDate" &&
      setDateRange((prevState) => ({
        ...prevState,
        start: parseInt(value),
      }));
    value &&
      rangeType === "endDate" &&
      setDateRange((prevState) => ({
        ...prevState,
        end: parseInt(value),
      }));
  };

  const renderMaximumInfectedCountry = (data) => {
    const mostInfectedCountry = getMostInfectedCountry(data);
    return (
      <>
        <h6>Most infected country</h6>
        <p>{(mostInfectedCountry && mostInfectedCountry.country) || "None"} </p>
      </>
    );
  };

  const renderChart = (caseData) => {
    const data = filterCaseData(caseData, selectedCountries, dateRange);
    return data && data.length > 0 ? (
      <>
        <LineChart data={getDataForLineChart(data)} />
        {renderMaximumInfectedCountry(data)}
        <PieChart data={getDataForPieChart(data)} />
      </>
    ) : (
      <h6>No data displayed</h6>
    );
  };

  return (
    <div>
      <div>
        <h4>Countries</h4>
        {renderCheckboxes()}
      </div>
      <br />
      <div>
        <span> Start Date </span>
        <select
          onChange={(event) => handleDateRangeChange(event, "startDate")}
          value={dateRange.start}
        >
          {renderSelectOptions(30)}
        </select>
        <span> End Date </span>
        <select
          onChange={(event) => handleDateRangeChange(event, "endDate")}
          value={dateRange.end}
        >
          {renderSelectOptions(30)}
        </select>
      </div>
      {renderChart(caseData)}
    </div>
  );
};

export default App;
