$(function () {
  $("a").click(function () {
    $("a").removeClass("active");
    $(this).addClass("active");
  });
});

$(function () {
  $(".hamburger").click(function (e) {
    $(".nav-bar").toggleClass("nav-bar-toggle");
    $(".nav-list").toggleClass("nav-list-toggle");
    e.preventDefault();
  });
});

$(".see-pokemons-btn").click(function (e) {
  document.getElementById("pokedex-section").scrollIntoView();
  e.preventDefault();
});
