
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Label, Segment } from "semantic-ui-react";
import ContainerPage from "../../app/layouts/components/container/ContainerPage";
import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotsAsync } from "../slot/slotSlice";

const Map = () => {

    const {slots, isFetching: isFetchingSlots} = useAppSelecter(state => state.slot);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(fetchSlotsAsync());
    }, [])


    if (isFetchingSlots) return (<LoadingComponent content="Loading available slots..." />)

    return (
        <ContainerPage>
            <Segment padded="very" textAlign="left">
                <Header as="h1" content="Slot Locator" />
                <img src="/maximarket-map.png" alt="" style={{ width: "100%" }} />
            </Segment>

            <Segment padded="very" style={{ marginTop: "50px" }} textAlign="left">
                <Header as="h1" content="Available Slots" />
                <Grid columns="12" stretched style={{ marginTop: "25px" }}>
                    {
                        slots.map(s =>
                            <Grid.Column>
                                <Label as={Link} to={`tenants/${s.id}/create`} content={s.slotNumber} size="large" color="teal" />
                            </Grid.Column>
                        )
                    }
                </Grid>

            </Segment>

        </ContainerPage >
    )
}

export default Map;
