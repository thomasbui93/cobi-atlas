import { PersonModel, PersonalModelInterface } from './PersonModel';
import { injectable, inject } from 'inversify';
import { Pagination } from './../../interfaces/models/Pagination';

@injectable()
export class PersonRepository {
    private personModel: any;

    public constructor() {
        this.personModel = PersonModel;
    }

    public create(person: PersonalModelInterface): Promise<PersonalModelInterface> {
        return this.personModel.create(person);
    }

    public search(query: Object): Promise<PersonalModelInterface[]> {
        return this.personModel.find({});
    }

    public list(query: Object): Promise<PersonalModelInterface[]> {
        return this.personModel.find({});
    }

    private listing(pagination: Pagination): Promise<PersonalModelInterface[]> {
        return this.personModel.find({});
    }

    public get(personId: String): Promise<PersonalModelInterface> {
        return this.personModel.findById(personId);
    }

    public update(personId: String, updatedData: Object): Promise<PersonalModelInterface> {
        return this.personModel.findByIdAndUpdate(personId, updatedData);
    }

    public remove(personId: String) {
        return this.personModel.findByIdAndRemove(personId);
    }

    public massUpdate(personIds: Array<String>, updateData: Object): Promise<Object> {
        return this.personModel.updateMany({
            _id: { $in: personIds }
        }, {
            $set: updateData
        });
    }

    public massRemove(personIds: Array<String>): Promise<Object> {
        return this.personModel.remove(personIds);
    }
}