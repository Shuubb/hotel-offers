import { useEffect, useState } from "react";
import { Accordion, Card, FloatingLabel, Form, Placeholder, Spinner, Table } from "react-bootstrap";

export default function SelectInput({
    label,
    options,
    limit = 5,
    multiSelect = false,
    name,
    prefix = "",
    onSelect = () => {},
    optionsAreLoading = false,
    ...props
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [optionToShow, setOptionsToShow] = useState(options);
    const [valuesSelected, setValuesSelected] = useState([]);

    useEffect(() => {
        setOptionsToShow(
            options.filter(
                (option) =>
                    !valuesSelected.includes(option) &&
                    option.toUpperCase().startsWith((prefix + searchTerm).toUpperCase())
            )
        );
    }, [options]);

    useEffect(() => {
        onSelect(valuesSelected);
    }, [valuesSelected]);

    return (
        <Accordion activeKey={!!searchTerm} {...props}>
            <Accordion.Item eventKey>
                <FloatingLabel
                    label={valuesSelected.length !== 0 && !multiSelect ? "" : label}
                    className="shadow shadow-hover"
                    onChange={(e) => {
                        if (!e.target.value) return;
                        setOptionsToShow(
                            options.filter(
                                (option) =>
                                    !valuesSelected.includes(option) &&
                                    option.toUpperCase().startsWith((prefix + e.target.value).toUpperCase())
                            )
                        );
                    }}
                >
                    <Form.Control
                        placeholder=""
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`rounded${searchTerm ? "-0" : ""} rounded-top border-0 focus-ring-0`}
                        hidden={valuesSelected.length !== 0 && !multiSelect}
                    />

                    <Form.Control
                        placeholder=""
                        name={name}
                        value={
                            multiSelect && !!valuesSelected.length ? JSON.stringify(valuesSelected) : valuesSelected[0]
                        }
                        hidden
                    />

                    <div className={`d-flex ${valuesSelected.length === 0 ? "" : "p-3"} flex-wrap`}>
                        {valuesSelected.map((value) => (
                            <div className="m-1 p-1 border rounded shadow-sm d-flex">
                                {value}{" "}
                                <div
                                    className="ms-2 me-1 pointer"
                                    onClick={() => {
                                        setValuesSelected((prevState) =>
                                            prevState.filter((prevValue) => prevValue !== value)
                                        );
                                    }}
                                >
                                    X
                                </div>
                            </div>
                        ))}
                    </div>
                </FloatingLabel>
                <Accordion.Body className="p-0">
                    <Table striped hover className="m-0 pointer">
                        <tbody>
                            {optionsAreLoading ? (
                                <tr>
                                    <td className="text-center">
                                        <Placeholder.Button
                                            animation="wave"
                                            variant="dark"
                                            className="w-100 h-100 p-3"
                                        />
                                    </td>
                                </tr>
                            ) : optionToShow.length !== 0 ? (
                                optionToShow.slice(0, limit).map((option) => (
                                    <tr key={option}>
                                        <td
                                            onClick={() => {
                                                setValuesSelected((prevState) => [...prevState, option]);
                                                setSearchTerm("");
                                            }}
                                        >
                                            {option}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>No Results :(</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}
