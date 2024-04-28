import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = {age: 31, childrenCount: 0, name: 'Nare'};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});

    expect(endState.age).toBe(32);
    expect(endState.childrenCount).toBe(0);
})

test('user reducer should increment only children count', () => {
    const startState = {age: 31, childrenCount: 0, name: 'Nare'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});

    expect(endState.childrenCount).toBe(1);
    expect(endState.age).toBe(31);
})

test('user name should change', () => {
    const startState = {age: 31, childrenCount: 0, name: 'Nare'};
    const newName = 'Narik';
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName});

    expect(endState.name).toBe('Narik')
})