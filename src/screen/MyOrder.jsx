import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]); // Initialize as an empty array

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      console.log("Fetching orders for email:", userEmail);

      const response = await fetch("http://localhost:3000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched order data:", data);

      setOrderData(data?.orderData?.order_data || []);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData
              .slice(0)
              .reverse()
              .map((order, orderIndex) => (
                <div key={orderIndex} className="mb-5">
                  {order.Order_date && (
                    <h5 className="mt-3">Order Date: {order.Order_date}</h5>
                  )}
                  <hr />
                  <div className="row">
                    {Object.keys(order)
                      .filter((key) => key !== "Order_date")
                      .map((key, itemIndex) => {
                        const item = order[key];
                        if (!item) return null;

                        // Displaying the item details with transparent background
                        return (
                          <div
                            key={itemIndex}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <div
                              className="card mt-3"
                              style={{
                                width: "16rem",
                                maxHeight: "360px",
                                backgroundColor: "transparent", // Make card background transparent
                                border: "1px solid #ddd", // Optional: Add border to make card visible
                              }}
                            >
                              <img
                                src={item.img}
                                className="card-img-top"
                                alt={item.name || "Item"}
                                style={{ height: "180px", objectFit: "cover" }}
                              />
                              <div
                                className="card-body"
                                style={{
                                  backgroundColor: "transparent", // Transparent background for card body
                                  color: "#fff", // Optional: White text color for better visibility
                                }}
                              >
                                <h5 className="card-title">{item.name}</h5>
                                <p>Quantity: {item.qty}</p>
                                <p>Size: {item.size}</p>
                                <p>Price: ₹{item.price}/-</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))
          ) : (
            <h4>No orders found.</h4>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
