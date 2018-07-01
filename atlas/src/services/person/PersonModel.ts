import { Document, Schema, Model, model } from 'mongoose';
import { PersonInterface } from './../../interfaces/models/PersonInterface';

export interface PersonalModelInterface extends PersonInterface, Document {}

const PersonSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    maidenName: String,
    dateOfBirth: {
        type: Date,
        required: true
    },
    placeOfBirth: {
        type: String,
        required: true
    },
    gender: ['MALE', 'FEMALE'],
    spouse: this,
    children: [this],
    createdAt: Date,
    updatedAt: Date,
    isPublished: {
        type: Boolean,
        default: false
    }
});

PersonSchema.pre('save', function(next: Function) {
    const now = new Date();
    if (!this.createdAt) {
      this.createdAt = now;
    }
    this.updatedAt = now;
    next();
}.bind(this));

PersonSchema.index({'firstName': 1, 'lastName': 2});

export const PersonModel: Model<PersonalModelInterface> = model<PersonalModelInterface>('personal', PersonSchema);
