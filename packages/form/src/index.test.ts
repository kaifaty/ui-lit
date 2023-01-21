import assert from 'uvu/assert'

import './index.js'
import '../number'
import '../textfield'
import '../checkbox'
import '../range'
import '../../tabs'
import '../textarea'
import '../button/button.component'

const getForm = () => document.querySelector('lit-form')!

beforeEach(async () => {
  document.body.innerHTML = `<lit-form>
                                    <lit-numberfield name = "number" value = "1"></lit-numberfield>
                                    <lit-textfield name = "textfield" value = "textfield"></lit-textfield>
                                    <lit-checkbox name = "checkbox" value = "on"></lit-checkbox>
                                    <lit-checkbox name = "checkboxoff" value = "off"></lit-checkbox>
                                    <lit-range name = "range" value = "40" ></lit-range>
                                    <lit-tabs name = "tabs" value = "tab-2">
                                        <lit-tab value = "tab-1"></lit-tab>
                                        <lit-tab value = "tab-2"></lit-tab>
                                    </lit-tabs>
                                    <lit-textarea name = "textarea" value = "textarea"></lit-textarea>
                                    <lit-button type = "submit">submit</lit-button>            
                                </lit-form>`
})

describe('Test forms', async () => {
  it('should get number', async () => {
    const data = getForm().getData()
    assert.is(data.number, 1)
  })
  it('should get textfield', async () => {
    const data = getForm().getData()
    assert.is(data.textfield, 'textfield')
  })
  it('should get checkbox', async () => {
    const data = getForm().getData()
    assert.is(data.checkbox, true)
  })
  it('should get checkboxoff', async () => {
    const data = getForm().getData()
    assert.is(data.checkboxoff, false)
  })
  it('should get range', async () => {
    const data = getForm().getData()
    assert.is(data.range, 40)
  })
  it('should get tabs', async () => {
    const data = getForm().getData()
    assert.is(data.tabs, 'tab-2')
  })
  it('should get textarea', async () => {
    const data = getForm().getData()
    assert.is(data.textarea, 'textarea')
  })
  it('should get submit', async () => {
    const form = getForm()
    let submited = false
    form.addEventListener('submit', (e) => {
      submited = true
    })
    form.submit()
    await new Promise((r) => setTimeout(r, 0))
    assert.is(submited, true)
  })
  it('should action', async () => {
    const form = getForm()
    let number = 0
    form.onAction = async (data: any) => {
      number = data.number
      return false
    }
    form.submit()
    assert.is(number, 1)
  })
  it('should not get submit', async () => {
    const form = getForm()
    let submited = false
    form.addEventListener('submit', () => {
      submited = true
    })
    form.onAction = async (data: any) => {
      throw new Error()
    }
    form.submit()
    assert.is(submited, false)
  })
  it('should reset values', async () => {
    const form = getForm()
    form.querySelector<HTMLInputElement>('lit-numberfield')!.value = '5'
    form.reset()
    await new Promise((r) => setTimeout(r, 0))
    assert.is(form.querySelector<HTMLInputElement>('lit-numberfield')?.value, '1')
  })
})
