import React, { useState } from "react";
import InvoiceGenerator from "./InvoiceGenerator";

const App = () => {
  const [invoice, SetInvoice] = useState(true);
  const [formData, setFormData] = useState({
    sellerDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      pan: "",
      gst: "",
    },
    placeOfSupply: "",
    billingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      code: "",
    },
    shippingDetails: {
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      code: "",
    },
    placeOfDelivery: "",
    orderDetails: {
      orderNo: "",
      orderDate: "",
    },
    invoiceDetails: {
      invoiceNo: "",
      invoiceDate: "",
    },
    reverseCharge: false,
    items: [
      {
        description: "",
        unitPrice: "",
        quantity: "",
        discount: "",
        taxRate: 18,
      },
    ],
    signatureImage: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length > 1) {
      setFormData((prevData) => ({
        ...prevData,
        [keys[0]]: {
          ...prevData[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newItems = [...prevData.items];
      newItems[index][name] = value;
      return { ...prevData, items: newItems };
    });
  };

  const addItem = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          description: "",
          unitPrice: "",
          quantity: "",
          discount: "",
          taxRate: 18,
        },
      ],
      signatureImage: "",
    }));
  };

  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        signatureImage: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.sellerDetails.name)
      newErrors.sellerName = "Seller name is required";
    if (!formData.sellerDetails.address)
      newErrors.sellerAddress = "Seller address is required";
    if (!formData.sellerDetails.city)
      newErrors.sellerCity = "Seller city is required";
    if (!formData.sellerDetails.state)
      newErrors.sellerState = "Seller state is required";
    if (!formData.sellerDetails.pincode)
      newErrors.sellerPincode = "Seller pincode is required";
    if (!formData.sellerDetails.pan)
      newErrors.sellerPan = "Seller PAN is required";
    if (!formData.sellerDetails.gst)
      newErrors.sellerGst = "Seller GST is required";

    if (!formData.placeOfSupply)
      newErrors.placeOfSupply = "Place of Supply is required";
    if (!formData.placeOfDelivery)
      newErrors.placeOfDelivery = "Place of Delivery is required";

    if (!formData.billingDetails.name)
      newErrors.billingName = "Billing name is required";
    if (!formData.billingDetails.address)
      newErrors.billingAddress = "Billing address is required";
    if (!formData.billingDetails.city)
      newErrors.billingCity = "Billing city is required";
    if (!formData.billingDetails.state)
      newErrors.billingState = "Billing state is required";
    if (!formData.billingDetails.pincode)
      newErrors.billingPincode = "Billing pincode is required";
    if (!formData.billingDetails.code)
      newErrors.billingCode = "Billing State/UT Code is required";

    if (!formData.shippingDetails.name)
      newErrors.shippingName = "Shipping name is required";
    if (!formData.shippingDetails.address)
      newErrors.shippingAddress = "Shipping address is required";
    if (!formData.shippingDetails.city)
      newErrors.shippingCity = "Shipping city is required";
    if (!formData.shippingDetails.state)
      newErrors.shippingState = "Shipping state is required";
    if (!formData.shippingDetails.pincode)
      newErrors.shippingPincode = "Shipping pincode is required";
    if (!formData.shippingDetails.code)
      newErrors.shippingCode = "Shipping State/UT Code is required";

    if (!formData.orderDetails.orderNo)
      newErrors.orderNo = "Order No. is required";
    if (!formData.orderDetails.orderDate)
      newErrors.orderDate = "Order Date is required";
    if (!formData.signatureImage) {
      newErrors.signatureImage = "Signature image is required";
    }

    if (!formData.invoiceDetails.invoiceNo)
      newErrors.invoiceNo = "Invoice No. is required";
    if (!formData.invoiceDetails.invoiceDate)
      newErrors.invoiceDate = "Invoice Date is required";

    formData.items.forEach((item, index) => {
      if (!item.description)
        newErrors[`itemDescription${index}`] = "Item description is required";
      if (!item.unitPrice)
        newErrors[`itemUnitPrice${index}`] = "Item unit price is required";
      if (!item.quantity)
        newErrors[`itemQuantity${index}`] = "Item quantity is required";
      if (item.discount === "")
        newErrors[`itemDiscount${index}`] = "Item discount is required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      SetInvoice(false);
    }
  };

  return (
    <>
      {!invoice && (
        <InvoiceGenerator invoiceData={formData} previewImage={previewImage} />
      )}
      {invoice && (
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Seller Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-2 border"
                name="sellerDetails.name"
                placeholder="Name"
                onChange={handleChange}
              />
              {errors.sellerName && (
                <p className="text-red-500">{errors.sellerName}</p>
              )}
              <input
                className="p-2 border"
                name="sellerDetails.address"
                placeholder="Address"
                onChange={handleChange}
              />
              {errors.sellerAddress && (
                <p className="text-red-500">{errors.sellerAddress}</p>
              )}
              <input
                className="p-2 border"
                name="sellerDetails.city"
                placeholder="City"
                onChange={handleChange}
              />
              {errors.sellerCity && (
                <p className="text-red-500">{errors.sellerCity}</p>
              )}
              <input
                className="p-2 border"
                name="sellerDetails.state"
                placeholder="State"
                onChange={handleChange}
              />
              {errors.sellerState && (
                <p className="text-red-500">{errors.sellerState}</p>
              )}
              <input
                className="p-2 border"
                name="sellerDetails.pincode"
                placeholder="Pincode"
                onChange={handleChange}
              />
              {errors.sellerPincode && (
                <p className="text-red-500">{errors.sellerPincode}</p>
              )}
              <input
                className="p-2 border"
                name="sellerDetails.pan"
                placeholder="PAN No."
                onChange={handleChange}
              />
              {errors.sellerPan && (
                <p className="text-red-500">{errors.sellerPan}</p>
              )}
              <input
                className="p-2 border"
                name="sellerDetails.gst"
                placeholder="GST Registration No."
                onChange={handleChange}
              />
              {errors.sellerGst && (
                <p className="text-red-500">{errors.sellerGst}</p>
              )}
            </div>

            <h2 className="text-xl font-bold mt-6 mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-2 border"
                name="placeOfSupply"
                placeholder="Place of Supply"
                onChange={handleChange}
              />
              {errors.placeOfSupply && (
                <p className="text-red-500">{errors.placeOfSupply}</p>
              )}
              <input
                className="p-2 border"
                name="placeOfDelivery"
                placeholder="Place of Delivery"
                onChange={handleChange}
              />
              {errors.placeOfDelivery && (
                <p className="text-red-500">{errors.placeOfDelivery}</p>
              )}
              <input
                className="p-2 border"
                name="orderDetails.orderNo"
                placeholder="Order No."
                onChange={handleChange}
              />
              {errors.orderNo && (
                <p className="text-red-500">{errors.orderNo}</p>
              )}
              <input
                className="p-2 border"
                type="date"
                name="orderDetails.orderDate"
                onChange={handleChange}
              />
              {errors.orderDate && (
                <p className="text-red-500">{errors.orderDate}</p>
              )}
              <input
                className="p-2 border"
                name="invoiceDetails.invoiceNo"
                placeholder="Invoice No."
                onChange={handleChange}
              />
              {errors.invoiceNo && (
                <p className="text-red-500">{errors.invoiceNo}</p>
              )}
              <input
                className="p-2 border"
                type="date"
                name="invoiceDetails.invoiceDate"
                onChange={handleChange}
              />
              {errors.invoiceDate && (
                <p className="text-red-500">{errors.invoiceDate}</p>
              )}
              <label className="flex items-center">
                <input
                  className="mr-2"
                  type="checkbox"
                  name="reverseCharge"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reverseCharge: e.target.checked,
                    })
                  }
                />
                Reverse Charge
              </label>
            </div>

            <h2 className="text-xl font-bold mt-6 mb-4">Billing Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-2 border"
                name="billingDetails.name"
                placeholder="Name"
                onChange={handleChange}
              />
              {errors.billingName && (
                <p className="text-red-500">{errors.billingName}</p>
              )}
              <input
                className="p-2 border"
                name="billingDetails.address"
                placeholder="Address"
                onChange={handleChange}
              />
              {errors.billingAddress && (
                <p className="text-red-500">{errors.billingAddress}</p>
              )}
              <input
                className="p-2 border"
                name="billingDetails.city"
                placeholder="City"
                onChange={handleChange}
              />
              {errors.billingCity && (
                <p className="text-red-500">{errors.billingCity}</p>
              )}
              <input
                className="p-2 border"
                name="billingDetails.state"
                placeholder="State"
                onChange={handleChange}
              />
              {errors.billingState && (
                <p className="text-red-500">{errors.billingState}</p>
              )}
              <input
                className="p-2 border"
                name="billingDetails.pincode"
                placeholder="Pincode"
                onChange={handleChange}
              />
              {errors.billingPincode && (
                <p className="text-red-500">{errors.billingPincode}</p>
              )}
              <input
                className="p-2 border"
                name="billingDetails.code"
                placeholder="State/UT Code"
                onChange={handleChange}
              />
              {errors.billingCode && (
                <p className="text-red-500">{errors.billingCode}</p>
              )}
            </div>

            <h2 className="text-xl font-bold mt-6 mb-4">Shipping Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="p-2 border"
                name="shippingDetails.name"
                placeholder="Name"
                onChange={handleChange}
              />
              {errors.shippingName && (
                <p className="text-red-500">{errors.shippingName}</p>
              )}
              <input
                className="p-2 border"
                name="shippingDetails.address"
                placeholder="Address"
                onChange={handleChange}
              />
              {errors.shippingAddress && (
                <p className="text-red-500">{errors.shippingAddress}</p>
              )}
              <input
                className="p-2 border"
                name="shippingDetails.city"
                placeholder="City"
                onChange={handleChange}
              />
              {errors.shippingCity && (
                <p className="text-red-500">{errors.shippingCity}</p>
              )}
              <input
                className="p-2 border"
                name="shippingDetails.state"
                placeholder="State"
                onChange={handleChange}
              />
              {errors.shippingState && (
                <p className="text-red-500">{errors.shippingState}</p>
              )}
              <input
                className="p-2 border"
                name="shippingDetails.pincode"
                placeholder="Pincode"
                onChange={handleChange}
              />
              {errors.shippingPincode && (
                <p className="text-red-500">{errors.shippingPincode}</p>
              )}
              <input
                className="p-2 border"
                name="shippingDetails.code"
                placeholder="State/UT Code"
                onChange={handleChange}
              />
              {errors.shippingCode && (
                <p className="text-red-500">{errors.shippingCode}</p>
              )}
            </div>

            <h2 className="text-xl font-bold mt-6 mb-4">Items</h2>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 mb-4">
                <input
                  className="p-2 border"
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, e)}
                />
                {errors[`itemDescription${index}`] && (
                  <p className="text-red-500">
                    {errors[`itemDescription${index}`]}
                  </p>
                )}
                <input
                  className="p-2 border"
                  name="unitPrice"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => handleItemChange(index, e)}
                />
                {errors[`itemUnitPrice${index}`] && (
                  <p className="text-red-500">
                    {errors[`itemUnitPrice${index}`]}
                  </p>
                )}
                <input
                  className="p-2 border"
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                />
                {errors[`itemQuantity${index}`] && (
                  <p className="text-red-500">
                    {errors[`itemQuantity${index}`]}
                  </p>
                )}
                <input
                  className="p-2 border"
                  name="discount"
                  placeholder="Discount"
                  value={item.discount}
                  onChange={(e) => handleItemChange(index, e)}
                />
                {errors[`itemDiscount${index}`] && (
                  <p className="text-red-500">
                    {errors[`itemDiscount${index}`]}
                  </p>
                )}
                <input
                  className="p-2 border"
                  name="taxRate"
                  placeholder="Tax Rate"
                  value={item.taxRate}
                  onChange={(e) => handleItemChange(index, e)}
                  readOnly
                />
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={addItem}
            >
              Add Item
            </button>

            <h2 className="text-xl font-bold mt-6 mb-4">Signature</h2>
            <input
              type="file"
              accept="image/*"
              className="p-2 border"
              name="signatureImage"
              onChange={handleFileChange}
            />
            {errors.signatureImage && (
              <p className="text-red-500">{errors.signatureImage}</p>
            )}

            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-w-xs max-h-48"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded mt-6 ml-8"
            >
              Generate PDF
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default App;
