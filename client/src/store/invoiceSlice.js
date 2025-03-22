import { createSlice } from "@reduxjs/toolkit";
import { addDays, addHours } from "date-fns";
import { format } from "date-fns";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return {
        invoices: [],
        filter: "all",
        isFormOpen: false,
        selectedInvoice: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return {
      invoices: [],
      filter: "all",
      isFormOpen: false,
      selectedInvoice: null,
    };
  }
};

const initialState = loadState();

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.log(error);
  }
};

const calculatedAmount = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.quantity * item.price;
  }, 0);
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action) => {
      const newInoice = {
        ...action.payload,
        amount: calculatedAmount(action.payload.items),
        status: action.payload.status || "pending",
        dueDate:
          action.payload.dueDate ||
          format(addDays(new Date(), 24), "yyyy-MM-dd"),
      };
      state.invoices.push(newInoice);
      saveState(state);
      state.isFormOpen = false;
    },

    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    toggleForm: (state) => {
      state.isFormOpen = !state.isFormOpen;
      if (!state.isFormOpen) {
        state.selectedInvoice = null;
      }
    },
  },
});

export const { toggleForm, addInvoice, setFilter } = invoiceSlice.actions;

export default invoiceSlice.reducer;
