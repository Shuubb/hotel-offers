import { useLoaderData, useOutletContext } from "react-router-dom";
import CarouselProvider from "../components/CarouselProvider";
import SelectInput from "../components/SelectInput";
import PostCardProvider from "../components/PostCard";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function LandingPage() {
    const { language } = useOutletContext();
    const { bannerImages, imagesByCities } = useLoaderData();
    const [bannerImagesToRender, setBannerImagesToRender] = useState([]);
    const [imagesByCitiesToRender, setImagesByCitiesToRender] = useState([]);
    const [citiesSearched, setCitiesSearched] = useState([]);

    const responsiveClass = window.innerWidth < 750 ? "justify-content-center d-flex" : "";

    useEffect(() => {
        setBannerImagesToRender(bannerImages.filter((image) => image.metadata.hasOwnProperty("city" + language)));
        setImagesByCitiesToRender(
            Object.fromEntries(
                Object.entries(imagesByCities).filter(
                    ([city]) =>
                        /[A-Za-z]/.test(city) === (language === "ENG") &&
                        (!citiesSearched.length || citiesSearched.includes(city))
                )
            )
        );
    }, [language]);

    return (
        <div>
            <CarouselProvider bannerImages={bannerImagesToRender} />
            <SelectInput
                label={language === "GEO" ? "იპოვე შენი დასასვენებელი ადგილი" : "Find Your Holiday Destination!"}
                options={Object.keys(imagesByCitiesToRender)}
                onSelect={(cities) => setCitiesSearched(cities)}
                name="search"
                multiSelect
            />

            {Object.entries(imagesByCitiesToRender).map(([city, posts]) => (
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
