import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ModalProvider from "./ModalProvider";

export default function CarouselProvider({ bannerImages }) {
    const CarouselImage = ({ public_id, ...props }) => (
        <div
            style={{
                width: "100%",
                height: "50vh",
                backgroundImage: `
    url(https://res.cloudinary.com/dmltpftir/image/upload/v1731348895/${public_id}),
    url(https://res.cloudinary.com/dmltpftir/image/upload/e_pixelate:100/v1731348895/${public_id})
`,
                backgroundRepeat: "no-repeat, repeat",
                backgroundSize: "contain",
                backgroundPosition: "center, center",
                cursor: "pointer",
            }}
            {...props}
        />
    );

    return (
        <Carousel
            style={{ height: "50vh", overflow: "hidden" }}
            className="rounded-bottom mb-4 shadow"
            interval={15000}
        >
            {bannerImages.map((public_id, index) => (
                <Carousel.Item key={index}>
                    <ModalProvider>
                        <CarouselImage public_id={public_id} />
                    </ModalProvider>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
