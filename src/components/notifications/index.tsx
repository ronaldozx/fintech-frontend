import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DefaultButtonStyle } from "../button/style";

export function Notifications() {
    return (
        <DefaultButtonStyle>
            <FontAwesomeIcon icon={faBell} />    
        </DefaultButtonStyle>
    )
}