import "./AccountSettings-Page.css";
import "./Accessibility.css";
import NavigationSidebar from "../SettingsNavigationSidebar";
import { useRef } from "react";
//import { useQuery } from '@tanstack/react-query';
import { Settings, Sliders, Accessibility, X, Minus } from "lucide-react";
//import UserService from "../../services/UserService";
//import { type Person, type GenreRank } from "../../services/UserService";
import { useState } from "react";

function ButtonBox({ items, onRemove, title }) {
  const [deleteMode, setDeleteMode] = useState(false);

  const handleClick = (item: any) => {
    if (deleteMode) {
      onRemove(item);
    }
  };

  return (
    <div className="buttonBox shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <button
          onClick={() => setDeleteMode(!deleteMode)}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 `}
        >
          <Minus size={20} className="text-white" />
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {items.map((item: any) => (
          <button
            key={item.rank}
            onClick={() => handleClick(item)}
            className={`px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${
              deleteMode ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            {item.name}
            {deleteMode && <X size={16} />}
          </button>
        ))}
      </div>
    </div>
  );
}

function TextSizeControl() {
  const [textSize, setTextSize] = useState('default');

  const sizes = [
    { value: 'default', label: 'Default' },
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' }
  ];

  const handleSizeChange = (size: string) => {
    setTextSize(size);
    if (size === 'default') {
      document.documentElement.removeAttribute('data-text-size');
    } else {
      document.documentElement.setAttribute('data-text-size', size);
    }
  };

  return (
    <div className="text-size-control">
      <h3 className="text-xl font-semibold mb-3">Text Size</h3>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => handleSizeChange(size.value)}
            className={textSize === size.value ? 'active px-4 py-2 rounded' : 'px-4 py-2 rounded transition-colors duration-200'}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggle = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  return (
    <div className="dark-mode-control">
      <h3 className="text-xl font-semibold mb-3">Dark Mode</h3>
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggle}
          className={`toggle-button ${darkMode ? 'active px-4 py-2 rounded' : 'px-4 py-2 rounded transition-colors duration-200'}`}
        >
          {darkMode ? 'On' : 'Off'}
        </button>
      </div>
    </div>
  );
}

function AccountSettings() {

    // general settings references
    const generalRef = useRef(null);
    const picRef = useRef(null);
    const emailRef = useRef(null);
    const passRef = useRef(null);
    const deleteRef = useRef(null);

    // preference settings references
    const preferencesRef = useRef(null);
    const favoriteGenresRef = useRef(null);
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
            id: 'preferences', 
            label: 'Preferences',
            icon: Sliders,
            ref: preferencesRef,
            settings: [
                { name: 'Favorite Genres', ref: favoriteGenresRef },
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

    // dummy data for debugging //////////////////

    const dummyUser = {
        email: "someone@gmail.com",
        username: "someone User Name"
    }

    const [genres, setGenres] = useState([
        { rank: 1, name: "Family" },
        { rank: 2, name: "Drama" },
        { rank: 3, name: "History" }
    ]);

    const [genreBlacklist, setGenreBlacklist] = useState([
        { rank: 1, name: "Action" },
        { rank: 2, name: "Comedy" },
        { rank: 3, name: "Adventure"}
    ]);

    //////////////////////////////////////////////

    const handleRemoveGenre = (genre: any) => {
        setGenres(genres.filter(g => g.rank !== genre.rank));
        // todo: UPDATE user genre rankings
    };

    const handleRemoveBlacklistGenre = (genre: any) => {
        setGenreBlacklist(genreBlacklist.filter(g => g.rank !== genre.rank));
        // todo: UPDATE user genre blacklist
    };

    const [emailCurrentPassword, setEmailCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const handleUpdateEmail = async () => {
        try {
            // todo: authenticate user password and update email
            console.log('Updating email:', { emailCurrentPassword, newEmail });
            // await UserService.updateEmail(emailCurrentPassword, newEmail);
            setEmailCurrentPassword('');
            setNewEmail('');
        } catch (error) {
            console.error('Error updating email:', error);
        }
    };

    const [passwordCurrentPassword, setPasswordCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const handleUpdatePassword = async () => {
        try {
            // todo: update and authenticate user password
            console.log('Updating password:', { passwordCurrentPassword, newPassword });
            // await UserService.updatePassword(passwordCurrentPassword, newPassword);
            setPasswordCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    const settingsNav = (
        <div className="col-span-1 AccountNavigationBar">
            <NavigationSidebar sections={sections} user={dummyUser}/>
        </div>
    );

    //const { data: userGenreList, isLoading, isError } = useQuery<GenreRank[]>({
    //    queryKey: ['getUser', userId],
    //    queryFn: () => UserService.getUserGenreList(),
    //    enabled: !!userId, 
    //});

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
                    <input 
                        type="password" 
                        placeholder="Enter Current Password" 
                        className="border p-2 rounded"
                        value={emailCurrentPassword}
                        onChange={(e) => setEmailCurrentPassword(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="Enter New email" 
                        className="border p-2 rounded"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <button 
                        className="rounded"
                        onClick={handleUpdateEmail}
                    >
                        Apply
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-24">
                <div className="flex items-center justify-end">
                    <label>Change Password</label>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <input 
                        type="password" 
                        placeholder="Enter Current Password" 
                        className="border p-2 rounded"
                        value={passwordCurrentPassword}
                        onChange={(e) => setPasswordCurrentPassword(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Enter New Password" 
                        className="border p-2 rounded"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button 
                        className="rounded"
                        onClick={handleUpdatePassword}
                    >
                        Apply
                    </button>
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
                <div ref={preferencesRef} className="AccountSettings-Section">
                    <h1>Preferences</h1>
                    <hr className="w-full border-t border-gray-300" />
                    <div ref={favoriteGenresRef} className="buttonBoxContainer">
                        <ButtonBox items={genres} onRemove={handleRemoveGenre} title="Favorite Genres" />
                    </div>
                    <div ref={genreBlacklistRef} className="buttonBoxContainer">
                        <ButtonBox items={genreBlacklist} onRemove={handleRemoveBlacklistGenre} title="Genre Blacklist" />
                    </div>
                </div>
                <div ref={accessibilityRef} className="AccountSettings-Section">
                    <h1>Accessibility</h1>
                    <hr className="w-full border-t border-gray-300" />
                    <div ref={textSizeRef} className="mb-6">
                        <TextSizeControl />
                    </div>
                    <div ref={darkModeRef}>
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;