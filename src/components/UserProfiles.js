import React from 'react';

class UserProfiles extends React.Component {
  constructor(){
    super();
    this.state = {
      profiles: []
    };
	
	this.getUsers = this.getUsers.bind(this);

  }

  componentWillMount() {
	// Grab 10 since the API only seems to return one at a time
	var i;
	
	for (i = 0; i < 10; i++) { 
		this.getUsers();
	}
  }

  getUsers() {
    fetch('https://randomuser.me/api/')
      .then(response => {
      if(response.ok) return response.json();
    throw new Error('Request failed.');
  })
  .then(data => {
	  const profile = {
			name: data.results[0].name, 
			image: data.results[0].picture.large,
			email: data.results[0].email, 
			phone: data.results[0].cell, 
			location: {city: data.results[0].location.city, state: data.results[0].location.state}
		};
		
	  const combined = this.state.profiles;
	  
	  combined.push(profile);

      this.setState(
        {profiles: combined}
      );
	  
	  console.log("Return data");
	  console.log(data);
  })
  .catch(error => {
      console.log(error);
  });
  }

  render() {
    console.log('State:');
    console.log(this.state);
    return (
      <div>
      {this.state.profiles.map(function(d, idx){
        return (
		<div id={idx} className="profile">
			<img className="image" alt='Profile Image' src={d.image}></img>
			<div className="personal-info">
				<h2 className="name">{d.name.first} {d.name.last} </h2>
				<div className="location">{d.location.city}, {d.location.state} </div>
			</div>
			<div className="contact-info">
				<div className="phone">
					<div className="title">Phone</div>
					<div className="value">{d.phone}</div>
				</div>
				<div className="email">
					<div className="title">Email</div>
					<div className="value">{d.email}</div>
				</div>
			</div>
		</div>
		)
      })}

      </div>
  );
  }
}

export default UserProfiles;
