import Api from "./Api";
import { CASE_TYPES } from "./constants";

export const getData = () => Api("/", "GET");

export const filterCaseDataByCountries = (caseData, selectedCountries) => {
  if (!selectedCountries || selectedCountries.length === 0) return [];
  return caseData.filter((data) => selectedCountries.includes(data.country));
};

export const formatCountryDataForLineChart = (countryData) =>
  countryData.map((item) => ({ y: item.new, x: item.day }));

export const getDataForLineChart = (caseData, selectedCountries) => {
  const filteredData = filterCaseDataByCountries(caseData, selectedCountries);
  return filteredData.map((item) => ({
    id: item.country,
    data: formatCountryDataForLineChart(item.records),
  }));
};

export const getTotalCaseOfCountryDataByType = (countryData, caseType) => {
  let total = 0;
  countryData.forEach((data) => {
    total += data[caseType] || 0;
  });
  return total;
};

export const getTotalNumberOfCasesByType = (caseData, caseType, caseLabel) => {
  let total = 0;
  caseData.forEach((countryData) => {
    total += getTotalCaseOfCountryDataByType(countryData.records, caseType);
  });
  return {
    id: caseType,
    label: caseLabel,
    value: total,
  };
};

export const getDataForPieChart = (caseData, selectedCountries) => {
  const filteredData = filterCaseDataByCountries(caseData, selectedCountries);
  return CASE_TYPES.map((type) =>
    getTotalNumberOfCasesByType(filteredData, type.name, type.label)
  );
};
