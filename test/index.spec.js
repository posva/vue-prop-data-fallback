import { propWithDataFallback } from '../src/index'

const anyFunction = expect.any(Function)

describe('Prop with data fallback', () => {
  it('works without event nor options', () => {
    expect(propWithDataFallback('contact')).toEqual({
      data: anyFunction,
      props: {
        contact: {
          required: false,
        },
      },
      computed: {
        $contact: {
          get: anyFunction,
          set: anyFunction,
        },
      },
    })
  })

  it('works with prop array type', () => {
    expect(propWithDataFallback('contact', null, [Number, String])).toMatchObject({
      props: {
        contact: [Number, String],
      },
    })
  })

  it('works with prop type', () => {
    expect(propWithDataFallback('contact', null, String)).toMatchObject({
      props: {
        contact: String,
      },
    })
  })

  it('works with prop object options', () => {
    const options = { type: Object }
    expect(propWithDataFallback('contact', null, options)).toMatchObject({
      props: {
        contact: options,
      },
    })
  })

  it('prefixes data with _$', () => {
    const mixin = propWithDataFallback('value')
    expect(mixin.data()).toEqual({ _$value: undefined })
  })

  it('emits an event named update:value', () => {
    const mixin = propWithDataFallback('value')
    const spy = jest.fn()
    expect(
      mixin.computed.$value.set.call(
        {
          $emit: spy,
          value: '',
          $data: { _$value: undefined },
        },
        'foo'
      )
    )
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('update:value', 'foo')
  })

  it('emits a custom event', () => {
    const mixin = propWithDataFallback('value', 'input')
    const spy = jest.fn()
    expect(
      mixin.computed.$value.set.call(
        {
          $emit: spy,
          value: '',
          $data: { _$value: undefined },
        },
        'foo'
      )
    )
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith('input', 'foo')
  })

  it('changes local data if no prop is provided', () => {
    const mixin = propWithDataFallback('value')
    const spy = jest.fn()
    const $data = { _$value: '' }
    expect(
      mixin.computed.$value.set.call(
        {
          $emit: spy,
          value: undefined,
          $data,
        },
        'foo'
      )
    )
    expect(spy).not.toHaveBeenCalled()
    expect($data._$value).toBe('foo')
  })

  it('reads prop when provided', () => {
    const mixin = propWithDataFallback('value')
    expect(
      mixin.computed.$value.get.call({
        value: 'foo',
        $data: { _$value: null },
      })
    ).toBe('foo')
  })

  it('reads data when no prop provided', () => {
    const mixin = propWithDataFallback('value')
    expect(
      mixin.computed.$value.get.call({
        value: undefined,
        $data: { _$value: 'foo' },
      })
    ).toBe('foo')
  })
})
