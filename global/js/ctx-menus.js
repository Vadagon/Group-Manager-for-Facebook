

chrome.contextMenus.create({
  id:"copy",
  title:"Copy",
  contexts:["link"],
  onclick(...args){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "copy"}, (res) => {});
    })
  }
},()=>{});




chrome.contextMenus.create({
  id:"paste",
  title:"Paste",
  contexts:["editable"],
  onclick(...args){
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: "paste"}, (res) => {});
    })
  }
},()=>{});
