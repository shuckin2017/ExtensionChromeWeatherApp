window.onload = () => {
  const btnAction = document.querySelector('.btn-onclick');
  btnAction.addEventListener('click', () => {
    chrome.runtime.sendMessage({ change: "changeBackground"}, response => {
      if(response && response.status == 'ok' ) {
        window.close();
      }
    })
  })
}

