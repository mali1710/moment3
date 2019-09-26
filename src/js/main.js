$(document).ready(function() {
  $(".navbar-toggle").click(function() {
    $(".main-nav").slideToggle(400);
    $(".nav-links").click(function() {
      $(".main-nav").slideUp();
    });
  });
});
