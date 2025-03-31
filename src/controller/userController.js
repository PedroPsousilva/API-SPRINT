const connect = require("../db/connect");
const validateUser = require("../services/validateUser");
const validateCpf = require("../services/validateCpf");

module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, email, password, name } = req.body;

    const validationError = validateUser(req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    }


    try {
      const cpfError = await validateCpf(cpf);
      if (cpfError) {
        return res.status(400).json(cpfError);
      }

      const query = `INSERT INTO user (cpf, password, email, name) VALUES (?, ?, ?, ?)`;
      connect.query(query, [cpf, password, email, name], (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            if (err.message.includes("email")) {
              return res.status(400).json({ error: "Email já cadastrado" });
            }
          } else {
            console.log(err);
            return res
              .status(500)
              .json({ error: "Erro interno do servidor", err });
          }
        }
        return res.status(201).json({ message: "Usuário criado com sucesso" });
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  static async postLogin(req, res) {
    const { cpf, password } = req.body;

    if (!cpf || !password) {
      return res.status(400).json({ error: "CPF e senha são obrigatórios" });
    }

    const query = `SELECT * FROM user WHERE cpf = '${cpf}' AND password = '${password}'`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.length === 0) {
          return res.status(401).json({ error: "Credenciais inválidas" });
        }

        return res
          .status(200)
          .json({ message: "Login realizado com sucesso", user: results[0] });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getAllUsers(req, res) {
    const query = `SELECT * FROM user`;
    const { teste } = req.body;
    console.log(teste);

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        return res
          .status(200)
          .json({ message: "Obtendo todos os usuários", users: results });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async getUserById(req, res) {
    const userCPF = req.params.cpf;
    const query = `SELECT * FROM user WHERE cpf = ?`;
    const values = [userCPF];

    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.length === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res.status(200).json({
          message: "Obtendo usuário com CPF: " + userCPF,
          user: results[0],
        });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async updateUser(req, res) {
    const cpf = req.params.cpf;
    const { email, password, name } = req.body;
    console.log("cpf: ", cpf);

    const validationError = validateUser({cpf, email, password, name});
    if (validationError) {
      return res.status(400).json(validationError);
    }

    try {
      const cpfError = await validateCpf(cpf, "update");
      if (cpfError) {
        return res.status(400).json(cpfError);
      }

      const query = `UPDATE user SET email = ?, password = ?, name = ? WHERE cpf = ?`;
      const values = [email, password, name, cpf];

      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res
          .status(200)
          .json({ message: "Usuário atualizado com CPF: " + cpf });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }

  static async deleteUser(req, res) {
    const userCPF = req.params.cpf;
    const query = `DELETE FROM user WHERE cpf = ?`;
    

    try {
      connect.query(query, userCPF, function (err, results) {
        
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res
          .status(200)
          .json({ message: "Usuário excluído com CPF: " + userCPF });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
