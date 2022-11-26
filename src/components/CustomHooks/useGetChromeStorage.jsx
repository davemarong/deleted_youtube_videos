/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// IMPORT

// React
import { useState, useEffect } from "react";

// Material UI

// Components

// Utils

// External

// Data

// Functional component
export const useGetChromeStorage = (dataType) => {
  // State
  const [chromeData, setChromeData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect
  useEffect(() => {
    console.log(
      "Running useGetChromeStorage custom hook to fetch data from chrome.storage"
    );
    chrome.storage.local.get("data", ({ data }) => {
      if (dataType) {
        setChromeData(data[dataType]);
        setLoading(false);
      } else {
        setChromeData(data);
        setLoading(false);
      }
    });
  }, [chromeData]);
  // Functions

  // Return
  return [chromeData, loading, setChromeData];
};
