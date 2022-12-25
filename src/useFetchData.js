import { useEffect, useState } from "react";

export const useFetchData = (url) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    getData();
  }, [url]);
  return { data };
};
