import React, { useEffect, useState, cloneElement } from "react";
import { Children } from "react";
import Modal from "react-bootstrap/Modal";

export default function ModalProvider({ children, title, size = "xl", ...props }) {
    const [show, setShow] = useState(false);

    return (
        <>
            {cloneElement(Children.toArray(children)[0], { onClick: () => setShow(true) })}
            <Modal
                fullscreen={window.innerWidth < 798 && size === "xl"}
                show={show}
                className="m-0 h-100"
                onHide={() => setShow(false)}
                size={size}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: "auto" }} {...props}>
                    {Children.toArray(children)[1]}
                </Modal.Body>
            </Modal>
        </>
    );
}
