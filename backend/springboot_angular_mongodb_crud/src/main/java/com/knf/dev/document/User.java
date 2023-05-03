package com.knf.dev.document;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "database_sequences")
public class User {

	private String _id;
	private String firstName;
	private String lastName;
	private String emailId;

	private String image;

	public String getId() {
		return _id;
	}

	public void setId(String _id) {
		this._id = _id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public User(String _id, String firstName, String lastName, String emailId, String image) {
		super();
		this._id = _id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.image = image;
	}

	public User() {
		super();
	}

}
