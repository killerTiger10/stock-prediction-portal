import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const Dashboard = () => {
  const [ticker, setTicker] = useState();

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected-view/");
        console.log("Success:", response.data);
      } catch (error) {
        console.error("Errorfetching data: ", error);
      }
    };
    fetchProtectedData();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <form>
              <input
                type="text"
                className="form-control"
                placeholder="Ticker"
                onChange={(e) => {
                  set;
                }}
              />
              <button type="submit" className="btn btn-info">
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
