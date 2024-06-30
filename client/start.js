const { exec } = require('child_process');

const port = process.env.PORT || 3000;
const command = `cross-env PORT=${port} react-scripts start`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing command: ${err}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
