const connect = require("../db/connect");

module.exports = async function validateCpf(cpf, tipo = null) {
  return new Promise((resolve, reject) => {
    const query = "SELECT cpf FROM user WHERE cpf = ?";
    const values = [cpf];

    connect.query(query, values, (err, results) => {
      if (err) {
        reject("Erro ao verificar CPF");
      } else if (results.length > 0) {
        const cpfCadastrado = results[0].cpf;

        // Se um userId foi passado (update) e o CPF pertence a outro usuário, retorna erro
        if (tipo == null) {
          resolve({ error: "CPF já cadastrado para outro usuário" });
        } else {
          resolve(null);
        }
      } else {
        if (tipo == null) {
          resolve(null);
        } else {
          resolve({ error: "CPF não encontrado!" });
        }
      }
    });
  });
};
