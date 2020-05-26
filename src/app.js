import React, { useEffect, useState } from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import { getData, getDataForLineChart, getDataForPieChart } from "./utils";
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

  const renderCheckboxes = () =>
    COUNTRIES.map((country) => (
      <Checkbox
        key={country}
        value={country}
        onChange={handleCheckboxSelected}
        isSelected={selectedCountries.includes(country)}
      />
    ));

  return (
    <div>
      <h4>Countries</h4>
      {renderCheckboxes()}
      <LineChart data={getDataForLineChart(caseData, selectedCountries)} />
      <PieChart data={getDataForPieChart(caseData, selectedCountries)} />
    </div>
  );
};

export default App;
