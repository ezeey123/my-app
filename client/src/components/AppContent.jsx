import Header from "./Header";
import InvoiceForm from "./InvoiceForm";
import InvoiceList from "./InvoiceList";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleForm } from "../store/invoiceSlice";
import InvoiceDetails from "./invoiceDetails";
const AppContent = () => {
  const dispatch = useDispatch();
  const { isFormOpen } = useSelector((state) => state.invoices);
  const handleNewInvoice = () => {
    dispatch(toggleForm());
  };
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto py-12 px-4 ">
        <Header onNewInvoice={handleNewInvoice} />
        <InvoiceDetails />
        {/* <InvoiceList />
        {isFormOpen && <InvoiceForm />} */}
      </div>
    </div>
  );
};

export default AppContent;
