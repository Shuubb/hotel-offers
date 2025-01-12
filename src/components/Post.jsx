import React, { useContext, useDebugValue, useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import CarouselProvider from "./CarouselProvider";
import { LangContext } from "ds-auth-provider";
import { formatDistanceToNow } from "date-fns";
import { ka } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

export default function Post({ postData, xs, height, goto = false }) {
    const { language } = useContext(LangContext);
    const navigate = useNavigate();

    return (
        <Col xs={xs} className={`p-1  ${xs < 6 ? "rounded shadow-sm" : ""}`} style={{ minWidth: "300px" }}>
            <CarouselProvider bannerImages={postData.images} height={height} className="rounded m-0 p-0 shadow-sm" />
            <Row className="p-1">
                <Col
                    className={`px-2 pb-1 ${goto ? "pointer" : ""}`}
                    onClick={() => (goto ? navigate(`/post/${postData.postId}`) : null)}
                    style={{ minWidth: "300px" }}
                >
                    <strong>{postData[language.toLowerCase()].title}</strong>
                    <p>{postData[language.toLowerCase()].short}</p>
                    <small className="text-danger mb-3">
                        {language === "GEO" ? "დარჩენილია " : ""}
                        {formatDistanceToNow(postData.exp, { locale: language === "GEO" ? ka : undefined })}
                        {language === "ENG" ? " left" : ""}
                    </small>
                </Col>
                {xs >= 6 && <Col style={{ minWidth: "300px" }}>{postData[language.toLowerCase()].long}</Col>}
                {xs >= 6 && (
                    <Col style={{ minWidth: "300px" }}>
                        <Button className="w-100 my-2" variant="success">
                            Do Success
                        </Button>
                        <Button className="w-100 my-2" variant="warning">
                            Do Warning
                        </Button>
                        <Button className="w-100 my-2" variant="danger">
                            Do Danger
                        </Button>
                    </Col>
                )}
            </Row>
        </Col>
    );
}
