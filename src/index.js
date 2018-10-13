/**
 * Generates a mixin that creates a prop that fallbacks to local data to enable components
 * to be used both ways, with a prop controlled by the parent, and with no prop
 * @param {string} prop  name of the prop
 * @param {string} [event]  name of the event emitted when modifying the prop. Defaults to 'update:' + prop
 * @param {import('vue').PropOptions} [propOptions = { required: false }]  type or object for the prop
 */
export function propWithDataFallback (prop, event, propOptions = { required: false }) {
  const local = '_$' + prop
  event = event || 'update:' + prop

  return {
    props: { [prop]: propOptions },
    data: () => ({ [local]: undefined }),
    computed: {
      ['$' + prop]: {
        get () {
          return this[prop] === undefined ? this.$data[local] : this[prop]
        },
        set (value) {
          if (this[prop] === undefined) this.$data[local] = value
          else this.$emit(event, value)
        },
      },
    },
  }
}
