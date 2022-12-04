import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetch('/items')
      .then((res) => res.json())
      .then((items) => setItems(items));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = { name, price, quantity };

    fetch('/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    setName('');
    setPrice(0);
    setQuantity(0);
  };

  return (
    <div>
      <h1>Clothing Store Management System</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button type="submit">Add Item</button>
      </form>

      <h2>Inventory</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name}: ${item.price} ({item.quantity} in stock)
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
