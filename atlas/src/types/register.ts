import { Container } from 'inversify';
import TYPES from './index';
import HealthCheck from '../system/HealthCheck';

export const registerServices = (container: Container): void => {
    container.bind<HealthCheck>(TYPES.HealthCheck).to(HealthCheck);
};