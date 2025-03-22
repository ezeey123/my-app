import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // Import for Excel export

const SalesReportForm = () => {
  const [showTable, setShowTable] = useState(false);
  const [sales, setSales] = useState([
    {
      quantity: 1,
      productName: "",
      lastPrice: "",
      soldPrice: "",
      total: 0,
      paymentMode: "cash",
      status: false,
    },
  ]);
  const [popupData, setPopupData] = useState(null);

  // Show Table when "Create Report" is clicked
  const handleCreateReport = () => {
    setShowTable(true);
  };

  // Add new row
  const addRow = () => {
    setSales([
      ...sales,
      {
        quantity: 1,
        productName: "",
        lastPrice: "",
        soldPrice: "",
        total: 0,
        paymentMode: "cash",
        status: false,
      },
    ]);
  };

  // Handle input changes and auto-calculate total
  const handleChange = (index, field, value) => {
    const newSales = [...sales];
    newSales[index][field] = value;

    if (field === "quantity" || field === "soldPrice") {
      newSales[index].total =
        newSales[index].quantity * newSales[index].soldPrice;
    }

    setSales(newSales);
  };

  // Submit data & show popup
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate stat
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((acc, item) => acc + item.total, 0);
    const totalProfit = sales.reduce(
      (acc, item) => acc + (item.soldPrice - item.lastPrice) * item.quantity,
      0
    );

    await axios.post("http://localhost:3000/api/sales", { sales });

    // Show popup with results
    setPopupData({ totalSales, totalRevenue, totalProfit });
  };

  // Export to Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sales);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    XLSX.writeFile(wb, "Sales_Report.xlsx");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
      {!showTable ? (
        <button
          onClick={handleCreateReport}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition w-full text-center"
        >
          ➕ Create Report
        </button>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Create Sales Report
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                  <th className="p-3 text-left w-16">Qty</th>
                  <th className="p-3 text-left w-64">Product Name</th>
                  <th className="p-3 text-left w-32">Last Price ($)</th>
                  <th className="p-3 text-left w-32">Sold Price ($)</th>
                  <th className="p-3 text-left w-32">Total ($)</th>
                  <th className="p-3 text-left w-32">Payment Mode</th>
                  <th className="p-3 text-left w-20">Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-100 transition"
                  >
                    <td className="p-3">
                      <input
                        type="number"
                        className="w-16 px-2 py-1 border rounded-md"
                        value={item.quantity}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        className="w-64 px-2 py-1 border rounded-md"
                        value={item.productName}
                        onChange={(e) =>
                          handleChange(index, "productName", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        className="w-32 px-2 py-1 border rounded-md"
                        value={item.lastPrice}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "lastPrice",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        className="w-32 px-2 py-1 border rounded-md"
                        value={item.soldPrice}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "soldPrice",
                            Number(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="p-3 font-semibold">{item.total}</td>
                    <td className="p-3">
                      <select
                        className="w-32 px-2 py-1 border rounded-md"
                        value={item.paymentMode}
                        onChange={(e) =>
                          handleChange(index, "paymentMode", e.target.value)
                        }
                      >
                        <option value="cash">Cash</option>
                        <option value="transfer">Transfer</option>
                      </select>
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        checked={item.status}
                        onChange={(e) =>
                          handleChange(index, "status", e.target.checked)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-5">
            <button
              onClick={addRow}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md transition"
            >
              + Add Row
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
            >
              Submit
            </button>
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-md transition"
            >
              📤 Export to Excel
            </button>
          </div>

          {/* Popup Message */}
          {popupData && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  🎉 Report Submitted!
                </h2>
                <p className="mt-2">
                  Total Sales: <strong>{popupData.totalSales}</strong>
                </p>
                <p>
                  Total Revenue: <strong>${popupData.totalRevenue}</strong>
                </p>
                <p>
                  Total Profit: <strong>${popupData.totalProfit}</strong>
                </p>
                <button
                  onClick={() => {
                    setPopupData(null);
                    setShowTable(false);
                  }}
                  className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SalesReportForm;
