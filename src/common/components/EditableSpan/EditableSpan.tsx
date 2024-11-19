import {ChangeEvent, useState} from "react";
import { TextInput } from "common/components/Input/TextInput";

type PropsType = {
	value: string
	onChange: (newTitle: string) => void
	disabled?: boolean
};

export const EditableSpan = ({value, onChange, disabled = false}: PropsType) => {
	const [editMode, setEditMode] = useState(false)
	const [title, setTitle] = useState(value)

	const activateEditModeHandler = () => {
		setEditMode(true)
	}

	const deactivateEditModeHandler = () => {
		setEditMode(false)
		onChange(title)
	}

	const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	return (
		<>
			{editMode && !disabled
				?
				<TextInput
					value={title}
					onChange={changeTitleHandler}
					onBlur={deactivateEditModeHandler}
					autoFocus
				/>
				: <span onDoubleClick={activateEditModeHandler}>{value}</span>
			}
		</>
	);
};
