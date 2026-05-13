import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";


function SettingsScreen({onClose}) {

    const [show, setShow] = useState(true);

    return (<div id = 'SettingsScreen' style={welcomeDivStyle}>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "white" }}>
            Settings
        </h2>   
        {/* <button onClick={() => setShow(false)} style={btnStyle}>Dismiss</button> */}
         <button onClick={onClose} style={btnStyle}>Dismiss</button>
    </div>);

    // if (!show) return null;

}

export default SettingsScreen;