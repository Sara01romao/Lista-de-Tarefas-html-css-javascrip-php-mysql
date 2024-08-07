<?php

include("db_config.php");

if(isset($_POST['dataCreate'])){
    $tarefa_obj = json_decode($_POST['dataCreate'], true);

    $titulo = $tarefa_obj['titulo'];
    $etiqueta = $tarefa_obj['etiqueta'];
    $estagio= $tarefa_obj['estagio'];

   

    $create_sql = "INSERT INTO `tarefa`( `titulo_tarefa`, `id_etiqueta_tarefa`, `id_estagio_tarefa`) VALUES ('$titulo','$etiqueta','$estagio')";
    $result_create = mysqli_query($con, $create_sql);
    $id = mysqli_insert_id($con);

    $response = ['id' => $id];

    if($result_create){
        $sqlNovo = "SELECT tarefa.id_tarefa, tarefa.titulo_tarefa, etiquetas.id_etiqueta, etiquetas.nome_etiqueta, estagio.nome_estagio, estagio.id_estagio FROM tarefa 
        INNER JOIN etiquetas ON etiquetas.id_etiqueta = tarefa.id_etiqueta_tarefa 
        INNER JOIN estagio ON estagio.id_estagio = tarefa.id_estagio_tarefa 
        WHERE tarefa.id_tarefa = $id";
        $resultNovo = mysqli_query($con,  $sqlNovo);

        $row = mysqli_fetch_assoc($resultNovo);

        echo  json_encode($row) ;


    }

   

}

if(isset($_POST['dataMove'])){
    $tarefa = json_decode($_POST['dataMove'], true);

    $id = $tarefa['id'];
    $estagio = $tarefa['estagio'];

  

    $sqlEditMove = "UPDATE `tarefa` SET `id_estagio_tarefa`='$estagio' WHERE `id_tarefa`  = $id";
    $resultMove = mysqli_query($con, $sqlEditMove );
    
    echo "ok";
}


?>