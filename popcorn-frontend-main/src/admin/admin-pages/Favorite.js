import React, { useContext, useEffect, useState } from "react";
import FilterContext from "../../context/Contexts/FilterContext";
import ModeContext from "../../context/Contexts/ModeContext";
import AdminNavbar from "../admin_component/AdminNavbar";
import Card from "../../components/components/Card";
import "../../css/LikedMovies.css";

const Favorite = () => {
  const mode = useContext(ModeContext);
  const { userFavorite } = useContext(FilterContext);
  const [items, setItems] = useState([]);
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
  useEffect(() => {
    userFavorite(setItems);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="liked-movies-main">
        <div className="liked-movies-container">
          {items.length === 0 ? <h1>Empty Playlist</h1> : null}
          {items.map((item, key) => (
            <Card
              image={item.image}
              genre={item.genre}
              year={item.year}
              address={`/${item.itemtype}`}
              slug={item.slug}
              name={item.name}
              key={key}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorite;
