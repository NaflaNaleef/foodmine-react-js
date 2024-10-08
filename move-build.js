const fs = require('fs-extra');

fs.removeSync('backend/src/public');  // Remove the existing public directory
fs.moveSync('frontend/build', 'backend/src/public');  // Move the build folder
