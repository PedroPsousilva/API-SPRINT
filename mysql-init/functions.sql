DELIMITER $$

CREATE FUNCTION ListarQuantidadeDeReservasPorUsuarioPeloNome(user_name VARCHAR(50))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE reservation_count INT;

    SELECT COUNT(s.id) 
    INTO reservation_count
    FROM schedule s
    JOIN `user` u ON u.cpf = s.user  -- Corrigido para usar 'cpf' em vez de 'user'
    WHERE u.name COLLATE utf8mb4_unicode_ci = user_name COLLATE utf8mb4_unicode_ci;

    RETURN reservation_count;
END $$

DELIMITER ;

SELECT ListarQuantidadeDeReservasPorUsuarioPeloNome('aaaa');
SELECT ListarQuantidadeDeReservasPorUsuarioPeloNome('Pedro');
SELECT ListarQuantidadeDeReservasPorUsuarioPeloNome('Evelyn');
SELECT ListarQuantidadeDeReservasPorUsuarioPeloNome('teste');
SELECT ListarQuantidadeDeReservasPorUsuarioPeloNome('jon3');