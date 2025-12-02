import { useState, useEffect } from "react";
import "./SettingsNavigationSidebar.css"

function NavigationSidebar({ sections, user }) {
    const [activeSection, setActiveSection] = useState(0);
    const [activeSetting, setActiveSetting] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            sections.forEach((section, sectionIndex) => {
                if (section.ref.current) {
                    const { offsetTop, offsetHeight } = section.ref.current;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionIndex);
                        
                        // Check which setting is active within this section
                        section.settings.forEach((setting, settingIndex) => {
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

    const scrollToSection = (index: number) => {
        sections[index].ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToSetting = (sectionIndex: number, settingIndex: number) => {
        const setting = sections[sectionIndex].settings[settingIndex];
        if (setting.ref && setting.ref.current) {
            setting.ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const heading = (
        <div className='nav-sidebar-heading flex items-center gap-4'>
            <img 
                src="vite.svg" 
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
            {sections.map((section, sectionIndex) => {
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
                        {section.settings.map((setting, settingIndex) => (
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
        </div>
    )
}

export default NavigationSidebar