const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', function (req, res) {
        res.send(`
                 <html>
                     <head>
                         <meta charset="utf-8">
                     </head>
                     <body>
                         <h1> Casa do Código </h1>
                     </body>
                 </html>    
             `);
    });

    app.get('/livros', function (req, res) {
        const livroDao = new LivroDao(db);
        livroDao.lista()
            .then(livros => res.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function (req, res) {
        res.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.get('/livros/form/:id', function (req, resp) {
        const id = req.params.id;
        const livroDao = new LivroDao(db);

        livroDao.buscaPorId(id)
            .then(livro =>
                resp.marko(
                    require('../views/livros/form/form.marko'),
                    { livro: livro }
                )
            )
            .catch(erro => console.log(erro));

    });

    app.post('/livros', function (req, res) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.put('/livros', function (req, res) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function (req, res) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
            .then(() => res.status(200).end())
            .catch(err => console.log(err));
    });
};
