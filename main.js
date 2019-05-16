//
const { app, Menu, nativeImage, Notification, Tray } = require ('electron');
if (process.platform === 'darwin')
{
    app.dock.hide ();
}
let tray = null;
function createTray ()
{
    tray = new Tray (nativeImage.createFromDataURL ("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADBJREFUeNpi/P//PwM1AAuIaGRkoMi0+v8MjEwMVAKjBo0aNGrQSDWIkVoFG0CAAQCpvAkfU74BegAAAABJRU5ErkJggg=="));
    tray.setToolTip (app.getName ());
    if (process.platform === 'darwin')
    {
        tray.setIgnoreDoubleClickEvents (true);
    }
    let trayMenuTemplate =
    [
        {
            label: 'Send Notification',
            click: () =>
            {
                let myNotification = new Notification
                (
                    {
                        title: 'Title',
                        body: 'Lorem Ipsum Dolor Sit Amet'
                    }
                );
                myNotification.on
                (
                    'click',
                    () =>
                    {
                        console.log ('Notification clicked');
                    }
                );
                myNotification.show ();
            }
        },
        {
            type: 'separator'
        },
        {
            role: 'quit',
            click: () => { if (process.platform === 'darwin') { app.hide (); } app.quit (); }
        }
    ];
    tray.setContextMenu (Menu.buildFromTemplate (trayMenuTemplate));
}
app.on ( 'ready', () => { createTray (); });
//
