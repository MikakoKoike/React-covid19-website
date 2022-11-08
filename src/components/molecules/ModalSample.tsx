import React, { useEffect } from "react";
import "./Modal.css";
// import { useModal } from "react-hooks-use-modal";
import Modal from "react-modal";

// const modalStyle: React.CSSProperties = {
//   backgroundColor: "#fff",
//   padding: "60px 100px",
//   borderRadius: "10px",
// };
// Modal.setAppElement("#app");

export const ModalApp = () => {
  // const [Modal, open, close, isOpen] = useModal("root", {
  //   preventScroll: true, //これはオプション。デフォルトはfalse
  // });
  const [modalIsOpen, setIsOpen] = React.useState(false);

  return (
    <div className="App">
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={modalIsOpen}>
        <button onClick={() => setIsOpen(false)}>Close Modal</button>
      </Modal>
      {/* <div>Modal is Open? {isOpen ? "Yes" : "No"}</div>
      <button onClick={open}>OPEN</button>
      <Modal>
        <div style={modalStyle}>
          <h1>Title</h1>
          <p>This is a customizable modal.</p>
          <button onClick={close}>CLOSE</button>
        </div>
      </Modal> */}
    </div>
  );
};
