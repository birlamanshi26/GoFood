import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';


export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();

  const { filteredItem = {} } = props;
  const { _id: id, name, img } = filteredItem; // Destructure `_id` as `id`

  const options = props.options || {};
  const PriceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef(null); // Initialize priceRef

  // Calculate the final price
  const finalPrice = size && options[size] ? qty * parseInt(options[size]) : 0;

  useEffect(() => {
    // Set the initial size value using priceRef
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  const handleAddToCart = async () => {
    const itemData = {
      type: "ADD",
      id: id,
      img: img,
      name: name,
      price: finalPrice,
      qty: qty,
      size: size || PriceOptions[0],
    };

    await dispatch(itemData);
    console.log("Dispatched Item:", itemData); // Debugging
    console.log("Updated Cart State:", data);
  };

  return (
    <div>
      <div
        className="card mt-3"
        style={{ width: '18rem', backgroundColor: 'transparent', maxHeight: '600px' }}
      >
        <img
          src={img}
          className="card-img-top"
          alt={name || "Food Item"}
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <div className="container w-100">
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
            <div className="d-inline h-100 fs-5">
              ₹{finalPrice}/-
            </div>
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
