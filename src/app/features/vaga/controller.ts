/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { VagaRepository } from './repository';
import { CreateVagaUsecase } from './usecases/createVagaUsecase/createVagaUsecase';
import { handleError } from '../../shared/exceptions';
import { CandidaturaRepository } from '../candidatura/repository';
import { GetCandidatosUsecase } from './usecases/getCandidatosUsecase/getCandidatosUsecase';
import { GetVagasUsecase } from './usecases/getVagasUsecase/getVagasUsecase';
import { VagaEntity } from '../../shared/database/entities/vaga.entity';
import { DeleteVagaUsecase } from './usecases/deleteVagaUsecase/deleteVagaUsecase';
import { GetVagasSemCandidaturasUsecase } from './usecases/getVagasUsecase/getVagasSemCandidaturasUsecase';
import { GetVagasFullCandidaturasUsecase } from './usecases/getVagasUsecase/getVagasFullCandidaturasUsecase';
import db from '../../../main/config/dataSource';

export const listVagasController = async (req: Request, res: Response) => {
	try {
		const vagaRepository = new VagaRepository();
		const candidaturaRepository = new CandidaturaRepository();
		const getVagasUsecase = new GetVagasUsecase(vagaRepository, candidaturaRepository);		
		const vagas = await getVagasUsecase.execute(req.body.authenticatedUser, req.query);

		res.status(200).send(vagas);
	} catch (error: any) {
		handleError(error, res);
	}
};

export const getVagasSemCandidaturasController = async (req: Request, res: Response) => {
	try {
		const vagaRepository = new VagaRepository();
		const getVagasSemCandidaturasUsecase = new GetVagasSemCandidaturasUsecase(vagaRepository);

		res.send(await getVagasSemCandidaturasUsecase.execute(req.query));
	} catch (error: any) {
		handleError(error, res);
	}
};

export const getVagasFullCandidaturasController = async (req: Request, res: Response) => {
	try {
		const vagaRepository = new VagaRepository();
		const getVagasFullCandidaturasUsecase = new GetVagasFullCandidaturasUsecase(vagaRepository);
		
		res.send(await getVagasFullCandidaturasUsecase.execute(req.query));
	} catch (error: any) {
		handleError(error, res);
	}
};

export const createVagaController = async (req: Request, res: Response) => {
	try {
		const {authenticatedUser} = req.body;
		const vagaRepository = new VagaRepository();
		const createVagaUsecase = new CreateVagaUsecase(vagaRepository);
		const createdVaga = await createVagaUsecase.execute(req.body, authenticatedUser);

		return res.send(createdVaga);
	} catch (error: any) {
		handleError(error, res);
	}
};

export const getCandidatosController = async (req: Request, res: Response) => {
	const candidaturaRepository = new CandidaturaRepository();
	const getCandidatosUsecase = new GetCandidatosUsecase(candidaturaRepository);

	return res.status(200).send(await getCandidatosUsecase.execute(req.query, req.params.id, req.body.authenticatedUser.sub));
};

const setVagaAtiva = (res: Response, vaga: VagaEntity, value: boolean) => {
	vaga.ativa = value;
	db.getRepository(VagaEntity).save(vaga);

	return res.status(204).send({});
};

export const desativarVagaController = async (req: Request, res: Response) => {
	return setVagaAtiva(res, req.body.vaga as VagaEntity, false);
};

export const ativarVagaController = async (req: Request, res: Response) => {
	return setVagaAtiva(res, req.body.vaga as VagaEntity, true);

};

export const deleteVagaController = async (req: Request, res: Response) => {
	const vagaRepository = new VagaRepository();
	const deleteVagaUsecase = new DeleteVagaUsecase(vagaRepository);
		
	return res.send({deleted: (await deleteVagaUsecase.execute(req.body.vaga)).uuid});
};