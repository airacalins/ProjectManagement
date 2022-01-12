import { Link } from "react-router-dom";
import { SemanticCOLORS, Button } from "semantic-ui-react";
import { SemanticICONS } from "semantic-ui-react/dist/commonjs/generic";

interface Props {
    name: string,
    icon: SemanticICONS,
    color: SemanticCOLORS,
    navigateTo?: string,
    handleClick?: () => void
}

const DetailsAction = ({ name, icon, color, navigateTo, handleClick }: Props) => {
    return (
        <Button
            as={Link}
            to={navigateTo}
            content={name}
            icon={icon}
            color={color}
            onClick={handleClick}
        />
    );
}

export default DetailsAction;