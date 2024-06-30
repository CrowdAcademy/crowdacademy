function transferOwnershipForFolders(folderNames, newOwnerEmail) {
    folderNames.forEach(folderName => {
        var folders = DriveApp.getFoldersByName(folderName);
        if (folders.hasNext()) {
            var rootFolder = folders.next();
            Logger.log(`Processing folder: ${rootFolder.getName()}`);
            try {
                transferOwnershipRecursive(rootFolder, newOwnerEmail);
            } catch (error) {
                Logger.log(`Error processing folder ${rootFolder.getName()}: ${error.message}`);
            }
        } else {
            Logger.log(`Folder not found: ${folderName}`);
        }
    });
}

function transferOwnershipRecursive(folder, newOwnerEmail) {
    try {
        // Transfer ownership of the folder itself
        transferOwnership(folder.getId(), newOwnerEmail, true);

        // Process files in the folder
        var files = folder.getFiles();
        while (files.hasNext()) {
            var file = files.next();
            transferOwnership(file.getId(), newOwnerEmail, false);
        }

        // Process subfolders recursively
        var subfolders = folder.getFolders();
        while (subfolders.hasNext()) {
            var subfolder = subfolders.next();
            transferOwnershipRecursive(subfolder, newOwnerEmail);
        }

        Logger.log(`Ownership transferred successfully for folder: ${folder.getName()}`);
    } catch (error) {
        Logger.log(`Error transferring ownership for folder: ${folder.getName()} - ${error.message}`);
        throw error;
    }
}

function transferOwnership(fileOrFolderId, newOwnerEmail, isFolder) {
    var currentUser = Session.getActiveUser().getEmail();
    var permissions;

    try {
        permissions = Drive.Permissions.list(fileOrFolderId, {
            supportsAllDrives: true,
            fields: "permissions(id,emailAddress,role)"
        }).permissions;
    } catch (e) {
        Logger.log(`Error retrieving permissions for ${isFolder ? 'folder' : 'file'}: ${fileOrFolderId} - ${e.message}`);
        return;
    }

    if (!permissions || permissions.length === 0) {
        Logger.log(`No permissions found for ${isFolder ? 'folder' : 'file'}: ${fileOrFolderId}`);
        return;
    }

    var hasEditPermission = false;
    for (var i = 0; i < permissions.length; i++) {
        if (permissions[i].emailAddress === currentUser && (permissions[i].role === 'owner' || permissions[i].role === 'writer')) {
            hasEditPermission = true;
            break;
        }
    }

    if (hasEditPermission) {
        // Change ownership to new owner
        try {
            Drive.Permissions.create(
                {
                    'role': 'owner',
                    'type': 'user',
                    'emailAddress': newOwnerEmail
                },
                fileOrFolderId,
                {
                    'transferOwnership': true,
                    'supportsAllDrives': true
                }
            );

            Logger.log(`Changed ownership of ${isFolder ? 'folder' : 'file'}: ${fileOrFolderId} to ${newOwnerEmail}`);
        } catch (e) {
            Logger.log(`Error changing ownership of ${isFolder ? 'folder' : 'file'}: ${fileOrFolderId} - ${e.message}`);
        }
    } else {
        Logger.log(`No edit permissions for ${isFolder ? 'folder' : 'file'}: ${fileOrFolderId}`);
    }
}

// Example usage:
function exampleUsage() {
    var folderNames = ["ScriptTestFolder1", "ScriptTestFolder2", "ScriptTestFolder3"];
    var newOwnerEmail = 'omnis.floid@gmail.com'; // Replace with the email of the new owner

    transferOwnershipForFolders(folderNames, newOwnerEmail);
}

exampleUsage();
