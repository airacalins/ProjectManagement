import { Link } from "react-router-dom"

export interface HomeProps {

}

const Home: React.SFC<HomeProps> = () => {
    return (
        <>
            <h1>home</h1>
            <h3>Go to <Link to="/slots">Slots</Link> </h3>
        </>

    );
}

export default Home;