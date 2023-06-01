import registerUserMappings from '../../app/features/user/usecases/mappings';
import registerVagaMappings from '../../app/features/vaga/usecases/mappings';

export function registerMappings() {
	registerUserMappings();
	registerVagaMappings();
}