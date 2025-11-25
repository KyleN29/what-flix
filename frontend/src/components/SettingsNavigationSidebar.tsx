import { ChevronDown, Home, Settings, Users, FileText, BarChart, Mail, Bell, Shield } from 'lucide-react';
import "./SettingsNavigationSidebar.css"

function NavigationSidebar() {

    const heading = (
        <div className='flex nav-sidebar-heading'>
            ACCOUNT DETAILS
        </div>
    );
    
    return(
        <div className="nav-sidebar-container flex flex-col"> 
            {heading}
            <div className='nav-sidebar-item'>
                <h1>SECTION TITLE</h1>
                <h2>DETAILS</h2>
            </div>
            <div className='nav-sidebar-item'>
                <h1>SECTION TITLE</h1>
                <h2>DETAILS</h2>
            </div>
            <div className='nav-sidebar-item'>
                <h1>SECTION TITLE</h1>
                <h2>DETAILS</h2>
            </div>
            <div className='nav-sidebar-item'>
                <h1>SECTION TITLE</h1>
                <h2>DETAILS</h2>
            </div>
            <div className='nav-sidebar-item'>
                <h1>SECTION TITLE</h1>
                <h2>DETAILS</h2>
            </div>
        </div>
    )
}

export default NavigationSidebar