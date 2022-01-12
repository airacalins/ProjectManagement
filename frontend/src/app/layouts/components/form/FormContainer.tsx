import { Segment, Header, Grid } from "semantic-ui-react";

interface Props {
    title: string
    children: any
}

const FormContainer = ({ title, children }: Props) => {
    return (
        <Grid centered >
            <Grid.Column width="8" style={{ marginTop: "100px" }} >
                <Segment stacked padded>

                    <Header as='h2' color='orange'>
                        {title}
                    </Header>

                    {children}

                </Segment>
            </Grid.Column>
        </Grid>)
}

export default FormContainer;