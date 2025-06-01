import axios from 'axios';

export const ApiGetBooks = async () => {
    let details;

    const fetchData = async () => {
        try {
          const res = await axios.get("http://127.0.0.1:8000/");
          return res.data;
        } catch (err) {
          console.log(err);
        }
    }
    
    details = await fetchData();

    

    return details;
}

export const ApiPostReview = (data) => {
  axios.post('http://127.0.0.1:8000/product/:id', data);
}

export const ApiGetReviews = async (id) => {
  let details;

  const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/product/:id");
        return res.data;
      } catch (err) {
        console.log(err);
      }
  }
  
  details = await fetchData();

  return details;
  
}


