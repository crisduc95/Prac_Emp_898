package com.bolsadeideas.springboot.backend.chat.models.documents;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//Importamos en el document los mensajes
@Document(collection = "mensajes")

public class Mensaje implements Serializable {
	
	//con esto mapeamos los mensajes a los docuemtnos
	@Id
	private String id;

	private String texto;
	private Long fecha;
	private String username;
	private String tipo;

	
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public Long getFecha() {
		return fecha;
	}

	public void setFecha(Long fecha) {
		this.fecha = fecha;
	}
	
	

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}



	private static final long serialVersionUID = -3777582564067492550L;

}
