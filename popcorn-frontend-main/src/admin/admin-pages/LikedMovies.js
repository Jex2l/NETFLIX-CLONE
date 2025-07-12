import React, { useContext, useEffect, useState } from "react";
import FilterContext from "../../context/Contexts/FilterContext";
import ModeContext from "../../context/Contexts/ModeContext";
import AdminNavbar from "../admin_component/AdminNavbar";
import Card from "../../components/components/Card";
import "../../css/LikedMovies.css";

const LikedMovies = () => {
  const mode = useContext(ModeContext);
  const { userLiked } = useContext(FilterContext);
  const [items, setItems] = useState([]);
  if (mode.checked === false) {
    document.body.style.backgroundColor = "#131722";
  } else {
    document.body.style.backgroundColor = "#fff";
  }
  useEffect(() => {
    userLiked(setItems);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="liked-movies-main">
        <div className="liked-movies-container">
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

export default LikedMovies;
