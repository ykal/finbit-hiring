import Api from "./Api";

export const getData = () => Api("/", "GET");

export const formatCountryDataForLineChart = (countryData) =>
  countryData.map((item) => ({ y: item.new, x: item.day }));

export const getDataForLineChart = (caseData) => {
  return caseData.map((item) => ({
    id: item.country,
    data: formatCountryDataForLineChart(item.records),
  }));
};
