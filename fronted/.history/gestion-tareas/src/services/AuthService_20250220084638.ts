export class GestionTareasService {


    private static readonly baseUrl = 'http://localhost:8700/api/auth';

        static async obtenerTareas(): Promise<TareasResponse[] | null> {
            try {
                const response = await fetch(`${GestionTareasService.baseUrl}/tasks`);
                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                const data = await response.json();
                return data.tasks;
            } catch (error) {
                console.error('Error al obtener tareas:', error);
                return null;
            }
        }

}