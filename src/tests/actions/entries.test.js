import {
    addEntry,
    editEntry,
    removeEntry,
    startAddEntry,
    startSetEntries,
    setEntries,
    startRemoveEntry,
    startEditEntry,
} from "../../actions/entries";
import entries from "../data/testData.js";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";

// create mock store with middlewares (in this case is just thunk)
const createMockStore = configureMockStore([thunk]);

// adds data to the database before each test case
beforeEach((done) => {
    const entriesData = {};
    entries.forEach((entry) => {
        const id = entry.id;
        entriesData[id] = {
            entryType: entry.entryType,
            firstName: entry.firstName,
            lastName: entry.lastName,
            team: entry.team,
            discipline: entry.discipline,
            position: entry.position,
            phoneNumber: entry.phoneNumber,
            dob: entry.dob,
        };
    });

    database
        .ref("entries")
        .set(entriesData)
        .then(() => done());
});

test("should setup removeEntry action object", () => {
    const action = removeEntry({ id: "123" });
    expect(action).toEqual({ type: "REMOVE_ENTRY", id: "123" });
});

test("should setup editEntry action object", () => {
    const action = editEntry({ id: "123", updates: { firstName: "Alex" } });
    expect(action).toEqual({
        type: "EDIT_ENTRY",
        id: "123",
        updates: {
            firstName: "Alex",
        },
    });
});

test("should setup removeEntry action object", () => {
    const action = removeEntry({ id: "123" });
    expect(action).toEqual({ type: "REMOVE_ENTRY", id: "123" });
});

test("should setup editEntry action object", () => {
    const action = editEntry({ id: "123", updates: { firstName: "Alex" } });
    expect(action).toEqual({
        type: "EDIT_ENTRY",
        id: "123",
        updates: {
            firstName: "Alex",
        },
    });
});

test("should setup addEntry action object with all provided values", () => {
    const action = addEntry(entries[0]);
    expect(action).toEqual({
        type: "ADD_ENTRY",
        entry: {
            ...entries[0],
            id: expect.any(String),
        },
    });
});

test("should setup set entries object with data", () => {
    const action = setEntries(entries);
    expect(action).toEqual({
        type: "SET_ENTRIES",
        entries,
    });
});

test("should fetch entries from firebase", (done) => {
    //we pass done() since this is an asynchronous test case
    const store = createMockStore({});
    store.dispatch(startSetEntries()).then(() => {
        //we can use then() here because the call to the database is returning a promise chain
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_ENTRIES",
            entries,
        });
        done();
    });
});

// we provide 'done' as an argument to the callback function so the test case can be considered asynchronous
test("should add entry to database and store", (done) => {
    const store = createMockStore({});
    const entryData = {
        firstName: "Test",
        lastName: "Testerson",
        team: "delta",
        position: "web dev",
    };
    store
        .dispatch(startAddEntry(entryData))
        .then(() => {
            //we can use then() here because the call to the database is returning a promise chain
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "ADD_ENTRY",
                entry: {
                    id: expect.any(String),
                    ...entryData,
                    entryType: "",
                    discipline: "",
                    phoneNumber: "",
                    dob: "",
                },
            });

            // assertion to test that firebase actual got the right data inserted
            // we use return so we can chain promises and return this promise to the then() below
            return database.ref(`entries/${actions[0].entry.id}`).once("value");
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual({
                ...entryData,
                entryType: "",
                discipline: "",
                phoneNumber: "",
                dob: "",
            });
            done(); //we force Jest to wait until done() is called to finish the test case
        });
});

test("should add entry with defaults to database and store", (done) => {
    const store = createMockStore({});
    const entryData = {};
    store
        .dispatch(startAddEntry(entryData))
        .then(() => {
            //we can use then() here because the call to firebase is returning a promise chain
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "ADD_ENTRY",
                entry: {
                    id: expect.any(String),
                    entryType: "",
                    firstName: "",
                    lastName: "",
                    team: "",
                    discipline: "",
                    position: "",
                    phoneNumber: "",
                    dob: "",
                },
            });

            // assertion to test that firebase actual got the right data inserted
            // we use return so we can chain promises and return this promise to the then() below
            return database.ref(`entries/${actions[0].entry.id}`).once("value");
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual({
                entryType: "",
                firstName: "",
                lastName: "",
                team: "",
                discipline: "",
                position: "",
                phoneNumber: "",
                dob: "",
            });
            done(); //we force Jest to wait until done() is called to finish the test case
        });
});

test("should remove entry from store and firebase", (done) => {
    const store = createMockStore({});
    const id = entries[0].id;
    store
        .dispatch(startRemoveEntry({ id: id }))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "REMOVE_ENTRY",
                id: id,
            });

            // assertion to test that firebase actual got the right entry removed
            // we use return so we can chain promises and return this promise to the then() below
            return database.ref(`entries/${actions[0].id}`).once("value");
        })
        .then((snapshot) => {
            expect(snapshot.val()).toEqual(null);
            done();
        });
});

test("should edit entry from store and firebase", (done) => {
    const store = createMockStore({});
    const id = entries[0].id;
    const updates = {
        firstName: "Benny",
    };
    store
        .dispatch(startEditEntry({ id, updates }))
        .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: "EDIT_ENTRY",
                id: id,
                updates: updates,
            });

            // assertion to test that firebase actual got the right data updated
            // we use return so we can chain promises and return this promise to the then() below
            return database.ref(`entries/${actions[0].id}`).once("value");
        })
        .then((snapshot) => {
            expect(snapshot.val().firstName).toBe(updates.firstName);
            done();
        });
});
