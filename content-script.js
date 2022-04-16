const GAP = 15;

const targetNode = document.querySelector(".app-root");
const observerOptions = {
  childList: true,
  attributes: false,
  subtree: true,
};

function getToolbarHeight() {
  const header = document.querySelector("header.header");
  const navToolbar = document.querySelector("nav.toolbar");
  if (header && navToolbar) {
    return header.offsetHeight + navToolbar.offsetHeight;
  }

  return 0;
}

function callback(mutationList, observer) {
  mutationList.forEach((mutation) => {
    if (mutation.type === "childList") {
      const node = mutation.addedNodes[0] || mutation.removedNodes[0];
      if (node && node.classList && node.classList.contains("composer")) {
        const actionType = mutation.addedNodes.length ? "added" : "removed";
        switch (actionType) {
          case "added": {
            const contentNode = document.querySelector(
              ".main-area--with-toolbar"
            );
            const newWidth = contentNode.offsetWidth - node.offsetWidth - 30;
            contentNode.style.width = `${newWidth}px`;
            const minHeight = window.innerHeight - getToolbarHeight() - GAP;
            node.style["max-height"] = `${minHeight}px`;
            node.style.height = `100%`;
            break;
          }
          case "removed": {
            const contentNode = document.querySelector(
              ".main-area--with-toolbar"
            );
            contentNode.style.width = "";
            node.style["min-height"] = "";
            node.style.height = "";
            break;
          }
        }
      }
    }
  });
}

if (window.innerWidth >= 1440) {
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, observerOptions);
}
