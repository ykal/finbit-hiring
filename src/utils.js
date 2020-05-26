import Api from "./Api";
import { CASE_TYPES } from "./constants";

export const getData = () => Api("/", "GET");

export const filterCaseDataByCountries = (caseData, selectedCountries) => {
  if (!selectedCountries || selectedCountries.length === 0) return [];
  return caseData.filter((data) => selectedCountries.includes(data.country));
};

export const filterCountryCaseByDateRange = (countryData, dateRange) => {
  if (!countryData || !dateRange) return [];
  return {
    country: countryData.country,
    records: countryData.records.filter(
      (record) => record.day <= dateRange.end && record.day >= dateRange.start
    ),
  };
};

export const filterCaseByDateRange = (caseData, dateRange) => {
  if (!caseData || !dateRange) return [];
  return caseData.map((data) => filterCountryCaseByDateRange(data, dateRange));
};

const filterCaseData = (caseData, selectedCountries, dateRange) => {
  let filteredData = filterCaseDataByCountries(caseData, selectedCountries);
  filteredData = filterCaseByDateRange(filteredData, dateRange);
  return filteredData;
};

export const formatCountryDataForLineChart = (countryData) =>
  countryData.map((item) => ({ y: item.new, x: item.day }));

export const getDataForLineChart = (caseData, selectedCountries, dateRange) => {
  const filteredData = filterCaseData(caseData, selectedCountries, dateRange);
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

export const getDataForPieChart = (caseData, selectedCountries, dateRange) => {
  const filteredData = filterCaseData(caseData, selectedCountries, dateRange);
  return CASE_TYPES.map((type) =>
    getTotalNumberOfCasesByType(filteredData, type.name, type.label)
  );
};

export const range = (n) => Array.from({ length: n }, (value, key) => key);

export const getTotalInfectionsOfCountry = (countryData) => {
  let total = 0;
  countryData.forEach((data) => {
    total += data.new || 0;
  });
  console.log("total", total);
  return total;
};

export const getMaximumInfectedCountry = (caseData) => {
  const data = [];
  caseData.forEach((countryData) => {
    data.push({
      country: countryData.country,
      total: getTotalInfectionsOfCountry(countryData.records),
    });
  });
  return data;
};

export const getMostInfectedCountry = (
  caseData,
  selectedCountries,
  dateRange
) => {
  const filteredData = filterCaseData(caseData, selectedCountries, dateRange);
  const totalInfectionDataOfCountries = getMaximumInfectedCountry(filteredData);
  let maximumInfectedCountry = {
    country: "None",
    total: -Infinity,
  };
  totalInfectionDataOfCountries.forEach((data) => {
    if (data.total > maximumInfectedCountry.total)
      maximumInfectedCountry = {
        ...data,
      };
  });
  return maximumInfectedCountry;
};
