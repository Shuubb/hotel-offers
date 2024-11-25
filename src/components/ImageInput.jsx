import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { CiSquareRemove, CiEdit } from "react-icons/ci";
import ModalProvider from "./ModalProvider";
import { ReactPhotoEditor } from "react-photo-editor";
import "react-photo-editor/dist/style.css";

export default function ImageInput({ name, setFinalImages }) {
    const [imageFiles, setImageFiles] = useState([]);
    const [imageToEdit, setImageToEdit] = useState(null);

    useEffect(() => {
        setFinalImages(imageFiles);
    }, [imageFiles]);

    return (
        <div className=" d-flex flex-wrap border border-2 rounded my-1 p-2 shadow shadow-hover">
            <div className="d-flex w-100 overflow-x-auto">
                {imageFiles.map((imageFile, index) => (
                    <div className="position-relative">
                        <div className="position-absolute end-0 px-2 my-2  fs-2 text-white d-flex align-items-center">
                            <CiEdit className="bg-warning m-1 pointer rounded" onClick={() => setImageToEdit(index)} />
                            <CiSquareRemove
                                className="bg-danger m-1 pointer rounded"
                                onClick={() => {
                                    setImageFiles((prevState) => prevState.splice(index, 1));
                                }}
                            />
                        </div>

                        <div
                            className="m-1 rounded shadow-sm hover border"
                            style={{
                                aspectRatio: "4/5",
                                width: "300px",
                                backgroundImage: `url(${URL.createObjectURL(imageFile)})`,
                                backgroundPosition: "center",
                                backgroundSize: "contain",
                            }}
                        />
                    </div>
                ))}
            </div>
            <ReactPhotoEditor
                open={imageToEdit !== null}
                file={imageFiles[imageToEdit]}
                onClose={() => setImageToEdit(null)}
                onSaveImage={(editedImage) => {
                    const newFiles = [...imageFiles];
                    newFiles[imageToEdit] = editedImage;
                    setImageFiles(newFiles);
                }}
                allowColorEditing={false}
                allowRotate={false}
                canvasWidth="17.6rem"
                canvasHeight="22rem"
                modalHeight="30rem"
                modalWidth="fit-content"
            />

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
