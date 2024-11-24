import { useLoaderData, useOutletContext } from "react-router-dom";
import CarouselProvider from "../components/CarouselProvider";
import SelectInput from "../components/SelectInput";
import PostCardProvider from "../components/PostCard";
import { Row, Col } from "react-bootstrap";

export default function LandingPage() {
    const { language } = useOutletContext();
    const { bannerImages, imagesByCities } = useLoaderData();

    const responsiveClass = window.innerWidth < 750 ? "justify-content-center d-flex" : "";

    return (
        <div>
            <CarouselProvider bannerImages={bannerImages} />
            <SelectInput
                label={language === "GEO" ? "იპოვე შენი დასასვენებელი ადგილი" : "Find Your Holiday Destination!"}
                options={Object.keys(imagesByCities)}
                name="search"
                multiSelect
            />

            {Object.entries(imagesByCities)
                .filter(([city, _]) => (language === "ENG" ? /[A-Za-z]/.test(city) : !/[A-Za-z]/.test(city)))
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
