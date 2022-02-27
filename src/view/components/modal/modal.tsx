import React, { ReactNode } from 'react';
import cn from 'classnames';
import './modal.css';

interface IDeleteModal {
	onClose: () => void;
	onAction: () => void;
	content: ReactNode;
	disableAction?: boolean;
	title: string;
	actionName: string;
}

export const ActionModal = ({
	onClose,
	onAction,
	content,
	title,
	disableAction = false,
	actionName,
}: IDeleteModal): JSX.Element => {
	return (
		<>
			<div className="modal-wrap" onClick={onClose}></div>
			<div className="modal">
				<div className="modal__header">
					<div className="modal__title">{title}</div>
					<div className="modal__close" onClick={onClose}></div>
				</div>
				<div className="modal__content">{content}</div>
				<div className="modal__footer">
					<div className="modal__action modal__action-cancel" onClick={onClose}>
						Отмена
					</div>
					<div
						className={cn('modal__action modal__action-main', {
							'modal__action-main--disabled': disableAction,
						})}
						onClick={onAction}
					>
						{actionName}
					</div>
				</div>
			</div>
		</>
	);
};
