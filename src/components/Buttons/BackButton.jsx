import s from "./BackButton.module.css"

function BackButton(props) {
  const {goBackToPage} = props
  return (
    <div className={s.back} onClick={() => goBackToPage()}>
      <i className="fa-solid fa-angle-left"></i>
      <span>Back</span>
    </div>
  )
}

export default BackButton;