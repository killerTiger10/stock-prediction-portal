import React, { useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const Dashboard = () => {
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected-view/", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log("Success:", response.data);
      } catch (error) {
        console.error("Errorfetching data: ", error);
      }
    };
    fetchProtectedData();
  }, []);

  return <div className="text-light">Dashboard</div>;
};

export default Dashboard;
