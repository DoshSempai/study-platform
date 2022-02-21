import React, { useState, useRef, KeyboardEventHandler } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import cn from 'classnames';
import { TriangleDown, TriangleUp } from '../../../../assets/svg';
import './reactioneditor.css';

interface IReactionEditor {
	placeholder: string;
	onFocusHandler: () => void;
	onInputHandler: (value: string) => void;
}

export const ReactionEditor = ({
	placeholder,
	onFocusHandler,
	onInputHandler,
}: IReactionEditor): JSX.Element => {
	const text = useRef(placeholder);
	const copyText = useRef('');
	const [isFocused, setFocused] = useState<boolean>(false);
	const [editorAction, setEditorAction] = useState<number>(0);

	const handleFocus = (): void => {
		setFocused(true);
		onFocusHandler();
		if (text.current === placeholder && copyText.current === '') {
			text.current = '';
		}
	};
	const handleBlur = (): void => {
		if (text.current === '') {
			text.current = placeholder;
		}
		setFocused(false);
	};
	const handleChange = (event: ContentEditableEvent): void => {
		text.current = event.target.value;
		copyText.current = event.target.value;
		setEditorAction(editorAction + 1);
		onInputHandler(event.target.value);
	};

	const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
		if (event.ctrlKey && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
			event.preventDefault();
			document.execCommand('subscript', false);
		}
	};

	return (
		<div className="st-reaction-editor-wrap">
			<ContentEditable
				className={cn('st-reaction-editor', {
					'st-reaction-editor__placeholder':
						!isFocused && text.current === placeholder && copyText.current === '',
				})}
				tagName="pre"
				html={text.current}
				disabled={false}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
			/>
			<div className="st-editbutton-wrap">
				<EditButton cmd="subscript" mode="down" />
				<EditButton cmd="subscript" mode="up" />
			</div>
		</div>
	);
};

function EditButton({ cmd, mode }: { cmd: string; mode: 'up' | 'down' }): JSX.Element {
	return (
		<div
			className="st-editbutton"
			key={cmd}
			onMouseDown={(evt): void => {
				evt.preventDefault(); // Avoids loosing focus from the editable area
				document.execCommand(cmd, false); // Send the command to the browser
			}}
		>
			{mode === 'down' ? (
				<>
					<TriangleDown />
					<div className="st-editbutton__text">(Ctrl + &#8595;) подстрочный режим ввода</div>
				</>
			) : (
				<>
					<TriangleUp />
					<div className="st-editbutton__text">(Ctrl + &#8593;) обычный режим ввода</div>
				</>
			)}
		</div>
	);
}
