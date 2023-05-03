import { Component, OnInit } from '@angular/core';
import {  Client }  from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensaje } from './models/mensaje';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private client: Client;
  conectado: boolean = false;
  mensaje: Mensaje = new Mensaje();
  mensajes: Mensaje[] = [];
  escribiendo: string;
  clienteId: string;

  constructor() {
    // Creamos el Identificador Unico para el cliente UUID
    this.clienteId = 'id-' + new Date().getMilliseconds() + '-' + Math.random().toString(36).substring(2);
  }

  ngOnInit() {
    this.client = new Client();
    this.client.webSocketFactory = ()=>{
      return new SockJS("http://localhost:8080/chat-websocket");
    }

    this.client.onConnect = (frame) => {
      console.log('Conectados: ' + this.client.connected + " : " + frame);
      this.conectado = true;

      //suscribirnos al evento del chat
      this.client.subscribe('/chat/mensaje', e => {
        let mensaje = JSON.parse(e.body) as Mensaje; // en el cuerpo escuchamos el mensaje
        mensaje.fecha = new Date (mensaje.fecha);

        this.mensajes.push(mensaje);
        console.log(mensaje);

      });

      this.client.subscribe('/chat/escribiendo', e => {
        this.escribiendo = e.body;
        setTimeout(() => { this.escribiendo = '';}, 5000)

      });
      //mostramos el clienteID
      console.log(this.clienteId);
      this.client.subscribe('/chat/historial/' + this.clienteId,e => {
        const historial = JSON.parse(e.body) as Mensaje[];
        this.mensajes = historial.map(m => {
          m.fecha = new Date(m.fecha);
          return m;
        }).reverse();
      });

      this.client.publish({destination: '/app/historial', body: this.clienteId});

      this.mensaje.tipo = 'NUEVO_USUARIO';
      this.client.publish({
        destination: '/app/mensaje',
        body: JSON.stringify(this.mensaje)
      });
    }

    this.client.onDisconnect = (frame) => {
      console.log('DesConectados: ' + !this.client.connected + " : " + frame);
      this.conectado = false;
      this.mensaje = new Mensaje();
      this.mensajes = [];
    }
  }

  conectar():void{
    this.client.activate();

  }
  desconectar():void{
    this.client.deactivate();
  }

  enviarMensaje(): void{
    this.mensaje.tipo = 'MENSAJE';
    this.client.publish({
      destination: '/app/mensaje',
      body: JSON.stringify(this.mensaje)
    });
    this.mensaje.texto = '';
  }

  escribiendoEvento(): void {
    this.client.publish({
      destination: '/app/escribiendo',
      body: this.mensaje.username
    });
  }

}