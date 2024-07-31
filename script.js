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
    $('.campo-radio input[name=etiqueta]').prop('checked', false);


    $('.modal.add-tarefa-container h2 span').text('Cadastrar Tarefa')
    $('#edit-icon').css('display','none')
    $('#add-icon').css('display','flex')
    
 }


//abrir modal add
  function openAddModal(estagio){
    $('#colunaEstagio').val(estagio)
    $('.modal.add-tarefa-container').css('display','flex')

    
  } 



//fechar modal
  $(".btnClose").click(function(){
  
     $('.modal.add-tarefa-container').css('display','none')
     limpaCampo()
     
  });


 
// salvar
  $("#add-salvar").click(function(){
    const tituloTxt = document.getElementById("titulo").value;
    const colunaEstagio = document.getElementById("colunaEstagio").value; 
    const etiqueta = document.querySelector(".campo-radio input[name='etiqueta']:checked").value;
    
    
    console.log("campo: ", tituloTxt, "Etiqueta:", etiqueta, "estagio:", colunaEstagio);    
  });



  $(".btnEditar").click(function(){
    $('.menu-card, .open-card-option').removeClass('active');

    $('.modal.add-tarefa-container').css('display','flex')
    $('.modal.add-tarefa-container h2 span').text('Editar Tarefa')
    $('#edit-icon').css('display','flex')
    $('#add-icon').css('display','none')


    const card =  $(this).closest('.card').attr('data-id');
    const estagio =  $(this).closest('ul').attr('id');
    // const etiquetaTxt1 =  $(this).closest('.card').find('.etiqueta').text();
    const tituloTxtEdit =  $(this).closest('.card').find('.titulo-tarefa').text();

    $('#titulo').val(tituloTxtEdit);

    // $(function() {
    //     var $radios = $('input:radio[name=etiqueta]');
    //     if($radios.is(':checked') === false) {
    //         $radios.filter('[value=etiquetaTxt1]').prop('checked', true);
    //     }
    // });
   


  });