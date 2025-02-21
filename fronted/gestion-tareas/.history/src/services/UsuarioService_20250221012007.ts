

interface usuarioRol {
    idRol: number;
    idRol: number;
    idUsuario: number;
    nombreRol: string;
    descripcion: string;
    estado: string;
}
export class UsuarioService{
    private static readonly baseUrl = 'http://localhost:8700/api/Usuario/';

    static async obtenerRolesXUser(): Promise<EstadoTarea[] | null> {
        try {
            const token = AuthService.getToken()?.replace(/"/g, '');
            const { data } = await axios.get<EstadoTarea[]>(
                this.baseUrl + 'getAllData',
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return data;
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            return null;
        }
    }

}