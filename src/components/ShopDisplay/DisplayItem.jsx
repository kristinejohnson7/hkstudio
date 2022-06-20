import React from "react";
import s from "./DisplayItem.module.css"
// import Carousel, { CarouselItem } from "./Carousel";
import Carousel from 'react-bootstrap/Carousel'
import parse from "html-react-parser"

const DisplayItem = (props) => {

  const {close, item, addItemToCart, onRemoveFromCart, handleIncrementAction} = props

  const add = () => {
    console.log("I added")

  }
  const setStorage = item.itemImg.map((img) => localStorage.setItem(item.id, img.url))
  const storedPics = item.itemImg.map((img) => localStorage.getItem(item.id))

  return (
    <div className={s.displayItemContainer}>
      <div className={s.itemContainer}>
        <Carousel>
          {storedPics.map(image => (
            <Carousel.Item className={s.carouselInner} key={image.id}>
               <img
                className="d-block w-100"
                src={localStorage.getItem(item.id)}
                alt="First slide"
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <div className={s.itemInfo}>
          <button onClick={close}>
            <i class="fa-solid fa-x"></i>
          </button>
          <h2>{item.name}</h2>
          <h5>${item.price}</h5>
          <div className={s.itemDesc}>{parse(`${item.desc}`)}</div>
          <div className={s.quantityBtnWrapper}>
            <span onClick={() => handleIncrementAction(item.id, "desc")} class="minus">-</span>
            <span class={s.num}>01</span>
            <span onClick={() => handleIncrementAction(item.id, "asc")} class="plus">+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisplayItem;