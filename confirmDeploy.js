// confirmDeploy.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Are you sure you want to deploy? (yes/no) ', (answer) => {
    if (answer.toLowerCase() === 'yes') {
        console.log('Deploying...');
        const { exec } = require('child_process');
        exec('npm run build && gh-pages -d dist --cname ghpages.bobrumbly.com', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error: ${err.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    } else {
        console.log('Deployment canceled.');
    }
    rl.close();
});