import "./AccountSettings-Page.css"
import NavigationSidebar from "../SettingsNavigationSidebar";
import { useRef } from "react";
import { useQuery } from '@tanstack/react-query';
import { Settings, CreditCard, Sliders, Accessibility } from "lucide-react";
import UserService from "../../services/UserService";
import { type Person, type GenreRank } from "../../services/UserService";
import { useParams } from "react-router-dom";

function AccountSettings() {
    const { userId } = useParams();

    // general settings references
    const generalRef = useRef(null);
    const picRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const deleteRef = useRef(null);

    // subscription settings references
    const subscriptionsRef = useRef(null);
    const changeSubsRef = useRef(null);

    // preference settings references
    const preferencesRef = useRef(null);
    const favoriteGenresRef = useRef(null);
    const genreWhitelistRef = useRef(null);
    const genreBlacklistRef = useRef(null);

    // accessibility settings references
    const accessibilityRef = useRef(null);
    const textSizeRef = useRef(null);
    const darkModeRef = useRef(null);

    const sections = [
        { 
            id: 'general', 
            label: 'General',
            icon: Settings,
            ref: generalRef,
            settings: [
                { name: 'Profile Pic', ref: picRef},
                { name: 'Email / Verify Email', ref: emailRef},
                { name: 'Change Password', ref: passRef },
                { name: 'Delete Account', ref: deleteRef }
            ]
        },
        { 
            id: 'subscriptions', 
            label: 'Subscriptions',
            icon: CreditCard,
            ref: subscriptionsRef,
            settings: [
                { name: 'Change Subscriptions', ref: changeSubsRef }
            ]
        },
        { 
            id: 'preferences', 
            label: 'Preferences',
            icon: Sliders,
            ref: preferencesRef,
            settings: [
                { name: 'Favorite Genres', ref: favoriteGenresRef },
                { name: 'Genre Whitelist', ref: genreWhitelistRef },
                { name: 'Genre Blacklist', ref: genreBlacklistRef },
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            icon: Accessibility,
            ref: accessibilityRef,
            settings: [
                { name: 'Text Size', ref: textSizeRef },
                { name: 'Dark Mode', ref: darkModeRef }
            ]
        },
    ];

    

    if(isError) {
        console.log("Unable to find user");
    }

    const dummyUser = {
        email: "someone@gmail.com",
        username: "someone User Name"
    }

    const settingsNav = (
        <div className="col-span-1 AccountNavigationBar">
            <NavigationSidebar sections={sections} user={userData ?? dummyUser}/>
        </div>
    );

    const { data: userGenreList, isLoading, isError } = useQuery<GenreRank[]>({
        queryKey: ['getUser', userId],
        queryFn: () => UserService.getUserGenreList(),
        enabled: !!userId, 
    });

    const generalSettings = (
        <div className="flex flex-col gap-4">

            <div className="grid grid-cols-2 gap-24">
                <div className="flex items-center justify-end">
                    <label>Profile Picture</label>
                </div>
                <div className="flex items-center justify-start">
                    <input type="file" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-24">
                <div className="flex items-center justify-end">
                    <label>Change Email</label>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <input type="password" placeholder="Enter Current Password" className="border p-2 rounded" />
                    <input type="email" placeholder="Enter New email" className="border p-2 rounded" />
                    <button className="rounded">Apply</button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-24">
                <div className="flex items-center justify-end">
                    <label>Change Password</label>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <input type="password" placeholder="Enter Current Password" className="border p-2 rounded" />
                    <input type="password" placeholder="Enter New Password" className="border p-2 rounded" />
                    <button className="rounded">Apply</button>
                </div>
            </div>
        </div>
    )

    return (
        <div className="grid grid-cols-5 AccountSettings">
            {settingsNav}
            <div className="col-span-4">
                <div ref={generalRef} className="AccountSettings-Section">
                    <h1>General Settings</h1>
                    <hr className="w-full border-t border-gray-300" />
                    {generalSettings}
                </div>
                <div ref={subscriptionsRef} className="AccountSettings-Section">
                    <h1>Subscription Management</h1>
                    <hr className="w-full border-t border-gray-300" />
                    <div ref={changeSubsRef}>Add Subscription +</div>
                </div>
                <div ref={preferencesRef} className="AccountSettings-Section">
                    <h1>Preferences</h1>
                    <hr className="w-full border-t border-gray-300" />
                    <div ref={favoriteGenresRef}>Favorite Genres</div>
                    <div ref={genreWhitelistRef}>Genre Whitelist</div>
                    <div ref={genreBlacklistRef}>Genre Blacklist</div>
                </div>
                <div ref={accessibilityRef} className="AccountSettings-Section">
                    <h1>Accessibility</h1>
                    <hr className="w-full border-t border-gray-300" />
                    <div ref={textSizeRef}>Change Text Size</div>
                    <div ref={darkModeRef}>Dark Mode</div>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;