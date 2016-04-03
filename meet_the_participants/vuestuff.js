// var example1 = new Vue({
//   el: '#example-1',
//   data: {
//     participants
//   }
// })

var vm = new Vue({
  el: '#cont',
  data: {
     participants
  },
  ready: function () {
    this._iso = new Isotope('.grid', {
      layoutMode: 'masonry',
      itemSelector: '.grid-item',
      masonry: {
        gutter: 10
      },
      getSortData: {
        id: '.id parseInt'
      }
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
    }
  }
})

// for (var i = 10; i >= 0; i--) {
// 	// vm.participants.append()
// 	vm.append()
// }
