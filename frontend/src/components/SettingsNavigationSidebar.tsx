import { useState, useEffect, type RefObject } from "react";
import "./SettingsNavigationSidebar.css"
import type { UserData } from "../services/UserService";
import UserService from "../services/UserService";
import { useNavigate } from "react-router-dom";

type setting = {
    name: string,
    ref: RefObject<any>
};

type section = {
    id: string,
    label: string,
    icon: React.ForwardRefExoticComponent<any>,
    ref: RefObject<any>,
    settings: setting[]
};

interface props {
    sections: section[],
    user: UserData
}

function NavigationSidebar({ sections, user }: props) {
    const [activeSection, setActiveSection] = useState(0);
    const [activeSetting, setActiveSetting] = useState<number | null>(null);
    const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section: any, sectionIndex: number) => {
                if (section.ref.current) {
                    const { offsetTop, offsetHeight } = section.ref.current;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionIndex);
                        
                        // Check which setting is active within this section
                        section.settings.forEach((setting: any, settingIndex: number) => {
                            if (setting.ref && setting.ref.current) {
                                const settingTop = setting.ref.current.offsetTop;
                                const settingHeight = setting.ref.current.offsetHeight;
                                if (scrollPosition >= settingTop && scrollPosition < settingTop + settingHeight) {
                                    setActiveSetting(settingIndex);
                                }
                            }
                        });
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    useEffect(() => {
        async function fetchProfilePic() {
            try {
                const pic = await UserService.getProfilePicture();
                setProfilePicUrl(pic);
            } catch (err) {
                console.error('Failed to load profile picture:', err);
            }
        }
        fetchProfilePic();
    }, []);

    const scrollToSection = (index: number) => {
        sections[index].ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToSetting = (sectionIndex: number, settingIndex: number) => {
        const setting = sections[sectionIndex].settings[settingIndex];
        if (setting.ref && setting.ref.current) {
            setting.ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    const heading = (
        <div className='nav-sidebar-heading flex items-center gap-4'>
            <img 
                src={profilePicUrl || "vite.svg"}
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
                <p className="text-base">{user.username}</p>
                <p className="text-sm">{user.email}</p>
            </div>
        </div>
    );

    return(
        <div className="nav-sidebar-container flex flex-col sticky top-18"> 
            {heading}
            {sections.map((section: any, sectionIndex: number) => {
                const Icon = section.icon;
                return (
                    <div 
                        key={section.id}
                        className={`nav-sidebar-item ${activeSection === sectionIndex ? 'active' : ''}`}
                        onClick={() => scrollToSection(sectionIndex)}
                    >
                        <h1 className="flex items-center gap-2">
                            <Icon size={18} />
                            {section.label}
                        </h1>
                        {section.settings.map((setting: any, settingIndex: number) => (
                            <h2 
                                key={settingIndex}
                                className={
                                    activeSection === sectionIndex && activeSetting === settingIndex 
                                        ? 'border-l-2 border-[var(--color-1)] pl-2' 
                                        : ''
                                }
                                onClick={(e) => {
                                    e.stopPropagation();
                                    scrollToSetting(sectionIndex, settingIndex);
                                }}
                            >
                                {setting.name}
                            </h2>
                        ))}
                    </div>
                );
            })}
            <button 
                onClick={handleLogout}
                className="mt-auto mb-4 px-4 py-2 rounded transition-colors"
                id="logout-button"
            >
                Logout
            </button>
        </div>
    )
}

export default NavigationSidebar