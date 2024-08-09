<?php

include('db_config.php');

    $sqlTarefas = "SELECT estagio.id_estagio, estagio.nome_estagio, tarefa.id_tarefa, tarefa.titulo_tarefa, tarefa.index, etiquetas.id_etiqueta, etiquetas.nome_etiqueta 
                   FROM estagio 
                   LEFT JOIN tarefa ON estagio.id_estagio = tarefa.id_estagio_tarefa 
                   LEFT JOIN etiquetas ON etiquetas.id_etiqueta = tarefa.id_etiqueta_tarefa
                   ORDER BY estagio.id_estagio ASC";
    $resultTarefas = mysqli_query($con, $sqlTarefas);
    
    while ($array= mysqli_fetch_array($resultTarefas)){
        $id = $array['id_tarefa'];
        $titulo= $array['titulo_tarefa'];
        $etiqueta= $array['nome_etiqueta'];
        $etiquetaId= $array['id_etiqueta'];
        $estagio= $array['nome_estagio'];
        $estagioId= $array['id_estagio'];
        $index= $array['index'];


        if (!isset($tarefasPorEstagio[$estagio])) {
            $tarefasPorEstagio[$estagio] = [];
        }
        $tarefasPorEstagio[$estagio][] = ['id' => $id, 'titulo' => $titulo, 'etiqueta' => $etiqueta, 'etiquetaId' => $etiquetaId, 'estagioId' => $estagioId, 'index' => $index];
       
        
    }



?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
        
    <title>Tarefas</title>

    <link rel="stylesheet" href="style.css">
    <!-- Incluir o CDN do SortableJS -->
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>

    <script src=" https://cdn.jsdelivr.net/npm/sweetalert2@11.10.2/dist/sweetalert2.all.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11.10.2/dist/sweetalert2.min.css" rel="stylesheet">
</head>
<body>

 
    <h1>
        <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12.7499C12 12.9488 11.921 13.1395 11.7803 13.2802C11.6397 13.4208 11.4489 13.4999 11.25 13.4999H5.25C5.05109 13.4999 4.86032 13.4208 4.71967 13.2802C4.57902 13.1395 4.5 12.9488 4.5 12.7499C4.5 12.551 4.57902 12.3602 4.71967 12.2195C4.86032 12.0789 5.05109 11.9999 5.25 11.9999H11.25C11.4489 11.9999 11.6397 12.0789 11.7803 12.2195C11.921 12.3602 12 12.551 12 12.7499ZM11.25 8.99986H5.25C5.05109 8.99986 4.86032 9.07888 4.71967 9.21953C4.57902 9.36019 4.5 9.55095 4.5 9.74986C4.5 9.94878 4.57902 10.1395 4.71967 10.2802C4.86032 10.4208 5.05109 10.4999 5.25 10.4999H11.25C11.4489 10.4999 11.6397 10.4208 11.7803 10.2802C11.921 10.1395 12 9.94878 12 9.74986C12 9.55095 11.921 9.36019 11.7803 9.21953C11.6397 9.07888 11.4489 8.99986 11.25 8.99986ZM16.5 2.99986V18.7499C16.5 19.1477 16.342 19.5292 16.0607 19.8105C15.7794 20.0918 15.3978 20.2499 15 20.2499H1.5C1.10218 20.2499 0.720644 20.0918 0.43934 19.8105C0.158035 19.5292 0 19.1477 0 18.7499V2.99986C0 2.60204 0.158035 2.22051 0.43934 1.9392C0.720644 1.6579 1.10218 1.49986 1.5 1.49986H4.89937C5.32079 1.02804 5.83709 0.650543 6.4145 0.392075C6.9919 0.133607 7.61738 0 8.25 0C8.88262 0 9.5081 0.133607 10.0855 0.392075C10.6629 0.650543 11.1792 1.02804 11.6006 1.49986H15C15.3978 1.49986 15.7794 1.6579 16.0607 1.9392C16.342 2.22051 16.5 2.60204 16.5 2.99986ZM5.25 4.49986H11.25C11.25 3.70421 10.9339 2.94115 10.3713 2.37854C9.80871 1.81593 9.04565 1.49986 8.25 1.49986C7.45435 1.49986 6.69129 1.81593 6.12868 2.37854C5.56607 2.94115 5.25 3.70421 5.25 4.49986ZM15 2.99986H12.4922C12.6628 3.48157 12.75 3.98884 12.75 4.49986V5.24986C12.75 5.44878 12.671 5.63954 12.5303 5.78019C12.3897 5.92085 12.1989 5.99986 12 5.99986H4.5C4.30109 5.99986 4.11032 5.92085 3.96967 5.78019C3.82902 5.63954 3.75 5.44878 3.75 5.24986V4.49986C3.75002 3.98884 3.83721 3.48157 4.00781 2.99986H1.5V18.7499H15V2.99986Z" fill="black"/>
        </svg>
            

        Lista de Tarefas
    </h1>

  
    
    <div class="container">
       
     <?php
        foreach ($tarefasPorEstagio as $estagio => $tarefas) {
        
            $estagioId = !empty($tarefas) ? $tarefas[0]['estagioId'] : '';
            
            echo '<div class="coluna-estagio tabcontent" id="' . htmlspecialchars($estagio) . '-coluna" data-id="'.htmlspecialchars ($estagioId).'">
                <div class="header-coluna">
                    <h2>' . htmlspecialchars($estagio) . '</h2>
                    <button class="add-btn" onclick="openAddModal(\'' . htmlspecialchars($estagioId) . '\')">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 7.5C15 7.66576 14.9342 7.82473 14.8169 7.94194C14.6997 8.05915 14.5408 8.125 14.375 8.125H8.125V14.375C8.125 14.5408 8.05915 14.6997 7.94194 14.8169C7.82473 14.9342 7.66576 15 7.5 15C7.33424 15 7.17527 14.9342 7.05806 14.8169C6.94085 14.6997 6.875 14.5408 6.875 14.375V8.125H0.625C0.45924 8.125 0.300269 8.05915 0.183058 7.94194C0.0658481 7.82473 0 7.66576 0 7.5C0 7.33424 0.0658481 7.17527 0.183058 7.05806C0.300269 6.94085 0.45924 6.875 0.625 6.875H6.875V0.625C6.875 0.45924 6.94085 0.300269 7.05806 0.183058C7.17527 0.0658481 7.33424 0 7.5 0C7.66576 0 7.82473 0.0658481 7.94194 0.183058C8.05915 0.300269 8.125 0.45924 8.125 0.625V6.875H14.375C14.5408 6.875 14.6997 6.94085 14.8169 7.05806C14.9342 7.17527 15 7.33424 15 7.5Z" fill="#747474"/>
                        </svg>
                    </button>
                </div>
                <ul id="' . htmlspecialchars($estagio) . '"  data-id="'.htmlspecialchars ($estagioId).'">';
            
            foreach ($tarefas as $tarefa) {
                
                if ($tarefa['id'] !== null) {



                 echo '<li class="card" data-index="' . htmlspecialchars($tarefa['index']) . '" data-status="' . htmlspecialchars($estagio) . '" data-id="' . htmlspecialchars($tarefa['id']) . '">
                        <div class="menu-card-container">
                            <button class="open-card-option">
                                <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="2" cy="2" r="2" fill="#868686"/>
                                    <circle cx="2" cy="9" r="2" fill="#868686"/>
                                    <circle cx="2" cy="16" r="2" fill="#868686"/>
                                </svg>
                                    
                            </button>
                            <div class="menu-card">
                                <button class="btnEditar" data-id="' . htmlspecialchars($tarefa['id']) . '">
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.6484 3.70318L11.2974 0.351555C11.186 0.2401 11.0537 0.151688 10.908 0.0913673C10.7624 0.0310468 10.6064 0 10.4488 0C10.2911 0 10.1351 0.0310468 9.98946 0.0913673C9.84385 0.151688 9.71155 0.2401 9.60012 0.351555L0.35176 9.6002C0.239843 9.71122 0.151113 9.84338 0.0907264 9.989C0.03034 10.1346 -0.000497585 10.2908 6.07128e-06 10.4484V13.8C6.07128e-06 14.1183 0.126436 14.4235 0.351482 14.6485C0.576528 14.8736 0.881756 15 1.20002 15H4.55181C4.70946 15.0005 4.86563 14.9697 5.01125 14.9093C5.15687 14.8489 5.28904 14.7602 5.40007 14.6483L14.6484 5.40036C14.7599 5.28893 14.8483 5.15664 14.9086 5.01104C14.969 4.86543 15 4.70937 15 4.55177C15 4.39417 14.969 4.23811 14.9086 4.0925C14.8483 3.9469 14.7599 3.81461 14.6484 3.70318ZM1.44827 10.2002L7.8001 3.84867L9.05186 5.10037L2.70004 11.4511L1.44827 10.2002ZM1.20002 11.6484L3.3518 13.8H1.20002V11.6484ZM4.80006 13.5518L3.5483 12.3001L9.90012 5.94859L11.1519 7.20029L4.80006 13.5518ZM12.0001 6.35208L8.64836 3.00045L10.4484 1.20052L13.8002 4.55139L12.0001 6.35208Z" fill="black"/>
                                    </svg>
                                        
                                        
                        
                                    Editar
                                </button>
                                <button class="btnRemover" data-id="' . htmlspecialchars($tarefa['id']) . '">
                                    <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.58333 1.53846H7.5V1.15385C7.5 0.847827 7.3683 0.554342 7.13388 0.337954C6.89946 0.121566 6.58152 0 6.25 0H3.75C3.41848 0 3.10054 0.121566 2.86612 0.337954C2.6317 0.554342 2.5 0.847827 2.5 1.15385V1.53846H0.416667C0.30616 1.53846 0.200179 1.57898 0.122039 1.65111C0.0438988 1.72324 0 1.82107 0 1.92308C0 2.02508 0.0438988 2.12291 0.122039 2.19504C0.200179 2.26717 0.30616 2.30769 0.416667 2.30769H0.833333V9.23077C0.833333 9.43478 0.921131 9.63044 1.07741 9.7747C1.23369 9.91896 1.44565 10 1.66667 10H8.33333C8.55435 10 8.76631 9.91896 8.92259 9.7747C9.07887 9.63044 9.16667 9.43478 9.16667 9.23077V2.30769H9.58333C9.69384 2.30769 9.79982 2.26717 9.87796 2.19504C9.9561 2.12291 10 2.02508 10 1.92308C10 1.82107 9.9561 1.72324 9.87796 1.65111C9.79982 1.57898 9.69384 1.53846 9.58333 1.53846ZM3.33333 1.15385C3.33333 1.05184 3.37723 0.954011 3.45537 0.881882C3.53351 0.809753 3.63949 0.769231 3.75 0.769231H6.25C6.36051 0.769231 6.46649 0.809753 6.54463 0.881882C6.62277 0.954011 6.66667 1.05184 6.66667 1.15385V1.53846H3.33333V1.15385ZM8.33333 9.23077H1.66667V2.30769H8.33333V9.23077ZM4.16667 4.23077V7.30769C4.16667 7.4097 4.12277 7.50753 4.04463 7.57966C3.96649 7.65179 3.86051 7.69231 3.75 7.69231C3.63949 7.69231 3.53351 7.65179 3.45537 7.57966C3.37723 7.50753 3.33333 7.4097 3.33333 7.30769V4.23077C3.33333 4.12876 3.37723 4.03093 3.45537 3.95881C3.53351 3.88668 3.63949 3.84615 3.75 3.84615C3.86051 3.84615 3.96649 3.88668 4.04463 3.95881C4.12277 4.03093 4.16667 4.12876 4.16667 4.23077ZM6.66667 4.23077V7.30769C6.66667 7.4097 6.62277 7.50753 6.54463 7.57966C6.46649 7.65179 6.36051 7.69231 6.25 7.69231C6.13949 7.69231 6.03351 7.65179 5.95537 7.57966C5.87723 7.50753 5.83333 7.4097 5.83333 7.30769V4.23077C5.83333 4.12876 5.87723 4.03093 5.95537 3.95881C6.03351 3.88668 6.13949 3.84615 6.25 3.84615C6.36051 3.84615 6.46649 3.88668 6.54463 3.95881C6.62277 4.03093 6.66667 4.12876 6.66667 4.23077Z" fill="black"/>
                                    </svg>
                                        
                                    Excluir
                                </button>
                               

                              
                            </div>
                        </div>
                        <p class="etiqueta" data-id="'.htmlspecialchars ($tarefa['etiquetaId']).'" ><span></span>' . htmlspecialchars($tarefa['etiqueta']) . '</p>
                        <p class="titulo-tarefa">' . htmlspecialchars($tarefa['titulo']) . '</p>
                    
                    </li>';
                }
            }
            
            echo '</ul></div>';
        }
 


    ?>

      
    </div>


   
 
   
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="./script.js"></script>
</body>
</html>
