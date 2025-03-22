const InvoiceDetails = () => {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <span>Status</span>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 rounded-full bg-slate-700 hover:bg-slate-600 text-sm">
            Edit
          </button>
          <button className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-sm">
            Delete
          </button>
          <button className="px-4 py-2 rounded-full bg-violet-500 hover:bg-violet-600 text-sm">
            Mark as Paid
          </button>
        </div>
      </div>
      <div className="bg-slate-900 rounded-lg p-4">
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold mb-1">Invoice ID</h2>
            <p className="text-slate-400 text-sm">Project Description</p>
          </div>
          <div className="text-right text-slate-400 text-sm">
            <p>Address Street</p>
            <p>City</p>
            <p>Post code</p>
            <p>Country</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-slate-400 mb-1 text-sm">Invoice Date</p>
            <p className="font-bold text-sm">Dynamic Invoice Date</p>
            <p className="text-slate-400 mb-1 text-sm">Payment Due</p>
            <p className="font-bold text-sm">Invoice Due Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
