import { useEffect, useState } from "react";

function Task() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    const apiFetch = async () => {
      const response = await fetch('https://dummyjson.com/products');
      const apiData = await response.json();
      console.log(apiData);
      setAllData(apiData.products);
      setData(apiData.products);

      const uniqueCategory = apiData.products.reduce((acc, item) => {
        if (!acc.includes(item.category)) {
          acc.push(item.category);
        }
        return acc;
      }, []);
      setCategories(uniqueCategory);

    }
    apiFetch();

  }, [])


  const handleCategory = (category) => {
    let updatedCategory;
    if (selectedCategory.includes(category)) {
      updatedCategory = selectedCategory.filter((item) => item !== category);
      console.log(updatedCategory);
    } else {
      updatedCategory = [...selectedCategory, category];
      console.log(updatedCategory);
    }
    setSelectedCategory(updatedCategory);

    if (updatedCategory.length === 0) {
      setData(allData);
    } else {
      const filteredData = allData.filter((item) => updatedCategory.includes(item.category));
      setData(filteredData);
    }
  }

  // const filterByCategory = (category) => {
  //   if (category === " ") {
  //     setData(allData);
  //   } else {
  //    const filterData = allData.filter((item) => item.category === category)
  //     setData(filterData);
  //   }
  // }

  const handleInput = (event) => {
    setSearch(event.target.value);
  }



  return (
    <div className="task ">
      <div className="sidebar">
        <h3>category</h3>
        <ul>
          {
            categories.map((category, index) => (
            <div className="item">
                <li key={index}>{category}</li>
                <input type="checkbox" onChange={() => handleCategory(category)} /> 
            </div>
            )
            )
          }
        </ul>
      </div>
      <div className="cards-block">
        <input placeholder="Search By title...." type="text" onChange={handleInput} />
        <div className="cards-main">
          {
            data.filter((item) => {
              if (search === " ") {
                return item
              } else if ( item.title.toLowerCase().includes(search)) {
                return item
              }
            }).map((item, index) => (
              <div key={index} className="cards">
                <img src={item.images[0]} alt="" />
                <div className="content">
                  <h4>{item.category}</h4>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
export default Task;