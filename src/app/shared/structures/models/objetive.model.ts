import { calculatePercentage } from 'src/app/shared/helpers/model.helpers';
import { Task } from './task.model';
import { Tech } from './techs.model';

/**
 * ? Tipo de estados posibles de un objetivo
 */
export type TObjetiveStates =
  | 'En progreso'
  | 'Hecho'
  | 'Por empezar'
  | 'Empezado'
  | 'Pausado';

/**
 * ? Interface del objeto a recibir en el constructor
 */
export interface IObjetiveConstructor {
  id: string;
  name: string;
  description: string;
  state: TObjetiveStates;
  sectionId: string;

  //FIXME implementar
  techs?: Tech[];
}

/**
 * ? Modelo de objetivos a realizar
 */
export class Objetive {
  // ANCHOR - Variables
  name: string;
  description: string | undefined;
  state: TObjetiveStates;
  sectionId: string;

  private _id: string;
  get id(): string {
    return this._id;
  }

  private _percentage: number;
  get percentage(): number {
    return this._percentage;
  }

  get isDone(): boolean {
    return this._percentage >= 100;
  }

  private _tasks: Task[];
  get tasks(): Task[] {
    return [...this._tasks];
  }

  private _techs: Tech[];
  get techs(): Tech[] {
    return [...this._techs];
  }

  // ANCHOR - Constructor
  private constructor(objetiveConstructor: IObjetiveConstructor) {
    const {
      id,
      name,
      description = undefined,
      state,
      sectionId,
      techs = [],
    } = objetiveConstructor;

    //* public
    this.name = name;
    this.description = description || undefined;
    this.state = state;
    this.sectionId = sectionId;

    //* privates
    this._id = id;
    this._percentage = 0;
    this._tasks = [];
    this._techs = techs || [];
  }

  // ANCHOR - Métodos

  /**
   * ? Añade una tarea al objetivo y recalcula el porcentaje
   * @param task {Task} Tarea a añadir en el Objetivo
   * @returns {Task[]} Retorna la lista de tareas final
   */
  public addTask(task: Task): Task[] {
    this._tasks.push(task);
    this._percentage = calculatePercentage(this._tasks);
    return this._tasks;
  }

  /**
   * ? Elimina una tarea al objetivo y recalcula el porcentaje
   * @param task {Task | string} Tarea o Id de la tarea a eliminar
   * @returns {Task[]} Retorna la lista de tareas final
   */
  public removeTask(task: Task | string): Task[] {
    //* Si recibimos la tarea completa extraemos la id
    if (typeof task !== 'string') task = (task as Task).id;
    this._tasks = this._tasks.filter((element) => element.id !== task);
    this._percentage = calculatePercentage(this._tasks);
    return this._tasks;
  }

  /**
   * ? Añade una tecnología al objetivo
   * @param tech {Tech} - Tecnólogia a añadir en el objetivo
   * @returns {Tech[]} - Retorna la lista de técnologías final
   */
  public addTech(tech: Tech): Tech[] {
    this._techs.push(tech);
    return this._techs;
  }

  /**
   * ? Elimina una tecnología del objetivo
   * @param tech {Tech | string} - Tecnólogia  o ID de la tecnologñia a eliminar en el objetivo
   * @returns {Tech[]} - Retorna la lista de técnologías final
   */
  public removeTech(tech: Tech | string): Tech[] {
    if (typeof tech !== 'string') tech = (tech as Tech).id;
    this._techs = this.techs.filter((element) => element.id !== tech);
    return this._techs;
  }
}
