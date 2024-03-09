import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentComponent = () => {
  const { search } = useLocation();
  const [sessionId] = useState(new URLSearchParams(search).get("sessionId"));
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://ap-gateway.mastercard.com/static/checkout/checkout.min.js";
    script.async = true;
  
    script.onload = () => {
      // Configure Checkout with the session ID
      window.Checkout.configure({
        session: {
          id: sessionId,
        },
      });
    };
  
    // Handle script loading errors
    script.onerror = () => {
      console.error("Error loading Checkout script");
      // Display an error message to the user
      // You can set a state variable to manage error visibility
    };
  
    document.head.appendChild(script);
  
    // Cleanup function to remove Checkout from the global scope and remove the script
    return () => {
      delete window.Checkout;
      document.head.removeChild(script);
    };
  }, [sessionId]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionId]);

  useEffect(() => {
    if (seconds === 0) {
      window.Checkout.showPaymentPage();
    }
  }, [seconds]);
  return (
    <>
      <head></head>
      <div
        style={{
          fontFamily: "Arial",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          margin: 0,
          backgroundColor: "#FEF3C7",
        }}
      >
        <div
          style={{
            // backgroundColor: "#FFF9D1",
            backgroundColor: "#FFF",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            maxWidth: "450px",
            width: "100%",
            textAlign: "center",
          }}
        >
          {/* // add gif or image here */}
          <img
            src="https://www.mastercard.co.in/content/dam/mccom/global/logos/logo-mastercard-mobile.svg"
            alt="Mastercard"
            style={{ width: "100px", height: "auto" }}
          />

          <h2 style={{ color: "#000", fontSize: "24px" }}>
            Verify your payment
          </h2>
          <p style={{ color: "#000", fontSize: "16px" }}>
            Please verify your payment to continue
          </p>
          {seconds > 0 ? (
            <p style={{ color: "#000", fontSize: "16px" }}>
              Redirecting to payment page in{" "}
              <b
                style={{
                  color: "#C6A34F",
                }}
              >
                {seconds}
              </b>{" "}
              seconds
            </p>
          ) : null}
          <button
            onClick={() => window.Checkout.showPaymentPage()}
            style={{
              backgroundColor: "#C6A34F",
              color: "#fff",
              border: "none",
              padding: "5px 10px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentComponent;
