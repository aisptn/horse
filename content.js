(function () {
  "use strict";

  
  const overlay = document.createElement("div");
  overlay.id = "horse-overlay";

  
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("horse.jpeg");
  img.draggable = false;

  overlay.appendChild(img);
  document.documentElement.appendChild(overlay);

  
  const DURATION = 120000;
  const INTERVAL = 50; 
  const startTime = performance.now();

  const timer = setInterval(() => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / DURATION, 1);
    overlay.style.setProperty("opacity", progress.toString(), "important");

    if (progress >= 1) {
      clearInterval(timer);
      
      overlay.style.setProperty("pointer-events", "all", "important");
    }
  }, INTERVAL);

  

  
  const protectNode = () => {
    if (!document.documentElement.contains(overlay)) {
      document.documentElement.appendChild(overlay);
    }
  };

  
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const removed of mutation.removedNodes) {
        if (removed === overlay || (removed.contains && removed.contains(overlay))) {
          
          queueMicrotask(protectNode);
        }
      }
    }
    
    protectNode();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  
  const styleObserver = new MutationObserver(() => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / DURATION, 1);

    overlay.style.setProperty("position", "fixed", "important");
    overlay.style.setProperty("top", "0", "important");
    overlay.style.setProperty("left", "0", "important");
    overlay.style.setProperty("width", "100vw", "important");
    overlay.style.setProperty("height", "100vh", "important");
    overlay.style.setProperty("z-index", "2147483647", "important");
    overlay.style.setProperty("display", "block", "important");
    overlay.style.setProperty("visibility", "visible", "important");
    overlay.style.setProperty("opacity", progress.toString(), "important");
  });

  styleObserver.observe(overlay, {
    attributes: true,
    attributeFilter: ["style", "class", "id", "hidden"],
  });

  
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child === overlay) {
      return child; 
    }
    return originalRemoveChild.call(this, child);
  };

  const originalRemove = Element.prototype.remove;
  Element.prototype.remove = function () {
    if (this === overlay) {
      return; 
    }
    return originalRemove.call(this);
  };

  
  const originalSetAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, value) {
    if (this === overlay && (name === "style" || name === "hidden" || name === "class")) {
      return; 
    }
    return originalSetAttribute.call(this, name, value);
  };

  
  const desc = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
  if (desc && desc.set) {
    const originalInnerHTMLSet = desc.set;
    Object.defineProperty(Element.prototype, "innerHTML", {
      set: function (val) {
        if (this === document.documentElement || this === document.body) {
          originalInnerHTMLSet.call(this, val);
          queueMicrotask(protectNode);
          return;
        }
        originalInnerHTMLSet.call(this, val);
      },
      get: desc.get,
      configurable: true,
    });
  }
})();