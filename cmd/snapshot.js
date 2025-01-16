require('dotenv').config({ path: './../config.env' });
const { snapshot, restore } = require('mongodb-snapshot');

// Replace with your Atlas MongoDB connection string
const MONGO_URI = process.env.MONGO_URI;
// Define paths for backup and restore
const BACKUP_PATH = './mongo-backup'; // Directory to store snapshot files

// Function to create a snapshot
async function createSnapshot() {
  try {
    console.log('Starting snapshot...');
    await snapshot({
      uri: MONGO_URI,
      dumpPath: BACKUP_PATH,
    });
    console.log(
      'Snapshot completed successfully. Backup stored at:',
      BACKUP_PATH
    );
  } catch (error) {
    console.error('Error while creating snapshot:', error);
  }
}

// Function to restore from a snapshot
async function restoreSnapshot() {
  try {
    console.log('Starting restore...');
    await restore({
      uri: MONGO_URI,
      dumpPath: BACKUP_PATH,
    });
    console.log('Restore completed successfully.');
  } catch (error) {
    console.error('Error while restoring snapshot:', error);
  }
}

// Main execution
(async () => {
  const action = process.argv[2]; // Pass 'snapshot' or 'restore' as an argument

  if (action === 'snapshot') {
    await createSnapshot();
  } else if (action === 'restore') {
    await restoreSnapshot();
  } else {
    console.log(
      "Invalid action. Use 'snapshot' to backup or 'restore' to restore."
    );
  }
})();
