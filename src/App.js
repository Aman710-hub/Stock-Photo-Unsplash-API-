import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
// this is to hide our key from others
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  // FETCH FUNCTION
  const fetchImg = async () => {
    setLoading(true);
    let url;
    // how many pages we will have
    // 	Page number to retrieve
    const urlPage = `&page=${page}`;
    // this is for search
    const urlSearchValue = `&query=${searchValue}`;

    // if we typing somthing in search bar then our "url" will be the one that in "if" statement
    if (searchValue) {
      url = `${searchUrl}${clientID}${urlPage}${urlSearchValue}`;
    } else {
      // getting data from API
      // "mainUrl" is where data egsist
      // and the rest of the url is "key" that we get from API site
      // the key alaw us to access data
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      // setting fetched data
      setPhotos((oldPhoto) => {
        if (searchValue && page === 1) {
          return data.results;
        } else if (searchValue) {
          // "oldPhoto" is current photos that i have in the array
          // when we do searching we get data in bit diffrent way and so we have to access it like this (data comes in "resalt" object)
          return [...oldPhoto, ...data.results];
        } else {
          // Возвращается  новый массив состоящий из элементов oldPhoto и элементов  data  ////////////////////////////////////////////////////////////////////////////////////////////////////////
          return [...oldPhoto, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImg();
  }, [page]);

  // SCROLL EVENT
  useEffect(() => {
    // when we scroll that callback function will be acctivated
    // every time we scroll we check throu if statement and if it true the "we just log hiiii"
    const event = window.addEventListener("scroll", () => {
      console.log("window.innerHeight", window.innerHeight + window.scrollY);
      // console.log("window.scrollY", window.scrollY);
      console.log("document.body.scrollHeight", document.body.scrollHeight);
      if (
        //+ The innerHeight property returns - Высота (в пикселях) области просмотра окна браузера
        //+ The scrollY - is how match we scrolled down
        !loading &&
        window.innerHeight + window.scrollY >=
          // Свойство scrollHeight содержит высоту элемента с учетом вертикальной прокрутки. Если у элемента нет вертикальной полосы прокрутки, то значение scrollHeight равно clientHeight.
          document.body.scrollHeight - 10
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });

    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };
  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            className="form-input"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            {<FaSearch />}
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((img, index) => {
            return <Photo key={img.id} {...img} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
