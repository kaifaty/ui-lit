
import { html } from 'lit-html';
import { Story, Meta } from '@storybook/web-components';
import '../dist/tooltip';
import { ITooltipProps } from '../src/tooltip';


const Tooltip = (data: ITooltipProps) => 
    html`
    
    <lit-tooltip>
        Text
        <span slot = "tooltip">
            
        index.js:18
        _onTooltipUpdated 
        Object { width: 276, height: 80 }
        index.js:18_onTooltiptipUpdated223 { width: 274, height: 80 }
        index.js:18
        _onTooltipUpdated 
        Object { width: 272, height: 80 }
        index.js:18
        _onTooltipUpdated 
        Object { width: 270, height: 80 }
        index.js:18
        _onTooltipUpdated 
        Object { width: 268, height: 80 }
        index.js:18
        _onTooltipUpdated 
        Object { width: 266, height: 80 }
        index.js:18
        _onTooltipUpdated 
        Object { width: 65, height: 29 }
        index.js:18
        _onTooltipUpdated 
        Object { width: 65, height: 29 }
        index.js:18
        _onTooltipUpdated 
        Object { width: 65, height: 29 }
        </span>
    </lit-tooltip>
    <div style = "position: absolute; left: 200px; top: 150px;">
        <lit-tooltip>
            Baboweya
            <span slot = "tooltip">Tooltip</span>
        </lit-tooltip>
    </div>
    <div style = "position: absolute; right: 0px; top: 150px;">
        <lit-tooltip>
            Baboweya
            <span slot = "tooltip">Tooltip</span>
        </lit-tooltip>
    </div>
    <div style = "position: absolute; right: 0px; top: 0px;">
        <lit-tooltip>
            Baboweya
            <span slot = "tooltip">
                webpack built preview  in 212ms
                webpack building...
                webpack built preview  in 236ms
                webpack building...
                webpack built preview  in 422ms</span>
        </lit-tooltip>
    </div>
    `;

const Template: Story<Partial<ITooltipProps>> = (args) => Tooltip(args as ITooltipProps);

export const Default = Template.bind({});
Default.args = {
}
export default {
    title: 'Text/Tooltip',
    argTypes: {
    },
    
} as Meta;