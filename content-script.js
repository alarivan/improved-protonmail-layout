const targetNode = document.querySelector(".app-root");
const observerOptions = {
  childList: true,
  attributes: false,
  subtree: true
}

function callback(mutationList, observer) {
  mutationList.forEach( (mutation) => {
    if(mutation.type === 'childList') {
      const node = mutation.addedNodes[0] || mutation.removedNodes[0];;
      if(node && node.classList && node.classList.contains("composer")) {
        const actionType = mutation.addedNodes.length ? "added" : "removed"; 
        switch (actionType) {
          case 'added':
              const contentNode = document.querySelector(".main-area--with-toolbar")  
              const newWidth = contentNode.offsetWidth - node.offsetWidth - 30;
              contentNode.style.width = `${newWidth}px`;
            break;
          case 'removed':
              const contentNode = document.querySelector(".main-area--with-toolbar")  
              contentNode.style.width = "";
            break;
        }
      }
    }
  });
}

if(window.innerWidth >= 1440) {
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, observerOptions);
}
