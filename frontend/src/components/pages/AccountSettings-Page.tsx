
function AccountSettings() {
    const settingsNav = (
        <div className="col-span-1">
            NAVBAR
        </div>
    );

    return (
        <div className="grid grid-cols-4">
            {settingsNav}
            <div className="col-span-3">
                <h1>CONTENT GOES HERE</h1>
            </div>
        </div>
    );
}

export default AccountSettings;