import { Segment, Header, Grid, Table } from "semantic-ui-react";

interface Props {
    title: string,
    detailsInput: any,
    detailsButton?: any,
}

const Details = ({ title, detailsInput, detailsButton }: Props) => {
    return (
        <>

            <Segment textAlign="left" padded="very">

                <Header as="h1" content={title} />

                <Grid divided>
                    <Grid.Row>
                        <Grid.Column width="12">
                            <Table definition>
                                <Table.Body>
                                    {detailsInput}
                                </Table.Body>
                            </Table>
                        </Grid.Column>

                        {/* <Grid.Column width="4">
                            <List animated verticalAlign='middle'>
                                {detailsAction}
                            </List>
                        </Grid.Column> */}

                        <Grid.Column width="4">
                            {detailsButton}
                        </Grid.Column>

                    </Grid.Row>
                </Grid>

            </Segment>

        </>
    );
}

export default Details;