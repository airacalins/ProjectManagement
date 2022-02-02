
import { useEffect } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import { SlotStatus } from "../../app/models/slot";
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
                    <Row className="my-5" style={{ backgroundColor: "white", marginTop: "25px" }}>
                        {
                            slots.filter(i => i.status === SlotStatus.Available).map(s =>
                                <Col className="my-2" lg={1}>
                                    <a href={`/tenants/${s.id}/create`} className="badge__primary p-3 d-flex justify-content-center">
                                        <p className="badge__text">{s.slotNumber}</p>
                                    </a>
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
