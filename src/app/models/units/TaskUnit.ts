import {ITaskUnit} from '../../common/shared/models/units/ITaskUnit';
import {ITask} from '../../common/shared/models/task/ITask';
import {ICourse} from '../../common/shared/models/ICourse';
import {IChatRoom} from '../../common/shared/models/IChatRoom';

export class TaskUnit implements ITaskUnit {
  name: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  _course: any;
  _id: any;
  title: string;
  type: string;
  __t: string;
  progressable: boolean;
  weight: number;
  visible: boolean;
  unitCreator: any;
  chatRoom: IChatRoom;

  tasks: ITask[] = [];
  deadline: string;

  constructor(_course: ICourse) {
    this._course = _course;
    this.progressable = true;
    this.weight = 0;
    this.__t = 'task';
  }
}
