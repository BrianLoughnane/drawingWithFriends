//PictureModel

var app = app || {};

app.PictureModel = Backbone.Model.extend({
  //defaults: {
    //container: d3.select('body')
  //},
  currentColor: '#000000',

  initialize: function() {
    this.set('lines', new app.LineCollection());
  },

  dragStarted: function() {
    //console.log('drag started');
    //this.set('activeLine', new app.LineModel({id: idHash()}));
    this.set('activeLine', new app.LineModel());
    // console.log(this.)
    this.get('activeLine').set('stroke', this.get('currentColor'));
    this.get('lines').add(this.get('activeLine'));
  },

  changeColor: function(color) {
    console.log('called changecolor to ', color);
    this.set('currentColor', color);
  },

  drag: function(mouseCoord) {
    //console.log('drag');
    this.get('activeLine').updateLine(mouseCoord);
  },

  dragEnded: function() {
    //console.log('dragend');
    this.get('activeLine').endLine();
    this.set('activeLine', null);
  },

});


/*

    Instantiating a PictureModel
    ---------------------------------------------------
    --> Pass in a collection of lines

    var pictureData = new PictureModel({
        lines: new app.LineCollection()
    });

*/
