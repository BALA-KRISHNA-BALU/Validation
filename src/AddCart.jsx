import { useEffect, useState } from "react";

function AddCart() {
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem("cardData")) || []);

  // const [count, setCount] = useState(1);

  const add = (index) => {
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, count: (item.count || 1) + 1 } : item
    );
    setData(updatedData);
    localStorage.setItem('cardData', JSON.stringify(updatedData));

  }

  const remove = (index) => {
    const updatedData = data.map((item, i) =>
      i === index && item.count > 1 ? { ...item, count: (item.count - 1) } : item
    );
    setData(updatedData);
    localStorage.setItem('cardData', JSON.stringify(updatedData));
   
  }


  const removeItem = (index) => {
    const updatedData = data.filter((item, i) => i !== index);
    setData(updatedData);
    localStorage.setItem('cardData', JSON.stringify(updatedData));
  }



  return (
    <div>
      <div className="card-main">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div className="card-block" key={index}>
              <img src={item.img} alt="" />
              <div className="content">
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </div>
              <div className="counting">
                <i className="bi bi-dash" onClick={() => remove(index)}></i>
                <p>{item.count || 1}</p>
                <i className="bi bi-plus-lg" onClick={() => add(index)}></i>
              </div>
              <button onClick={() => removeItem(index)}>Remove Cart</button>
            </div>
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
    </div>
  );
}

export default AddCart;

