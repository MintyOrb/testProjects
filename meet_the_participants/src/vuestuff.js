// var example1 = new Vue({
//   el: '#example-1',
//   data: {
//     participants
//   },
//   methods: {
//     change: function () {
//       this.participants.unshift({a: this.participants.length + 1 })
//       Vue.nextTick(function () {
//         this._iso.prepended(this.data.participants[0])
//       }, this)
//     },
// });

var personContainer = new Vue({
  el: '#cont',
  data: {
     participants
  },
  ready: function () {
    this._iso = new Isotope('.grid', {
      layoutMode: 'masonry',
      itemSelector: '.grid-item',
      masonry: {
        gutter: 10,
        isFitWidth: true
      },
      getSortData: {
        id: '.id parseInt',
        name: '.name'
      },
    })
  },
  methods: {
    prepend: function () {
      this.participants.unshift({a: this.participants.length + 1 })
      Vue.nextTick(function () {
        this._iso.prepended(this.data.participants[0])
      }, this)
    },
    append: function () {
      this.participants.push({a: this.participants.length + 1 })
      Vue.nextTick(function () {
        this._iso.appended(this.data.participants[this.participants.length - 1])
      }, this)
    },
    shuffle: function () {
      this._iso.shuffle()
    },
    sort: function () {
      this._iso.arrange({
        sortBy: 'id'
      })
  	},
    ascending: function () {
      this._iso.arrange({
      	sortBy: "name",
        sortAscending: true
      })
	},
    decending: function () {
      this._iso.arrange({
      	sortBy: "name",
        sortAscending: false
      })
	}
  }
});

var $grid = $('.grid').isotope({
	layoutMode: 'masonry',
      itemSelector: '.grid-item',
      masonry: {
        gutter: 10,
        isFitWidth: true
      },
      getSortData: {
        id: '.id parseInt',
        name: '.name'
      }
});
// sort items on button click
$('.sort-by-button-group').on( 'click', 'button', function() {
  var sortByValue = $(this).attr('data-sort-by');
  $grid.isotope({ sortBy: sortByValue });
});
$('.test').on( 'click',function() {
	personContainer.ascending()
});
$('.test2').on( 'click',function() {
	personContainer.decending()
});

$grid.imagesLoaded().progress( function() {
  $grid.isotope('layout');
});

// // append
// // jQuery
// $grid.isotope( 'appended', elements )
// // vanilla JS
// iso.appended( elements )

// $('.append-button').on( 'click', function() {
//   // create new item elements
//   var $items = $('<div class="grid-item">...</div>');
//   // append items to grid
//   $grid.append( $items )
//     // add and lay out newly appended items
//     .isotope( 'appended', $items );
// });

