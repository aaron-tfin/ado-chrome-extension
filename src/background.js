// background.js

const INJECT_FROM_LOCAL = true;

chrome.action.onClicked.addListener((tab) => {

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: injectScript,
    args: [INJECT_FROM_LOCAL ? chrome.runtime.getURL(`src/injectables/injectable.ts`) : ``]
  });

});

async function injectScript(jsFileUrl, callback) {

  async function serveRemoteFileAsUrl(remoteContentUrl, contentType) {
    const resp = await fetch(remoteContentUrl, { method: 'GET', mode: 'no-cors' });
    if (resp.status != 200) { throw `${resp.status}`; }

    const file = new File([await resp.blob()], remoteContentUrl, { type: contentType || resp.type });
    return URL.createObjectURL(file);
  }

  const script = document.createElement('script');

  script.addEventListener("error", () => {
    console.error(`Failed to load script from ${jsFileUrl}`);
  });

  script.src = jsFileUrl//await serveRemoteFileAsUrl(jsFileUrl, `text/javascript`);

  if (callback && typeof callback === 'function') {
    script.addEventListener("load", () => {
      callback();
    });
    script.addEventListener("error", () => {
      callback(false);
    });
  }

  document.head.parentElement.appendChild(script);
}

