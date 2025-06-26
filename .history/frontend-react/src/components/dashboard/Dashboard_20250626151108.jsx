import React, { use, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState("");
  const [ma100, setMA100] = useState();

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
    setLoading(true);
    try {
      const response = await axiosInstance.post("/predict/", {
        ticker: ticker,
      });
      console.log(response.data);
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const plotUrl = `${backendRoot + response.data.plot_img}`;
      const ma100Url = `${backendRoot + response.data.plot_100_dma_img}`;

      // Set plots
      setPlot(plotUrl);
      setMA100(ma100Url);
      if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
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
              <small>
                {error && <div className="text-danger">{error}</div>}
              </small>
              <button type="submit" className="btn btn-info mt-3">
                {loading ? (
                  <span>
                    <FontAwesomeIcon icon={faSpinner} spin /> Please wait...
                  </span>
                ) : (
                  "See Prediction"
                )}
              </button>
            </form>
          </div>

          {/* Print prediction plots */}
          <div className="prediction mt-5">
            <div className="p-3">
              {plot && <img src={plot} style={{ maxwith: "100%" }} />}
            </div>
            <div className="p-3">
              {ma100 && <img src={ma100} style={{ maxwith: "100%" }} />}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Dashboard;
