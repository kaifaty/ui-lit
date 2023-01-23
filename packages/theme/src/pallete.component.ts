import {css, html, LitElement} from 'lit'
import {property} from 'lit/decorators.js'
import {styleMap} from 'lit/directives/style-map.js'


export class LitPallete extends LitElement{
    static styles = css`
    :host{
        display: block;
        width: 100%;
    }
    .pallete{
        display: flex;
    }
    .pallete-color{
        height: 60px;
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    `
    @property({type: String}) name = 'primary'

    protected render(): unknown {
        return html`
        <div>${this.name}</div>
        <div class = "pallete">
            ${[-700, -600, -500, -400, -300, -200, -100, 0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500].map(it => {
                const styles = {
                    'background-color': `var(--${this.name}-${it})`,
                    'color': it < 0 ? `var(--${this.name}-${it + 1200})`: 'white',
                }
                return html`<div 
                        class = "pallete-color" 
                        style = "${styleMap(styles)}"
                    ></div>`
            })}
        </div>
        `
    }
}