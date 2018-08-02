import {Button} from 'primereact/button'

export default class TestComponents extends React.Component{

    
    render(){
        return(
            <div>
                <h1>Hola Mundo soy SvmReact</h1>
                <Button label="Save"/>
                <Button label="Secondary"  className="ui-button-secondary"/>
                
            </div>
        )
    }
}