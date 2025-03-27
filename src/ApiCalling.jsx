import { useEffect, useState } from "react";

function MyComponent() {
  const [posts, setPosts] = useState([]);
  // const [title, setTitle] = useState('');

  useEffect(() => {
    const apiFetch = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const data = await response.json();
      console.log(data);
      setPosts(data);
    }
    apiFetch();
  }, [])

  useEffect(() => {
    const fetchedData = async () => {
      const response = axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
      console.log(response);
    }
  }, [])



  return (
    <div className="card-main">
      {/* <h1>title</h1>
      <h2>{posts[0].title}</h2> */}
      {
        posts.map((item, index) => (
          <div className="card-block" key={index}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFf5Q0Z8PmtCeC2BJBZuxfPgcpZMoEE5H2PA&s" alt="" />
            <div className="content">
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
            <button
              onClick={() => {
                const existingData = JSON.parse(localStorage.getItem("cardData")) || [];
                const existingCard = existingData.map((item) => item.title);
                const newData = {
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFf5Q0Z8PmtCeC2BJBZuxfPgcpZMoEE5H2PA&s",
                  title: item.title,
                  body: item.body,
                };
                if (!existingCard.includes(newData.title)) {
                  localStorage.setItem("cardData", JSON.stringify([...existingData, newData]));
                  alert('card added successfully')
                } else {
                  alert("card already added.........")
                }
              }}
            >Add Cart</button>
          </div>
        ))
      }
      <h1>

        {/* {posts.title} */}
        {/* {posts.map((item)=>{
       return <li>{item.title}</li> 
      })} */}
      </h1>
    </div>
  );
}

export default MyComponent;