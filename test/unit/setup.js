global.getElementByTestID = function getElementByTestID(parent, id) {
  if (parent.children) {
    for (let child of parent.children) {
      if (child.props && child.props.testID === id) {
        return child;
      } else {
        let sub = getElementByTestID(child, id);
        if (sub) {
          return sub;
        }
      }
    }
  }
};

