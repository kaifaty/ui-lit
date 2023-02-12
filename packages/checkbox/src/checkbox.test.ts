import {expect} from '@esm-bundle/chai'

import './index'
import '../label/index'

const getCheckbox = () => document.querySelector('wc-checkbox')!

describe('Test Checkbox', async () => {
  beforeEach(async () => {
    document.body.innerHTML = '<wc-checkbox></wc-checkbox>'
  })

  it('should default value is off', () => {
    const checbox = getCheckbox()
    expect(checbox.value).equal('off')
  })
  it('should default checked is false', () => {
    const checbox = getCheckbox()
    expect(checbox.checked).equal(false)
  })
  it('should changed value by checked', () => {
    const checbox = getCheckbox()
    checbox.checked = true
    expect(checbox.value).equal('on')
  })
  it('should trigger changed event', () => {
    const checbox = getCheckbox()
    let toggled = ''
    checbox.addEventListener('changed', ((e: CustomEvent) => {
      toggled = e.detail.checked + e.detail.value
    }) as EventListener)
    checbox.toggle()
    expect(toggled).equal('trueon')
  })

  it('should NOT trigger changed event when readonly', () => {
    const checbox = getCheckbox()
    let toggled = ''
    checbox.readonly = true
    checbox.addEventListener('changed', ((e: CustomEvent) => {
      toggled = e.detail.checked + e.detail.value
    }) as EventListener)
    checbox.toggle()
    expect(toggled).equal('')
  })
  it('should NOT trigger changed event when disabled', () => {
    const checbox = getCheckbox()
    let toggled = ''
    checbox.disabled = true
    checbox.addEventListener('changed', ((e: CustomEvent) => {
      toggled = e.detail.checked + e.detail.value
    }) as EventListener)
    checbox.toggle()
    expect(toggled).equal('')
  })
})
