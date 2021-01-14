/*Group 2: Introduce the ability to register a user.
As a user, I can register as a customer with a starting amount of money.
*/

import logger from '../log';
import userService from './user.service';

let currentYear: number = (new Date()).getFullYear();
export class User {
    constructor(
        public name: string, 
        public password: string,  
        public role: string,     // Employee, Supervisor, DeptHead, Benco, BencoSupervisor
        public year: number,
        public supName: string | undefined,
        public fund: number | undefined,
        

        ){ 
            this.year = currentYear;
        };
}

export async function login(name: string, password: string): Promise<User|null> {
    logger.debug(`${name +' '+ password}`);
    return await userService.getUserByName(name).then((user)=> {
        if (user && user.password === password) {
            return user
        } else {
            return null;
        }
    });
}

export function register(username: string, password: string, role: string,  callback: Function, supName?: string, fund?: number) {
    userService.addUser(new User(username, password, role, currentYear, supName , fund)).then((res) => {
        logger.trace(res);
        callback();
    }).catch((err) => {
        logger.error(err);
        console.log('Error, this probably means that the username is already taken.')
        callback();
    });
}

export function updateUser(user: User) {
    userService.updateUser(user).then((success) => {
        logger.info('user updated successfully');
    }).catch((error) => {
        logger.warn('user not updated');
    });
}