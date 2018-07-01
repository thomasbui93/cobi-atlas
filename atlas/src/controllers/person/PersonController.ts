import { Request, Response, NextFunction } from 'express';
import { interfaces, controller, httpGet, httpPost, httpDelete } from 'inversify-express-utils';
import { inject } from 'inversify';
import { PersonRepository } from '../../services/person/PersonRepository';
import TYPES from './../../types';

@controller('/person')
export class PersonController implements interfaces.Controller {

    constructor( @inject(TYPES.PersonRepository) private personRepository: PersonRepository ) {}

    @httpGet('/')
    private async all(req: Request, res: Response, next: NextFunction) {
        try {
            const persons = await this.personRepository.list(req.query);
            res.json({
                persons: persons
            });
        } catch (err) {
            next(err);
        }
    }

    @httpPost('/')
    private async createPerson(req: Request, res: Response, next: NextFunction) {
        try {
            const person = await this.personRepository.create(req.body);
            res.json({
                person: person
            });
        } catch (err) {
            next(err);
        }
    }

    @httpPost('/:personId')
    private async updatePerson(req: Request, res: Response, next: NextFunction) {
        try {
            const person = await this.personRepository.update(req.params.personId, req.body);
            res.json({
                person: person
            });
        } catch (err) {
            next(err);
        }
    }

    @httpPost('/:personIds')
    private async massUpdatePerson(req: Request, res: Response, next: NextFunction) {
        try {
            const person = await this.personRepository.massUpdate(req.params.personIds, req.body);
            res.json({
                status: true
            });
        } catch (err) {
            next(err);
        }
    }

    @httpDelete('/:personId')
    private async removePerson(req: Request, res: Response, next: NextFunction) {
        try {
            const person = await this.personRepository.remove(req.params.personId);
            res.json({
                status: true
            });
        } catch (err) {
            next(err);
        }
    }

    @httpDelete('/:personIds')
    private async massRemove(req: Request, res: Response, next: NextFunction) {
        try {
            const person = await this.personRepository.massRemove(req.params.personIds);
            res.json({
                status: true
            });
        } catch (err) {
            next(err);
        }
    }
}