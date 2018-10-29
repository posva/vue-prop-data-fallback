# Vue Prop with Data fallabck [![Build Status](https://badgen.net/circleci/github/posva/vue-prop-data-fallback)](https://circleci.com/gh/posva/vue-prop-data-fallback) [![npm package](https://badgen.net/npm/v/vue-prop-data-fallback)](https://www.npmjs.com/package/vue-prop-data-fallback) [![coverage](https://badgen.net/codecov/c/github/posva/vue-prop-data-fallback)](https://codecov.io/github/posva/vue-prop-data-fallback) [![thanks](https://badgen.net/badge/thanks/♥/pink)](https://github.com/posva/thanks)

> Vue mixin to support an optional prop that falls back to a local data

## Installation

```sh
npm install vue-prop-data-fallback
```

## Usage

The example below will create a prop named `value`, a local variable `_$value` (the fallback) and a computed property `$value`.

```vue
<template>
  <input v-model="$value">
</template>

<script>
import { propWithDataFallback } from 'vue-prop-data-fallback'

// MySearch.vue
export default {
  mixins: [propWithDataFallback('value')],

  methods: {
    doSomething() {
      this.$value // the prop or the local value
      // it can be mutated normally
      // this will either change the local variable or emit an event
      this.$value = 'new value'
    },
  },
}
</script>
```

Now the search input's value can be optionally controlled by the parent:

```html
<!-- no control over the value -->
<my-search/>
<my-search :value.sync="parentValue"/>
```

## API

### `propWithDataFallback(prop: string, event?: string, propType?: Object, options?: { data: string, computed: string, initialValue: any }) => mixinObject`

- `prop`: name of the prop that should be created
- `event`: name of the event that should be emitted to enable the usage of `.sync` or `v-model`. Defaults to `'update:' + prop` (to enable the `.sync` modifier by default)
- `propType`: value provided to the prop option. Can be a type like `String`, `Boolean`, an array of types or an object (pretty much anything [here](https://vuejs.org/v2/guide/components-props.html#Prop-Validation)). Defaults to `{ required: false }`
- `options`: extra options to customize the names of the data and computed properties
  - `data`: name of the property added to data. Defaults to `'_$' + prop`
  - `computed`: name of the property added to computed. Defaults to `'_$' + prop`
  - `initialValue`: provides an initial value to be used when no prop is provided

## License

[MIT](http://opensource.org/licenses/MIT)
