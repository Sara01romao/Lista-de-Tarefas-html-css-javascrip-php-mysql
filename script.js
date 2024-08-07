function updateDataStatus(event) {
    const item = event.item; 
    // const newContainerId = event.from.id; 
   
    const destinationEstagio = event.to.id; 

    // Atualiza o data-status do card movido
    item.setAttribute('data-status', destinationEstagio);

    

   
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
 
  
 
  $(document).on('click', '.open-card-option', function() {
    var $menuCard = $(this).next('.menu-card');
    var $openCardOption = $(this);

    // Remove 'active' class from all '.menu-card' and '.open-card-option'
    $(".menu-card, .open-card-option").removeClass('active');

    if (!$menuCard.hasClass('active')) {
        // Add 'active' class to clicked elements
        $menuCard.addClass('active');
        $openCardOption.addClass('active');
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


 function openAddModal(estagio) {
  $('#colunaEstagio').val(estagio);

  Swal.fire({
      html: `
          <div class="add-tarefa-modal">
              <h2>
                  <svg width="20" id="add-icon" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <!-- SVG paths -->
                  </svg>
                  <svg width="19" id="edit-icon" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <!-- SVG paths -->
                  </svg>
                  <span>Cadastrar Tarefa</span>
              </h2>
              <form action="">
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
      preConfirm: () => {
          const tituloTxt = document.getElementById("titulo").value;
          const colunaEstagio = document.getElementById("colunaEstagio").value;
          const etiqueta = document.getElementById("etiqueta-campo").value;

          if (tituloTxt === '') {
              Swal.showValidationMessage(`
                  <small>Preencha os campos corretamente</small>
              `);
              return false;
          }

          var objTarefa = {
              "titulo": tituloTxt,
              "etiqueta": etiqueta,
              "estagio": colunaEstagio,
          };

          console.log(objTarefa);
          return objTarefa;
      },
  }).then((result) => {
      if (result.isConfirmed) {
          var dataCreate = result.value;

          $.ajax({
              url: 'api.php',
              type: 'post',
              data: { dataCreate: JSON.stringify(dataCreate) },
              success: function (response) {
                  var tarefaNova = JSON.parse(response);
                  var id = tarefaNova.id_estagio;
                  console.log(id, "id");

                  var novoCard = `

                    <li class="card" data-status="${tarefaNova.nome_estagio}" data-id="${tarefaNova.id_tarefa}">
                     <div class="menu-card-container">
                        <button class="open-card-option">
                              <img src="Vector.svg" alt="menu-card">
                                
                        </button>
                        <div class="menu-card">
                            <button class="btnEditar" data-id="${tarefaNova.id_tarefa}">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.6484 3.70318L11.2974 0.351555C11.186 0.2401 11.0537 0.151688 10.908 0.0913673C10.7624 0.0310468 10.6064 0 10.4488 0C10.2911 0 10.1351 0.0310468 9.98946 0.0913673C9.84385 0.151688 9.71155 0.2401 9.60012 0.351555L0.35176 9.6002C0.239843 9.71122 0.151113 9.84338 0.0907264 9.989C0.03034 10.1346 -0.000497585 10.2908 6.07128e-06 10.4484V13.8C6.07128e-06 14.1183 0.126436 14.4235 0.351482 14.6485C0.576528 14.8736 0.881756 15 1.20002 15H4.55181C4.70946 15.0005 4.86563 14.9697 5.01125 14.9093C5.15687 14.8489 5.28904 14.7602 5.40007 14.6483L14.6484 5.40036C14.7599 5.28893 14.8483 5.15664 14.9086 5.01104C14.969 4.86543 15 4.70937 15 4.55177C15 4.39417 14.969 4.23811 14.9086 4.0925C14.8483 3.9469 14.7599 3.81461 14.6484 3.70318ZM1.44827 10.2002L7.8001 3.84867L9.05186 5.10037L2.70004 11.4511L1.44827 10.2002ZM1.20002 11.6484L3.3518 13.8H1.20002V11.6484ZM4.80006 13.5518L3.5483 12.3001L9.90012 5.94859L11.1519 7.20029L4.80006 13.5518ZM12.0001 6.35208L8.64836 3.00045L10.4484 1.20052L13.8002 4.55139L12.0001 6.35208Z" fill="black"/>
                                </svg>
                                    
                                    
                    
                                Editar
                            </button>
                            <button data-id="${tarefaNova.id_tarefa}">
                                <svg width="15" height="15" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.58333 1.53846H7.5V1.15385C7.5 0.847827 7.3683 0.554342 7.13388 0.337954C6.89946 0.121566 6.58152 0 6.25 0H3.75C3.41848 0 3.10054 0.121566 2.86612 0.337954C2.6317 0.554342 2.5 0.847827 2.5 1.15385V1.53846H0.416667C0.30616 1.53846 0.200179 1.57898 0.122039 1.65111C0.0438988 1.72324 0 1.82107 0 1.92308C0 2.02508 0.0438988 2.12291 0.122039 2.19504C0.200179 2.26717 0.30616 2.30769 0.416667 2.30769H0.833333V9.23077C0.833333 9.43478 0.921131 9.63044 1.07741 9.7747C1.23369 9.91896 1.44565 10 1.66667 10H8.33333C8.55435 10 8.76631 9.91896 8.92259 9.7747C9.07887 9.63044 9.16667 9.43478 9.16667 9.23077V2.30769H9.58333C9.69384 2.30769 9.79982 2.26717 9.87796 2.19504C9.9561 2.12291 10 2.02508 10 1.92308C10 1.82107 9.9561 1.72324 9.87796 1.65111C9.79982 1.57898 9.69384 1.53846 9.58333 1.53846ZM3.33333 1.15385C3.33333 1.05184 3.37723 0.954011 3.45537 0.881882C3.53351 0.809753 3.63949 0.769231 3.75 0.769231H6.25C6.36051 0.769231 6.46649 0.809753 6.54463 0.881882C6.62277 0.954011 6.66667 1.05184 6.66667 1.15385V1.53846H3.33333V1.15385ZM8.33333 9.23077H1.66667V2.30769H8.33333V9.23077ZM4.16667 4.23077V7.30769C4.16667 7.4097 4.12277 7.50753 4.04463 7.57966C3.96649 7.65179 3.86051 7.69231 3.75 7.69231C3.63949 7.69231 3.53351 7.65179 3.45537 7.57966C3.37723 7.50753 3.33333 7.4097 3.33333 7.30769V4.23077C3.33333 4.12876 3.37723 4.03093 3.45537 3.95881C3.53351 3.88668 3.63949 3.84615 3.75 3.84615C3.86051 3.84615 3.96649 3.88668 4.04463 3.95881C4.12277 4.03093 4.16667 4.12876 4.16667 4.23077ZM6.66667 4.23077V7.30769C6.66667 7.4097 6.62277 7.50753 6.54463 7.57966C6.46649 7.65179 6.36051 7.69231 6.25 7.69231C6.13949 7.69231 6.03351 7.65179 5.95537 7.57966C5.87723 7.50753 5.83333 7.4097 5.83333 7.30769V4.23077C5.83333 4.12876 5.87723 4.03093 5.95537 3.95881C6.03351 3.88668 6.13949 3.84615 6.25 3.84615C6.36051 3.84615 6.46649 3.88668 6.54463 3.95881C6.62277 4.03093 6.66667 4.12876 6.66667 4.23077Z" fill="black"/>
                                </svg>
                                    
                                Excluir
                            </button>
                            <button data-id="${tarefaNova.id_tarefa}">
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.8 12.0728L12.073 14.7999C11.945 14.9278 11.7715 14.9997 11.5906 14.9997C11.4097 14.9997 11.2362 14.9278 11.1083 14.7999C10.9803 14.672 10.9085 14.4985 10.9085 14.3175C10.9085 14.1366 10.9803 13.9631 11.1083 13.8352L12.6721 12.2722H0.682306C0.501489 12.2722 0.328079 12.2004 0.200222 12.0725C0.0723656 11.9447 0.000536403 11.7713 0.000536403 11.5905C0.000536403 11.4096 0.0723656 11.2362 0.200222 11.1084C0.328079 10.9805 0.501489 10.9087 0.682306 10.9087H12.6721L11.1083 9.34573C10.9803 9.21781 10.9085 9.0443 10.9085 8.86338C10.9085 8.68246 10.9803 8.50896 11.1083 8.38103C11.2362 8.2531 11.4097 8.18123 11.5906 8.18123C11.7715 8.18123 11.945 8.2531 12.073 8.38103L14.8 11.1081C14.8634 11.1714 14.9137 11.2466 14.948 11.3294C14.9823 11.4121 15 11.5009 15 11.5905C15 11.6801 14.9823 11.7688 14.948 11.8515C14.9137 11.9343 14.8634 12.0095 14.8 12.0728ZM2.92703 6.61866C3.05496 6.74658 3.22847 6.81845 3.40938 6.81845C3.5903 6.81845 3.76381 6.74658 3.89174 6.61866C4.01966 6.49073 4.09153 6.31722 4.09153 6.1363C4.09153 5.95539 4.01966 5.78188 3.89174 5.65395L2.32793 4.091H14.3177C14.4985 4.091 14.6719 4.01917 14.7998 3.89131C14.9276 3.76345 14.9995 3.59004 14.9995 3.40923C14.9995 3.22841 14.9276 3.055 14.7998 2.92714C14.6719 2.79929 14.4985 2.72746 14.3177 2.72746H2.32793L3.89174 1.1645C4.01966 1.03657 4.09153 0.863066 4.09153 0.682149C4.09153 0.501231 4.01966 0.327724 3.89174 0.199797C3.76381 0.071869 3.5903 2.69587e-09 3.40938 0C3.22847 -2.69587e-09 3.05496 0.071869 2.92703 0.199797L0.199954 2.92687C0.136565 2.99019 0.0862789 3.06538 0.0519694 3.14815C0.0176598 3.23091 0 3.31963 0 3.40923C0 3.49882 0.0176598 3.58754 0.0519694 3.6703C0.0862789 3.75307 0.136565 3.82826 0.199954 3.89158L2.92703 6.61866Z" fill="black"/>
                                </svg>
                                Mover
                            </button>
                        </div>
                    </div>
                    <p class="etiqueta" data-id="${tarefaNova.id_etiqueta}" ><span></span> ${tarefaNova.nome_etiqueta} </p>
                    <p class="titulo-tarefa">${tarefaNova.titulo_tarefa}</p>
                   
                </li>




                     
                  `;
                  
                  $(".coluna-estagio ul[data-id='" + id + "']").append(novoCard);
                  
              }
          });
      }
  });
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