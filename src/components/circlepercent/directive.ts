import {noChange} from 'lit'
import {directive, Directive, ElementPart, PartInfo, PartType} from 'lit/directive.js'

type Render = (ctx: CanvasRenderingContext2D) => void

class CanvasDirective extends Directive{
  private _ctx: CanvasRenderingContext2D | null = null

  constructor(partInfo: PartInfo){
      super(partInfo)
      if (partInfo.type !== PartType.ELEMENT) {
          throw new Error('Must be element')
      }
  }
  render(___: Render, __: number, _: number){
      return noChange
  }
  update(part: ElementPart, args: [Render, number, number]){
      if(!this._ctx){
          this._ctx = (part.element as HTMLCanvasElement).getContext('2d')!
          this._ctx.canvas.height = args[1] * args[2]
          this._ctx.canvas.width = args[1] * args[2]
      }
      args[0](this._ctx)
  }
}

export const canvasDirective = directive(CanvasDirective)