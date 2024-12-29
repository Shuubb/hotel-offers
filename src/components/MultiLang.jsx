import React, { useContext } from "react";
import LangContext from "../contexts/LangContext/LangContext";

export default function MultiLang({ children }) {
    const { language } = useContext(LangContext);
    return (
        <>
            {language === "GEO" ? (
                translator.hasOwnProperty(children) ? (
                    translator[children]
                ) : (
                    <div className="text-danger">Please Define Translation For: "{children}"</div>
                )
            ) : (
                children
            )}
        </>
    );
}

const translator = {
    "Contact Us": "დაგვიკავშირდით",
    "Log In": "შესვლა",
    "Sign Up": "რეგისტრაცია",
    "Find Your Holiday Destination!": "იპოვე შენი დასასვენებელი ადგილი!",
    "Contact For Reservations": "დასაჯავშნად დაგვიკავშირდით",
    "Want To Place Offer?": "გსურთ შეთავაზების განთავსება?",
    "Contact Us!": "დაგვიკავშირდით!",
    "Leave The Question": "დაგვიტოვეთ შეკითხვა",
    Name: "სახელი",
    Email: "ელ-ფოსტა",
    Message: "შეტყობინება",
    "Or Contact Us": "ან დაგვიკავშირდით",
};
