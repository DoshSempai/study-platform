/**
 * ---- OLD:
 * 2-H#2 + O#2 = 2-H#2-O
 * Ba(OH)#2
 * ---- NEW
 * 2H{2} + O{2} = 2H{2}O
 * C{17}H{31}COOH
 *
 * ---- NEW 2
 * 2{H2} + {O2} = 2{H2}O
 */

export interface IChemicalItem {
	base: string;
	index?: number;
}

export interface IChemicalMolecule {
	number?: number;
	parts: Array<IChemicalItem>;
}

export interface IChemicalReaction {
	reactants: Array<IChemicalMolecule>;
	products: Array<IChemicalMolecule>;
}

// ---- // ---- // ----

const molecule2H2: IChemicalMolecule = {
	number: 2,
	parts: [{ base: 'H', index: 2 }],
};

const moleculeO2: IChemicalMolecule = {
	parts: [{ base: 'O', index: 2 }],
};

const molecule2H20: IChemicalMolecule = {
	number: 2,
	parts: [{ base: 'H', index: 2 }, { base: 'O' }],
};

export const reaction: IChemicalReaction = {
	reactants: [molecule2H2, moleculeO2],
	products: [molecule2H20],
};

// ---- // ---- // ----

// Fe2O3 + 3H2O = 2Fe(OH)3

const moleculeF1: IChemicalMolecule = {
	parts: [
		{ base: 'Fe', index: 2 },
		{ base: 'O', index: 3 },
	],
};

const moleculeF2: IChemicalMolecule = {
	number: 3,
	parts: [{ base: 'H', index: 2 }, { base: 'O' }],
};

const moleculeF3: IChemicalMolecule = {
	number: 2,
	parts: [{ base: 'Fe' }, { base: 'OH', index: 3 }],
};

export const reactionF: IChemicalReaction = {
	reactants: [moleculeF1, moleculeF2],
	products: [moleculeF3],
};
