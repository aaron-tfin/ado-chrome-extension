console.log(`here I am you goose.`);

(() => {
  const allGitLinks = [...document.querySelectorAll(`div[id="SourceCard"] a[href*="/_git/"i]`)];

  const gitRepo = allGitLinks.filter((el) => {
    if (`${el.getAttribute('href')}`.includes(`/_git/ADOPipelines`)) { return false; }
    if (`${el.getAttribute('aria-label')}`.startsWith(`Repository `)) { return true; }
  }).map((el) => `${el.textContent}`);
  console.log(gitRepo);

  const gitBranch = allGitLinks.filter((el) => {
    if (`${el.getAttribute('href')}`.includes(`/_git/ADOPipelines`)) { return false; }
    if (!`${el.getAttribute('href')}`.includes(gitRepo[0])) { return false; }
    if (`${el.getAttribute('aria-label')}`.startsWith(`Branch `)) { return true; }
  }).map((el) => `${el.textContent}`);
  console.log(gitBranch);

  const gitCommit = allGitLinks.filter((el) => {
    if (`${el.getAttribute('href')}`.includes(`/_git/ADOPipelines`)) { return false; }
    if (!`${el.getAttribute('href')}`.includes(gitRepo[0])) { return false; }
    if (!`${el.getAttribute('href')}`.includes(`/commit/`)) { return false; }
    if (`${el.getAttribute('aria-label')}`.startsWith(`Source `)) { return true; }
  }).map((el) => `${el.textContent}`);

  console.log(gitCommit);


  const buildPipelineId = [...document.querySelectorAll(`div[aria-label^="Automatically triggered by"] a[href*="/_build/results"i]`)]
    .map((el) => `${el.textContent}`.split('BuildPipeline/').join(''));
  console.log(buildPipelineId);


  const cssClass = `lk2j3rlk2jrlkjfwlakfjasljfsdlkfjwoirj23oirjwoefjweoifjweaof`;
  let currentEl = document.querySelector(`.${cssClass}`);
  const showDataEl = currentEl || document.createElement('pre');
  if (!currentEl) {
    document.body.appendChild(showDataEl);
  }

  showDataEl.outerHTML = `
  <pre 
  class="${cssClass}"
  style="
  position: fixed; 
  z-index: 9999999; 
  bottom: 0px; left: 0px; 
  padding: 20px;
  padding-bottom: 0;
  margin: 0;
  background: black; 
  color: lime;
  ">

Repo:
${gitRepo}

Branch:
${gitBranch}

Commit:
${gitCommit}

Build Pipeline:
${buildPipelineId}



</pre>
  `;


  console.log(`-----------------`);
})();
