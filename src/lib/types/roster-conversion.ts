import { z } from 'zod';
import { STAT_NAMES, type PlayerStats } from './stats';
import { getArchetypeFromId, getPositionFromId } from '$lib/data/roster-conversion';
import type { PositionType } from '$lib/data/positions';

export const playerCsvSchema = z.object({
	EPAV: z.coerce.number(),
	PACC: z.coerce.number(),
	PAGI: z.coerce.number(),
	PAWR: z.coerce.number(),
	PBCV: z.coerce.number(),
	PBKT: z.coerce.number(),
	PBSG: z.coerce.number(),
	PBSK: z.coerce.number(),
	PCAR: z.coerce.number(),
	PCTH: z.coerce.number(),
	PDRO: z.coerce.number(),
	PDRR: z.coerce.number(),
	PELU: z.coerce.number(),
	PEPS: z.string().describe('LastFirst_ID'),
	PFMS: z.coerce.number(),
	PFNA: z.string().describe('First Name'),
	PGHE: z.coerce.number(),
	PGID: z.coerce.number(),
	PHGT: z.coerce.number(),
	PHSN: z.coerce.number(),
	PHTN: z.string().describe('Hometown'),
	PICN: z.coerce.number(),
	PIMP: z.coerce.number(),
	PINJ: z.coerce.number(),
	PJEN: z.coerce.number(),
	PJMP: z.coerce.number(),
	PKAC: z.coerce.number(),
	PKPR: z.coerce.number(),
	PKRT: z.coerce.number(),
	PLBD: z.coerce.number(),
	PLBK: z.coerce.number(),
	PLCI: z.coerce.number(),
	PLHT: z.coerce.number(),
	PLIB: z.coerce.number(),
	PLJM: z.coerce.number(),
	PLMC: z.coerce.number(),
	PLMO: z.coerce.number(),
	PLNA: z.string().describe('Last Name'),
	PLPE: z.coerce.number(),
	PLPM: z.coerce.number(),
	PLPO: z.coerce.number(),
	PLPR: z.coerce.number(),
	PLPU: z.coerce.number(),
	PLRL: z.coerce.number(),
	PLSA: z.coerce.number(),
	PLSC: z.coerce.number(),
	PLSM: z.coerce.number(),
	PLTR: z.coerce.number(),
	PLTY: z.coerce.number(),
	PLZC: z.coerce.number(),
	PMRR: z.coerce.number(),
	POID: z.coerce.number(),
	POVR: z.coerce.number(),
	PPBF: z.coerce.number(),
	PPBK: z.coerce.number(),
	PPBS: z.coerce.number(),
	PPLA: z.coerce.number(),
	PPOS: z.coerce.number(),
	PRBF: z.coerce.number(),
	PRBK: z.coerce.number(),
	PRBS: z.coerce.number(),
	PRSE: z.coerce.number(),
	PSPD: z.coerce.number(),
	PSTA: z.coerce.number(),
	PSTM: z.coerce.number(),
	PSTR: z.coerce.number(),
	PSXP: z.coerce.number(),
	PTAD: z.coerce.number(),
	PTAK: z.coerce.number(),
	PTAM: z.coerce.number(),
	PTAS: z.coerce.number(),
	PTEN: z.coerce.number(),
	PTGH: z.coerce.number(),
	PTHA: z.coerce.number(),
	PTHP: z.coerce.number(),
	PTOR: z.coerce.number(),
	PTUP: z.coerce.number(),
	PWGT: z.coerce.number(),
	PYCF: z.coerce.number(),
	PYEA: z.coerce.number().describe('Year'),
	SRRN: z.coerce.number(),
	TGID: z.coerce.number(),
	TRBH: z.coerce.number(),
	TRBR: z.coerce.number(),
	TRCB: z.coerce.number(),
	TRCL: z.coerce.number(),
	TRDO: z.coerce.number(),
	TRDS: z.coerce.number(),
	TRFB: z.coerce.number(),
	TRFK: z.coerce.number(),
	TRFY: z.coerce.number(),
	TRHM: z.coerce.number(),
	TRJR: z.coerce.number(),
	TRSB: z.coerce.number(),
	TRSW: z.coerce.number(),
	TRTA: z.coerce.number(),
	TRTL: z.coerce.number(),
	TRTS: z.coerce.number(),
	TRWU: z.coerce.number(),
	PCBT: z.coerce.number(),
	PIIP: z.coerce.number(),
	PROL: z.coerce.number(),
	PRSD: z.coerce.number(),
	PAGE: z.coerce.number(),
	PCMT: z.coerce.number(),
	PSKI: z.coerce.number(),
	PDPI: z.coerce.number(),
	PQBS: z.coerce.number(),
	PIEA: z.coerce.number(),
	PHAN: z.coerce.number(),
	ISCN: z.coerce.number(),
	PLCP: z.coerce.number(),
	PUHE: z.coerce.number(),
	PLPL: z.coerce.number(),
	PSTN: z.coerce.number()
});

export type PlayerCsv = z.infer<typeof playerCsvSchema>;

export const playerDbSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	archetype: z.string(),
	position: z.string(),
	OVR: z.coerce.number(),
	...Object.fromEntries(Object.keys(STAT_NAMES).map((key) => [key, z.coerce.number()]))
});
export type PlayerDb = z.infer<typeof playerDbSchema>;

export function mapPlayerCsvToDb(p: PlayerCsv): PlayerDb {
	const stats: PlayerStats = {
		SPD: p.PSPD,
		STR: p.PSTR,
		AGI: p.PAGI,
		ACC: p.PACC,
		AWR: p.PAWR,
		BTK: p.PBKT,
		TRK: p.PLTR,
		COD: p.PELU,
		BCV: p.PBCV,
		SFA: p.PLSA,
		SPM: p.PLSM,
		JKM: p.PLJM,
		CAR: p.PCAR,
		CTH: p.PCTH,
		SRR: p.SRRN,
		MRR: p.PMRR,
		DRR: p.PDRR,
		CIT: p.PLCI,
		SPC: p.PLSC,
		RLS: p.PLRL,
		JMP: p.PJMP,
		THP: p.PTHP,
		SAC: p.PTAS,
		MAC: p.PTAM,
		DAC: p.PTAD,
		RUN: p.PTOR,
		TUP: p.PTUP,
		BSK: p.PBSK,
		PAC: p.PPLA,
		TAK: p.PTAK,
		POW: p.PLHT,
		PMV: p.PLPM,
		FMV: p.PFMS,
		BSH: p.PBSG,
		PUR: p.PLPU,
		PRC: p.PLPR,
		MCV: p.PLMC,
		ZCV: p.PLZC,
		PRS: p.PLPE,
		PBK: p.PPBK,
		PBP: p.PPBS,
		PBF: p.PPBF,
		RBK: p.PRBK,
		RBP: p.PRBS,
		RBF: p.PRBF,
		LBK: p.PLBK,
		IBL: p.PLIB,
		KPW: p.PKPR,
		KAC: p.PKAC,
		RET: p.PKRT,
		STA: p.PSTA,
		INJ: p.PINJ,
		TGH: p.PTGH,
		LSP: p.PIMP
	};

	return playerDbSchema.parse({
		firstName: p.PFNA,
		lastName: p.PLNA,
		archetype: getArchetypeFromId(p.PLTY),
		position: getPositionFromId(p.PPOS),
		OVR: p.POVR,
		...stats
	});
}

export interface BaselineFormula {
	slope: number;
	intercept: number;
	r2: number;
}

export interface ArchetypeAnalysis {
	deltas: Record<string, number>;
	sampleCount: number;
}

export interface PositionAnalysis {
	baselineFormulas: Record<string, BaselineFormula>;
	correlations: Record<string, Record<string, number>>;
	stdDevs: Record<string, number>;
	archetypes: Record<string, ArchetypeAnalysis>;
}

export type RosterAnalysisData = Record<PositionType, PositionAnalysis>;
export type JsonStorage = {
	firstNames: Record<string, number>;
	lastNames: Record<string, number>;
	rosterAnalysisData: RosterAnalysisData;
};
