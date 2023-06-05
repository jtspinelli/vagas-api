import { createMap, forMember, mapFrom } from '@automapper/core';
import mapper from '../../../helpers/mapper';
import { VagaToCreateDTO } from './createVagaUsecase/VagaToCreateDTO';
import { VagaEntity } from '../../../shared/database/entities/vaga.entity';
import { VagaDTO } from './getVagasUsecase/VagaDTO';

const registerVagaMappings = () => {
	createMap(mapper, VagaToCreateDTO, VagaEntity);
	// createMap(mapper, VagaEntity, VagaDTO, forMember(dto => dto.ativo, mapFrom(entity => entity.ativo)));
};

export default registerVagaMappings;