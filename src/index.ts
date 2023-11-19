import reactToWebComponent from 'react-to-webcomponent';
import React from 'react';
import ReactDOM from 'react-dom';
import RuleEditor from './RuleEditor';

customElements.define('x-rule-editor', reactToWebComponent(RuleEditor, React, ReactDOM, {shadow: false}));
