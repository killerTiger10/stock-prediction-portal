import React, {useEffect} from "react";
import axios from "axios"

const Dashboard = () => {
    useEffect(() => {
        const fetchProtectedData = () => {
        try{
            const response = await axios.get("http://localhost:8000/api/v1/protected-view/")
        }catch(error){
            console.error("Errorfetching data: ", error)
        }
        fetchProtectedData()
}},[])
  return <div className="text-light">Dashboard</div>;
};

export default Dashboard;
