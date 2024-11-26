import { Button, Col, FloatingLabel, Form, Row, Alert, Spinner } from "react-bootstrap";
import SelectInput from "../../../components/SelectInput";
import ImageInput from "../../../components/ImageInput";
import { useState, useCallback } from "react";
import LZString from "lz-string";

const cities = {
    თბილისი: "Tbilisi",
    ბათუმი: "Batumi",
    ქუთაისი: "Kutaisi",
};

export default function AddPost() {
    const [finalImages, setFinalImages] = useState([]);
    const [isBanner, setIsBanner] = useState(false);
    const [english, setEnglish] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSetFinalImages = useCallback((images) => setFinalImages(images), []);

    const createMetadata = (elements) => ({
        cityGEO: elements["city"].value,
        titleGEO: elements["title"].value,
        shortDescriptionGEO: elements["shortDescription"].value,
        longDescriptionGEO: elements["longDescription"].value,
        english,
        ...(english
            ? {
                  cityENG: cities[elements["city"].value],
                  titleENG: elements["titleENG"].value,
                  shortDescriptionENG: elements["shortDescriptionENG"].value,
                  longDescriptionENG: elements["longDescriptionENG"].value,
              }
            : {}),
        phone: elements["phone"].value,
        email: elements["email"].value,
        banner: isBanner,
    });

    const uploadImage = async (image, metadata = {}) => {
        const formData = new FormData();
        formData.append("file", image);
        if (metadata && Object.keys(metadata).length > 0) {
            const { cityGEO, ...restData } = metadata;
            formData.append(
                "metadata",
                JSON.stringify({ cityGEO, data: LZString.compressToUTF16(JSON.stringify(restData)) })
            );
        }

        const response = await fetch("https://hoteloffers.ge/adminapi/upload", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload image: ${response.statusText}`);
        }
        return response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!finalImages.length) {
            setError("Please upload at least one image.");
            setLoading(false);
            return;
        }

        try {
            const metadata = createMetadata(e.target.elements);

            // Upload additional images
            const extraImages = await Promise.all(finalImages.slice(1).map((image) => uploadImage(image))).then(
                (responses) => responses.map((res) => res.result.id)
            );

            // Add extra images to metadata and upload the first image with metadata
            await uploadImage(finalImages[0], { ...metadata, extraImages });

            window.location.reload();
        } catch (err) {
            console.error("Error uploading post:", err);
            setError("An error occurred while uploading. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                <Col>
                    <SelectInput name="city" label="აირჩიე ქალაქი" options={Object.keys(cities)} className="my-1" />
                </Col>
            </Row>
            <ImageInput name="images" setFinalImages={handleSetFinalImages} />
            <Row>
                <Col>
                    <FloatingLabel label="სათაური" className="my-1">
                        <Form.Control name="title" placeholder="" required />
                    </FloatingLabel>
                </Col>
                {english && (
                    <Col>
                        <FloatingLabel label="Post Title" className="my-1">
                            <Form.Control name="titleENG" placeholder="" required />
                        </FloatingLabel>
                    </Col>
                )}
            </Row>
            <Row>
                <Col>
                    <FloatingLabel label="მოკლე აღწერა" className="my-1">
                        <Form.Control as="textarea" name="shortDescription" placeholder="" style={{ height: "80px" }} />
                    </FloatingLabel>
                </Col>
                {english && (
                    <Col>
                        <FloatingLabel label="Short Description" className="my-1">
                            <Form.Control
                                as="textarea"
                                name="shortDescriptionENG"
                                placeholder=""
                                style={{ height: "80px" }}
                            />
                        </FloatingLabel>
                    </Col>
                )}
            </Row>
            <Row>
                <Col>
                    <FloatingLabel label="გრძელი აღწერა" className="my-1">
                        <Form.Control as="textarea" name="longDescription" placeholder="" style={{ height: "150px" }} />
                    </FloatingLabel>
                </Col>
                {english && (
                    <Col>
                        <FloatingLabel label="Long Description" className="my-1">
                            <Form.Control
                                as="textarea"
                                name="longDescriptionENG"
                                placeholder=""
                                style={{ height: "150px" }}
                            />
                        </FloatingLabel>
                    </Col>
                )}
            </Row>
            <Row>
                <Col>
                    <FloatingLabel label="ტელეფონის ნომერი" className="my-1">
                        <Form.Control type="phone" name="phone" placeholder="" />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel label="იმეილი" className="my-1">
                        <Form.Control type="email" name="email" placeholder="" />
                    </FloatingLabel>
                </Col>
            </Row>

            <Row className="m-1 py-3 border rounded">
                <Col>
                    <Form.Check type="checkbox" label="Banner" onChange={(e) => setIsBanner(e.target.checked)} />
                </Col>
                <Col>
                    <Form.Check
                        type="checkbox"
                        label="English"
                        onChange={(e) => {
                            if (!e.target.checked) {
                                e.target.form.elements["titleENG"].value = "";
                                e.target.form.elements["shortDescriptionENG"].value = "";
                                e.target.form.elements["longDescriptionENG"].value = "";
                            }
                            setEnglish(e.target.checked);
                        }}
                    />
                </Col>
            </Row>
            <Button type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
        </Form>
    );
}
