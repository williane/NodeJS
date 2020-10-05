const { promises } = require("fs");

class LivroDao {

    constructor(db) {
        this._db = db;
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all('select * from livros', (erro, resultados) => {
                if (erro) return reject(erro);
                return resolve(resultados);
            });
        });

    }
}

module.exports = LivroDao;