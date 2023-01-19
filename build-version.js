const childProcess = require('child_process');
const { writeFileSync } = require('fs');
const path = require("path");

const longSHA = childProcess.execSync("git rev-parse HEAD").toString().trim();
const shortSHA = childProcess.execSync("git rev-parse --short HEAD").toString().trim();
const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const authorName = childProcess.execSync("git log -1 --pretty=format:'%an'").toString().trim();
const commitTime = childProcess.execSync("git log -1 --pretty=format:'%cd'").toString().trim();
const commitMsg = childProcess.execSync("git log -1 --pretty=%B").toString().trim();
const totalCommitCount = childProcess.execSync("git rev-list --count HEAD").toString().trim();
const env = process.env['NODE_ENV'];

const versionInfo = {
    shortSHA: shortSHA,
    SHA : longSHA,
    branch: branch,
    lastCommitAuthor: authorName,
    lastCommitTime: commitTime,
    lastCommitMessage: commitMsg,
    lastCommitNumber: totalCommitCount,
    environment: env,
    lastBuildTime: new Date()
}

const versionInfoJson = JSON.stringify(versionInfo, null, 2);

writeFileSync(path.join(__dirname, "./src/version.json"), versionInfoJson);