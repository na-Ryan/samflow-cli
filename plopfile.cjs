
var figlet = require('figlet');

var process = require('node:process');
var { createSpinner } = require('nanospinner');
var { exec } = require('child_process');



module.exports = function (plop) {
    plop.setGenerator('new', {
        description: 'application controller logic',
        prompts: [{
            type: 'input',
            name: 'project_name',
            message: 'Enter Project Name',
            validate: (value) => {
                var regex = /^[a-zA-Z_][a-zA-Z0-9_]+/gi;
                if (regex.test(value)) {
                    return true;
                } else {
                    throw Error('Please Enter valid project name.');
                }

            }
        },],
        actions: [{
            type: 'addMany',
            destination: '{{project_name}}/',
            templateFiles: 'templates/*.hbs'
        },
        {
            type: 'add',
            path: '{{project_name}}/.gitignore',
            templateFile: 'templates/.gitignore.hbs'
        },
        {
            type: 'addMany',
            destination: '{{project_name}}/src/SumTask/',
            templateFiles: 'templates/SumTask/*.hbs',
            base: 'templates/SumTask'
        },
        {
            type: 'welcomeMessage'
        }
        ]
    });
    plop.setActionType('welcomeMessage', function (answers, config, plop) {
        figlet('S A M F L O W', async function (err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(`\n\n`);
            console.log(data);
            console.log(`\n`);
            console.log(`Successfully created your project ${answers.project_name}`);
            console.log(`Inside that directory, you can run several commands:\n`);
            const spinner = createSpinner('Installing dependency...').start();

            exec('npm install', {
                cwd: answers.project_name
            }, function (error, stdout, stderr) {
                if (error) {
                    spinner.error({ text: 'Something went wrong while installing dependency, please check node version or contact the dev.' });
                    console.log(error);
                }
                if (stderr) {
                    spinner.error({ text: 'Something went wrong while installing dependency, please check node version or contact the dev.' });
                    console.log('stderr: ' + stderr);
                }
                if (stdout) {
                    spinner.success({ text: 'Successfully installed the dependency' });
                    console.log(stdout);
                    console.log(`We suggest that you begin by typing below command\n`);
                    console.log(`cd ${answers.project_name}\nsamflow start\n`);
                    console.log('You are awesome & Happy coding!');
                }
            });
        });

    });
};