<?php

include("db_config.php");

if(isset($_POST['dataCreate'])){
    $tarefa_obj = json_decode($_POST['dataCreate'], true);

    $titulo = $tarefa_obj['titulo'];
    $etiqueta = $tarefa_obj['etiqueta'];
    $estagio= $tarefa_obj['estagio'];

    echo $titulo . " " . $etiqueta . " ". $estagio;

    $create_sql = "INSERT INTO `tarefa`( `titulo_tarefa`, `id_etiqueta_tarefa`, `id_estagio_tarefa`) VALUES ('$titulo','$etiqueta','$estagio')";
    $result_create = mysqli_query($con, $create_sql);
    $id = mysqli_insert_id($con);

    echo "Id" . $id;

}


?>