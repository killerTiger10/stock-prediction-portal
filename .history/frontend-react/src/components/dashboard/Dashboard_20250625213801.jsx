import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const Dashboard = () => {
  const [ticker, setTicker] = useState();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected-view/");
      } catch (error) {
        console.error("Errorfetching data: ", error);
      }
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/predict", {
        ticker: ticker,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Stock Ticker"
                onChange={(e) => {
                  setTicker(e.target.value);
                  console.log(ticker);
                }}
                required
              />
              <button type="submit" className="btn btn-info mt-3">
                See Prediction
              </button>
            </form>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Dashboard;
