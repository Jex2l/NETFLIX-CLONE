import React, { useContext, useState } from "react";
import Carousel from "./Carousel";
import MCarousel from "react-material-ui-carousel";
import "../../css/Carousel.css";
import ModeContext from "../../context/Contexts/ModeContext";
import axios from "axios";
import config from "../../config.json";
const Carouselitems = (props) => {
  const mode = useContext(ModeContext);
  var items_p = [];
  const [items, setItems] = useState(items_p);
  const getCarouselItems = async () => {
    try {
      const res = await axios.post(
        `${config.api.carousel}/getitems`,
        {},
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const resp = res.data;
      setItems(resp);
    } catch (error) {
      console.log(error);
    }
  };
  getCarouselItems();
  return (
    <>
      <MCarousel
        indicatorIconButtonProps={{
          style: {
            marginTop: "-80px", // 1
            color: mode.checked === false ? "white" : "black", // 3
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#24baef", // 2
          },
        }}
        navButtonsProps={{
          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            marginLeft: "60px",
            marginRight: "60px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      >
        {items.map((item, i) => (
          <Carousel key={i} item={item} type={item.type} slug={item.slug} />
        ))}
      </MCarousel>
    </>
  );
};

export default Carouselitems;
