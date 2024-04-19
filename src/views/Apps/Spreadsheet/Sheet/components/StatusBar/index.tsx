import FlexBox from "../../../../../../components/shared/FlexBox";
import { State } from "../../types";
import { FlexForm } from "../styles";
import HighlightedStats from "./HighlightedStats";

type Props = {
  state: State;
};

const StatusBar = ({ state }: Props): JSX.Element => {
  const handleSubmit = (e: React.FormEvent) => e.preventDefault();
  const { average, sum, count } = state.highlighted;

  return (
    <div tabIndex={1000}>
      <FlexForm
        onSubmit={handleSubmit}
        justifyContent="space-between"
        height="2rem"
      >
        <FlexBox gap="1.5rem"></FlexBox>
        <FlexBox>
          {sum && average && (
            <>
              <HighlightedStats title="Average" data={average.toFixed(5)} />
              <HighlightedStats title="Sum" data={sum} />
            </>
          )}
          {count && <HighlightedStats title="Count" data={count} />}
        </FlexBox>
      </FlexForm>
    </div>
  );
};

export default StatusBar;
