import React from "react";

export default function BookingRecords() {
  const bookingData = [
    { id: 1, customer: "John Doe", ride: "NYC - Boston", paymentType: "Credit Card", amount: "$120" },
    { id: 2, customer: "Alice Smith", ride: "LA - SF", paymentType: "PayPal", amount: "$150" },
  ];

  return (
    <div className="page-container">
      <h2>Booking & Payment Records</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Ride</th>
            <th>Payment Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bookingData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.customer}</td>
              <td>{item.ride}</td>
              <td>{item.paymentType}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
