import React, { useEffect, useState } from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import { getData, getDataForLineChart, getDataForPieChart } from "./utils";
import "./style.css";

const App = (props) => {
  const [caseData, setCaseData] = useState([]);

  useEffect(() => {
    getData().then((res) => {
      setCaseData(res);
    });
  }, []);

  return (
    <div>
      <LineChart data={getDataForLineChart(caseData)} />
      <PieChart data={getDataForPieChart(caseData)} />
    </div>
  );
};

export default App;