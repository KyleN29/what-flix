import { ChevronDown, Home, Settings, Users, FileText, BarChart, Mail, Bell, Shield } from 'lucide-react';

function NavigationSidebar() {
    const general = (
        <details>
            <summary>General</summary>
            <p>SETTINGS</p>
        </details>
    )
    
    return(
        <div className="nav-sidebar"> 
            {general}
            {general}
            {general}
            {general}
            {general}
            {general}
        </div>
    )
}

export default NavigationSidebar