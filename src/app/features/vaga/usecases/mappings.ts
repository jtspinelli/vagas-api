import mapper from '../../../helpers/mapper';
import { createMap } from '@automapper/core';
import { VagaToCreateDTO } from './createVagaUsecase/VagaToCreateDTO';
import { VagaEntity } from '../../../shared/database/entities/vaga.entity';

const registerVagaMappings = () => {
	createMap(mapper, VagaToCreateDTO, VagaEntity);
};

export default registerVagaMappings;