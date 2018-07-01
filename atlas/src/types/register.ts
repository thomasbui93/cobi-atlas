import { Container } from 'inversify';
import TYPES from './index';
import HealthCheck from '../system/HealthCheck';
import { PersonRepository } from './../services/person/PersonRepository';

export const registerServices = (container: Container): void => {
    container.bind<HealthCheck>(TYPES.HealthCheck).to(HealthCheck);
    container.bind<PersonRepository>(TYPES.PersonRepository).to(PersonRepository);
};