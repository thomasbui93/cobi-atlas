import { Request, Response, NextFunction } from 'express';
import { interfaces, controller, httpGet } from 'inversify-express-utils';
import { injectable, inject } from 'inversify';
import HealthCheck from '../../system/HealthCheck';
import TYPES from './../../types';

@controller('/health-check')
export class SystemController implements interfaces.Controller {

    constructor( @inject(TYPES.HealthCheck) private healthCheck: HealthCheck ) {}

    @httpGet('/')
    private async index(req: Request, res: Response, next: NextFunction) {
        try {
            const databaseStatus = await this.healthCheck.databaseStatus();
            return res.json({
                ...databaseStatus
            });
        } catch ( exception ) {
            return res.json({
                error: true,
                message: 'Error has occured!'
            });
        }
    }
}