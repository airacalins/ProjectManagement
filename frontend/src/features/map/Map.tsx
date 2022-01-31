
import { useEffect } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotsAsync } from "../slot/slotSlice";

const Map = () => {

    const { slots, isFetching: isFetchingSlots } = useAppSelecter(state => state.slot);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSlotsAsync());
    }, [])


    if (isFetchingSlots) return (<LoadingComponent content="Loading available slots..." />)

    return (
        <>
            <MainPage
                title="Locator"
                content={
                    <img
                        className="p-3"
                        src="/maximarket-map.png"
                        alt=""
                        style={{ backgroundColor: "white", width: "100%" }}
                    />
                }
            />

            <MainPage
                title="Available Slots"
                content={
                    <Row className="bg-light p-5" style={{ marginTop: "25px" }}>
                        {
                            slots.map(s =>
                                <Col className="my-2" lg={1}>
                                    <Badge
                                        as={Link}
                                        to={`/tenants/${s.id}/create`}
                                        className="badge__primary p-3"
                                    >
                                        {s.slotNumber}
                                    </Badge>
                                </Col>
                            )
                        }
                    </Row>
                }
            />
        </>

    )
}

export default Map;
