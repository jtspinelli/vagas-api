import { Request, Response, NextFunction } from 'express';

export const validateCreateVaga = async (req: Request, res: Response, next: NextFunction) => {
	const { authenticatedUser, descricao, nomeEmpresa, maxCandidatos, dataLimite } = req.body;
	
	if(!authenticatedUser.isRecrutador) return res.status(403).send('Apenas Recrutadores podem criar vagas.');

	if(typeof descricao !== 'string') return res.status(400).send('Propriedade descrição inválida');
	if(typeof nomeEmpresa !== 'string') return res.status(400).send('Propriedade nomeEmpresa inválida');
	if(maxCandidatos && typeof maxCandidatos !== 'number') return res.status(400).send('Propriedade maxCandidatos inválida');
	if(typeof dataLimite !== 'string') return res.status(400).send('Propriedade dataLimite inválida');
	
	next();
};