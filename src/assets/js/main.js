addEventListener('load', initEventsDOM);

function initEventsDOM() {
  //open and close the window to full width
  const listButtonOpen = document.querySelectorAll('.open');
  listButtonOpen.forEach((item) => {
    item.addEventListener('click', function(event) {
      //define an object button
      let target;
      if(event.target.tagName === 'BUTTON') {
        target = event.target;
      };
      if(event.target.tagName === 'I') {
        target = event.target.parentElement;
      };
      //selection of modules for processing
      const listHiddenModule = document.querySelectorAll('.wrap-data .widget');
      //hidden and full width
      if(!target.classList.contains('close')) {
        //hidden elements
        listHiddenModule.forEach((item) => {
          item.classList.toggle('window-hidden');
        });
        //element active full width
        target.parentElement.classList.toggle('full-width');
        target.innerHTML = '<i class="material-icons">close</i>';
        target.classList.toggle('close');
      } else {
        //close the window that is full width
        target.classList.toggle('close');
        target.parentElement.classList.toggle('full-width');
        target.innerHTML = '<i class="material-icons">zoom_out_map</i>';
        listHiddenModule.forEach((item) => {
          item.classList.toggle('window-hidden');
        });
      }
    })
  });
}
