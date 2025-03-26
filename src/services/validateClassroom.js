const connect = require("../db/connect");
module.exports = function validateClassroom({ number, description, capacity }) {
  // Verifica se todos os campos estão preenchidos
  if (!number || !description || !capacity) {
    return { error: "Todos os campos devem ser preenchidos" };
  }


  return null; // Retorna null se não houver erro
};
