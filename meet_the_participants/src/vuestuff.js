// Vue.config.debug = true;
// console.log(window.vueMaterialize.modal)
var personContainer = new Vue({
  el: '#cont',
  data: {
    participants: may,
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
    password: {
      providedCorrectPass: false,
      incorrectPass: false,
      passText: ''
    },
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
    checkPass: function(){
      if (this.password.passText == "SUFaculty1") {
        this.password.providedCorrectPass = true;
      } else {
        this.password.passText='';
        this.password.incorrectPass = true;
      }
    },
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
    openModal: function(id){
      $('#'+id).openModal();
    },
    changeDisplay: function(style){
      var iso = this._iso;
      var grid = this.grid;
      this.displayStyle=style;
      Vue.nextTick(function () {
        iso.arrange();
        var imgLoad = imagesLoaded( grid );
        imgLoad.on( 'progress', function( instance, image ) {
          iso.arrange();
        });
      })
    },
    filterText: function (searchString){
      var searchRegEx = new RegExp( searchString, 'gi');
      this._iso.arrange({filter: function(){
        return searchRegEx ? $(this).text().match(searchRegEx) : true;
      }});
      this.numberOfDisplayed = this._iso.filteredItems.length;
      return searchString
    },
    getPersonsFilters: function(person) {// add each sector to person if more than one (separated with ;)
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
      // order company size
      for (var size = allFilters.companySize.length - 1; size >= 0; size--) {
        allFilters.companySize[size].sortby = Math.abs(eval(allFilters.companySize[size].name.replace(/[^0-9+]+/gi, '-')));
      }
      allFilters.companySize.sort(function(a, b) {
          return parseFloat(a.sortby) - parseFloat(b.sortby);
      });

      //consolidate sectors
      var sectorTemp = []
      var sec = allFilters.sector.length;
      while (sec--) {
        if(allFilters.sector[sec].name.split(';').length > 1) {
          for(var x = allFilters.sector[sec].name.split(';').length-1; x >=0; x--){
            sectorTemp.push(allFilters.sector[sec].name.split(';')[x].trim())
          }
          allFilters.sector.splice(sec,1);
        }
      }
      for (var ii = sectorTemp.length - 1; ii >= 0; ii--) {
        for (var jj = allFilters.sector.length - 1; jj >= 0; jj--) {
          if(sectorTemp[ii]==allFilters.sector[jj].name){
            allFilters.sector[jj].count += 1;
            break
          }
        }
      }

      this.allFilters = allFilters
      return this.allFilters
    }
  }
});

// probably should incorporate this into vue.
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
