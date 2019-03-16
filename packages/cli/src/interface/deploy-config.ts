export interface IDeployConfig {
  branch: string;
  dist: string;
  repo: string;
  type: 'project' | 'user';
  username: string;
}
