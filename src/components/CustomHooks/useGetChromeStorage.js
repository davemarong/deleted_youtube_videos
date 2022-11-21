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
  const [loading, setLoading] = useState(false);

  console.log("usegetchrome");
  // Effect
  useEffect(() => {
    chrome.storage.local.get("data", ({ data }) => {
      setLoading(true);
      if (dataType) {
        setChromeData(data[dataType]);
        setLoading(false);
      } else {
        setChromeData(data);
        setLoading(false);
      }
    });
  }, []);
  // Functions

  // Return
  return [chromeData, loading];
};
