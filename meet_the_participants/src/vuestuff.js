// Vue.config.debug = true;

var personContainer = new Vue({
  el: '#cont',
  data: {
    participants: participants,
    currentFilters: {
        countries: [],
        sector: [],
        techs: [],
        ggcs: [],
        companySize: [],
        expectations: []
    },
    filterFields: [
      "Badge Citizenship",
      "Company Sector",
      "Exponential Technologies",
      "Global Grand Challenges",
      "Company Size",
      "Expectations"
    ],
    searchTextFields: [
      "Biographic Sketch",
      "Badge Citizenship",
      "Company Sector",
      "Exponential Technologies",
      "Global Grand Challenges",
      "Company Size",
      "Attendee Job Function",
      "Badge Job Title",
      "Badge Full Name",
      "Badge Company",
      "Gender",
      "Interested In",
      "Inspired by",
      "What is the Biggest Opportunity",
      "What is the Biggest Problem",
      "Expectations",
    ],
    up: false,
    displayStyle: 'card',
    searchString: "",
    numberOfDisplayed: 0
  },
  ready: function () {
    this.grid = document.querySelector('.grid');
    var _iso = this._iso = new Isotope(this.grid, {
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
    // set initial length
    this.numberOfDisplayed = this._iso.filteredItems.length;
    // arrange when each photo is loaded
    var imgLoad = imagesLoaded( this.grid );
    imgLoad.on( 'progress', function( instance, image ) {
      _iso.arrange();
    });

  },
  watch: {
    currentFilters: {
      deep: true,
      handler: function () {
        this.setFilters();
        this.numberOfDisplayed = this._iso.filteredItems.length;
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
      this.numberOfDisplayed = this._iso.filteredItems.length;
      return filtString
    },
    open: function(id){
      console.log("clicked");
      console.log(id);
      $(id).openModal();
    },
    changeDisplay: function(style){
      var iso = this._iso;
      this.displayStyle=style;
      Vue.nextTick(function () {
        iso.arrange();
      })
    },
    orderCompanySize: function(compList){
      ordered = [];
      return ordered;
    },
    filterText: function (searchString){
      var searchRegEx = new RegExp( searchString, 'gi');
      this._iso.arrange({filter: function(){
        return searchRegEx ? $(this).text().match(searchRegEx) : true;
      }});
      this.numberOfDisplayed = this._iso.filteredItems.length;
      return searchString
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
    getPersonsText: function(person){
      var text = "";
      for (var textFilter = this.searchTextFields.length - 1; textFilter >= 0; textFilter--) {
        person['searchText'] += " " + person[this.searchTextFields[textFilter]];
        text += " " + person[this.searchTextFields[textFilter]];
      };
      return text
    },
    selectAll: function(type){
      for (var option = this.allFilters[type].length - 1; option >= 0; option--) {
        var found = false;
        for (var index = this.currentFilters[type].length - 1; index >= 0; index--) {
          if(this.currentFilters[type][index].name == this.allFilters[type][option].name){
            found = true;
            break
          }
        }
        if(!found) {
          this.currentFilters[type].push(this.allFilters[type][option].name)
        }
      }
    },
    deselectAll: function(type){
      this.currentFilters[type] = [];
    },
    shuffle: function () {
      this._iso.shuffle()
  	},
    ascending: function (by) {
      this.up = true;
      this._iso.arrange({
      	sortBy: by,
        sortAscending: true
      })
  	},
    decending: function (by) {
      this.up = false;
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
      var allFilters = {
        countries: [],
        sector: [],
        techs: [],
        ggcs: [],
        companySize: [],
        expectations: []
      }
      for (var person = this.participants.length - 1; person >= 0; person--) {
        for (var filter = this.filterFields.length - 1; filter >= 0; filter--) {
          this.buildFilters(this.filterFields[filter], Object.keys(allFilters)[filter], allFilters, person)
        }
      };
      this.allFilters = allFilters
      return this.allFilters
    }
  }
});


$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1200) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

});
