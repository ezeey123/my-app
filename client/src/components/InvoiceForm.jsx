import { Plus, Trash2, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleForm, addInvoice } from "../store/invoiceSlice";
import { useState } from "react";
import { format, addDays, set } from "date-fns";

const InvoiceForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(() => {
    return {
      id: `INV${Math.floor(Math.random() * 1000)}`,
      status: "pending",
      billFrom: {
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      billTo: {
        clientEmail: "",
        streetAddress: "",
        city: "",
        postCode: "",
        country: "",
      },
      clientName: "",
      items: [],
      paymentTerms: "Next 30 days",
      projectDescription: "",
      invoiceDate: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      dueDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
      amount: 0,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addInvoice(formData));
    console.log(formData);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 0, price: 0, total: 0 }],
    });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value; // Use `field` here, not `key`
    if (field === "quantity" || field === "price") {
      const qty = field === "quantity" ? value : newItems[index].quantity;
      const price = field === "price" ? value : newItems[index].price;
      newItems[index].total = qty * price;
    }
    setFormData({ ...formData, items: newItems });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center overflow-y-auto">
      <div className="bg-slate-800 p-8 rounded-lg w-full max-w-2xl mt-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold "> New Invoice</h2>
          <button type="button" onClick={() => dispatch(toggleForm())}>
            <X size={24} />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h1 className="text-violet-500 font-bold">Bill From</h1>
            <input
              type="text"
              placeholder="Street Address"
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* <h1 className="text-violet-500 font-bold">Bill To</h1> */}
            <input
              type="text"
              placeholder="City"
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="Post Code"
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="Country"
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-violet-500 font-bold">Bill To</h1>
            <input
              type="text"
              placeholder="Client's Name"
              value={formData.clientName}
              onChange={(e) =>
                setFormData({ ...formData, clientName: e.target.value })
              }
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />

            <input
              type="email"
              placeholder="Client's Email"
              value={formData.billTo.clientEmail}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: { ...formData.billTo, clientEmail: e.target.value },
                })
              }
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="Street Address"
              value={formData.billTo.streetAddress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: { ...formData.billTo, streetAddress: e.target.value },
                })
              }
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* <h1 className="text-violet-500 font-bold">Bill To</h1> */}
            <input
              type="text"
              placeholder="City"
              value={formData.billTo.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billTo: { ...formData.billTo, city: e.target.value },
                })
              }
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="Post Code"
              value={formData.billFrom.postCode}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    postCode: e.target.value,
                  },
                })
              }
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />

            <input
              type="text"
              placeholder="Country"
              value={formData.billFrom.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  billFrom: {
                    ...formData.billFrom,
                    country: e.target.value,
                  },
                })
              }
              className="w-full bg-slate-900 rounded-lg p-3"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                className=" bg-slate-900 rounded-lg p-3"
                value={formData.invoiceDate}
                onChange={(e) => {
                  const newDate = e.target.value;
                  setFormData({
                    ...formData,
                    invoiceDate: newDate,
                    dueDate: format(
                      addDays(new Date(newDate), 30),
                      "yyyy-MM-dd"
                    ),
                  });
                }}
                required
              />
              <select
                className="bg-slate-900 rounded-lg p-3"
                required
                value={formData.paymentTerms}
                onChange={(e) =>
                  setFormData({ ...formData, paymentTerms: e.target.value })
                }
              >
                <option>Next 30 days</option>
                <option>Next 60 days</option>
              </select>

              <input
                type="text"
                placeholder="Project Description"
                className="w-full bg-slate-900 rounded-lg p-3"
                value={formData.projectDescription}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    projectDescription: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3>Item List</h3>
            {formData.items.map((item, index) => (
              <div className="grid grid-cols-12 gap-4 items-center">
                <input
                  type="text"
                  placeholder="item name"
                  className=" bg-slate-900 rounded-lg p-3 col-span-4"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Quantity"
                  className=" bg-slate-900 rounded-lg p-3 col-span-2"
                  min="1"
                  required
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", parseInt(e.target.value) || 0)
                  }
                />

                <input
                  type="number"
                  placeholder="Price"
                  className=" bg-slate-900 rounded-lg p-3 col-span-2"
                  min="0"
                  step="0.01"
                  required
                  value={item.price}
                  onChange={(e) =>
                    updateItem(index, "price", parseFloat(e.target.value) || 0)
                  }
                />
                <div className="col-span-2 text-right">
                  <span>${item.total.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="text-slate-400 hover:text-red-300"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="w-full bg-slate-700 hover:bg-slate-600 rounded-lg p-3 flex items-center justify-center space-x-2"
              onClick={addItem}
            >
              <Plus size={20} />
              <span>Add New Item</span>
            </button>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="w-full bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-full "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-full bg-violet-500 hover:bg-violet-600 text-white px-6 py-3 rounded-full "
            >
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceForm;
