function updateDataStatus(event) {
    const item = event.item; 
    // const newContainerId = event.from.id; 
   
    const destinationContainerId = event.to.id; 

    // Atualiza o data-status do card movido
    item.setAttribute('data-status', destinationContainerId);

   
}

// Inicializa o Sortable em todos os containers de lista
const containers = document.querySelectorAll('.coluna-estagio ul');
containers.forEach(container => {
    new Sortable(container, {
        group: 'shared',
        animation: 150,
        onEnd: updateDataStatus // Atualiza o data-status após a movimentação
    });
});


  function openColuna(evt, colunaName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(colunaName).style.display = "block";
      evt.currentTarget.className += " active";
  }

  document.getElementById("defaultOpen").click();


  let btnsOpen = document.querySelectorAll(".open-card-option");
 
  
 
  $(".open-card-option").click(function(){
      
      var $menuCard = $(this).next('.menu-card');
      $(".open-card-option").removeClass('active')

      if ($menuCard.hasClass('active')) {
          $menuCard.removeClass('active');
         
          
      } else {
         
          $('.menu-card').removeClass('active');
          $(this).addClass('active')
          $menuCard.addClass('active');
          
      }
  });
 

  $(document).click(function(event) {
      if (!$(event.target).closest('.menu-card, .open-card-option').length) {
          $('.menu-card, .open-card-option').removeClass('active');
      }
  });
  




// limpar campo 
function limpaCampo(){
    document.getElementById("titulo").value='';
    document.getElementById("colunaEstagio").value=""; 
    document.getElementById("etiqueta-campo").value=""; 


    $('.modal.add-tarefa-container h2 span').text('Cadastrar Tarefa')
    $('#edit-icon').css('display','none')
    $('#add-icon').css('display','flex')
    
 }


//abrir modal add
  function openAddModal(estagio){
    $('#colunaEstagio').val(estagio)
    // $('.modal.add-tarefa-container').css('display','flex')


    Swal.fire({
        html: `
            <div class="add-tarefa-modal">
            
            <h2>
                <svg width="20" id="add-icon" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.75C0 0.551088 0.0790178 0.360322 0.21967 0.21967C0.360322 0.0790178 0.551088 0 0.75 0H17.25C17.4489 0 17.6397 0.0790178 17.7803 0.21967C17.921 0.360322 18 0.551088 18 0.75C18 0.948912 17.921 1.13968 17.7803 1.28033C17.6397 1.42098 17.4489 1.5 17.25 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790178 1.13968 0 0.948912 0 0.75ZM0.75 7.5H17.25C17.4489 7.5 17.6397 7.42098 17.7803 7.28033C17.921 7.13968 18 6.94891 18 6.75C18 6.55109 17.921 6.36032 17.7803 6.21967C17.6397 6.07902 17.4489 6 17.25 6H0.75C0.551088 6 0.360322 6.07902 0.21967 6.21967C0.0790178 6.36032 0 6.55109 0 6.75C0 6.94891 0.0790178 7.13968 0.21967 7.28033C0.360322 7.42098 0.551088 7.5 0.75 7.5ZM10.5 12H0.75C0.551088 12 0.360322 12.079 0.21967 12.2197C0.0790178 12.3603 0 12.5511 0 12.75C0 12.9489 0.0790178 13.1397 0.21967 13.2803C0.360322 13.421 0.551088 13.5 0.75 13.5H10.5C10.6989 13.5 10.8897 13.421 11.0303 13.2803C11.171 13.1397 11.25 12.9489 11.25 12.75C11.25 12.5511 11.171 12.3603 11.0303 12.2197C10.8897 12.079 10.6989 12 10.5 12ZM18.75 12H17.25V10.5C17.25 10.3011 17.171 10.1103 17.0303 9.96967C16.8897 9.82902 16.6989 9.75 16.5 9.75C16.3011 9.75 16.1103 9.82902 15.9697 9.96967C15.829 10.1103 15.75 10.3011 15.75 10.5V12H14.25C14.0511 12 13.8603 12.079 13.7197 12.2197C13.579 12.3603 13.5 12.5511 13.5 12.75C13.5 12.9489 13.579 13.1397 13.7197 13.2803C13.8603 13.421 14.0511 13.5 14.25 13.5H15.75V15C15.75 15.1989 15.829 15.3897 15.9697 15.5303C16.1103 15.671 16.3011 15.75 16.5 15.75C16.6989 15.75 16.8897 15.671 17.0303 15.5303C17.171 15.3897 17.25 15.1989 17.25 15V13.5H18.75C18.9489 13.5 19.1397 13.421 19.2803 13.2803C19.421 13.1397 19.5 12.9489 19.5 12.75C19.5 12.5511 19.421 12.3603 19.2803 12.2197C19.1397 12.079 18.9489 12 18.75 12Z" fill="black"/>
                </svg>
                <svg width="19" id="edit-icon" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3103 4.62915L14.1216 0.439461C13.9823 0.300137 13.8169 0.189617 13.6349 0.114213C13.4529 0.03881 13.2578 0 13.0608 0C12.8638 0 12.6687 0.03881 12.4867 0.114213C12.3047 0.189617 12.1393 0.300137 12 0.439461L0.439695 12.0007C0.299801 12.1395 0.188889 12.3047 0.113407 12.4867C0.0379245 12.6688 -0.000621974 12.864 7.58902e-06 13.061V17.2507C7.58902e-06 17.6485 0.158043 18.0301 0.439347 18.3114C0.720652 18.5927 1.10218 18.7507 1.50001 18.7507H5.6897C5.88675 18.7513 6.08197 18.7128 6.26399 18.6373C6.44602 18.5618 6.61122 18.4509 6.75001 18.311L18.3103 6.75071C18.4496 6.61142 18.5602 6.44604 18.6356 6.26403C18.711 6.08202 18.7498 5.88694 18.7498 5.68993C18.7498 5.49292 18.711 5.29784 18.6356 5.11582C18.5602 4.93381 18.4496 4.76844 18.3103 4.62915ZM1.81032 12.7507L9.75001 4.81102L11.3147 6.37571L3.37501 14.3145L1.81032 12.7507ZM1.50001 14.561L4.1897 17.2507H1.50001V14.561ZM6.00001 16.9404L4.43532 15.3757L12.375 7.43602L13.9397 9.00071L6.00001 16.9404ZM15 7.9404L10.8103 3.75071L13.0603 1.50071L17.25 5.68946L15 7.9404Z" fill="black"/>
                </svg>
                    
                <span>
                    Cadastrar Tarefa
                </span>
               
            </h2>
            <form action="" >
                <input type="hidden" value="${estagio}" id="colunaEstagio">
                <div class="campo-container">
                    <label for="">Título</label>
                    <input type="text" id="titulo">
                </div>


                <div class="campo-etiqueta-container">
                    <p>Etiqueta</p>
                    

                    <select name="etiqueta" id="etiqueta-campo">
                        <option value="">Selecionar</option>
                        <option value="1">Fácil</option>
                        <option value="2">Importante</option>
                        <option value="3">Urgente</option>
                    </select>
                     
                </div>
            

            </form>
        </div>
              
            
        `,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText: `
            <i class="fa fa-thumbs-up"></i> Salvar
        `,
      

        preConfirm:()=>{

            const tituloTxt = document.getElementById("titulo").value;
            const colunaEstagio = document.getElementById("colunaEstagio").value; 
            const etiqueta = document.getElementById("etiqueta-campo").value;
            
            
            // console.log("campo: ", tituloTxt, "Etiqueta:", etiqueta, "estagio:", colunaEstagio); 
                  
          
          //  if(tituloTxt == ''   ){
          //   Swal.showValidationMessage(`
          //          <small>"Preencha os campos corretamente"</small>
          //    `);


          var objTarefa = {
                        
            "titulo": tituloTxt ,
            "etiqueta": etiqueta ,
            "estagio": colunaEstagio,
            
          };

           console.log(objTarefa)
           return objTarefa ;
       
        },
         

      
    }).then((result) => {

      if (result.isConfirmed){

        console.table(result)

          var dataCreate = result.value;

          $.ajax({
          url: 'api.php',
          type: 'post',
          data: { dataCreate: JSON.stringify(dataCreate)},



          success: function (response) {
            
              // var clienteResponse = JSON.parse(response);

              
              // var total = clienteResponse.total;
              // $('.total_cliente').text(total)
              
             
              

              // var novoCliente = `
              //     <tr>
              //         <td>${dataCreate.cliente_nome}</td>
              //         <td>${dataCreate.cliente_email}</td>
              //         <td>${dataCreate.cliente_contato}</td>
              //         <td class="d-flex justify-content-between btn-acoes">
              //             <button data-id="${clienteResponse.id}" class='btn-editar btn btn-success btn-sm '>
              //               <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              //                 <path d="M7.38215 2.36727L10.6326 5.61783L3.57442 12.6763L0.67641 12.9962C0.288452 13.0391 -0.0393326 12.7111 0.00383034 12.3231L0.326283 9.42293L7.38215 2.36727ZM12.643 1.88332L11.1168 0.357062C10.6407 -0.119021 9.86859 -0.119021 9.39253 0.357062L7.95673 1.79293L11.2072 5.04349L12.643 3.60762C13.119 3.13129 13.119 2.3594 12.643 1.88332Z" fill="white"/>
              //               </svg>
                            
              //             </button>

              //             <button data-id="${clienteResponse.id}" class='btn-excluir btn btn-danger btn-sm'>
              //               <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              //                   <path d="M2 2L7 7M12 12L7 7M7 7L2 12L12 2" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              //               </svg>
                            
              //             </button>
              //         </td>
              //     </tr>
              // `;
              
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Adicionado com sucesso",
                showConfirmButton: false,
                timer: 1500
              });


            // $("table").append(novoCliente);

            
          }

        });
      }
        
    })


       
    
  } 



//fechar modal
  $(".btnClose").click(function(){
  
     $('.modal.add-tarefa-container').css('display','none')
     limpaCampo()
     
  });


 
// // salvar
//   $("#add-salvar").click(function(){
//     const tituloTxt = document.getElementById("titulo").value;
//     const colunaEstagio = document.getElementById("colunaEstagio").value; 
//     const etiqueta = document.getElementById("etiqueta-campo").value;
    
    
//     console.log("campo: ", tituloTxt, "Etiqueta:", etiqueta, "estagio:", colunaEstagio);    
//   });



  $(".btnEditar").click(function(){
    $('.menu-card, .open-card-option').removeClass('active');

    $('.modal.add-tarefa-container').css('display','flex')
    $('.modal.add-tarefa-container h2 span').text('Editar Tarefa')
    $('#edit-icon').css('display','flex')
    $('#add-icon').css('display','none')




    const card =  $(this).closest('.card').attr('data-id');
    const estagio =  $(this).closest('ul').attr('id');
    const tituloTxtEdit =  $(this).closest('.card').find('.titulo-tarefa').text();
    const etiqueta  =  $(this).closest('.card').find('.etiqueta').text();
    
   $('#etiqueta-campo ').val(etiqueta);
    


   
    $('#titulo').val(tituloTxtEdit);
    // $('#etiqueta-campo').val(tituloTxtEdit);
    // $("#etiqueta-campo option:contains('" + etiqueta + "')").prop('selected', true);
   
   


  });