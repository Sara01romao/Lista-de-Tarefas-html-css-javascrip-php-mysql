<?php

include("db_config.php");

if(isset($_POST['dataCreate'])){
    $tarefa_obj = json_decode($_POST['dataCreate'], true);

    $titulo = $tarefa_obj['titulo'];
    $etiqueta = $tarefa_obj['etiqueta'];
    $estagio= $tarefa_obj['estagio'];
    $index= $tarefa_obj['index'];

   

    $create_sql = "INSERT INTO `tarefa`( `titulo_tarefa`, `id_etiqueta_tarefa`, `id_estagio_tarefa`, `index`) VALUES ('$titulo','$etiqueta','$estagio', '$index')";
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





if(isset($_POST['buscaId'])){
    $id = json_decode($_POST['buscaId'], true);

   
    $sqlBusca = "SELECT tarefa.id_tarefa, tarefa.titulo_tarefa, etiquetas.id_etiqueta, etiquetas.nome_etiqueta, estagio.nome_estagio, estagio.id_estagio FROM tarefa 
        INNER JOIN etiquetas ON etiquetas.id_etiqueta = tarefa.id_etiqueta_tarefa 
        INNER JOIN estagio ON estagio.id_estagio = tarefa.id_estagio_tarefa 
        WHERE tarefa.id_tarefa = $id";

    $resultBusca = mysqli_query($con, $sqlBusca );

    $busca = mysqli_fetch_assoc($resultBusca);

    echo json_encode($busca);
    
}


    if(isset($_POST['dataEdit'])){
        $tarefa_obj = json_decode($_POST['dataEdit'], true);

        $id = $tarefa_obj['id'];
        $titulo = $tarefa_obj['titulo'];
        $etiqueta = $tarefa_obj['etiqueta'];
        

      

        $sqlEdit = "UPDATE `tarefa` SET `titulo_tarefa`='$titulo',`id_etiqueta_tarefa`='$etiqueta' WHERE `id_tarefa` = $id";
        $resultEdit = mysqli_query($con, $sqlEdit );


    
        $sqlEtiqueta = "SELECT  `nome_etiqueta` FROM `etiquetas` WHERE `id_etiqueta` =  $etiqueta";
        $resultEtiqueta = mysqli_query($con, $sqlEtiqueta );

        if($resultEtiqueta){

            $response= mysqli_fetch_assoc($resultEtiqueta);
            echo json_encode($response );
        }

    }



    if(isset($_POST['removerId'])){

        $id = json_decode($_POST['removerId'], true);
        
        echo "remove" . $id;
    
        $delete_sql = "DELETE FROM `tarefa` WHERE id_tarefa=$id";

        $result_remove = mysqli_query($con, $delete_sql);

        echo "ok";
        

    }

?>




