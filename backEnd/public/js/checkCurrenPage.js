
var links = document.querySelectorAll(".header__admin a");
var currentURL = window.location.href;
  for (var i = 0; i < links.length; i++) {
    if (links[i].href === currentURL) {
        links[i].classList.add("current_page");
    } else if (currentURL.includes("the-loai-tin-tuc")) {
        links[7].classList.add("current_page");
    } else if (currentURL.includes("tin-tuc")) {
        links[8].classList.add("current_page");
    }
  }