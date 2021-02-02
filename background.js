chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.change == 'changeBackground') {
      alert('ok');
      chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="green"'
      });
      // const div = document.createElement('div');
      // div.setAttribute('style', {background: '#655b5b'});
      // document.body.style.background = '#655b5b';
      sendResponse({ status: 'ok'})
    }
  }
);
