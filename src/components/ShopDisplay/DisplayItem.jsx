import React from "react";
import s from "./DisplayItem.module.css";
import Carousel from "react-bootstrap/Carousel";
import parse from "html-react-parser";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";

const DisplayItem = (props) => {
  const {
    close,
    item,
    addItemToCart,
    handleIncrementAction,
    cartIds,
    user,
    quantityError,
  } = props;

  const itemInCart = cartIds.find((id) => item.id === id.id);

  let navigate = useNavigate();
  console.log("display items", cartIds);
  console.log("item in cart quantity", itemInCart);

  return (
    <div className={s.displayItemContainer}>
      <div className={s.itemContainer}>
        <Carousel>
          {item.itemImg.map((image) => (
            <Carousel.Item className={s.carouselInner} key={image.id}>
              <img
                className="d-block w-100"
                src={image.url}
                alt="First slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className={s.itemInfo}>
          <button className={s.exitBtn} onClick={close}>
            <i className="fa-solid fa-x"></i>
          </button>
          <h2>{item.name}</h2>
          <h5>${item.price}</h5>
          <div className={s.itemDesc}>{parse(`${item.desc}`)}</div>

          {!itemInCart ? (
            <div className={s.addItemBtn}>
              <Button
                onClick={
                  user
                    ? () => handleIncrementAction(item.id)
                    : () => navigate("/login")
                }
                title="ADD TO CART"
              />
            </div>
          ) : (
            <div className={s.quantityBtnWrapper}>
              <span
                onClick={() => handleIncrementAction(item.id, "desc")}
                class="minus"
              >
                -
              </span>
              <span class={s.num}>
                {itemInCart === undefined ? 0 : itemInCart.quantity}
              </span>
              <span
                onClick={() => handleIncrementAction(item.id, "asc")}
                class="plus"
              >
                +
              </span>
            </div>
          )}
          {quantityError && <p className={s.errorMessage}>{quantityError}</p>}
        </div>
      </div>
    </div>
  );
};

export default DisplayItem;
