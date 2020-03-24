import React from 'react';

const Test = (props) => {
  return (props.children);
};

export default {
  title: 'Test',
  component: Test,
};

export const testText = () => <Test>Hello World</Test>;

