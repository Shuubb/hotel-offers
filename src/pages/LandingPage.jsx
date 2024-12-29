import { useLoaderData, useOutletContext } from "react-router-dom";
import CarouselProvider from "../components/CarouselProvider";
import SelectInput from "../components/SelectInput";
import PostCardProvider from "../components/PostCard";
import { Row, Col } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import MultiLang from "../components/MultiLang";
import LangContext from "../contexts/LangContext/LangContext";

export default function LandingPage() {
    const { language } = useContext(LangContext);
    const { bannerImages, imagesByCities } = useLoaderData();
    const [bannerImagesToRender, setBannerImagesToRender] = useState([]);
    const [imagesByCitiesToRender, setImagesByCitiesToRender] = useState([]);
    const [citiesSearched, setCitiesSearched] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);

    const responsiveClass = window.innerWidth < 750 ? "justify-content-center d-flex" : "";

    useEffect(() => {
        const filteredCityOptions = Object.keys(imagesByCities).filter(
            (city) => /[A-Za-z]/.test(city) === (language === "ENG")
        );
        setCityOptions(filteredCityOptions);
    }, [language, imagesByCities]);

    useEffect(() => {
        setBannerImagesToRender(bannerImages.filter((image) => image.metadata.hasOwnProperty("city" + language)));

        setImagesByCitiesToRender(
            Object.fromEntries(
                Object.entries(imagesByCities).filter(([city]) => {
                    const matchesLanguage = /[A-Za-z]/.test(city) === (language === "ENG");
                    const matchesSearch = !citiesSearched.length || citiesSearched.includes(city);
                    return matchesLanguage && matchesSearch;
                })
            )
        );
    }, [language, citiesSearched, bannerImages, imagesByCities]);

    return (
        <div>
            <CarouselProvider bannerImages={bannerImagesToRender} />
            <SelectInput
                label={<MultiLang>Find Your Holiday Destination!</MultiLang>}
                options={cityOptions}
                onSelect={(selectedCities) => setCitiesSearched(selectedCities)}
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
