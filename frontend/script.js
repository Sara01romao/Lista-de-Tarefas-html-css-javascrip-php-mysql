  // Inicializar o SortableJS
  var inicio= document.getElementById('inicio');
  var fazendo = document.getElementById('fazendo');
  var concluido = document.getElementById('concluido');


//   new Sortable(inicio, {
//       group: 'shared', 
//       animation: 150
//   });

//   new Sortable(fazendo, {
//       group: 'shared',
//       animation: 150
//   });
//   new Sortable(concluido, {
//       group: 'shared',
//       animation: 150
//   });

  new Sortable(inicio, {
    group: 'shared', 
    animation: 150,
    onStart: function () {
        document.body.classList.add('dragging');
    },
    onEnd: function () {
        document.body.classList.remove('dragging');
    }
});

new Sortable(fazendo, {
    group: 'shared',
    animation: 150,
    onStart: function () {
        document.body.classList.add('dragging');
    },
    onEnd: function () {
        document.body.classList.remove('dragging');
    }
});

new Sortable(concluido, {
    group: 'shared',
    animation: 150,
    onStart: function () {
        document.body.classList.add('dragging');
    },
    onEnd: function () {
        document.body.classList.remove('dragging');
    }
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
  console.table(btnsOpen)
  
 
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
  
