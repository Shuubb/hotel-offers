import { Form } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { CiSquareRemove } from "react-icons/ci";
import "react-photo-editor/dist/style.css";

export default function ImageInput({ name, setFinalImages }) {
    const [imageFiles, setImageFiles] = useState([]);
    const imageRef = useRef(null);

    useEffect(() => {
        setFinalImages(imageFiles);
    }, [imageFiles]);

    return (
        <div className=" d-flex flex-wrap border border-2 rounded my-1 p-2 shadow shadow-hover">
            <div className="d-flex w-100 overflow-x-auto">
                {imageFiles.map((imageFile, index) => (
                    <div className="position-relative">
                        <div className="position-absolute end-0 px-2 my-2  fs-2 text-white d-flex align-items-center">
                            <CiSquareRemove
                                className="bg-danger m-1 pointer rounded"
                                onClick={() => {
                                    setImageFiles((prevState) => prevState.splice(index, 1));
                                }}
                            />
                        </div>
                        <img
                            src={URL.createObjectURL(imageFile)}
                            width="300px"
                            className="m-1 rounded shadow-sm hover border"
                            ref={imageRef}
                        />
                    </div>
                ))}
            </div>
            <Form.Label
                className="border m-1 rounded h-100 w-100 text-center fs-2 p-3"
                style={{ cursor: "pointer" }}
                htmlFor={name}
            >
                Add Image
            </Form.Label>

            <Form.Control
                type="file"
                id={name}
                name={name}
                data-images={JSON.stringify(imageFiles)}
                hidden
                onChange={(e) => {
                    // Optional validation before adding files
                    const files = Array.from(e.target.files);
                    const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Example for images
                    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

                    if (validFiles.length) {
                        setImageFiles((prevState) => [...prevState, ...validFiles]);
                    }

                    e.target.value = null; // Reset the input value
                }}
            />
        </div>
    );
}
