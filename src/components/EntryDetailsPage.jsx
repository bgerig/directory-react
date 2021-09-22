import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { startRemoveEntry } from '../actions/entries';
import { capitalize, formatPhone } from '../util/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from './Header';
import Sidebar from './Sidebar';
import defaultPhoto from '../assets/images/default-photo.jpg';

class EntryDetailsPage extends Component {  //we destructure the props object being passed
	constructor(props) {
		super(props);

		this.state = {
			entry: props.entry,
			isAuthenticated: props.isAuthenticated,
			dispatch: props.dispatch
		}
	}

	deleteEntry = () => {
		if(window.confirm('Are you sure you want to delete this entry?')) {
			let path = `/`;
			this.state.dispatch(startRemoveEntry( { id: this.state.entry.id, imageId: this.state.entry.imageId}));
			this.props.history.push(path);
		}
	}

	goBack = () => {
		this.props.history.goBack();
	}

	render() {
		// Redirects to homepage is entry doesn't exist
		if ( !this.state.entry ) {
			return <Redirect to={ '/' } />;
		}

		return (
			<div className="app-container">
				<Header />
				<div className="main">
					<Sidebar />
					<div className="content">
						<div className="page-title">
							<span className="goback"  onClick={this.goBack}>
								<FontAwesomeIcon className="goback-icon" icon="arrow-circle-left" /><span className="goback-text">go back</span>
							</span>
						</div>
						<div className="entry-details">
							<div className="entry-details__card">
								{ this.state.entry.imageUrl ?
									<div className="entry-details__image" style={{backgroundImage: "url(" + this.state.entry.imageUrl + ")"}}></div> :
									<div className="entry-details__image" style={{backgroundImage: "url(" + defaultPhoto + ")"}}></div> 
								}
									
								{ this.state.entry.entryType === "person" && 
								<div className="entry-details__person">
									<h2 className="entry-details__name">{this.state.entry.firstName} {this.state.entry.lastName}</h2>
									<p className="entry-details__position">{this.state.entry.position.toUpperCase()}</p>

									<div className="entry-details__badge-wrapper">
										{/* Loops through entry.team array */}
										{this.state.entry.team.map((team, index) => {
											return	<NavLink to={`/teams/${team.value}`} key={index} >
														<span className={`entry-details__badge entry-details__badge--${team.value}`}>{team.value}</span>
													</NavLink>
										})}
									</div>

									{this.state.entry.phoneExtension &&
									<h3 className="entry-details__extension"><a href={`tel:605373${this.state.entry.phoneExtension}`}>Ext. {this.state.entry.phoneExtension}</a></h3>}
								</div> }

								{ this.state.entry.entryType === "room" && 
								<div className="entry-details__room">
									<h2 className="entry-details__name">{this.state.entry.roomName}</h2>
									{this.state.entry.phoneExtension &&
									<h3 className="entry-details__extension"><a href={`tel:605373${this.state.entry.phoneExtension}`}>Ext. {this.state.entry.phoneExtension}</a></h3>}
								</div> }

								{ this.state.entry.entryType === "other" && 
								<div className="entry-details__room">
									<h2 className="entry-details__name">{this.state.entry.otherName}</h2>
									{this.state.entry.phoneExtension &&
									<h3 className="entry-details__extension">Ext. {this.state.entry.phoneExtension}</h3>}
								</div> }

								{/* Renders edit and delete button if users is authenticated */}
								{this.state.isAuthenticated &&
								<div className="entry-details__control">
									<span><NavLink to={`/edit/${this.state.entry.id}`} ><FontAwesomeIcon icon="edit" /></NavLink></span>
									<span className="entry-list-item__remove" onClick={this.deleteEntry}>
										<FontAwesomeIcon icon="trash-alt" />
									</span>
								</div>}
							</div> {/* end of .entry-details__card */}

							{ this.state.entry.entryType === "person" && 
							<div className="entry-details__info">
								<div className="entry-details__general-info">
									<h3>General Information</h3>
									<div className="entry-field">
										<h4 className="entry-field__title">Email:</h4>
										<p className="entry-field__content"><a href={`mailto: ${this.state.entry.email}`}>{this.state.entry.email}</a></p>
									</div>
									<div className="entry-field">
										<h4 className="entry-field__title">Discipline:</h4>
										<p className="entry-field__content">{capitalize(this.state.entry.discipline)}</p>
									</div>
								</div>

								{ (this.state.entry.phoneNumber || this.state.entry.hometown ||  this.state.entry.college || this.state.entry.spouse || this.state.entry.children) && 
								<div className="entry-details__personal-info">
									<h3>Personal Information</h3>
									{ this.state.entry.phoneNumber && 
									<div className="entry-field">
										<h4 className="entry-field__title">Phone Number:</h4>
										<p className="entry-field__content"><a href={`tel:${this.state.entry.phoneNumber}`}>{formatPhone(this.state.entry.phoneNumber)}</a></p>
									</div> }
									{ this.state.entry.hometown && 
									<div className="entry-field">
										<h4 className="entry-field__title">Hometown:</h4>
										<p className="entry-field__content">{capitalize(this.state.entry.hometown)}</p>
									</div> }
									{ this.state.entry.college && 
									<div className="entry-field">
										<h4 className="entry-field__title">College:</h4>
										<p className="entry-field__content">{capitalize(this.state.entry.college)}</p>
									</div> }
									{ this.state.entry.spouse && 
									<div className="entry-field">
										<h4 className="entry-field__title">Spouse/S.O. :</h4>
										<p className="entry-field__content">{capitalize(this.state.entry.spouse)}</p>
									</div> }
									{ this.state.entry.children && 
									<div className="entry-field">
										<h4 className="entry-field__title">Children:</h4>
										<p className="entry-field__content">{capitalize(this.state.entry.children)}</p>
									</div> }
								</div>}
							</div>} {/* end of .entry-details__info */}

						</div> {/* end of .entry-details */}

					</div> {/* end of .content */}
				</div> {/* end of .main */}
			</div>
		)
	}
	
}

// Maps store state to props to be passed to the EntryDetailsPage component
// We can get any property from the store and pass it down as props
const mapStateToProps = (state, props) => (
	{
		entry: state.entries.find((entry) => {
			// gets id of current entry
			if (entry.id === props.match.params.id) return true;
			else return false;
		}),
		isAuthenticated: !!state.auth.uid
	}
);

export default connect(mapStateToProps)(EntryDetailsPage);