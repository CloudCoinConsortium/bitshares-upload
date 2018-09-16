// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require jquery3
//= require popper
//= require bootstrap
//= require font_awesome5
//= require_tree .

// From https://codepen.io/overdrivemachines/pen/PdEZxZ
// JQuery 3.3.1
// Popper.js 1.14.3. Will not work with 1.14.4
// Bootstrap 4.1.3
// TODO: Replace Popper with Tippyjs
// blue = #338fff
// blue border = #007bff
// https://www.flaticon.com/search?style_id=14
// 
// Load Order:
// 1) Turbolinks:load
// 2) JQuery Ready
// 3) Window Load
// 
// When Using turbo links:
// 1) Turbolinks:load

console.log("Top of JS");
var firstLoad = true;

$(function() {
  console.log("JQuery Ready function");
  onPageLoad();
});
function onPageLoad() {
  // Stop playing video when Modal is closed
  //https://youtu.be/dQw4w9WgXcQ
  $youtubeModal = $("#videoModal");
  $youtubeModal.on("hidden.bs.modal", function() {
    var $this = $(this).find("iframe"),
      tempSrc = $this.attr("src");
    $this.attr("src", "");
    $this.attr("src", tempSrc);
  });

  //   Input File...
  $(".inputfile").each(function() {
    var $input = $(this),
      $label = $input.next("label"),
      labelVal = $label.html();

    $input.on("change", function(e) {
      var fileName = "";

      if (this.files && this.files.length > 1)
        fileName = (this.getAttribute("data-multiple-caption") || "").replace(
          "{count}",
          this.files.length
        );
      else if (e.target.value) fileName = e.target.value.split("\\").pop();

      if (fileName) $label.find("span").html(fileName);
      else $label.html(labelVal);
    });

    // Firefox bug fix
    $input
      .on("focus", function() {
        $input.addClass("has-focus");
      })
      .on("blur", function() {
        $input.removeClass("has-focus");
      });
  });
  
  //   Show spinner...
  // $(".show-spinner").click(function() {
  //   $(this).prop("disabled", true);
  //   $("form input").prop("disabled", true);
  //   $("label.btn").addClass("disabled");
  //   var $icon = $("i", this );
  //   $icon.removeClass("fa-upload");
  //   $icon.addClass("fa-cog fa-spin" );
  //   $("#form_stack_upload").submit();
  //   // $(".form-inner").addClass("spinner");
  // });

  // $("#form_stack_upload").on('submit', function(event) {
  $("#form_stack_upload").submit(function() {
    console.log("Form submit function");
    $upload_button = $(".show-spinner");
    // Disable the Upload button
    $upload_button.prop("disabled", true);

    // Disable the Input elements
    // $("#form_stack_upload input").prop("disabled", true);
    
    // Disable the Choose File button
    // $("label.btn").addClass("disabled");


    $upload_button.append("<i class='fa fa-cog fa-spin'></i>");
    // var $icon = $("i", $upload_button );
    // $icon.removeClass("fa-upload");
    // $icon.addClass("fa fa-cog fa-spin" );

    // var preLoder = $(".loader-wrapper");
    // $("body").removeClass("loaded");
    // preLoder.hide();
    // preLoder.delay(700).fadeIn(500);

    // this.submit();
    // return true;
  });
  
  // $("form").submit(function() {
  //   $upload_button = $(".show-spinner");
  //   $upload_button.prop("disabled", true);

  // });
  
  // Enable tooltips everywhere
  $('[data-toggle="tooltip"]').tooltip();
  
  $(window).on('load', function() {
    console.log("Window on load function");
		var preLoder = $(".loader-wrapper");
    // preLoder.delay(700).fadeOut(500);
		$('body').addClass('loaded');
	});
}

$( document ).on('turbolinks:load', function() {
  console.log("turbolinks:load function");

  if (firstLoad == false) {
    var preLoder = $(".loader-wrapper");
    preLoder.delay(700).fadeOut(500);
    // // $('body').addClass('loaded');
    $('body').delay(100).queue(function(){$('body').addClass('loaded')});
    onPageLoad();
  }
  firstLoad = false;  
})

console.log("End of JS");