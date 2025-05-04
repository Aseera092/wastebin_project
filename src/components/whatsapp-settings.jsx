import React, { useState } from "react";
import { useEffect } from "react";
import { deleteMachine, getMachine, updateMachine } from "../services/machine";
import { toast } from "react-toastify";
import { getQrCode, getRequest, getWhatsappStatus, updateRequestStatus } from "../services/user";
import { use } from "react";
import QRCode from "react-qr-code";
import { clear } from "@testing-library/user-event/dist/clear";

const WhatsappSettings = () => {
  const [qrCode, setQrCode] = useState("");
  const [alreadyConnected, setAlreadyConnected] = useState(false);
  const [client, setClient] = useState();

  useEffect(() => {
    getQrCode()
      .then((res) => {
        if (res.status) {
          setQrCode(res.data);
        } 
        if (res.status === false && res.client) {
          setAlreadyConnected(true);
          console.log("Client already authenticated:", res.client);
          setClient(res.client);
        }
      })
      .catch((error) => {
        console.error("Error fetching QR code:", error);
        toast.error("Error fetching QR code");
      });

      const ws = setInterval(() => {
        getWhatsappStatus()
          .then((res) => {
            if (res.status) {
              setAlreadyConnected(true);
              console.log("Client already authenticated:", res.client);
              setClient(res.client);
              clearInterval(ws);
            } else {
              setAlreadyConnected(false);
            }
          })
          .catch((error) => {
            console.error("Error fetching WhatsApp status:", error);
            toast.error("Error fetching WhatsApp status");
          });
      }
      , 10000); // Check every 10 seconds
      return () => clearInterval(ws); // Cleanup interval on component unmount
  },[]);

  return (
    <div className="container">
      <h2>Whatsapp Connect</h2>
      <div className="d-flex justify-content-center">
        {qrCode && (
          <div className="d-flex flex-column align-items-center card p-3 mt-2 bg-white shadow">
            <QRCode value={qrCode} size={256} />
            <p>Scan this QR code with your WhatsApp app to connect.</p>
          </div>
        )}
        {!qrCode || !alreadyConnected (
          <div className="d-flex flex-column align-items-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p>Loading QR Code...</p>
          </div>
        )}
        {alreadyConnected && client && (
          <div className="card shadow p-2 d-flex flex-column align-items-center">
            <h3>Client is already authenticated</h3>
            <p><b>Mobile No:</b> +{client.me.user}</p>
            <p><b>Name:</b> {client.pushname}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsappSettings;
