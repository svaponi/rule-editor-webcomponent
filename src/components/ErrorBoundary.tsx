import React, {PropsWithChildren} from 'react';

export class ErrorBoundary extends React.Component<PropsWithChildren, {hasError: boolean}> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error: unknown) {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return <pre>Editor panic!</pre>;
    }

    return this.props.children;
  }
}
