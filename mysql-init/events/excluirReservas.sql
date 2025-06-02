create event if not exists excluir_reservas_antigas
    on schedule every 1 week
    starts current_timestamp + interval 5 minute
    on completion preserve 
    enable 
do
    delete from schedule
    where dateEnd < now() - interval 3 month;
