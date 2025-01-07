import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();

  const { filteredItem = {} } = props;
  const { _id: id, name, img } = filteredItem; // Destructure `_id` as `id`

  const options = props.options || {};
  const PriceOptions = Object.keys(options);

  const [qty, setQty] = useState(1); // Quantity state
  const [size, setSize] = useState(PriceOptions[0] || ""); // Initialize `size` with the first option
  const priceRef = useRef(null); // Reference for size selector

  // Calculate the final price
  const finalPrice = size && options[size] ? qty * parseInt(options[size]) : 0;

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value); // Initialize size from the dropdown
    }
  }, []);

  const handleAddToCart = async () => {
    // Check if the item is already in the cart
    const existingItem = data.find((item) => item.id === id && item.size === size);

    if (existingItem) {
      // If the item with the same size exists, update its quantity and price
      await dispatch({
        type: "UPDATE",
        id: id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      // Add a new item to the cart
      await dispatch({
        type: "ADD",
        id: id,
        img: img,
        name: name,
        price: finalPrice,
        qty: qty,
        size: size || PriceOptions[0], // Default to the first size option
      });
    }
  };

  return (
    <div>
      <div
        className="card mt-3"
        style={{
          width: "18rem",
          backgroundColor: "transparent",
          maxHeight: "600px",
        }}
      >
        <img
          src={img}
          className="card-img-top"
          alt={name || "Food Item"}
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="container w-100">
            {/* Quantity Selector */}
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(parseInt(e.target.value))}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Size Selector */}
            <select
              className="m-2 h-100 bg-success rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {PriceOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Display Final Price */}
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
