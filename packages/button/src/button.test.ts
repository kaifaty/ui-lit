import {expect} from '@esm-bundle/chai'

import './button.component'

const getButton = () => document.querySelector('wc-button')!
describe('Test Button', async () => {
  beforeEach(async () => {
    document.body.innerHTML = '<wc-button>Button</wc-button>'
  })

  it('is shouldbe icon-before', () => {
    expect(getButton().shadowRoot?.querySelector('slot[name=icon-before]')).exist
  })
  it('is should be icon-after', () => {
    expect(getButton().shadowRoot?.querySelector('slot[name=icon-after]')).exist
  })
  it('is text Transformed', async () => {
    const button = getButton()
    button.innerText = 'button'
    await true
    expect(button.innerText).equal('button'.toUpperCase())
  })
  it('should spin', async () => {
    const button = getButton()
    button.loading = true
    await true
    expect(button.shadowRoot!.querySelector('lit-spinner')).exist
  })
  it('should notify on click', async () => {
    const button = getButton()
    button.notificable = true
    button.click()
    await true
    expect(button.shadowRoot!.querySelector('lit-icon[icon=checkmark]')).exist
  })
  it('should hide notify on click after 1000 ms', async () => {
    const button = getButton()
    button.notificable = true
    button.click()
    await new Promise((r) => setTimeout(() => r(true), 1000))
    expect(button.shadowRoot!.querySelector('lit-icon[icon=checkmark]')).equal(null)
  })
  it('should be focusable', async () => {
    const button = getButton()
    button.focus()
    expect(button.isFocused).equal(true)
  })
  it('should width be same after checked', async () => {
    const button = getButton()
    button.notificable = true
    const widthBefore = button.clientWidth
    button.click()
    expect(button.clientWidth).equal(widthBefore)
  })
  it('should trigger submitForm after submit', async () => {
    const button = getButton()
    button.type = 'submit'
    let submited = false
    button.addEventListener('submitForm', () => {
      submited = true
    })
    button.submit()
    expect(submited).equal(true)
  })
  it('should not trigger submitForm after submit type = button', async () => {
    const button = getButton()
    button.type = 'button'
    let submited = false
    button.addEventListener('submitForm', () => {
      submited = true
    })
    button.submit()
    expect(submited).equal(false)
  })
  it('should switch ', async () => {
    const button = getButton()
    button.variant = 'switch'
    let switched = false
    button.addEventListener('switchChanged', ((e: CustomEvent) => {
      switched = e.detail
    }) as EventListener)

    button.submit()
    expect(switched).equal(true)
  })
})
