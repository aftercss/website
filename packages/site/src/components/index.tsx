import * as React from 'react';

export interface IHeaderProps {
  p: string;
}

export class Header extends React.Component<IHeaderProps> {
  public render() {
    return <div>aftercss title</div>;
  }
}
