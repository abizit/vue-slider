## Vue Slider Beta
A Simple Slider Component using VueJs.
Please consider that the project is still in beta.

## Quick start

### Install
#### Prerequisities

1. [Vue.js](https://vuejs.org/)

#### HTML

Put the required stylesheet at the [top](https://developer.yahoo.com/performance/rules.html#css_top) of your markup:

```html
<link rel="stylesheet" href="vue.slider.css" />
```


Put the script at the [bottom](https://developer.yahoo.com/performance/rules.html#js_bottom) of your markup right after Vuejs:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="vue.slider.js"></script>
```

### Usage

Wrap your items (`div`, `a`, `img`, `span`, `li` etc.) with a container element (`div`, `ul` etc.).

```html
<div class="slider">
<vue-slider :vslides='slides' :voptions='options'>
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
  <div> Your Content </div>
  </vue-slider>
</div>
```

Call the vue-sldier function.

```javascript
vueslider('.slider');
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details