// return array of current visible entries
export const getVisibleEntries = (entries, filters, entryType, team) => {
    const { text, sortBy, sortRoomsBy, sortOtherBy } = filters;

    let visibleEntries = [];

    // check if query string matches the property passed
    const queryStringMatches = (property) => property && property.toLowerCase().includes(text.toLowerCase());

    // check if query string matches the full name
    const queryStringMatchesFullName = (firstName, lastName) => {
        return firstName && lastName && (firstName.toLowerCase() + " " + lastName.toLowerCase()).includes(text.toLowerCase());
    };

    // check if query string matches a team
    const queryStringMatchesTeam = (entryTeam) => {
        return entryTeam && !!entryTeam.find((element) => element.value.includes(text.toLowerCase()));
    };

    // filter entries
    visibleEntries = entries.filter((entry) => {
        // if there is no entry type specified then get all entry types
        const matchesEntryType = entryType ? entry.entryType === entryType : true;

        // check if various properties of the entry match the query string
        const matchesQuery =
            queryStringMatches(entry.firstName) ||
            queryStringMatches(entry.lastName) ||
            queryStringMatchesFullName(entry.firstName, entry.lastName) ||
            queryStringMatches(entry.roomName) ||
            queryStringMatches(entry.otherName) ||
            queryStringMatches(entry.phoneExtension) ||
            queryStringMatches(entry.email) ||
            queryStringMatches(entry.position) ||
            queryStringMatchesTeam(entry.team) ||
            queryStringMatches(entry.discipline) ||
            queryStringMatches(entry.college) ||
            queryStringMatches(entry.hometown);

        if (entryType === "person") {
            let matchesTeam = true;
            if (team !== "all") {
                // set to true if entry has a team that matches the 'team' passed
                matchesTeam = entry.team && !!entry.team.find((element) => element.value === team);
            }

            return matchesQuery && matchesTeam && matchesEntryType;
        } else {
            return matchesQuery && matchesEntryType;
        }
    });

    // sort entries
    if (entryType === "person") {
        // returns -1 or 1 whether not a < b, return 0 if equal
        visibleEntries.sort((a, b) => {
            switch (sortBy) {
                case "firstName":
                    return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : 1;
                case "lastName":
                    return a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1;
                case "position":
                    return a.position.toLowerCase() < b.position.toLowerCase() ? -1 : 1;
                case "team":
                    return a.team[0].value.toLowerCase() < b.team[0].value.toLowerCase() ? -1 : 1;
                case "discipline":
                    return a.discipline.toLowerCase() < b.discipline.toLowerCase() ? -1 : 1;
                case "phoneExtension":
                    return a.phoneExtension < b.phoneExtension ? -1 : 1;
                default:
                    return 0;
            }
        });
    } else if (entryType === "room") {
        visibleEntries.sort((a, b) => {
            switch (sortRoomsBy) {
                case "roomName":
                    return a.roomName.toLowerCase() < b.roomName.toLowerCase() ? -1 : 1;
                case "phoneExtension":
                    return a.phoneExtension < b.phoneExtension ? -1 : 1;
                default:
                    return 0;
            }
        });
    } else if (entryType === "other") {
        visibleEntries.sort((a, b) => {
            switch (sortOtherBy) {
                case "otherName":
                    return a.otherName.toLowerCase() < b.otherName.toLowerCase() ? -1 : 1;
                case "phoneExtension":
                    return a.phoneExtension < b.phoneExtension ? -1 : 1;
                default:
                    return 0;
            }
        });
    }

    return visibleEntries;
};
