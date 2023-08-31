import CalcButton from "../components/CalcButton";

const InvertedButton = ({
  value,
  invertedValue,
  display,
  invertedDisplay,
  state,
  dispatch,
  operation,
  invertedOperation,
}) => {
  return (
    <CalcButton
      display={state.inv ? invertedDisplay : display}
      state={state}
      dispatch={dispatch}
      value={state.inv ? invertedValue : value}
      operation={operation}
      invertedOperation={invertedOperation}
    />
  );
};

export default InvertedButton;
