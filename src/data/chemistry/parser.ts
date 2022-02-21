import { IChemicalItem, IChemicalMolecule, IChemicalReaction } from './types';

const parseHTMLParticle = (particle: string): IChemicalItem => {
	let index;
	const base = particle.split('<sub>')[0];
	if (particle.split('<sub>')[1]) {
		index = Number(particle.split('<sub>')[1].split('</sub>')[0]);
	}
	return {
		base: base,
		index: index,
	};
};

const parseHTMLElement = (element: string): Array<IChemicalItem> => {
	let startIdx = -1;
	let inBrackets = false;
	const elements: string[] = [];

	element.split('').forEach((s, i) => {
		if (s === '(') {
			elements.push(element.slice(startIdx, i));
			startIdx = i;
			inBrackets = true;
		} else if (s === ')') {
			inBrackets = false;
		} else if (s.match(/[A-Z]/) && startIdx === -1 && !inBrackets) {
			startIdx = i;
		} else if (s.match(/[A-Z]/) && startIdx !== -1 && !inBrackets) {
			elements.push(element.slice(startIdx, i));
			startIdx = i;
		}
		if (s.match(/[A-Z]/) && i === element.length - 1) {
			elements.push(s);
		} else if (!s.match(/[A-Z]/) && i === element.length - 1) {
			elements.push(element.slice(startIdx));
		}
	});
	console.log('parseHTMLElement', elements);
	return elements.map((el) => parseHTMLParticle(el.replace(/(\(|\))/g, '')));
};

const parseHTMLMolecule = (molecule: string): IChemicalMolecule => {
	let number = !isNaN(parseInt(molecule)) ? parseInt(molecule) : undefined;
	number = number && number > 1 ? number : undefined;
	const noNumberMolecule = number ? molecule.slice(`${number}`.length) : molecule;
	// return [number, molecule.slice(`${number}`.length)]
	return {
		number,
		parts: parseHTMLElement(noNumberMolecule),
	};
};

export const parseHTMLReaction = (reaction: string): IChemicalReaction | Error => {
	try {
		// const reaction = '2H<sub>2</sub> + O<sub>2</sub> = 2H<sub>2</sub>O';
		const reactantsArr = reaction
			.split('=')[0]
			.trim()
			.split('+')
			.map((el) => el.trim());
		const productsArr = reaction
			.split('=')[1]
			.trim()
			.split('+')
			.map((el) => el.trim());
		return {
			reactants: reactantsArr.map((el) => parseHTMLMolecule(el)),
			products: productsArr.map((el) => parseHTMLMolecule(el)),
		};
	} catch (e) {
		return Error("Can't parse reaction");
	}
};
