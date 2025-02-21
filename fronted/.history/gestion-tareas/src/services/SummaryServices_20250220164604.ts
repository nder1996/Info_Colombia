import axios from 'axios';
import { AuthService } from 'services/AuthService';



interface EstadoTarea {
    id: number;
    nombre: string;
    descripcion: string;
    estado: string;
}



export class GestionTareasService {
    private static readonly baseUrl = 'http://localhost:8700/api/summary/';



    




}