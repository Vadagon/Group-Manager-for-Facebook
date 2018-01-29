chrome.storage.sync.get('filters', (data) => {
  const filters = data.filters;
  const container = $('#filters');
  for(filter of filters) {
    container.append(`<a class="filter">${filter.filter}</a>`);
  }
})
$(document).on('click', '.filter', (e) => {
  const filterText = $(e.target).text();
  const limit = $('#limit').val();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'runFilter', filter: filterText, limit: limit}, function(response) {
    });
  });
});
$(document).on('click', '#stop', (e) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'stopFilter'}, function(response) {
    });
  });
});

///////////////
// let state = {
//   stop: false,
//   limit: 0,
//   currnetIndex: 0,
//   filter: 'null',
//   found: 0,
//   deleted: 0
// }
// function changePageTitle(title) {
//   document.title = title;
// }
// function startFilter() {
//   if(state.currnetIndex >= state.limit || state.stop) {
//     return false;
//   }
//   const contentWrapper = $('.userContentWrapper');
//   const userContentWrapper = contentWrapper.find('.userContent');
//   console.log(userContentWrapper.innerHTML);
//
// }
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if(request.action == 'runFilter') {
//       const filter = request.filter;
//       const limit = request.limit;
//       state.limit = limit;
//       state.filter = filter;
//       startFilter();
//       changePageTitle('0/' + request.limit);
//     }
// });
