/**
 * Highlight current page in the top nav.
 * Products dropdown: hover to open (stays while pointer is over menu),
 * click "Products" goes to products.html, click a brand goes to that link.
 */
(function ($) {
  'use strict';

  var PRODUCT_PAGES = [
    'products.html',
    'framework-fasteners.html',
    'systems-thermoinsulation-wallsfasteners.html',
    'system-fastenings-thermal-and-hydro-insulation-flat-roofs.html',
    'fastening-system-lightweight-cladding-roofing-and-walls.html',
    'screws-and-fasteners-wooden-constructions.html',
    'screws-and-fasteners-joinery.html',
    'fastening-systems-furniture-sector.html',
    'drywall-fastener-systems.html',
    'bolts-and-screws.html',
    'mechanical-anchors.html',
    'chemical-anchoring-systems.html',
    'construction-chemicals.html',
    'installation-systems-and-sanitary-fixings-clamps-and-bands.html',
    'electrical-fasteners.html',
    'diamond-and-corundum-blades-drill-bits-and-driver-bits.html'
  ];

  var ACTIVE = 'is-active-top-nav__1level';
  var HOVER = 'is-hover-open';
  var closeTimers = [];

  function pageName() {
    var path = (window.location.pathname || '').replace(/\\/g, '/');
    var name = path.split('/').pop() || '';
    name = name.split('?')[0].split('#')[0].toLowerCase();
    if (!name || name.indexOf('.html') === -1) {
      return 'index.html';
    }
    return name;
  }

  function activeHrefFor(page) {
    if (page === 'index.html') {
      return 'index.html';
    }
    if (page === 'about-us.html') {
      return 'about-us.html';
    }
    if (PRODUCT_PAGES.indexOf(page) !== -1) {
      return 'products.html';
    }
    if (page === 'quality.html') {
      return 'quality.html';
    }
    if (page === 'clients.html') {
      return 'clients.html';
    }
    if (page === 'contact-us.html' || page === 'enquiry.html') {
      return 'contact-us.html';
    }
    return null;
  }

  function topLevelItems($root) {
    return $root.find('> .b-top-nav__1level_wrap > .b-top-nav__1level');
  }

  function setActiveNav($scope) {
    var page = pageName();
    var activeHref = activeHrefFor(page);
    if (!activeHref) {
      return;
    }

    var $navs = $scope ? $scope.find('.j-top-nav') : $('.j-top-nav');
    $navs.each(function () {
      var $items = topLevelItems($(this));
      $items.removeClass(ACTIVE);
      $items.each(function () {
        var href = ($(this).children('a').first().attr('href') || '')
          .split('/')
          .pop()
          .toLowerCase()
          .split('?')[0]
          .split('#')[0];
        if (href === activeHref) {
          $(this).addClass(ACTIVE);
        }
      });
    });
  }

  function clearCloseTimers() {
    while (closeTimers.length) {
      clearTimeout(closeTimers.pop());
    }
  }

  function bindHoverDropdown() {
    // Desktop: keep dropdown open while hovering Products or its list
    $(document).on('mouseenter', '.j-top-nav .b-top-nav__1level', function () {
      var $li = $(this);
      if (!$li.children('.b-top-nav__dropdomn').length) {
        return;
      }
      if (!window.matchMedia('(min-width: 1025px)').matches) {
        return;
      }
      clearCloseTimers();
      $('.b-top-nav__1level').removeClass(HOVER);
      $li.addClass(HOVER);
    });

    $(document).on('mouseleave', '.j-top-nav .b-top-nav__1level', function () {
      var $li = $(this);
      if (!$li.children('.b-top-nav__dropdomn').length) {
        return;
      }
      if (!window.matchMedia('(min-width: 1025px)').matches) {
        return;
      }
      // Short delay so pointer can move into the dropdown without it vanishing
      var timer = setTimeout(function () {
        $li.removeClass(HOVER);
      }, 180);
      closeTimers.push(timer);
    });

    // Mobile: expand Products list (support theme class + ours)
    $(document).on('click', '.b-top-nav-dropdown .b-top-nav__1level > a', function (e) {
      var $li = $(this).closest('.b-top-nav__1level');
      var $drop = $li.children('.b-top-nav__dropdomn');
      if (!$drop.length) {
        return;
      }

      var $target = $(e.target);
      var hitChevron = $target.closest('.b-ico-dropdown').length > 0;
      var isOpen = $li.hasClass(HOVER) || $li.hasClass('is-active-top-nav__dropdown');

      // First tap / chevron: expand list and block navigation
      if (!isOpen || hitChevron) {
        e.preventDefault();
        e.stopPropagation();

        if (isOpen && hitChevron) {
          $li.removeClass(HOVER).removeClass('is-active-top-nav__dropdown');
          $drop.stop(true, true).hide();
          $li.find('.b-ico-dropdown .fa')
            .removeClass('fa-arrow-circle-up')
            .addClass('fa-arrow-circle-down');
          return;
        }

        $('.b-top-nav-dropdown .b-top-nav__1level')
          .removeClass(HOVER)
          .removeClass('is-active-top-nav__dropdown');
        $('.b-top-nav-dropdown .b-top-nav__dropdomn').hide();
        $('.b-top-nav-dropdown .b-ico-dropdown .fa')
          .removeClass('fa-arrow-circle-up')
          .addClass('fa-arrow-circle-down');

        $li.addClass(HOVER).addClass('is-active-top-nav__dropdown');
        $drop.stop(true, true).show();
        $li.find('.b-ico-dropdown .fa')
          .removeClass('fa-arrow-circle-down')
          .addClass('fa-arrow-circle-up');
        return;
      }

      // Already open + tap label: go to products.html
    });
  }

  function init() {
    setActiveNav();
    var menuBox = document.querySelector('.j-menu-container');
    if (menuBox && window.MutationObserver) {
      var timer = null;
      new MutationObserver(function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
          setActiveNav($(menuBox));
        }, 50);
      }).observe(menuBox, { childList: true, subtree: true });
    }
  }

  $(init);
  bindHoverDropdown();
}(jQuery));
