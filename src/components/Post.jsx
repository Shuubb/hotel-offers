import React, { useContext, useDebugValue, useEffect } from "react";
import { Col } from "react-bootstrap";
import CarouselProvider from "./CarouselProvider";
import { LangContext } from "ds-auth-provider";
import { formatDistanceToNow } from "date-fns";
import { ka } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export default function Post({ postData, xs }) {
    const { language } = useContext(LangContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(postData);
    }, []);
    return (
        <Col xs={xs} className="m-3 p-1 rounded  shadow-sm">
            <CarouselProvider bannerImages={postData.images} height={"210px"} className="rounded m-0 p-0 shadow-sm" />
            <div className="px-2 pb-1" onClick={() => navigate(`/post/${postData.postId}`)}>
                <strong>{postData[language.toLowerCase()].title}</strong>
                <p>{postData[language.toLowerCase()].short}</p>
                <small className="text-danger mb-3">
                    {language === "GEO" ? "დარჩენილია " : ""}
                    {formatDistanceToNow(postData.exp, { locale: language === "GEO" ? ka : undefined })}
                    {language === "ENG" ? " left" : ""}
                </small>
            </div>
        </Col>
    );
}
