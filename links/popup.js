// chrome.bookmarks.create(
//   {'parentId': '1','title': 'My Links bookmarks'},
//   function(newFolder) {}
// );
var bookmarksBarFolderId = '1';
var myLinksFolder = null;

var addBookmarksToView = function() {
  chrome.bookmarks.getChildren(bookmarksBarFolderId, function(bookmarksBarChildren) {
    setMyLinksFolder(bookmarksBarChildren);
    createBookmarkListItems(myLinksFolder);
  });
};

var setMyLinksFolder = function(bookmarksBarChildren) {
  for (var i = bookmarksBarChildren.length - 1; i >= 0; i--) {
    if (bookmarksBarChildren[i].title === "My Links bookmarks") {
      myLinksFolder = bookmarksBarChildren[i];
    }
  }
};

var createBookmarkListItems = function(folder) {
  var list = document.createElement('ul');

  chrome.bookmarks.getChildren(folder.id, function(bookmarks) {
    for (var i = 0; i < bookmarks.length; i++) {
      // link = $("<a>", {href: bookmarks[i].url, target: "_blank", text: bookmarks[i].title, class: 'bookmark'});
      // $('body').append(link);

      var link = document.createElement('a');
      link.href = bookmarks[i].url;
      link.target = "_blank"
      link.textContent = bookmarks[i].title;
      link.addEventListener('click', function(evt) {
        chrome.tabs.create({url: evt.target.href});
        evt.preventDefault();
      });
      document.body.appendChild(link);
    }

    // $('a.bookmark').click(function(evt) {
    //   chrome.tabs.create({url: $(evt.target).attr('href')});
    // });
  });
};

document.addEventListener('DOMContentLoaded', function () {
  addBookmarksToView();
});
