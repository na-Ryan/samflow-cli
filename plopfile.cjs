
module.exports =function (plop) {
    plop.setGenerator('create', {
        description: 'application controller logic',
        prompts: [{
            type: 'input',
            name: 'project_name',
            message: 'Enter Project Name',
            validate : (value)=>{
                var regex = /^[a-zA-Z_][a-zA-Z0-9_]+/gi;
                if(regex.test(value)){
                    return true;
                }else{
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
        }
        ]
    });
};