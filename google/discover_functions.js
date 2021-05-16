let busy = false, loader = null, info, response;
let markerMe, map, markerCluster, markerMeCircle;
let circle, circles = {}, zIndex = 10, centerPos, numMarker, numMarkers = {}, panorama;
let mapData = {}, sv1, hd = 0, pt = 0;
let highlightedMarkerId = 0;
let activeMarkerId = 0;
let activeLocationId;
let mapIsReady = false;
let params = parse_query_string();
let radius = 30;

function mapInit() {
  console.log('mapInit...');
  circle = new google.maps.Marker({ optimized: false });
  numMarker = new google.maps.Marker({ optimized: false });
  markerMe = new google.maps.Marker({ optimized: false });
  markerMeCircle = new google.maps.Circle({
    strokeColor: '#000',
    strokeOpacity: 0.4,
    strokeWeight: 1,
    fillColor: '#000',
    fillOpacity: 0.1,
    radius: $('#filter_radius').val() * 1000
  });
  info = new InfoBox({ maxWidth: 280, alignBottom: true, closeBoxURL: '' });
}

/*$.ajaxPrefilter(function( options, original_Options, jqXHR ) {
 options.async = true;
 });*/

if (
  (window.location.hash && window.location.hash == '#_=_')
  || (!window.location.hash && window.location.href.indexOf('#') > 0)
) {
  console.log('clear hash');
  if (window.history && history.pushState) {
    window.history.pushState("", document.title, window.location.pathname);
  } else {
    // Prevent scrolling by storing the page's current scroll offset
    var scroll = {
      top: document.body.scrollTop,
      left: document.body.scrollLeft
    };
    window.location.hash = '';
    // Restore the scroll offset, should be flicker free
    document.body.scrollTop = scroll.top;
    document.body.scrollLeft = scroll.left;
  }
}

$(document).ready(function () {

  if ($('#is_limited_by_date').is(':visible')) {
    var untilDate = new Date($("#is_limited_by_date").data('date'));
    //$('#is_limited_by_date').countdown($.countdown.regionalOptions['ru']);
    $('#is_limited_by_date').countdown({ until: untilDate });
  }


  /*if ($('#pathAction').val() == 'sections/locations/view') {
   console.log('loading...');
   var feed = new Instafeed({
   get: 'tagged',
   tagName: 'awesome',
   clientId: '9931ddc59bdb4334b7730532146ce4b2'
   });
   feed.run();
   }*/

  // users\view
  if ($('#about > div').length) {
    $('#about').show();
  }

  $('.clear-input').click(function () {
    $(this).parent().find('input').typeahead('val', '');
  });


  $('.streetview-nav > .item').click(function () {
    $('.streetview-nav > .item').removeClass('active');
    $(this).addClass('active');
  });

  $('#productraiting-value').on('rating.change', function (event, value, caption) {
    $.ajax({
      url: $('#raiting-form').attr('action'),
      dataType: 'json',
      async: true,
      data: {
        value: value
      },
      success: function (data) {

      }
    });
  });

  $('#subscribe-submit, #subscribe-submit-popup').click(function () {
    $('#subscribe-success-message').html('');
    $('#subscribe-error-message').html('');
    $.ajax({
      url: '/subscribe',
      dataType: 'json',
      data: {
        'email': $('#subscribe-email').val()
      },
      success: function (data) {
        if (data.success) {
          $('#subscribe-success-message').html('Р’Рё СѓСЃРїС–С€РЅРѕ РїС–РґРїРёСЃР°Р»РёСЃСЏ, РґСЏРєСѓС”РјРѕ!');
        } else {
          $('#subscribe-error-message').html(data.msg['subscribeform-email']);
        }
      }
    });
  });

  $('#subscribe-submit-popup').click(function () {
    $('#subscribe-success-message-popup').html('');
    $('#subscribe-error-message-popup').html('');
    $.ajax({
      url: '/subscribe',
      dataType: 'json',
      data: {
        'email': $('#subscribe-email-popup').val()
      },
      success: function (data) {
        if (data.success) {
          $('#subscribe-success-message-popup').html('Р’Рё СѓСЃРїС–С€РЅРѕ РїС–РґРїРёСЃР°Р»РёСЃСЏ, РґСЏРєСѓС”РјРѕ!');
        } else {
          $('#subscribe-error-message-popup').html(data.msg['subscribeform-email']);
        }
      }
    });
  });
  $(".gotop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });


  $(function () {
    $('[data-toggle="popover"]').popover()
  });
  $(function () {
    $('.popover').popover({
      container: 'body'
    })
  });

  $('a.ancLinks').bind('click.smoothscroll', function (e) {
    e.preventDefault();

    // Get the current target hash
    var target = this.hash;

    // Animate the scroll bar action so its smooth instead of a hard jump
    $('html, body').stop().animate({
      'scrollTop': $(target).offset().top
    }, 400, 'swing', function () {
      window.location.hash = target;
    });
  });


  /* $('.trips').masonry({
   itemSelector: '.trips > div'
   }); */

  $('section').viewportChecker({
    classToAdd: 'visible', // РљР»Р°СЃСЃ РґРѕР±Р°РІР»СЏРµРјС‹Р№ СЌР»РµРјРµРЅС‚Сѓ РєРѕРіРґР° С‚РѕС‚ РїРѕСЏРІР»СЏРµС‚СЃСЏ РІ РѕР±Р»Р°СЃС‚Рё РїСЂРѕСЃРјРѕС‚СЂР°
    classToRemove: 'invisible', // РљР»Р°СЃСЃ, СѓРґР°Р»СЏРµРјС‹Р№ РїРµСЂРµРґ РїСЂРёРјРµРЅРµРЅРёРµРј "classToAdd" Рє СЌР»РµРјРµРЅС‚Сѓ
    // offset: [100 OR 10%], // Р—Р°РґРµСЂР¶РєР° РїРѕСЏРІР»РµРЅРёСЏ СЌР»РµРјРµРЅС‚РѕРІ, РѕС‚РЅРѕСЃРёС‚РµР»СЊРЅРѕ РїСЂРѕСЃРјР°С‚СЂРёРІР°РµРјРѕР№ РѕР±Р»Р°СЃС‚Рё. РњРѕР¶РЅРѕ СѓРєР°Р·С‹РІР°С‚СЊ РїСЂРѕС†РµРЅС‚РЅРѕРµ СЃРѕРѕС‚РЅРѕС€РµРЅРёРµ (СѓРєР°Р·С‹РІР°С‚СЊ РІ РєР°РІС‹С‡РєР°С…, СЃРѕ Р·РЅР°РєРѕРј "%")
    invertBottomOffset: true, // Р”РµР»Р°РµС‚ Р·РЅР°С‡РµРЅРёРµ СЃРјРµС‰РµРЅРёСЏ РѕС‚СЂРёС†Р°С‚РµР»СЊРЅС‹Рј Р·РЅР°С‡РµРЅРёРµРј
    repeat: false, // РЈРґР°Р»СЏРµС‚ РґРѕР±Р°РІР»СЏРµРјС‹Р№ РєР»Р°СЃСЃ РєРѕРіРґР° СЌР»РµРјРµРЅС‚ РІРЅРµ РѕР±Р»Р°СЃС‚Рё РїСЂРѕСЃРјРѕС‚СЂР°, РґРµР»Р°СЏ С„СѓРєС†РёСЋ РїРѕРІС‚РѕСЂСЏРµРјРѕР№
    callbackFunction: function (elem, action) {
    }, // Р¤СѓРЅРєС†РёСЏ Р·Р°РїСѓСЃРєР°РµРјР°СЏ РїРѕСЃР»Рµ РґРѕР±Р°РІР»РµРЅРёСЏ РєР»Р°СЃСЃР°. Р’РѕР·РІСЂР°С‰Р°РµС‚  "add" РёР»Рё "remove", РІ Р·Р°РІРёСЃРёРјРѕСЃС‚Рё РѕС‚ С‚РѕРіРѕ Р±С‹Р» Р»Рё РєР»Р°СЃСЃ РґРѕР±Р°РІР»РµРЅ РёР»Рё СѓРґР°Р»РµРЅ
    scrollHorizontal: false // РЈСЃС‚Р°РЅРѕРІРёС‚СЊ "true" РµСЃР»Рё СЃР°Р№С‚ РёРјРµРµС‚ РіРѕСЂРёР·РѕРЅС‚Р°Р»СЊРЅС‹Р№ СЃРєСЂРѕР»Р», РІРјРµСЃС‚Рѕ РІРµСЂС‚РёРєР°Р»СЊРЅРѕРіРѕ
  });


  /* $('.map-marker').click(function () {
   if ($(this).hasClass('active')) {
   $(this).removeClass('active');
   }
   else {
   $(this).addClass('active');
   }
   });
   */
  $(' .slider ').slick({
    slidesToShow: 1,
    slidesToScroll: 1,

    accessibility: false,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          dots: false,
          arrows: true,

        }
      },
      {

        breakpoint: 600,
        settings: {
          dots: true,
          arrows: false,

        }
      }
    ]

  });

  $('.hotels-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: false,
    arrows: true,
    accessibility: false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {

          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 800,
        settings: {
          dots: true,
          arrows: false,
          slidesToScroll: 1,
          slidesToShow: 1
        }
      }
    ]
  });


  $('.lang-active').click(function () {
    if ($('.lang-menu').hasClass('active')) {
      $('.lang-menu').removeClass('active');
    }
    else {
      $('.lang-menu').addClass('active');
    }
  });

  $('.menu-btn, .main-menu-bg').click(function () {
    if ($('.main-menu').hasClass('active')) {
      $('.main-menu').removeClass('active');
      $('.menu-btn').removeClass('menu-btn-active');
      $('.main-menu-bg').hide();
    }
    else {
      $('.main-menu').addClass('active');
      $('.menu-btn').addClass('menu-btn-active');
      $('.main-menu-bg').fadeIn();
    }
  });


  $('#user-menu-btn').click(function () {
    if ($('.login-btn').hasClass('active')) {
      $('.login-btn').removeClass('active');
    }
    else {
      $('.login-btn').addClass('active');
    }
  });


  $('.show-map, .show-route, .map-search .close-streetview').click(function () {
    if ($('.map-col').hasClass('active')) {
      $('.map-col').removeClass('active');
      $('.show-map').removeClass('active');
    }
    else {
      $('.map-col').addClass('active');
      $('.show-map').addClass('active');

    }
  });


  $('.show-search').click(function () {
    if ($('#search-overlay').hasClass('active')) {
      $('#search-overlay').removeClass('active');
      $('.search-overlay-input').removeClass('active');

    }
    else {
      $('#search-overlay').addClass('active');
      $('.search-overlay-input').addClass('active');

    }
  });
  $('#close-search-container, .search-overlay-bg ').click(function () {
    if ($('#search-overlay').hasClass('active')) {
      $('#search-overlay').removeClass('active');
      $('.search-overlay-input').removeClass('active');
    }
    else {
      $('#search-overlay').addClass('active');
      $('.search-overlay-input').addClass('active');
    }
  });

  $('  .search-overlay-bg ').click(function () {

    $('#search-overlay').removeClass('active');

  });

  $('#show-less').hide();

  $('#show-more').click(function () {
    $('#short-desc').addClass('active');
    $('#show-more').hide();
    $('#show-less').show();
  });

  $('#show-less').click(function () {
    $('#short-desc').removeClass('active');
    $('#show-more').show();
    $('#show-less').hide();

  });


  /* $('.locations-list .locations-sub-list  li').click(function () {
   $('.locations-list  .locations-sub-list  li').removeClass('active');

   if ($(this).hasClass('active')) {
   $(this).removeClass('active');
   }
   else {
   $(this).addClass('active');
   }
   });*/


  $('.addto-switcher').click(function () {
    $(this).parent().find('.addto-container').addClass('active');
  });

  $('.cancel-adding-location').click(function () {
    $(this).parent().parent().removeClass('active');
  });

  // $(document).on('click', '#login, button.login, a.login, div.login, .btn-like.login', function (e) {
  //     console.log('login');
  //     e.preventDefault();
  //     $('#login-modal').modal('show')
  //         .find('#login-modal-content')
  //         .load('/ajax/login-popup');
  // });


  $('#about-user-btn').click(function (e) {
    e.preventDefault();
    $('#about-user').modal('show')
    //  .find('#login-modal-content')
    //  .load('/ajax/login-popup');
  });


  $('#signup').click(function () {
    $('#signup-modal').modal('show')
      .find('#signup-modal-content')
      .load('/ajax/signup-popup');
  });

  $('#show-search-popup').click(function () {
    $('#search-modal').modal('show')
      .find('#search-modal-content')
      .load('/ajax/search-popup');
  });

  $('#add-location').click(function () {
    $('#add-location-modal').modal('show')
      .find('#add-location-modal-content')
      .load('/ajax/add-location-popup');
  });
  $('.waypoints-button').click(function () {
    if ($('#waypoints').hasClass('active')) {
      $('#waypoints').removeClass('active');
      $('.waypoints-button').removeClass('active');
    }
    else {
      $('#waypoints').addClass('active');
      $('.waypoints-button').addClass('active');

    }
  });


  $(document).on('click', '#share-trip', function () {
    var type = $(this).data('type');
    if ($('#pathAction').val() == 'sections/trips/edit') {
      $.ajax({
        url: '/trips/save',
        dataType: 'json',
        method: 'POST',
        success: function (data) {
          if (data.success) {
            $('#share-trip-modal').modal('show')
              .find('#share-modal-content')
              .load('/ajax/share-popup?hash=' + data.hash + '&type=' + type);
          }
        }
      });
    } else {
      $('#share-trip-modal').modal('show')
        .find('#share-modal-content')
        .load('/ajax/share-popup?hash=' + $(this).data('hash') + '&type=' + $(this).data('type'));
    }


  });


  $(document).on('beforeSubmit', '#add-location-form', function (e) {
    $('#add-location-form').find('.loader').hide();

    $.ajax({
      url: $(this).attr('action'),
      dataType: 'json',
      method: 'POST',
      async: true,
      data: $(this).serialize(),
      success: function (data) {
        if (data.length == 0 || data.success) {
          $('#add-location-form').find('.loader').hide();
          $('#add-location-form').hide();
          $('#add-location-form').after('<div>РЎРїР°СЃРёР±Рѕ!</div> <a href="/locations/edit"> Р РµРґР°РіСѓРІР°С‚Рё </a>');
          if (data.id > 0) {
            document.location.href = '/locations/edit/' + data.id;
          }
        }
      }
    });

    return false;
  });

  $('#from-create-trip').submit(function (e) {
    if (!$(this).find('input[name=from_date]').val()) {
      $(this).find('.message').html('РќРµРѕР±С…РѕРґРёРјРѕ РІС‹Р±СЂР°С‚СЊ РїРµСЂРёРѕРґ РІР°С€РµРіРѕ С‚СЂРёРїР°');
      e.preventDefault();
    }
  });

  $('button.booking').click(function () {
    $('#booking-modal').modal('show')
      .find('#booking-modal-content')
      .load('/ajax/booking-popup?context_id=' + $(this).data('context_id') + '&context=' + $(this).data('context'));
  });

  $('#article, .book-view, #section1, .users-page, #trip-height, .user-page-section').on('click', 'button.booking', function () {
    $('#booking-modal').modal('show')
      .find('#booking-modal-content')
      .load('/ajax/booking-popup?context_id=' + $(this).data('context_id') + '&context=' + $(this).data('context'));
  });

  $('.locations .remove-this').click(function () {
    let el = $(this);
    $.ajax({
      url: '/locations/remove',
      dataType: 'json',
      method: 'POST',
      async: true,
      data: {
        id: $(this).data('id')
      },
      success: function (data) {
        if (data.success) {
          el.parent().parent().parent().remove();
        }
      }
    });
  });

  $(document).on('beforeSubmit', '#booking-form', function (e) {
    $('#booking-form').find('.loader').hide();
    $.ajax({
      url: $(this).attr('action'),
      dataType: 'json',
      method: 'POST',
      async: true,
      data: $(this).serialize(),
      success: function (data) {
        if (data.length == 0 || data.success) {
          $('#booking-form').find('.loader').hide();
          $('#booking-form').hide();
          if ($('#lang').val() == 'ru') {
            $('#booking-form').after('<div class="thanks-for-booking">РЎРїР°СЃРёР±Рѕ!<br/> РЎРѕРѕР±С‰РµРЅРёРµ СѓСЃРїРµС€РЅРѕ РѕС‚РїСЂР°РІР»РµРЅРѕ!</div>');
          } else if ($('#lang').val() == 'ua') {
            $('#booking-form').after('<div class="thanks-for-booking">Р”СЏРєСѓС”РјРѕ!<br/> РџРѕРІС–РґРѕРјР»РµРЅРЅСЏ СѓСЃРїС–С€РЅРѕ РІС–РґРїСЂР°РІР»РµРЅРѕ!</div>');
          } else if ($('#lang').val() == 'en') {
            $('#booking-form').after('<div class="thanks-for-booking">Thank you!<br/> Message sent successfully!</div>');
          }

          if (data.type) {
            ga('send', 'event', 'book', data.type);
          }
        }
      }
    });

    return false;
  });

  $(document).on('beforeSubmit', '#comment-form,#comment-form-booking', function (e) {
    $.ajax({
      url: $(this).attr('action'),
      dataType: 'json',
      method: 'POST',
      async: true,
      data: $(this).serialize(),
      success: function (data) {
        if (data.length == 0 || data.success) {
          $('#comment-form textarea').val('');
          if (data.html) {
            if (data.scenario == 'dialog') {
              $('#comments').prepend(data.html);
              $('#order-status').html(data.status);
              window.location.reload();
            } else {
              $('#comments div.comments-list > div[data-user_id=' + data.user_id + ']').hide();
              $('#comments div.comments-list').prepend(data.html);
              $('#comments span.countComments').html(data.count);
              $('#comments .nocomments').hide();
              $('#comments span.countComments').parent().show();
            }
          }
          $('#comment-modal,#booking-accept-modal').modal('hide');

          /*$('#msg-modal').modal('show')
           .find('#msg-modal-content')
           .html('РљРѕРјРјРµРЅС‚Р°СЂРёР№ Р±С‹Р» СѓСЃРїРµС€РЅРѕ РґРѕР±Р°РІР»РµРЅ Рё Р±СѓРґРµС‚ РѕРїСѓР±Р»РёРєРѕРІР°РЅ РїРѕСЃР»Рµ РјРѕРґРµСЂР°С†РёРё');*/

        }
      }
    });
  }).on('submit', '#comment-form,#comment-form-booking', function (e) {
    e.preventDefault();
    return false;
  });


  $('.add-comment').click(function (e) {
    e.preventDefault();
    $('#comment-modal').modal('show')
      .find('#comment-modal-content')
      .load('/ajax/comment-popup?context=' + $(this).data('context') + '&context_id=' + $(this).data('context_id'));
  });
});


function initShowMe() {
  console.log('initShowMe...');
  if (isset(params['city']) || isset(params['region'])) {
    $.removeCookie('show-me');
  }

  if ($.cookie('show-me')) {
    $('.show-me').addClass('active');
    showMeMap();
  }
}

function toggleShowMe(callback) {
  if ($('.show-me').hasClass('active')) {
    $('.show-me').removeClass('active');
    $.removeCookie('show-me');
    markerMe.setMap(null);
    markerMeCircle.setMap(null);
    if (typeof callback === 'function') {
      callback();
    }
  } else {
    $('#region').val('');
    $('#city').val('');
    $('.show-me').addClass('active');
    $.cookie('show-me', true);
    showMeMap(callback);
  }
}

function showMeMap(callback) {
  console.log('showMeMap...');

  markerMe.setIcon({
    "url": '/d/' + $('#regionId').val() + '/images/show-me.svg',
    "scaledSize": new google.maps.Size(40, 40),
    "anchor": new google.maps.Point(20, 20),
    "zIndex": ++zIndex
  });

  if (!$.cookie('myLat')) {
    $('#loader_find_me').show();
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      $.cookie('myLat', lat);
      $.cookie('myLng', lng);
      var pos = new google.maps.LatLng($.cookie('myLat'), $.cookie('myLng'));
      map.setCenter(pos);
      markerMe.setMap(map);
      markerMe.setPosition(pos);
      markerMeCircle.setMap(map);
      markerMeCircle.setCenter(pos);
      //markerMeCircle.setVisible(true);
      markerMeCircle.setRadius(radius * 1000);
      map.fitBounds(markerMeCircle.getBounds());
      google.maps.event.addListener(markerMeCircle, 'click', function (event) {
        markerTooltip(null)
      });
      $('#loader_find_me').hide();
      if (typeof callback === 'function') {
        callback();
      }
    },
      function (error) {
        console.log(error);
        if (error.code == error.PERMISSION_DENIED) {
          $('#loader_find_me').hide();
        }
      });
  } else {
    var pos = new google.maps.LatLng($.cookie('myLat'), $.cookie('myLng'));
    map.setCenter(pos);
    markerMe.setMap(map);
    markerMe.setPosition(pos);
    markerMeCircle.setMap(map);
    markerMeCircle.setCenter(pos);
    //markerMeCircle.setVisible(true);
    markerMeCircle.setRadius(radius * 1000);
    map.fitBounds(markerMeCircle.getBounds());
    map.fitBounds(markerMeCircle.getBounds());
    google.maps.event.addListener(markerMeCircle, 'click', function (event) {
      markerTooltip(null)
    });
    if (typeof callback === 'function') {
      callback();
    }

  }


}

function findAddressGeo(address) {
  let geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      markerMe.setPosition(results[0].geometry.location);
      $('input.lat').val(results[0].geometry.location.lat());
      $('input.lng').val(results[0].geometry.location.lng());
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function like(context, context_id, el) {
  $.ajax({
    url: '/ajax/like',
    dataType: 'json',
    method: 'POST',
    data: {
      context: context,
      context_id: context_id
    },
    success: function (data) {
      if (data.success) {
        $(el).find('span.likes').html(data.count);
        if (data.count > 0) {
          $(el).find('span.likes').addClass('active');
        } else {
          $(el).find('span.likes').removeClass('active');
        }
        if (data.is_like) {
          $(el).addClass('active');
        } else {
          $(el).removeClass('active');
        }
      }
    }
  });
}

function showLocation(id) {
  markerTooltip(id, true);
  slideInfo(id);
}

function highlightMarker(id, center) {
  for (var i = 0; i < circles.length; i++) {
    circles[i].setMap(null)
  }

  if (id == null) {
    if (highlightedMarkerId && highlightedMarkerId != activeMarkerId) {
      mapData[highlightedMarkerId].marker.setMap(null);
      highlightedMarkerId = 0;
    }
    if (circle) {
      circle.setMap(null);
    }
    return;
  }

  if (id !== null) {
    if (mapData[id].marker.getMap() != map) {
      mapData[id].marker.setMap(map);
      highlightedMarkerId = id;
    }
    mapData[id].marker.setZIndex(++zIndex);
  }

  var pos = new google.maps.LatLng(mapData[id].marker.position.lat(), mapData[id].marker.position.lng());

  if (circle) {
    circle.setOptions({
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#fff',
        fillOpacity: 0.6,
        strokeColor: '#fff',
        strokeOpacity: 1,
        strokeWeight: 1,
        scale: 36,
        anchor: new google.maps.Point(0, 1),
        zIndex: 1
      }
    });

    circle.setPosition(pos);
    circle.setZIndex(zIndex - 1);
    circle.setMap(map);
  }

  if (markerMe) {
    markerMe.setZIndex(zIndex + 10);
  }

  if (center) {
    map.setCenter(pos);
    map.setZoom(16);
  }
}

function markerTooltip(id, side) {
  highlightedMarkerId = activeMarkerId = id;
  highlightMarker(id, side);
  info.close();

  if (!id) {
    return;
  }

  setCurrentIcon(id);

  $.ajax({
    url: '/locations/marker-tooltip',
    dataType: 'json',
    method: 'POST',
    async: true,
    data: {
      id: id,
      url: window.location.pathname,
      myLat: $.cookie('myLat'),
      myLng: $.cookie('myLng'),
    },
    success: function (data) {
      info.setOptions({ pixelOffset: new google.maps.Size(-135, -50) });
      info.setContent(data.html);
      info.open(map, mapData[id].marker);
    }
  });

  /*if (side && $('.container').is(':visible')) {
   slideInfo(mapData[id][0], 1)
   }*/
}


function slideInfo(id, tripId) {
  if (busy) {
    return
  }
  busy = true;

  $('#article').scrollTop(0).show();
  $('#article article').html('');
  $('#article .head h1').css({ visibility: 'hidden' });
  $('#article .load').show();

  var hideBesides = ($('#controller').val() == 'sections/trips');

  $.ajax({
    url: '/locations/slide-info',
    dataType: 'json',
    async: true,
    method: 'POST',
    data: {
      id: id,
      tripId: tripId,
      myLat: $.cookie('myLat'),
      myLng: $.cookie('myLng'),
      hideBesides: hideBesides
    },
    success: function (data) {
      $('#article article').html(data.html).scrollTop(0);
      $('#article .head').html('');
      if ($('#article article>h1').length) {
        $('#article .head').html('').append($('#article article>h1'));
        $('#article .head h1').html(prepereTitle($('#article .head h1').html()));
      }
      $('#article .load').hide();
      //resizeWindow();
      busy = false;
    }
  });

}

function prepereTitle(s) {
  s = s.replace(/ \(([^(]*)\)$/g, '');
  return s;
}

function explode(delimiter, string) {	// Split a string by string
  //
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: kenneth
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

  var emptyArray = { 0: '' };

  if (arguments.length != 2
    || typeof arguments[0] == 'undefined'
    || typeof arguments[1] == 'undefined') {
    return null;
  }

  if (delimiter === ''
    || delimiter === false
    || delimiter === null) {
    return false;
  }

  if (typeof delimiter == 'function'
    || typeof delimiter == 'object'
    || typeof string == 'function'
    || typeof string == 'object') {
    return emptyArray;
  }

  if (delimiter === true) {
    delimiter = '1';
  }

  return string.toString().split(delimiter.toString());
}


function onScreen() {
  var winH = $(window).height();
  var winScroll = $(document).scrollTop();
  var winW = $(window).width();

  var shortDesc = $("#short-desc").outerHeight()


  if (shortDesc < 300) {
    $('#short-desc').removeClass('short-desc');
    $('#show-more').addClass('hidden');
  }
  if (shortDesc > 300) {
    $('#short-desc').addClass('short-desc');
    $('#show-more').removeClass('hidden');
  }


  if (winScroll > winH) {
    $('#gotop').addClass('active');
  }
  if (winScroll < winH) {
    $('#gotop').removeClass('active');
  }


}

$(window).on('scroll resize', function () {
  onScreen();
});

function isset() {
  var a = arguments, l = a.length, i = 0;
  if (l === 0) {
    throw new Error('Empty isset');
  }
  while (i !== l) {
    if (typeof (a[i]) == 'undefined' || a[i] === null) {
      return false;
    } else {
      i++;
    }
  }
  return true;
}

function intval(mixed_var, base) {
  var tmp;
  if (typeof (mixed_var) == 'string') {
    tmp = parseInt(mixed_var);
    if (isNaN(tmp)) {
      return 0;
    } else {
      return tmp.toString(base || 10);
    }
  } else if (typeof (mixed_var) == 'number') {
    return Math.floor(mixed_var);
  } else {
    return 0;
  }
}


function loadMarkers(withoutNumbers) {
  console.log('loadMarkers...')
  eval("google.maps.event.addListener(map, 'click', function(event) {markerTooltip(null)})");
  //google.maps.event.addListener(markerMeCircle, 'click', function(event) {markerTooltip(null)});
  $.each(mapData, function (id, item) {
    if (!(isset(mapData[id].is_marker) && mapData[id].is_marker)) {
      google.maps.event.addListener(mapData[id].marker, 'click', function (event) {
        markerTooltip(id);
        slideInfo(id);
      });
    }

    google.maps.event.addListener(mapData[id].marker, 'mouseover', function (event) {
      highlightMarker(id);
    });
    google.maps.event.addListener(mapData[id].marker, 'mouseout', function (event) {
      highlightMarker(null);
    });


    let pos = new google.maps.LatLng(mapData[id].marker.position.lat(), mapData[id].marker.position.lng());

    if ($('#pathAction').val() == 'sections/locations/view') {
      if ($('#locationId').val() != id) {
        setPointIcon(id);
      }
    }

    if (!isset(withoutNumbers)) {
      if ($('#pathAction').val() == 'sections/trips/edit' ||
        $('#pathAction').val() == 'sections/trips/view' ||
        $('#pathAction').val() == 'sections/trips/print' ||
        $('#pathAction').val() == 'default/edit'
      ) {
        numMarkers[id] = new google.maps.Marker({ optimized: false });
        numMarkers[id].setOptions({
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#12435a',
            fillOpacity: 0.8,
            strokeColor: '#12435a',
            strokeOpacity: 1,
            strokeWeight: 1,
            scale: 12,
            anchor: new google.maps.Point(0, -1),
          },
          label: {
            text: item.index,
            fontWeight: "bold",
            color: '#ffffff'
          }
        });
        numMarkers[id].setPosition(pos);
        numMarkers[id].setMap(map);
        numMarkers[id].setZIndex(zIndex + 1);
      }
    }
  });
}

function setPointIcon(id) {
  var iconArr = explode('/', mapData[id].icon);
  if (mapData[id].is_promo) {
    iconArr[4] = 'icons-small-premium';
  } else {
    iconArr[4] = 'icons-small';
  }

  mapData[id].marker.setIcon({
    "url": iconArr.join('/'),
    "scaledSize": new google.maps.Size(38, 56),
  });
  mapData[id].marker.setZIndex(zIndex - 1);
}

function setCurrentIcon(id) {
  if (intval(id) > 0) {
    mapData[id].marker.setIcon({
      "url": mapData[id].icon,
      "scaledSize": new google.maps.Size(38, 56)
    });
    mapData[id].marker.setZIndex(zIndex);
  }
}

function setDefaultIcon(id) {
  if (typeof mapData[id] === 'undefined') {
    return;
  }

  let iconArr = explode('/', mapData[id].icon);
  iconArr[4] = 'icons';

  if (intval(id) > 0) {
    mapData[id].marker.setIcon({
      "url": iconArr.join('/'),
      "scaledSize": new google.maps.Size(38, 56)
    });
    mapData[id].marker.setZIndex(zIndex);
  }
}

function setActiveIcon(id) {
  if (typeof mapData[id] === 'undefined') {
    return;
  }

  let iconArr = explode('/', mapData[id].icon);
  iconArr[4] = 'icons-active';

  if (intval(id) > 0) {
    mapData[id].marker.setIcon({
      "url": iconArr.join('/'),
      "scaledSize": new google.maps.Size(38, 56)
    });
    mapData[id].marker.setZIndex(zIndex);
  }
}


function showPano(data, status, pos) {
  console.log('Pano Status:' + status);
  if (status === 'OK') {
    var h = pos ? google.maps.geometry.spherical.computeHeading(data.location.latLng, pos) : 0;
    var p = 0;
    if (hd != 0) h = parseInt(hd);
    if (pt != 0) p = parseInt(pt);
    hd = 0;
    pt = 0;
    panorama.setPano(data.location.pano);
    panorama.setPov({ heading: h, pitch: p });
    map.panTo(data.location.latLng);
  }
  else {
    /*  $.notify('РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ');

     switch () {
     case 'ru':
     $.notify('РќРёС‡РµРіРѕ РЅРµ РЅР°Р№РґРµРЅРѕ', {'autoHideDelay' : 100, 'autoHide': true});
     break;
     case 'ua':
     $.notify('РќС–С‡РѕРіРѕ РЅРµ Р·РЅР°Р№РґРµРЅРѕ', {'autoHideDelay' : 100, 'autoHide': true});
     break;
     default:
     $.notify('Nothing found', {'autoHideDelay' : 100, 'autoHide': true});
     }*/

  }
}

function goPano(pos) {
  if (pos.match(/^([0-9.-]+),([0-9.-]+),([0-9.-]+),([0-9.-]+)$/)) {
    var a = pos.match(/^([0-9.-]+),([0-9.-]+),([0-9.-]+),([0-9.-]+)$/);
    var pos = { lat: parseFloat(a[1]), lng: parseFloat(a[2]) };
    hd = a[3];
    pt = a[4];
    sv1.getPanorama({ location: pos, radius: 2000 }, function (d, s) {
      showPano(d, s, 0)
    });
  }
}

//========================================================================
// Helper functions


function prepereTitle(s) {
  s = s.replace(/ \(([^(]*)\)$/g, '');
  return s;
}

function getParams($form) {
  var $r = '';
  $form.find('input').each(function () {
    if ($(this).val()) {
      $r += ($r == '' ? '?' : '&');
      $r += $(this).attr('name') + '=' + $(this).val();
    }
  });
  return $r;
}

function explode(delimiter, string) {	// Split a string by string
  //
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: kenneth
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

  var emptyArray = { 0: '' };

  if (arguments.length != 2
    || typeof arguments[0] == 'undefined'
    || typeof arguments[1] == 'undefined') {
    return null;
  }

  if (delimiter === ''
    || delimiter === false
    || delimiter === null) {
    return false;
  }

  if (typeof delimiter == 'function'
    || typeof delimiter == 'object'
    || typeof string == 'function'
    || typeof string == 'object') {
    return emptyArray;
  }

  if (delimiter === true) {
    delimiter = '1';
  }

  return string.toString().split(delimiter.toString());
}

function array_flip(trans) {	// Exchanges all keys with their associated values in an array
  //
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

  var key, tmp_ar = {};

  for (key in trans) {
    tmp_ar[trans[key]] = key;
  }

  return tmp_ar;
}

function isset() {
  // +   original by: Kevin van Zonneveld
  // +   improved by: FremyCompany
  // +   improved by: Onno Marsman
  // *     example 1: isset( undefined, true);
  // *     returns 1: false
  // *     example 2: isset( 'Kevin van Zonneveld' );
  // *     returns 2: true

  var a = arguments, l = a.length, i = 0;

  if (l === 0) {
    throw new Error('Empty isset');
  }

  while (i !== l) {
    if (typeof (a[i]) == 'undefined' || a[i] === null) {
      return false;
    } else {
      i++;
    }
  }
  return true;
}


function parse_query_string() {
  var query = document.location.href.split('?')[1];
  if (typeof query === 'undefined') {
    return [];
  }
  var vars = query.split("&");
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
}
