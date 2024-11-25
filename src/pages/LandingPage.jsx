import { useLoaderData, useOutletContext } from "react-router-dom";
import CarouselProvider from "../components/CarouselProvider";
import SelectInput from "../components/SelectInput";
import PostCardProvider from "../components/PostCard";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";

export default function LandingPage() {
    const { language } = useOutletContext();
    const { bannerImages, imagesByCities } = useLoaderData();
    const [citiesSearched, setCitiesSearched] = useState([]);

    const responsiveClass = window.innerWidth < 750 ? "justify-content-center d-flex" : "";

    return (
        <div>
            <CarouselProvider
                bannerImages={bannerImages.filter((image) => image.meta.hasOwnProperty("city" + language))}
            />
            <SelectInput
                label={language === "GEO" ? "იპოვე შენი დასასვენებელი ადგილი" : "Find Your Holiday Destination!"}
                options={Object.keys(imagesByCities).filter((city) =>
                    language === "ENG" ? /[A-Za-z]/.test(city) : !/[A-Za-z]/.test(city)
                )}
                onSelect={(cities) => setCitiesSearched(cities)}
                name="search"
                multiSelect
            />

            {Object.entries(imagesByCities)
                .filter(
                    ([city, _]) =>
                        (language === "ENG" ? /[A-Za-z]/.test(city) : !/[A-Za-z]/.test(city)) &&
                        (citiesSearched.length > 0 ? citiesSearched.includes(city) : true)
                )
                .map(([city, posts]) => (
                    <div key={city}>
                        <h3 className="fs-2 m-2">{city}</h3>
                        <hr />
                        <div className={`d-flex my-3 rounded ${responsiveClass}`}>
                            <Row>
                                {posts.map((data, index) => (
                                    <Col key={index} className={responsiveClass}>
                                        <PostCardProvider data={data} />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                ))}
        </div>
    );
}
