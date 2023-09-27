import fs from 'fs';
import chp from 'child_process';

const fileOptions = { encoding: 'utf8' };

function incrementIos() {
  const targetFile = './ios/App/App.xcodeproj/project.pbxproj';
  const content = fs.readFileSync(targetFile, fileOptions);
  const modified = content.replace(
    /CURRENT_PROJECT_VERSION = (\d+);/g,
    (match, version) => {
      const nextV = parseInt(version) + 1;
      console.log('    CODE VERSION UPDATED IN ', targetFile, ` (${nextV}) `);
      return `CURRENT_PROJECT_VERSION = ${nextV};`;
    },
  );
  fs.writeFileSync(targetFile, modified, fileOptions);
  chp.execSync(`git add ${targetFile}`);
}

function incrementAndroid() {
  const targetFile = './android/app/build.gradle';
  const content = fs.readFileSync(targetFile, fileOptions);
  const modified = content.replace(/versionCode (\d+)/, (match, version) => {
    const nextV = parseInt(version) + 1;
    console.log('    CODE VERSION UPDATED IN ', targetFile, ` (${nextV}) `);
    return `versionCode ${nextV}`;
  });
  fs.writeFileSync(targetFile, modified, fileOptions);
  chp.execSync(`git add ${targetFile}`);
}

function incrementPackageJson() {
  const targetFile = './package.json';
  const content = fs.readFileSync(targetFile, fileOptions);
  const modified = content.replace(
    /"code-version": "(\d+)",/,
    (match, version) => {
      const nextV = parseInt(version) + 1;
      console.log('    CODE VERSION UPDATED IN ', targetFile, ` (${nextV}) `);
      return `"code-version": "${nextV}",`;
    },
  );
  fs.writeFileSync(targetFile, modified, fileOptions);
  chp.execSync(`git add ${targetFile}`);
}

function increment_code_version() {
  console.log('incrementing code version');
  incrementIos();
  incrementAndroid();
  incrementPackageJson();
}

export default increment_code_version;
