// Vue.config.debug = true;

var personContainer = new Vue({
  el: '#cont',
  data: {
    participants: participants,
    currentFilters: {
        countries: [],
        sectors: [],
        tech: [],
        ggc: [],
        companySize: []
    },
    allFilters: {
        countries: [],
        sector: [],
        tech: [],
        ggc: [],
        companySize: []
    },
    filterFields: [
      "Badge Citizenship",
      "Company Sector",
      "Exponential Technologies",
      "Global Grand Challenges",
      "Company Size"
    ]
  },
  ready: function () {
    grid = document.querySelector('.grid');
    var _iso = this._iso = new Isotope(grid, {
      layoutMode: 'masonry',
      itemSelector: '.grid-item',
      masonry: {
        gutter: 15,
        isFitWidth: true
      },
      getSortData: {
        name: '.name'
      },
    });

    // arrange when each photo is loaded
    var imgLoad = imagesLoaded( grid );
    imgLoad.on( 'progress', function( instance, image ) {
      _iso.arrange();
    });

  },
  watch: {
    currentFilters: {
      deep: true,
      handler: function () {
        console.log(this.currentFilters)
        console.log(this.allFilters)
      this.setFilters();
      }
    }
  },
  methods: {
    setFilters: function () { // get name of all selected filters, build string
      var filtString = "";
      var keys = Object.keys(this.currentFilters);
      for (var index = keys.length - 1; index >= 0; index--) {
        for (var category = this.currentFilters[keys[index]].length - 1; category >= 0; category--) {
          if(this.currentFilters[keys[index]][category]){
            filtString += " ." + this.currentFilters[keys[index]][category].replace(/\W+/g, "_") + ",";
          }
        }
      }
      filtString = filtString.slice(0, -1); //remove trailing colon
      this._iso.arrange({filter: filtString});
      return filtString
    },
    getPersonsFilters: function(person) {
      var filtString = "";
      for (var filter = this.filterFields.length - 1; filter >= 0; filter--) {
        if(person[this.filterFields[filter]]){
          filtString += " " + person[this.filterFields[filter]].replace(/\W+/g, "_")
        }
      }
      return filtString
    },
    shuffle: function () {
      this._iso.shuffle()
    },
    sort: function () {
      this._iso.arrange({
        sortBy: 'id'
      })
  	},
    ascending: function (by) {
      this._iso.arrange({
      	sortBy: by,
        sortAscending: true
      })
  	},
    decending: function (by) {
      this._iso.arrange({
      	sortBy: by,
        sortAscending: false
      })
  	},
    buildFilters: function(field, ref, filters, person) {
      var found = false;
      for (var index = filters[ref].length - 1; index >= 0; index--) {
        if(filters[ref][index].name == this.participants[person][field]) {
          found = true;
          filters[ref][index].count += 1;
          break;
        }
      }
      if(!found) {
        var newItem = {
          name: this.participants[person][field],
          count: 1
        }
        filters[ref].push(newItem);
      }
    }
  },
  computed: {
    computedFilters: function(){
      for (var person = this.participants.length - 1; person >= 0; person--) {
        for (var filter = this.filterFields.length - 1; filter >= 0; filter--) {
          this.buildFilters(this.filterFields[filter], Object.keys(this.allFilters)[filter], this.allFilters, person)
        }
      };
      return this.allFilters
    }
  }
});
