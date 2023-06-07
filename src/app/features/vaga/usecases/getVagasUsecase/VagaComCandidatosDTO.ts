import { UserDTO } from '../../../user/usecases/getUsers/UserDTO';
import { VagaDTO } from './VagaDTO';

export interface VagaComCandidatosDTO extends VagaDTO {
	candidatos: UserDTO[]
}