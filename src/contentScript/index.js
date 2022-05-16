import React from "react";
import ReactDOM from "react-dom";
import "@webcomponents/custom-elements";
import ContentScript from "./ContentScript";
import { create } from "jss";

class ReactExtensionContainer extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    mountPoint.id = "reactExtensionPoint";

    const reactRoot = this.attachShadow({ mode: "open" }).appendChild(
      mountPoint
    );

    const jss = create({
      ...jssPreset(),
      insertionPoint: reactRoot,
    });

    ReactDOM.render(
      <StylesProvider jss={jss}>
        <ContentScript />
      </StylesProvider>,
      mountPoint
    );
  }
}

const initWebComponent = function () {
  customElements.define("change-this", ReactExtensionContainer);

  const app = document.createElement("change-this");
  document.documentElement.appendChild(app);
};

initWebComponent();