declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}

declare module '*.md' {
  export class MDContent extends React.Component {}
  export class MDNav extends React.Component {}
}