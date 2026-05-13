import { useState } from "react";
import btnStyle from "../myStyles";
import { welcomeDivStyle } from "../myStyles";


function SettingsScreen({onClose}) {

    const [show, setShow] = useState(true);

    return (<div id = 'SettingsScreen'>
        <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "white" }}>
            Settings
        </h2>   
        <button onClick={onClose} style={btnStyle}>Dismiss</button>
        <br/><br/>
        
        <button id="bright-dark-toggle-btn" onClick={() => {
            const root = document.documentElement;

            root.classList.toggle("mode-dark");

            const isDark = root.classList.contains('mode-dark');
            
            document.getElementById("icon-sun").style.display = isDark ? "block" : "none";
            document.getElementById("icon-moon").style.display = isDark ? "none" : "block";
        }}>
            <img style={{ display: "none" }} id="icon-sun" src="/icons/sun-svgrepo-com.svg" width="34" height="34" alt="bright mode"></img>
            <img id="icon-moon" src="/icons/moon-svgrepo-com.svg" width="34" height="34" alt="dark mode"></img>
        </button>
    </div>);

    // if (!show) return null;

}

export default SettingsScreen;