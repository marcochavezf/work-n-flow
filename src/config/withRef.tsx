import React from 'react'

const withRef = (Component) => React.forwardRef((props, ref) => {
  return (
    <Component {...props} elementRef={ref} />
  )
});

export default withRef
