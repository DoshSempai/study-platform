import React, { useState, useRef, KeyboardEventHandler } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import cn from 'classnames';
import './reactioneditor.css';

interface IReactionEditor {
	placeholder: string;
}

export const ReactionEditor = ({ placeholder }: IReactionEditor): JSX.Element => {
	const text = useRef(placeholder);
	const [isFocused, setFocused] = useState<boolean>(false);
	const [editorAction, setEditorAction] = useState<number>(0);

	const handleFocus = (): void => {
		setFocused(true);
		if (text.current === placeholder) {
			text.current = '';
		}
	};
	const handleBlur = (): void => {
		/* todo */
		console.log(`blur:`, text.current);
		setFocused(false);
	};
	const handleChange = (event: ContentEditableEvent): void => {
		text.current = event.target.value;
		setEditorAction(editorAction + 1);
	};

	return (
		<>
			<ContentEditable
				// innerRef={this.contentEditable}
				className={cn('st-reaction-editor', {
					'st-reaction-editor__placeholder': !isFocused && text.current === placeholder,
				})}
				tagName="pre"
				html={text.current}
				disabled={false}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<EditButton cmd="subscript" name="subscript" />
		</>
	);
};

function EditButton({ cmd, arg, name }: { cmd: string; arg?: string; name?: string }): JSX.Element {
	return (
		<button
			className="editbutton"
			key={cmd}
			onMouseDown={(evt): void => {
				evt.preventDefault(); // Avoids loosing focus from the editable area
				document.execCommand(cmd, false, arg); // Send the command to the browser
			}}
		>
			{name || cmd}
		</button>
	);
}
