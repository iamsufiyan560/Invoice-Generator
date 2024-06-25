import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoiceGenerator = ({ invoiceData, previewImage }) => {
  const invoiceRef = useRef();

  const generatePDF = () => {
    const input = invoiceRef.current;

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 size
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("invoice.pdf");
      })
      .catch((error) => {
        console.error("Error generating PDF", error);
      });
  };

  const {
    sellerDetails,
    placeOfSupply,
    billingDetails,
    shippingDetails,
    placeOfDelivery,
    orderDetails,
    invoiceDetails,
    reverseCharge,
    items,
    signatureImage,
  } = invoiceData;

  const calculateTotals = (items) => {
    let totalNetAmount = 0;
    let totalTaxAmount = 0;

    const itemDetails = items.map((item) => {
      const netAmount = item.unitPrice * item.quantity - item.discount;
      const taxAmount = netAmount * (item.taxRate / 100);
      totalNetAmount += netAmount;
      totalTaxAmount += taxAmount;

      return {
        ...item,
        netAmount,
        taxAmount,
        totalAmount: netAmount + taxAmount,
      };
    });

    return {
      itemDetails,
      totalNetAmount,
      totalTaxAmount,
      grandTotal: totalNetAmount + totalTaxAmount,
    };
  };

  const { itemDetails, totalNetAmount, totalTaxAmount, grandTotal } =
    calculateTotals(items);

  return (
    <div className="mt-4 relative mb-8">
      <div className="invoice p-6" ref={invoiceRef}>
        <div className="company-logo text-center mb-4">
          <img className="w-36 mx-auto" src="/images.png" alt="Company Logo" />
        </div>

        <div className="seller-details mb-6 border-b pb-4">
          <h2 className="text-2xl font-bold">{sellerDetails.name}</h2>
          <p>{sellerDetails.address}</p>
          <p>{`${sellerDetails.city}, ${sellerDetails.state}, ${sellerDetails.pincode}`}</p>
          <p>PAN No.: {sellerDetails.pan}</p>
          <p>GST Registration No.: {sellerDetails.gst}</p>
        </div>

        <div className="details grid grid-cols-2 gap-4 mb-6 border-b pb-4">
          <div>
            <p>
              <strong>Place of Supply:</strong> {placeOfSupply}
            </p>
            <p>
              <strong>Billing Details:</strong> {billingDetails.name}
            </p>
            <p>
              {billingDetails.address}, {billingDetails.city},{" "}
              {billingDetails.state}, {billingDetails.pincode},{" "}
              {billingDetails.code}
            </p>
          </div>
          <div>
            <p>
              <strong>Shipping Details:</strong> {shippingDetails.name}
            </p>
            <p>
              {shippingDetails.address}, {shippingDetails.city},{" "}
              {shippingDetails.state}, {shippingDetails.pincode},{" "}
              {shippingDetails.code}
            </p>
          </div>
          <div>
            <p>
              <strong>Place of Delivery:</strong> {placeOfDelivery}
            </p>
          </div>
          <div>
            <p>
              <strong>Order No.:</strong> {orderDetails.orderNo}
            </p>
            <p>
              <strong>Order Date:</strong> {orderDetails.orderDate}
            </p>
          </div>
          <div>
            <p>
              <strong>Invoice No.:</strong> {invoiceDetails.invoiceNo}
            </p>
            <p>
              <strong>Invoice Date:</strong> {invoiceDetails.invoiceDate}
            </p>
          </div>
          <div>
            <p>
              <strong>Reverse Charge:</strong> {reverseCharge ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <table className="items-table w-full border-collapse mb-6">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100">Description</th>
              <th className="border p-2 bg-gray-100">Unit Price</th>
              <th className="border p-2 bg-gray-100">Quantity</th>
              <th className="border p-2 bg-gray-100">Discount</th>
              <th className="border p-2 bg-gray-100">Net Amount</th>
              <th className="border p-2 bg-gray-100">Tax Rate</th>
              <th className="border p-2 bg-gray-100">Tax Amount</th>
              <th className="border p-2 bg-gray-100">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {itemDetails.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.unitPrice}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.discount}</td>
                <td className="border p-2">{item.netAmount}</td>
                <td className="border p-2">{item.taxRate}%</td>
                <td className="border p-2">{item.taxAmount}</td>
                <td className="border p-2">{item.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="totals mb-6">
          <p>
            <strong>Total Net Amount:</strong> {totalNetAmount}
          </p>
          <p>
            <strong>Total Tax Amount:</strong> {totalTaxAmount}
          </p>
          <p>
            <strong>Grand Total:</strong> {grandTotal}
          </p>
        </div>

        <div className="signature">
          {signatureImage && (
            <img
              src={previewImage}
              alt="Signature"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
          <p>For {sellerDetails.name}</p>
          <p>Authorised Signatory</p>
        </div>
      </div>

      <button
        className="bg-blue-500 text-white top-0 right-0 mr-[370px]  py-2 px-4 rounded mt-6 absolute"
        onClick={generatePDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default InvoiceGenerator;
