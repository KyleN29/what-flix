import "./AccountSettings-Page.css";
import "./Accessibility.css";
import NavigationSidebar from "../SettingsNavigationSidebar";
import { Settings, Sliders, Accessibility, Plus } from "lucide-react";
import UserService, { type UserData } from "../../services/UserService";
// import { type GenreRank } from "../../services/UserService";
import { useState, useEffect, useRef } from "react";
// import GenreService, {type Genre} from "../../services/GenreService";
import { usePreferenceEditor } from '../../context/PreferenceEditorContext.js';

// type ButtonBoxProps = {
//   items: GenreRank[];
//   onRemove: (item: GenreRank) => void;
//   onAdd: (item: Genre) => void;
//   title: string;
//   genreList: Genre[];
//   excludeGenres?: GenreRank[];
// };

// function ButtonBox({ items, onRemove, onAdd, title, genreList, excludeGenres = [] }: ButtonBoxProps) {
//   const [deleteMode, setDeleteMode] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Node;
//       if (dropdownRef.current && !dropdownRef.current.contains(target)) {
//         setShowDropdown(false);
//       }
//     };

//     if (showDropdown) {
//       document.addEventListener('mousedown', handleClickOutside);
//       return () => document.removeEventListener('mousedown', handleClickOutside);
//     }
//   }, [showDropdown]);

//   const handleClick = (item: GenreRank) => {
//     if (deleteMode) {
//       onRemove(item);
//     }
//   };

//   const getAvailableGenres = () => {
//     if (!items) return genreList;
//     const selectedGenreNames = items.map(item => item.name);
//     if (!excludeGenres) return selectedGenreNames;
//     const excludedNames = excludeGenres.map(item => item.name);
//     return genreList.filter(
//       genre => !selectedGenreNames.includes(genre.name) && !excludedNames.includes(genre.name)
//     );
//   };

//   const handleSelectGenre = (genre: any) => {
//     onAdd(genre);
//     setShowDropdown(false);
//   };

//   const availableGenres = getAvailableGenres();

//   const dropdownContent = (
//     <div className="dropdown-menu">
//       {availableGenres.length > 0 ? (
//         availableGenres.map((genre: any) => (
//           <button
//             key={genre.id}
//             onClick={() => handleSelectGenre(genre)}
//           >
//             {genre.name}
//           </button>
//         ))
//       ) : (
//         <div className="no-genres">No genres available</div>
//       )}
//     </div>
//   );

//   const addItemButton = (
//     <div className="relative" ref={dropdownRef}>
//       <button onClick={() => setShowDropdown(!showDropdown)} className="px-4 py-2 rounded">
//         +
//       </button>
//       {showDropdown && dropdownContent}
//     </div>
//   );

//   return (
//     <div className="buttonBox shadow-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
//         <button
//           onClick={() => setDeleteMode(!deleteMode)}
//           className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 `}
//         >
//           <Minus size={20} className="text-white" />
//         </button>
//       </div>
//       <div className="flex flex-wrap gap-3">
//         {items && items.map((item: GenreRank) => (
//           <button
//             key={item.rank}
//             onClick={() => handleClick(item)}
//             className={`px-4 py-2 rounded transition-colors duration-200 flex items-center gap-2 ${
//               deleteMode ? 'cursor-pointer' : 'cursor-default'
//             }`}
//           >
//             {item.name}
//             {deleteMode && <X size={16} />}
//           </button>
//         ))}
//         {!deleteMode && addItemButton}
//       </div>
//     </div>
//   );
// }

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

// function DarkModeToggle() {
//   const [darkMode, setDarkMode] = useState(false);

//   const handleToggle = () => {
//     setDarkMode(!darkMode);
//     if (!darkMode) {
//       document.documentElement.classList.add('dark-mode');
//     } else {
//       document.documentElement.classList.remove('dark-mode');
//     }
//   };

//   return (
//     <div className="dark-mode-control">
//       <h3 className="text-xl font-semibold mb-3">Dark Mode</h3>
//       <div className="flex items-center gap-3">
//         <button
//           onClick={handleToggle}
//           className={`toggle-button ${darkMode ? 'active px-4 py-2 rounded' : 'px-4 py-2 rounded transition-colors duration-200'}`}
//         >
//           {darkMode ? 'On' : 'Off'}
//         </button>
//       </div>
//     </div>
//   );
// }

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
    // const genreBlacklistRef = useRef(null);

    // accessibility settings references
    const accessibilityRef = useRef(null);
    const textSizeRef = useRef(null);
    // const darkModeRef = useRef(null);

     const { openEditor } = usePreferenceEditor();
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
                { name: 'Update Preferences', ref: favoriteGenresRef },
                // { name: 'Genre Blacklist', ref: genreBlacklistRef },
            ]
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            icon: Accessibility,
            ref: accessibilityRef,
            settings: [
                { name: 'Text Size', ref: textSizeRef },
                // { name: 'Dark Mode', ref: darkModeRef }
            ]
        },
    ];

    const [userData, setUserData] = useState<UserData | null>(null);
    useEffect(() => {
        async function fetchUserData() {
                try {
                    const data = await UserService.getUserData();
                    setUserData(data);
                } catch (err) {
                    console.error(err);
                    console.log("unable to get user data, routing back to root");
                    window.location.href = "/";
                }
            }
            fetchUserData();
    }, []);

    // const [genres, setUserGenres] = useState<GenreRank[]>([]);
    // useEffect(() => {
    //     async function fetchUserGenres() {
    //         try {
    //             const data = await UserService.getUserGenreList();
    //             setUserGenres(data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     fetchUserGenres();
    // }, []);


    // const [genreList, setGenreList] = useState<Genre[]>([]);
    // useEffect(() => {
    //     async function loadGenres() {
    //         const genreList = await GenreService.getGenreList();
    //         setGenreList(genreList);
    //     }
    //     loadGenres();
    // }, []);



    // const handleAddGenre = async (genre: any) => {
    //     try {
    //         const updatedGenres = [...genres, { rank: genres.length + 1, name: genre.name, id: genre.id }];
    //         setUserGenres(updatedGenres);
    //         await UserService.updateGenres(updatedGenres);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // const handleRemoveGenre = async (genre: any) => {
    //     const updatedGenres = genres.filter(g => g.rank !== genre.rank);
    //     const previousGenres = genres; // Save for rollback
        
    //     setUserGenres(updatedGenres);
        
    //     try {
    //         await UserService.updateGenres(updatedGenres);
    //         console.log("Updated user genres: ", updatedGenres);
    //     } catch (err) {
    //         console.error('Error updating genres:', err);
    //         setUserGenres(previousGenres); // Rollback on error
    //     }
    // };

    // const [genreBlacklist, setGenreBlacklist] = useState<GenreRank[]>([]);
    // useEffect(() => {
    //     async function fetchUserBlacklist() {
    //         try {
    //             const data = await UserService.getUserGenreBlacklist();
    //             setGenreBlacklist(data);
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    //     fetchUserBlacklist();
    // }, []);

    // const handleAddBlacklistGenre = async (genre: any) => {
    //     try {
    //         const updatedBlacklist = [...genreBlacklist, { rank: genreBlacklist.length + 1, name: genre.name, id: genre.id }];
    //         setGenreBlacklist(updatedBlacklist);
    //         await UserService.updateGenreBlacklist(updatedBlacklist);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // const handleRemoveBlacklistGenre = async (genre: any) => {
    //     const updatedBlacklist = genreBlacklist.filter(g => g.rank !== genre.rank);
    //     const previousBlacklist = genreBlacklist;
        
    //     setGenreBlacklist(updatedBlacklist);
        
    //     try {
    //         await UserService.updateGenreBlacklist(updatedBlacklist);
    //     } catch (err) {
    //         console.error('Error updating blacklist:', err);
    //         setGenreBlacklist(previousBlacklist);
    //     }
    // };

    const [emailCurrentPassword, setEmailCurrentPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const handleUpdateEmail = async () => {
        try {
            console.log('Updating email: ', { newEmail });
            await UserService.updateEmail(newEmail);
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
            await UserService.updatePassword(passwordCurrentPassword, newPassword);
            console.log('Password updated successfully');
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

    const [profilePicName, setProfilePicName] = useState<string | null>(null);

    const handleProfilePicChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setProfilePicName(file.name);

        try {
            // Convert file to base64
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64String = event.target?.result as string;
                await UserService.updateProfilePicture(base64String);
            };
            reader.readAsDataURL(file);
        } catch (err) {
            console.error(err);
        }
    };

    const generalSettings = (
        <div className="flex flex-col gap-4">

            <div className="grid grid-cols-2 gap-24">
                <div className="flex items-center justify-end">
                    <label>Profile Picture</label>
                </div>
                <div className="flex items-center justify-start">
                    <div className="profile-pic-input relative flex items-center gap-3">
                        <input
                            type="file"
                            id="profile-pic-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                        />
                        <label htmlFor="profile-pic-upload" className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 cursor-pointer hover:bg-gray-400 transition-colors">
                            <Plus size={28} />
                        </label>
                        {profilePicName && (
                            <span className="ml-2 text-sm text-gray-200">{profilePicName}</span>
                        )}
                    </div>
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
                    <div className="w-[200px] pt-2">

                    
                    <button
                    onClick={() => openEditor()}
                    className="btn-primary hero-login-btn"
                  >
                    Update Preferences
                  </button>
                  </div>
                </div>
                <div ref={accessibilityRef} className="AccountSettings-Section">
                    <h1>Accessibility</h1>
                    <hr className="w-full border-t border-gray-300" />
                    <div ref={textSizeRef} className="mb-6">
                        <TextSizeControl />
                    </div>
                    {/* <div ref={darkModeRef}>
                        <DarkModeToggle />
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;