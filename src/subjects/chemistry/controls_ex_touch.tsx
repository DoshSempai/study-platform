import React from 'react';
import { IChemicalMolecule, IChemicalReaction } from './types';

export const generateAnswerTemplateArray = (reaction: IChemicalReaction): string[] => {
	const { reactants, products } = reaction;
	const getPartArr = (data: IChemicalMolecule[]): string[] => {
		const arr: string[] = [];
		data.forEach((molecule, outerIdx) => {
			if (molecule.number) {
				arr.push('');
			}
			molecule.parts.forEach((_) => arr.push(''));
			if (data.length - outerIdx > 1) {
				arr.push('+');
			}
		});
		return arr;
	};
	return [...getPartArr(reactants), '=', ...getPartArr(products)];
};

const getListOfReactionSideParts = (data: IChemicalMolecule[]): JSX.Element[] => {
	const result: JSX.Element[] = [];
	data.forEach((molecule, outerIdx) => {
		if (molecule.number) {
			result.push(<React.Fragment key={molecule.number}>{molecule.number}</React.Fragment>);
		}
		molecule.parts.forEach((item) => {
			const baseText =
				item.base.length > 1 && item.base.charAt(1) === item.base.charAt(1).toUpperCase()
					? `(${item.base})`
					: item.base;
			result.push(
				<React.Fragment key={`${baseText}${item.index ?? ''}`}>
					{baseText}
					{item.index && <sub>{item.index}</sub>}
				</React.Fragment>,
			);
		});
		if (data.length - outerIdx > 1) {
			result.push(<React.Fragment key="+">+</React.Fragment>);
		}
	});
	return result;
};

export const getListOfReactionParts = (reaction: IChemicalReaction): JSX.Element[] => {
	const { reactants, products } = reaction;
	return [
		...getListOfReactionSideParts(reactants),
		<React.Fragment key="=">=</React.Fragment>,
		...getListOfReactionSideParts(products),
	];
};

const createReactionPart = (data: IChemicalMolecule[]): JSX.Element => (
	<>
		{data.map((molecule, outerIdx) => (
			<React.Fragment key={outerIdx}>
				<>
					{/* ---- 1 ---- */}
					{molecule.number ? molecule.number : <></>}
					{/* ==== 1 ==== */}
					{molecule.parts.map((item, idx) => {
						const baseText =
							item.base.length > 1 && item.base.charAt(1) === item.base.charAt(1).toUpperCase()
								? `(${item.base})`
								: item.base;
						return (
							<React.Fragment key={`${baseText}${item.index}`}>
								{/* ---- 2 ---- */}
								{baseText}
								{item.index && <sub>{item.index}</sub>}
								{/* ==== 2 ==== */}
							</React.Fragment>
						);
					})}
				</>
				{data.length - outerIdx > 1 ? ' + ' : <></>}
			</React.Fragment>
		))}
	</>
);

export const createReactionLine = (reaction: IChemicalReaction): JSX.Element => {
	const { reactants, products } = reaction;
	const leftSideJsx = createReactionPart(reactants);
	const rightSideJsx = createReactionPart(products);
	return (
		<>
			{leftSideJsx} = {rightSideJsx}
		</>
	);
};
