// TODO must related connected to a lecture

import {ITask} from '../common/shared/models/task/ITask';
import {IAnswer} from '../common/shared/models/task/IAnswer';

export class Task implements ITask {
  _id: any;
  name: string;
  answers: IAnswer[] = [];
}

