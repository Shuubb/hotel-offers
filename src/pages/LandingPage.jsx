import { useLoaderData, useOutletContext } from "react-router-dom";
import CarouselProvider from "../components/CarouselProvider";
import SelectInput from "../components/SelectInput";
import PostCardProvider from "../components/PostCard";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";

const languages = {
    თელავი: "Telavi",
    თბილისი: "Tbilisi",
    გორი: "Gori",
    ქარელი: "Kareli",
    ბათუმი: "Batumi",
    ქუთაისი: "Kutaisi",
    საგურამო: "Saguramo",
    წინანდალი: "Tsinandali",
};
export default function LandingPage() {
    const { language } = useOutletContext();
    const { bannerImages, cities } = useLoaderData();
    const [searchTags, setSearchTags] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [optionsAreLoading, setOptionsAreLoading] = useState(false);
    const [resultsAreLoading, setResultsAreLoading] = useState(false);
    console.log(language);

    const handleSearchTagChange = async (e) => {
        const value = e.target.value;
        if (!value) return;

        setOptionsAreLoading(true);
        try {
            const res = await fetch(
                `https://cloudinaryapi.shubitidzed9.workers.dev/tags/image?prefix=city${language}-"${value}`
            );
            const { tags } = await res.json();
            setSearchTags(tags);
        } catch (error) {
            console.error("Error fetching tags:", error);
        } finally {
            setOptionsAreLoading(false);
        }
    };

    const handleSearchSelect = async (selectedValues) => {
        if (selectedValues.length === 0) {
            setSearchResults([]);
            return;
        }

        setResultsAreLoading(true);
        try {
            const res = await fetch("https://cloudinaryapi.shubitidzed9.workers.dev/resources/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ expression: `tags=${selectedValues.join()}` }),
            });
            const { resources } = await res.json();
            setSearchResults(resources.map((resource) => resource.public_id));
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setResultsAreLoading(false);
        }
    };

    const responsiveClass = window.innerWidth < 750 ? "justify-content-center d-flex" : "";

    return (
        <div>
            <CarouselProvider bannerImages={bannerImages} />
            <SelectInput
                options={searchTags}
                label={language === "GEO" ? "იპოვე შენი დასასვენებელი ადგილი" : "Find Your Holiday Destination!"}
                name="search"
                prefix={`city${language}-"`}
                multiSelect
                optionsAreLoading={optionsAreLoading}
                onChange={handleSearchTagChange}
                onSelect={handleSearchSelect}
            />

            {searchResults.length > 0 ? (
                <>
                    <h3 className="fs-2 m-2 fade-in">Search Results</h3>
                    <hr />
                    <div className={`d-flex my-3 rounded ${responsiveClass}`}>
                        <Row>
                            {searchResults.map((public_id, index) => (
                                <Col key={index} className={responsiveClass}>
                                    <PostCardProvider public_id={public_id} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </>
            ) : (
                Object.entries(cities).map(([city, posts]) => (
                    <div key={city} className={resultsAreLoading ? "fade-in fade-out" : "fade-in"}>
                        <h3 className="fs-2 m-2">
                            {language === "GEO" ? city.slice(1, -1) : languages[city.slice(1, -1).trim()]}
                        </h3>
                        <hr />
                        <div className={`d-flex my-3 rounded ${responsiveClass}`}>
                            <Row>
                                {posts.map((public_id, index) => (
                                    <Col key={index} className={responsiveClass}>
                                        <PostCardProvider public_id={public_id} />
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
