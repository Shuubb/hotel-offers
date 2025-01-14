import React, { useContext, useRef } from "react";
import Carousel from "react-bootstrap/Carousel";
import { LangContext } from "ds-auth-provider";

export default function CarouselProvider({ bannerImages, height = "50vh", className }) {
    const { language } = useContext(LangContext);
    const carouselRef = useRef(null);

    const handlePrev = (e) => {
        e.stopPropagation();
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };

    const CarouselImage = ({ prevId, id, nextId }) => (
        <>
            <div
                onClick={handlePrev}
                style={{
                    height: "100%",
                    aspectRatio: "1/1",
                    backgroundImage: `url(https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${prevId}/public)`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(3px) brightness(50%)",
                    cursor: "pointer",
                }}
            />
            <img
                src={`https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${id}/public`}
                height="100%"
                width="auto"
                className="pointer shadow-lg"
            />
            <div
                onClick={handleNext}
                style={{
                    height: "100%",
                    aspectRatio: "1/1",
                    backgroundImage: `url(https://imagedelivery.net/Rfx3xvw3hWThLwLzWkoMnQ/${nextId}/public)`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(3px) brightness(50%)",
                    cursor: "pointer",
                }}
            />
        </>
    );

    return (
        <Carousel
            ref={carouselRef}
            key={language}
            style={{ minWidth: "100%", maxWidth: "100%", height: height, overflow: "hidden", aspectRatio: "9/4" }}
            className={"rounded-bottom mb-2 shadow " + className}
            interval={15000}
        >
            {bannerImages.map((bannerImage, index) => (
                <Carousel.Item key={index}>
                    <div
                        style={{
                            minWidth: "100%",
                            maxWidth: "100%",
                            height: height,
                            aspectRatio: "9/4",
                        }}
                        className="d-flex justify-content-center bg-black"
                    >
                        <CarouselImage
                            id={bannerImage}
                            prevId={bannerImages[index - 1 < 0 ? bannerImages.length - 1 : index - 1]}
                            nextId={bannerImages[index + 1 >= bannerImages.length ? 0 : index + 1]}
                        />
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
