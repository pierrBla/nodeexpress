const UserController=require('../controllers/usersController');

module.exports= (app)=>{

    app.get('/api/users/getAll',UserController.getAll);
    app.get('/api/users/getName/:name',UserController.getName);
    app.get('/api/users/getProbar/:name',UserController.getProbar);
    app.post('/api/users/create',UserController.registro);
    app.post('/api/users/login',UserController.login);
}

