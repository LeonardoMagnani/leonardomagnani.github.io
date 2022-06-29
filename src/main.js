$('.owl-carousel').owlCarousel({
  loop:true,
  
  margin:5,
  nav:false,
  responsive:{
      0:{
          items:1
      },
      600:{
          items:3
      },
      1000:{
          items:4
      }
  }
})

// let projectItem = document.getElementsByClassName('projects-infos');

let projectItem = document.querySelectorAll('.projects-infos');
let projectHover = document.querySelectorAll('.projects-hover');

for (let i = 0; i <= projectItem.length; i++) {
    if (!projectItem[i]) continue;
    projectItem[i].addEventListener('mouseover', isOver);
    projectHover[i].addEventListener('mouseout', isOut);
}



function isOver (e) {
    let projectItemMouseOver = {
        element: document.getElementsByClassName('projects-hover'),
        elementId: e.path[2].id
    };
    // if (!projectItemMouseOver.elementId) return;  

    switch (projectItemMouseOver.elementId) {
        case 'projInfo1':
            projectItemMouseOver.element[0].style.display = 'flex';
        break;
        case 'projInfo2':
            projectItemMouseOver.element[1].style.display = 'flex';
        break;
        case 'projInfo3':
            projectItemMouseOver.element[2].style.display = 'flex';
        break;
        case 'projInfo4':
            projectItemMouseOver.element[3].style.display = 'flex';
        break;
        case 'projInfo5':
            projectItemMouseOver.element[4].style.display = 'flex';
        break;
        case 'projInfo6':
            projectItemMouseOver.element[5].style.display = 'flex';
        break;
        case 'projInfo7':
            projectItemMouseOver.element[6].style.display = 'flex';
        break;
        case 'projInfo8':
            projectItemMouseOver.element[7].style.display = 'flex';
        break;
        case 'projInfo9':
            projectItemMouseOver.element[8].style.display = 'flex';
        break;
        case 'proj-10':
            projectItemMouseOver.element[9].style.display = 'flex';
        break;

    }
}

function isOut (e) {
    let projectItemMouseOver = {
        element: document.getElementsByClassName('projects-hover'),
        elementId: e.path[1].id
    };


    switch (projectItemMouseOver.elementId) {
        case 'projInfo1':
            projectItemMouseOver.element[0].style.display = 'none';
        break;
        case 'projInfo2':
            projectItemMouseOver.element[1].style.display = 'none';
        break;
        case 'projInfo3':
            projectItemMouseOver.element[2].style.display = 'none';
        break;
        case 'projInfo4':
            projectItemMouseOver.element[3].style.display = 'none';
        break;
        case 'projInfo5':
            projectItemMouseOver.element[4].style.display = 'none';
        break;
        case 'projInfo6':
            projectItemMouseOver.element[5].style.display = 'none';
        break;
        case 'projInfo7':
            projectItemMouseOver.element[6].style.display = 'none';
        break;
        case 'projInfo8':
            projectItemMouseOver.element[7].style.display = 'none';
        break;
        case 'projInfo9':
            projectItemMouseOver.element[8].style.display = 'none';
        break;
        case 'proj-10':
            projectItemMouseOver.element[9].style.display = 'none';
        break;
    }
}