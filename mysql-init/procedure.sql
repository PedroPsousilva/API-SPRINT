DELIMITER $$

CREATE PROCEDURE VerificarDisponibilidade(
    IN dateStart DATE, 
    IN days VARCHAR(255)
)
BEGIN
    DECLARE dateEnd DATE;

    SET dateEnd = DATE_ADD(dateStart, INTERVAL CAST(days AS SIGNED) DAY);

    -- Verificar as salas disponíveis
    SELECT classroom.number, classroom.description, classroom.capacity, schedule.id
    FROM classroom
    LEFT JOIN schedule ON classroom.number = schedule.classroom
    AND (
        schedule.dateStart BETWEEN dateStart AND dateEnd
        OR schedule.dateEnd BETWEEN dateStart AND dateEnd
        OR (schedule.dateStart <= dateStart AND schedule.dateEnd >= dateEnd)
    )
    WHERE schedule.id IS NULL;

END $$

DELIMITER ;

CALL VerificarDisponibilidade('2025-04-05', '7');