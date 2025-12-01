import "./AccountSettings-Page.css"
import NavigationSidebar from "../SettingsNavigationSidebar";
import { useRef } from "react";
import { Settings, CreditCard, Sliders, Accessibility } from "lucide-react";

function AccountSettings() {
    const generalRef = useRef(null);
    const subscriptionsRef = useRef(null);
    const preferencesRef = useRef(null);
    const accessibilityRef = useRef(null);

        const sections = [
        { 
            id: 'general', 
            label: 'General',
            icon: Settings,
            ref: generalRef,
            settings: [
                { name: 'Profile Pic' },
                { name: 'Email / Verify Email' },
                { name: 'Change Password' },
                { name: 'Delete Account' }
            ]
        },
        { 
            id: 'subscriptions', 
            label: 'Subscriptions',
            icon: CreditCard,
            ref: subscriptionsRef,
            settings: [
                { name: 'Change Subscriptions' }
            ]
        },
        { 
            id: 'preferences', 
            label: 'Preferences',
            icon: Sliders,
            ref: preferencesRef,
            settings: [
                { name: 'Favorite Genres' },
                { name: 'Genre Whitelist' },
                { name: 'Genre Blacklist' },
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            icon: Accessibility,
            ref: accessibilityRef,
            settings: [
                { name: 'Text Size' },
                { name: 'Dark Mode' }
            ]
        },
    ];

    const user = {
        username: "ConnorWinning2349",
        email: "connoredwinwinning2367@gmail.com",
    }

    const settingsNav = (
        <div className="col-span-1 AccountNavigationBar">
            <NavigationSidebar sections={sections} user={user}/>
        </div>
    );

    return (
        <div className="grid grid-cols-5 AccountSettings">
            {settingsNav}
            <div className="col-span-4">
                <div ref={generalRef} className="AccountSettings-Section">
                    <h1>CONTENT GOES HERE</h1>
                </div>
                <div ref={subscriptionsRef} className="AccountSettings-Section">
                    <h1>CONTENT GOES HERE</h1>
                </div>
                <div ref={preferencesRef} className="AccountSettings-Section">
                    <h1>CONTENT GOES HERE</h1>
                </div>
                <div ref={accessibilityRef} className="AccountSettings-Section">
                    <h1>CONTENT GOES HERE</h1>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;