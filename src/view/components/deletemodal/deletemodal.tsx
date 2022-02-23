import React from 'react';
import cn from 'classnames';
import './deletemodal.css';

interface IDeleteModal {
	onClose: () => void;
}

export const DeleteModal = ({ onClose }: IDeleteModal): JSX.Element => {
	return (
		<>
			<div className="modal-wrap"></div>
			<div className="modal">
				<div className="modal__header">
					<div className="modal__title">Удаление теста</div>
					<div className="modal__close" onClick={onClose}></div>
				</div>
				<div className="modal__content">work in progress</div>
				<div className="modal__footer">
					<div className="modal__action modal__action-cancel" onClick={onClose}>
						Отмена
					</div>
					<div
						className={cn('modal__action modal__action-main', {
							'modal__action-main--disabled': true,
						})}
						onClick={(): void => {
							/* noop */
						}}
					>
						Удалить
					</div>
				</div>
			</div>
		</>
	);
};
