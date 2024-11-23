import React, { useEffect, useState, cloneElement } from "react";
import { Children } from "react";
import Modal from "react-bootstrap/Modal";

export default function ModalProvider({ children, title, size = "lg" }) {
    const [show, setShow] = useState(false);

    return (
        <>
            {cloneElement(Children.toArray(children)[0], { onClick: () => setShow(true) })}
            <Modal
                fullscreen={window.innerWidth < 700 && size === "lg"}
                show={show}
                className="m-0"
                onHide={() => setShow(false)}
                size={size}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: "auto", maxHeight: "80dvh" }}>
                    {Children.toArray(children)[1]}
                </Modal.Body>
            </Modal>
        </>
    );
}
