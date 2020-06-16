import {IAnswer} from '../common/shared/models/task/IAnswer';

export class Answer implements IAnswer {
  _id: any;
  value: boolean;
  text: string;
}
