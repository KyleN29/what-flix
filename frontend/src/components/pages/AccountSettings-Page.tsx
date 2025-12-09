import "./AccountSettings-Page.css";
import "./Accessibility.css";
import NavigationSidebar from "../SettingsNavigationSidebar";
import { Settings, Sliders, Accessibility, X, Minus } from "lucide-react";
import UserService, { type UserData } from "../../services/UserService";
import { type GenreRank } from "../../services/UserService";
import { useState, useEffect, useRef } from "react";
import GenreService, {type Genre} from "../../services/GenreService";

function ButtonBox({ items, onRemove, onAdd, title, genreList }) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showDropdown]);

  const handleClick = (item: any) => {
    if (deleteMode) {
      onRemove(item);
    }
  };

  const getAvailableGenres = () => {
    const selectedGenreNames = items.map(item => item.name);
    return genreList.filter(genre => !selectedGenreNames.includes(genre.name));
  };

  const handleSelectGenre = (genre: any) => {
    onAdd(genre);
    setShowDropdown(false);
  };

  const availableGenres = getAvailableGenres();

  const dropdownContent = (
    <div className="dropdown-menu">
      {availableGenres.length > 0 ? (
        availableGenres.map((genre: any) => (
          <button
            key={genre.id}
            onClick={() => handleSelectGenre(genre)}
          >
            {genre.name}
          </button>
        ))
      ) : (
        <div className="no-genres">No genres available</div>
      )}
    </div>
  );

  const addItemButton = (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setShowDropdown(!showDropdown)} className="px-4 py-2 rounded">
        +
      </button>
      {showDropdown && dropdownContent}
    </div>
  );

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
        {!deleteMode && addItemButton}
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

    const [genreBlacklist, setGenreBlacklist] = useState([
        { rank: 1, name: "Action" },
        { rank: 2, name: "Comedy" },
        { rank: 3, name: "Adventure"}
    ]);

    //////////////////////////////////////////////

    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        async function fetchUserData() {
                try {
                    const data = await UserService.getUserData();
                    setUserData(data);
                } catch (err) {
                    setError('Failed to load user data');
                    console.error(err);
                }
            }
            fetchUserData();
    }, []);

    const [genres, setUserGenres] = useState<GenreRank[]>([]);
    useEffect(() => {
        async function fetchUserGenres() {
            try {
                const data = await UserService.getUserGenreList();
                setUserGenres(data);
            } catch (err) {
                setError('Failed to load user genres');
                console.error(err);
            }
        }
        fetchUserGenres();
    }, []);


    const [genreList, setGenreList] = useState<Genre[]>([]);
    useEffect(() => {
        async function loadGenres() {
            const genreList = await GenreService.getGenreList();
            setGenreList(genreList);
        }
        loadGenres();
    }, []);



    const handleAddGenre = async (genre: any) => {
        try {
            const updatedGenres = [...genres, { rank: genres.length + 1, name: genre.name }];
            setUserGenres(updatedGenres);
            await UserService.updateGenres(updatedGenres);
        } catch (err) {
            setError('Failed to add genre');
            console.error(err);
        }
    }

    const handleRemoveGenre = async (genre: any) => {
        const updatedGenres = genres.filter(g => g.rank !== genre.rank);
        const previousGenres = genres; // Save for rollback
        
        setUserGenres(updatedGenres);
        
        try {
            await UserService.updateGenres(updatedGenres);
            console.log("Updated user genres: ", updatedGenres);
        } catch (err) {
            console.error('Error updating genres:', err);
            setUserGenres(previousGenres); // Rollback on error
            setError('Failed to update genres. Please try again.');
        }
    };

    const handleAddBlacklistGenre = async (genre: any) => {
        const updatedBlacklist = [...genreBlacklist, { rank: genreBlacklist.length + 1, name: genre.name }];
        setGenreBlacklist(updatedBlacklist);
        // todo: UPDATE user blacklist
    }

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

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to delete your account? This action cannot be undone.'
        );
        
        if (confirmed) {
            try {
                console.log('Deleting account...');
                // await UserService.deleteAccount();
            } catch (error) {
                console.error('Error deleting account:', error);
            }
        }
    };

    const settingsNav = userData ? (
        <div className="col-span-1 AccountNavigationBar">
            <NavigationSidebar sections={sections} user={userData}/>
        </div>
    ) : (
        <div className="col-span-1 AccountNavigationBar">
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

            <div className="grid grid-cols-2 gap-24" ref={deleteRef}>
                <div className="flex items-center justify-end">
                    <label>Delete Account</label>
                </div>
                <div className="flex items-center justify-start">
                    <button 
                        className="delete-account-button"
                        onClick={handleDeleteAccount}
                    >
                        Delete Account
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
                        <ButtonBox items={genres} onRemove={handleRemoveGenre} onAdd={handleAddGenre} genreList={genreList} title="Favorite Genres" />
                    </div>
                    <div ref={genreBlacklistRef} className="buttonBoxContainer">
                        <ButtonBox items={genreBlacklist} onRemove={handleRemoveBlacklistGenre} onAdd={handleAddBlacklistGenre} genreList={genreList} title="Genre Blacklist" />
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