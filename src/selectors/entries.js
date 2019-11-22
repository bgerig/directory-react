// Get visible entries after setting filters
// gets passed (Array: entries, Obj: filters, String: typePassed, String: team) 
export const getVisibleEntries = (entries, {text, sortBy, sortRoomsBy, sortOtherBy}, typePassed, team) => {
	let visibleEntries = [];

	// Filter based on 'Search' terms
	visibleEntries = entries.filter((entry) => {
		// gets only entries that match the 'type' passed (person, room, other)
		// if there is no 'typePassed', typeMatch is set to true to get all types
		const typeMatch = typePassed ? entry.entryType === typePassed : true; 
		
		// function that loops through the entry.team array and
		// returns true if the entry has a 'team' that matches the 'team' passed as a prop
		const getTeamMatch = () => {
			for (var i = 0; i <  entry.team.length; i++) {
				if (entry.team[i]['value'] === team) return true;
			}
		}
		// is team == 'all', then teamMatch is set to true to get all teams
		const teamMatch = team === 'all' ? true : getTeamMatch();

		// Function to check if search text matches a team from the entry's team array
		const searchMatchesTeam = () => {
			for (var i = 0; i < entry.team.length; i++) {
				if(entry.team[i]['value'].includes(text.toLowerCase())) return true;
			}
		}

		//gets only entries that match the search text
		const textMatch = (entry.firstName && entry.firstName.toLowerCase().includes(text.toLowerCase())) || 
						(entry.lastName && entry.lastName.toLowerCase().includes(text.toLowerCase())) || 
						(entry.firstName && entry.lastName && (entry.firstName.toLowerCase() + ' ' + entry.lastName.toLowerCase())).includes(text.toLowerCase()) || 
						(entry.roomName && entry.roomName.toLowerCase().includes(text.toLowerCase())) || 
						(entry.otherName && entry.otherName.toLowerCase().includes(text.toLowerCase())) || 
						(entry.phoneExtension && entry.phoneExtension.toLowerCase().includes(text.toLowerCase())) || 
						(entry.email && entry.email.toLowerCase().includes(text.toLowerCase())) || 
						(entry.position && entry.position.toLowerCase().includes(text.toLowerCase())) || 
						(entry.team && searchMatchesTeam() ) || 
						(entry.discipline && entry.discipline.toLowerCase().includes(text.toLowerCase())) || 
						(entry.college && entry.college.toLowerCase().includes(text.toLowerCase())) ||
						(entry.hometown && entry.hometown.toLowerCase().includes(text.toLowerCase()))
		
		if (typePassed === 'person') {
			return textMatch && teamMatch && typeMatch;
		} else {
			return textMatch && typeMatch;
		}
	})
	
	// Filters based on sorting
	if (typePassed === 'person') {
		// default JavaScript sort() function used to sort entries array
		// returns -1 or 1 whether not a < b
		visibleEntries.sort((a, b) => {
			if (sortBy === 'firstName') {
				return a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : 1;
			} else if (sortBy === 'lastName') {
				return a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1; 
			} else if (sortBy === 'position') {
				return a.position.toLowerCase() < b.position.toLowerCase() ? -1 : 1; 
			} else if (sortBy === 'team') {
				return a.team[0].value.toLowerCase() < b.team[0].value.toLowerCase() ? -1 : 1; 
			} else if (sortBy === 'discipline') {
				return a.discipline.toLowerCase() < b.discipline.toLowerCase() ? -1 : 1; 
			} else if (sortBy === 'phoneExtension') {
				return a.phoneExtension < b.phoneExtension ? -1 : 1; 
			} else {
				return 0;
			}	
		});
	} else if (typePassed === 'room') {
		visibleEntries.sort((a, b) => {
			if (sortRoomsBy === 'roomName') {
				return a.roomName.toLowerCase() < b.roomName.toLowerCase() ? -1 : 1;
			} else if (sortRoomsBy === 'phoneExtension') {
				return a.phoneExtension < b.phoneExtension ? -1 : 1; 
			} else {
				return 0;
			}	
		});
	} else if (typePassed === 'other') {
		visibleEntries.sort((a, b) => {
			if (sortOtherBy === 'otherName') {
				return a.otherName.toLowerCase() < b.otherName.toLowerCase() ? -1 : 1;
			} else if (sortOtherBy === 'phoneExtension') {
				return a.phoneExtension < b.phoneExtension ? -1 : 1; 
			} else {
				return 0;
			}	
		});
	}

	return visibleEntries;
};