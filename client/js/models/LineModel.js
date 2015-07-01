// models/LineModel.js

var app = app || {};

app.LineModel = Backbone.Model.extend({

  defaults: {
    coordinates: [],
    fill: 'none',
    stroke: '#00000',
    stroke_width: '4',
    id: null //don't really need this explicitly. for clarity only
  },
  initialize: function() {
    this.set('id', guid());
  },

  updateLine: function(coord) {
    var coordinates = this.get('coordinates').slice();
    coordinates.push(coord);
    //TODO push coordinates or just the updated coord? would be better to just send new data
    //but would have to add logic

    //set coordinates property of the LineModel. 
    //This will emit a change event on the model, causing the line to re-render.
    //Adding elements to the existing coordinates array will not emit an event. 
    this.set('coordinates', coordinates);
    socket.emit('user moved', {id: this.get('id'),
                               coordinates: this.get('coordinates'),
                               fill: this.get('fill'),
                               stroke: this.get('stroke'),
                               stroke_width: this.get('stroke_width')});
    //ie send all this.attributes?

  },
  endLine: function() {
    //fix for overwriting lines. allows hash to reuse that id again
    socket.emit('user ended', {id: this.get('id')}); //the line collection hears this
    this.set('id', null);
  }

});
