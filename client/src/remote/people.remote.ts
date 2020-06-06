import { internalAxios } from './internal-axios'
import { Person } from '../models/Person';


export const getAllPeople = async () => {
    const response = await internalAxios.get<Person[]>('/people');
    console.log(response);
    return response.data.map(person => {
        // Replace string birthdate with Date object
        person.birthdate = new Date(person.birthdate);
        return person;
    });
}

export const createPerson = async (person: Person) => {
    const response = await internalAxios.post('/people', person);
    return true;
}
