import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startRemoveEntry } from '../actions/entries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import defaultPhoto from '../assets/images/default-photo.jpg';
// import { forEach } from '@firebase/util';

class EntryListItem extends Component {  //we destructure the props object being passed
	constructor(props) {
		super(props);

		this.state = {
			entry: props.entry,
			dispatch: props.dispatch
		}
	}

	deleteEntry = () => {
		if (window.confirm('Are you sure you want to delete this entry?')) {
			this.state.dispatch(startRemoveEntry({ id: this.state.entry.id, imageId: this.state.entry.imageId }));
		}
	}

	render() {
		return (
			<div className="entry-list-item">

				<NavLink to={`/details/${this.state.entry.id}`} >
					{this.state.entry.imageUrl ?
						<div className="entry-list-item__image" style={{ backgroundImage: "url(" + this.state.entry.imageUrl + ")" }}></div> :
						<div className="entry-list-item__image" style={{ backgroundImage: "url(" + defaultPhoto + ")" }}></div>
					}
				</NavLink>

				{this.state.entry.entryType === "person" &&
					<div className="entry-list-item__person">
						<div className="entry-list-item__name">
							<h3><NavLink to={`/details/${this.state.entry.id}`} >{this.state.entry.firstName} {this.state.entry.lastName}</NavLink></h3>

							{/* Loops through entry.team array */}
							{this.state.entry.team.map((team, index) => {
								return <NavLink to={`/teams/${team.value}`} key={index} ><span className={`entry-list-item__badge entry-list-item__badge--${team.value}`}>{team.value}</span></NavLink>
							})}
						</div>
						<p className="entry-list-item__position">{this.state.entry.position.toUpperCase()}</p>
					</div>
				}

				{this.state.entry.entryType === "room" &&
					<div className="entry-list-item__room">
						<h3><NavLink to={`/details/${this.state.entry.id}`} >{this.state.entry.roomName}</NavLink></h3>
					</div>
				}

				{this.state.entry.entryType === "other" &&
					<div className="entry-list-item__room">
						<h3><NavLink to={`/details/${this.state.entry.id}`} >{this.state.entry.otherName}</NavLink></h3>
					</div>
				}

				{this.state.entry.phoneExtension &&
					<div className="entry-list-item__extension">
						{this.state.entry.entryType === "other" &&
							<h3>Ext. {this.state.entry.phoneExtension}</h3>
						}
						{this.state.entry.entryType !== "other" &&
							<h3><a href={`tel:555123${this.state.entry.phoneExtension}`}>Ext. {this.state.entry.phoneExtension}</a></h3>
						}
					</div>
				}

				{/* Renders edit and delete button if users is authenticated */}
				{this.props.isAuthenticated &&
					<div className="entry-list-item__control">
						<span><NavLink to={`/edit/${this.state.entry.id}`} ><FontAwesomeIcon icon="edit" /></NavLink></span>
						<span className="entry-list-item__remove" onClick={this.deleteEntry}>
							<FontAwesomeIcon icon="trash-alt" />
						</span>
					</div>
				}
			</div>
		)
	}
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: !!state.auth.uid
	}
}

// connect() passes dispatc() as a prop
const EntryListItemConnected = connect(mapStateToProps)(EntryListItem);

export default EntryListItemConnected;