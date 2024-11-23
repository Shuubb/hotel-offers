import React from "react";
import Carousel from "react-bootstrap/Carousel";
import ModalProvider from "./ModalProvider";

export default function CarouselProvider({ bannerImages }) {
    const CarouselImage = ({ id, ...props }) => (
        <div
            style={{
                width: "100%",
                height: "50vh",
                backgroundImage: `url(https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${id}/public)`,
                backgroundSize: "contain",
                backgroundPosition: "center",
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
            {bannerImages.map((bannerImage, index) => (
                <Carousel.Item key={index}>
                    <ModalProvider>
                        <CarouselImage id={bannerImage.id} />
                    </ModalProvider>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
