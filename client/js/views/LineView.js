// views/LineView.js
// TODO refactor

var app = app || {};

app.LineView = Backbone.View.extend({
  tagName: 'path', 
  className: 'line red noFill thin',

  initialize: function(options) {
    //initialize the view with the data from LineModel, append it to parent container
    //TODO refactor into 1 render
    this.render(options);
    this.renderPath();
    //listen for changes on the model to re-render line
    this.model.on('change', this.renderPath, this);
  },

  //d3 line rendering logic
  svgLine: d3.svg.line()
  .x(function(d) { return d[0]; })
  .y(function(d) { return d[1]; })
  .interpolate('basis'),

  changeColor: function(color) {
    this.color = color;
  },

  render: function(options) {
    this.d3 = options.container
    .append(this.tagName)
    .datum(this.model.get('coordinates'))
    // .attr('style', 'stroke: ' + this.model.get('stroke') + '; fill: ' + this.model.get('fill') + '; stroke-width: ' + this.model.get('stroke-width')
    .attr('class', this.className);
  },

  renderPath: function() {
    this.d3.datum(this.model.get('coordinates'));
    this.d3.attr('d', this.svgLine);
  }

});

/*

   Instantiating a LineView
   ---------------------------------------------------
   --> Pass in a LineModel, and the SVG container that the line will be appended to

   var line = new LineView({
model: NewLineModel, 
container: d3.select('svg')
})

or

var svg = d3.select('svg');
var line = new LineView({
model: NewLineModel,
container: svg
})

*/
