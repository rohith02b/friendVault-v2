import { Content } from './Content';
import { Groups } from './Groups';

export type CustomCard = {
  content_type: string;
  content: Groups | Content | any;
};
