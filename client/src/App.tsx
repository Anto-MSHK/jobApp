
import { InputText, InputPassword, InputSelection, InputArea, InputStepper, } from './Components/UI/Inputs/Inputs';

function App() {
	return (
		<div className="App">
			<InputText title='sss' value='sss' name='ddd' />
			<InputPassword value='' />
			<InputSelection title='Страна' name='' options={['Россия', 'Англия', 'Германия']} />
			<InputArea title='О себе' body='' name='' />
			<InputStepper title='Ваш возраст' name='' />
		</div>
	);
}

export default App;
