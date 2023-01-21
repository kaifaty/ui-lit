import './dialog'
import type {LitDialog} from './dialog'
import {DialogParams, DialogState} from './types'

const getDialog = () => {
    const existDialog = document.querySelector('lit-dialog')
    if(existDialog){
        return existDialog
    }
    const dialog = document.createElement('lit-dialog')
    document.body.appendChild(dialog)
    return dialog
}

export class Dialog{
    static #root?: Dialog
    #dialog?: LitDialog

    constructor(params?: DialogParams){
        if(Dialog.#root){
            Dialog.#setParams(params)
            return Dialog.#root
        }
        this.#dialog = getDialog()
        Dialog.#root = this
        Dialog.#setParams(params)
        this.#setStyles()
    }
    static #setParams(params?: DialogParams){
        if(!this.#root){
            throw new Error('Dialog class is not provided')
        }
        if(!this.#root.#dialog){
            throw new Error('Lit Dialog element is not provided')
        }
        if(params?.type){
            this.#root.#dialog.type = params.type 
        }
    }
    #setStyles(){
        const el = document.createElement('style')
        el.innerHTML = `
        [inert] {
            pointer-events: none;
            cursor: default;
        }
        
        [inert], [inert] * {
            user-select: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
        }`
        document.head.appendChild(el)
    }

    open(data: DialogState){
        return this.#dialog?.open(data)
    }

    back(){
        return this.#dialog?.back()
    }

    close(){
        return this.#dialog?.close()
    }
}