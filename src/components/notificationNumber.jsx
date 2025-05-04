import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getSettings,updateSettings } from "../services/user";


const NotificationNumber = () => {
  const [notificationNumber, setNotificationNumber] = useState("");

  useEffect(() => {
    getSettings()
      .then((res) => {
        if (res.status && res.data) {
          setNotificationNumber(res.data.notifi_number);
        } 
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
        toast.error("Error fetching settings");
      });
    },[]);

    const updateSetting = (data) => {
        updateSettings(data)
            .then((res) => {
            if (res.status) {
                toast.success("Settings updated successfully");
            } else {
                toast.error("Error: " + res.message);
            }
            })
            .catch((error) => {
            console.error("Error updating settings:", error);
            toast.error("Error updating settings");
            });
        }
    

  return (
    <div className="container">
      <h2>Notification Whatsapp Number</h2>
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column align-items-center card p-3 mt-2 bg-white shadow">
                <input type="text" className="form-control" value={notificationNumber} onChange={(e) => setNotificationNumber(e.target.value)} />
                <button className="btn btn-primary mt-2" onClick={() => updateSetting({ notifi_number:notificationNumber })}>
                    Update
                </button>
                <p>Enter the number to receive notifications.</p>
            </div> 
         </div>
    </div>
  );
};

export default NotificationNumber;
