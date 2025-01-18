const fs = require('fs');
const path = require('path');
const os = require('os');

const credentialsDir = path.join(os.homedir(), '.config', 'mukulstore', 'credentials');

async function setup() {
  try {
    // Create credentials directory
    await fs.promises.mkdir(credentialsDir, { recursive: true });
    
    // Create template files
    if (!fs.existsSync('.env')) {
      await fs.promises.copyFile('.env.template', '.env');
    }
    
    console.log('Credentials setup complete! Please:');
    console.log('1. Add your service account key to:', credentialsDir);
    console.log('2. Update your .env file with actual values');
    
  } catch (error) {
    console.error('Setup failed:', error);
  }
}

setup();
