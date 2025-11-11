import "./AccountSettings-Page.css"
import NavigationSidebar from "../SettingsNavigationSidebar";

function AccountSettings() {
    const settingsNav = (
        <div className="col-span-1 AccountNavigationBar">
            <NavigationSidebar />
        </div>
    );

    return (
        <div className="grid grid-cols-5 AccountSettings">
            {settingsNav}
            <div className="col-span4">
                <h1>CONTENT GOES HERE</h1>
            </div>
        </div>
    );
}

export default AccountSettings;